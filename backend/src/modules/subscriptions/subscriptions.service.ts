import { Injectable } from '@nestjs/common';

@Injectable()
export class SubscriptionsService {
  async getForUser(_userId: string) {
    // TODO: fetch Subscription row via Prisma.
    return null;
  }

  async pause(_userId: string) {
    // TODO: set isPaused=true, pausedUntil=+1 month. No charge during pause.
    return null;
  }

  async restorePurchases(_userId: string, _receipt: unknown) {
    // TODO: validate App Store/Google Play receipt or Stripe subscription id,
    // then upsert the Subscription row.
    return null;
  }

  async renewWithLoyaltyDiscount(_userId: string) {
    // TODO: apply 30% discount on year-2+ renewals vs. new-subscriber price.
    return null;
  }

  async handleStripeWebhook(_payload: unknown) {
    // TODO: verify signature with STRIPE_WEBHOOK_SECRET, sync subscription state.
  }
}
