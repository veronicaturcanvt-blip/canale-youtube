import {
  BadGatewayException,
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Subscription, User } from '@prisma/client';
import Stripe from 'stripe';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCheckoutDto } from './dto/create-checkout.dto';

const TRIAL_PERIOD_DAYS = 3;
const PAUSE_DURATION_DAYS = 30;

@Injectable()
export class SubscriptionsService {
  private readonly stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '');

  constructor(private readonly prisma: PrismaService) {}

  async getForUser(userId: string) {
    const subscription = await this.prisma.subscription.findUnique({ where: { userId } });
    return subscription ? toPublicSubscription(subscription) : null;
  }

  async createCheckoutSession(userId: string, dto: CreateCheckoutDto) {
    const user = await this.prisma.user.findUniqueOrThrow({ where: { id: userId } });

    const existing = await this.prisma.subscription.findUnique({ where: { userId } });
    if (existing && existing.provider === 'stripe' && existing.expiresAt > new Date()) {
      throw new ConflictException('User already has an active subscription');
    }

    const priceId = process.env.STRIPE_PRICE_ANNUAL_ID;
    if (!priceId) {
      throw new BadGatewayException('STRIPE_PRICE_ANNUAL_ID is not configured');
    }

    try {
      const customerId = await this.getOrCreateStripeCustomer(user);
      const session = await this.stripe.checkout.sessions.create({
        mode: 'subscription',
        customer: customerId,
        client_reference_id: userId,
        line_items: [{ price: priceId, quantity: 1 }],
        subscription_data: {
          trial_period_days: TRIAL_PERIOD_DAYS,
          metadata: { userId },
        },
        success_url:
          dto.successUrl ?? requireEnv('STRIPE_CHECKOUT_SUCCESS_URL'),
        cancel_url: dto.cancelUrl ?? requireEnv('STRIPE_CHECKOUT_CANCEL_URL'),
      });

      return { checkoutUrl: session.url };
    } catch (error) {
      throw new BadGatewayException(`Stripe checkout session creation failed: ${message(error)}`);
    }
  }

  async pause(userId: string) {
    const subscription = await this.prisma.subscription.findUnique({ where: { userId } });
    if (!subscription) {
      throw new NotFoundException('No subscription to pause');
    }
    if (subscription.provider !== 'stripe' || !subscription.providerRef) {
      throw new BadRequestException(
        `Pausing is only supported for Stripe-managed subscriptions, not "${subscription.provider}"`,
      );
    }
    if (subscription.isPaused) {
      throw new ConflictException('Subscription is already paused');
    }

    const resumesAt = new Date();
    resumesAt.setDate(resumesAt.getDate() + PAUSE_DURATION_DAYS);

    try {
      await this.stripe.subscriptions.update(subscription.providerRef, {
        pause_collection: {
          behavior: 'void',
          resumes_at: Math.floor(resumesAt.getTime() / 1000),
        },
      });
    } catch (error) {
      throw new BadGatewayException(`Stripe pause failed: ${message(error)}`);
    }

    const updated = await this.prisma.subscription.update({
      where: { userId },
      data: { isPaused: true, pausedUntil: resumesAt },
    });

    return toPublicSubscription(updated);
  }

  // Re-syncs our local Subscription row from Stripe by the user's Stripe
  // customer id. Covers the "I reinstalled the app / logged in on a new
  // device and my purchase didn't show up" case for Stripe-billed
  // subscriptions. App Store / Google Play receipt-based restore is a
  // separate flow (their purchase tokens, not a Stripe customer id) and
  // isn't implemented here yet.
  async restorePurchases(userId: string) {
    const user = await this.prisma.user.findUniqueOrThrow({ where: { id: userId } });

    if (!user.stripeCustomerId) {
      throw new NotFoundException('No purchases found to restore');
    }

    let subscriptions: Stripe.ApiList<Stripe.Subscription>;
    try {
      subscriptions = await this.stripe.subscriptions.list({
        customer: user.stripeCustomerId,
        status: 'all',
        limit: 1,
      });
    } catch (error) {
      throw new BadGatewayException(`Stripe lookup failed: ${message(error)}`);
    }

    const latest = subscriptions.data[0];
    if (!latest) {
      throw new NotFoundException('No purchases found to restore');
    }

    const subscription = await this.syncSubscriptionFromStripe(userId, latest);
    return toPublicSubscription(subscription);
  }

  async handleStripeWebhook(rawBody: Buffer, signature: string | undefined) {
    const webhookSecret = requireEnv('STRIPE_WEBHOOK_SECRET');
    if (!signature) {
      throw new BadRequestException('Missing stripe-signature header');
    }

    let event: Stripe.Event;
    try {
      event = this.stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
    } catch (error) {
      throw new BadRequestException(`Invalid Stripe signature: ${message(error)}`);
    }

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.mode !== 'subscription' || !session.subscription) {
          break;
        }
        const userId = session.client_reference_id ?? session.metadata?.userId;
        if (!userId) {
          break;
        }
        const stripeSubscription = await this.stripe.subscriptions.retrieve(
          typeof session.subscription === 'string' ? session.subscription : session.subscription.id,
        );
        await this.syncSubscriptionFromStripe(userId, stripeSubscription);
        break;
      }
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const stripeSubscription = event.data.object as Stripe.Subscription;
        const userId = stripeSubscription.metadata?.userId;
        if (userId) {
          await this.syncSubscriptionFromStripe(userId, stripeSubscription);
        }
        break;
      }
      default:
        break;
    }

    return { received: true };
  }

  private async getOrCreateStripeCustomer(user: User) {
    if (user.stripeCustomerId) {
      return user.stripeCustomerId;
    }

    const customer = await this.stripe.customers.create({
      email: user.email,
      metadata: { userId: user.id },
    });

    await this.prisma.user.update({
      where: { id: user.id },
      data: { stripeCustomerId: customer.id },
    });

    return customer.id;
  }

  private async syncSubscriptionFromStripe(userId: string, stripeSubscription: Stripe.Subscription) {
    const price = stripeSubscription.items.data[0]?.price;

    const data = {
      plan: 'annual',
      price: price?.unit_amount ? price.unit_amount / 100 : 0,
      currency: (price?.currency ?? 'eur').toUpperCase(),
      startedAt: new Date(stripeSubscription.start_date * 1000),
      expiresAt: new Date(stripeSubscription.current_period_end * 1000),
      trialEndsAt: stripeSubscription.trial_end
        ? new Date(stripeSubscription.trial_end * 1000)
        : null,
      isPaused: Boolean(stripeSubscription.pause_collection),
      pausedUntil: stripeSubscription.pause_collection?.resumes_at
        ? new Date(stripeSubscription.pause_collection.resumes_at * 1000)
        : null,
      provider: 'stripe',
      providerRef: stripeSubscription.id,
    };

    return this.prisma.subscription.upsert({
      where: { userId },
      create: { userId, ...data },
      update: data,
    });
  }
}

function toPublicSubscription(subscription: Subscription) {
  return {
    plan: subscription.plan,
    startedAt: subscription.startedAt,
    expiresAt: subscription.expiresAt,
    price: Number(subscription.price),
    currency: subscription.currency,
    isPaused: subscription.isPaused,
    trialEndsAt: subscription.trialEndsAt,
  };
}

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new BadGatewayException(`${name} is not configured`);
  }
  return value;
}

function message(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
