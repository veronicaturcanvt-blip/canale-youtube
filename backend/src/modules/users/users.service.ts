import { Injectable } from '@nestjs/common';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class UsersService {
  async getProfile(_userId: string) {
    // TODO: fetch User row via Prisma.
    return null;
  }

  async updateProfile(_userId: string, _dto: UpdateProfileDto) {
    // TODO: update User row via Prisma.
    return null;
  }

  async getStats(_userId: string) {
    // TODO: aggregate CompletedSession count and total practice minutes.
    return { totalMinutes: 0, sessionsCompleted: 0 };
  }

  async getFavorites(_userId: string) {
    // TODO: fetch Favorite rows joined with Practice.
    return [];
  }

  async deleteAccount(_userId: string) {
    // TODO: GDPR erasure — cascade-delete user data (or anonymize).
  }
}
