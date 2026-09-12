import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { SubscriptionsModule } from './modules/subscriptions/subscriptions.module';
import { PracticesModule } from './modules/practices/practices.module';
import { ReferralsModule } from './modules/referrals/referrals.module';
import { AchievementsModule } from './modules/achievements/achievements.module';
import { PushModule } from './modules/push/push.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    SubscriptionsModule,
    PracticesModule,
    ReferralsModule,
    AchievementsModule,
    PushModule,
  ],
})
export class AppModule {}
