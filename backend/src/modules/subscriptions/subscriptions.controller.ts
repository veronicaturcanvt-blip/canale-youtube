import { Body, Controller, Get, Post } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Get('me')
  getMine() {
    return this.subscriptionsService.getForUser('me');
  }

  @Post('me/pause')
  pause() {
    return this.subscriptionsService.pause('me');
  }

  @Post('me/restore')
  restore(@Body() receipt: unknown) {
    return this.subscriptionsService.restorePurchases('me', receipt);
  }

  @Post('webhooks/stripe')
  stripeWebhook(@Body() payload: unknown) {
    return this.subscriptionsService.handleStripeWebhook(payload);
  }
}
