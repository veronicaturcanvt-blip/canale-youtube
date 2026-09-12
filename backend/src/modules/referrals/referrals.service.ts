import { Injectable } from '@nestjs/common';

const REFERRER_REWARD_MONTHS = 3;
const REFEREE_TRIAL_DAYS = 7;

@Injectable()
export class ReferralsService {
  async getOrCreateCode(_userId: string) {
    // TODO: fetch/create a ReferralCode row and build the shareable link.
    return { link: '' };
  }

  async redeem(_code: string, _newUserId: string) {
    // TODO: link Referral row, grant referrer REFERRER_REWARD_MONTHS free,
    // extend referee's trial to REFEREE_TRIAL_DAYS once their first
    // subscription is created.
  }
}
