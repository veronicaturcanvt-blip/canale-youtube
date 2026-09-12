import { Body, Controller, Get, Headers, Post, UseGuards, UsePipes } from '@nestjs/common';
import { strictValidationPipe } from '../../common/strict-validation.pipe';
import { AuthenticatedUser } from '../auth/auth.types';
import { CurrentUser } from '../auth/current-user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { SubscriptionsService } from './subscriptions.service';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMine(@CurrentUser() user: AuthenticatedUser) {
    return this.subscriptionsService.getForUser(user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(strictValidationPipe)
  @Post('me/checkout')
  createCheckout(@CurrentUser() user: AuthenticatedUser, @Body() dto: CreateCheckoutDto) {
    return this.subscriptionsService.createCheckoutSession(user.userId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('me/pause')
  pause(@CurrentUser() user: AuthenticatedUser) {
    return this.subscriptionsService.pause(user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('me/restore')
  restore(@CurrentUser() user: AuthenticatedUser) {
    return this.subscriptionsService.restorePurchases(user.userId);
  }

  // Raw body (configured in main.ts) is required here so the Stripe
  // signature check in the service can verify the exact bytes Stripe sent.
  @Post('webhooks/stripe')
  stripeWebhook(@Body() rawBody: Buffer, @Headers('stripe-signature') signature?: string) {
    return this.subscriptionsService.handleStripeWebhook(rawBody, signature);
  }
}
