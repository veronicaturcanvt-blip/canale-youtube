import { Body, Controller, Get, Post } from '@nestjs/common';
import { ReferralsService } from './referrals.service';

@Controller('referrals')
export class ReferralsController {
  constructor(private readonly referralsService: ReferralsService) {}

  @Get('me')
  getMine() {
    return this.referralsService.getOrCreateCode('me');
  }

  @Post('redeem')
  redeem(@Body('code') code: string) {
    return this.referralsService.redeem(code, 'me');
  }
}
