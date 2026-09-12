import { Injectable } from '@nestjs/common';

@Injectable()
export class AchievementsService {
  async getForUser(_userId: string) {
    // TODO: fetch UserAchievement rows joined with Achievement.
    return [];
  }

  async evaluateStreak(_userId: string) {
    // TODO: recompute consecutive-day streak from CompletedSession dates
    // and unlock any newly-earned Achievement rows.
  }
}
