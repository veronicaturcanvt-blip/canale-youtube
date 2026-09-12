import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return toPublicProfile(user);
  }

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    if (dto.email) {
      const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
      if (existing && existing.id !== userId) {
        throw new ConflictException('Email is already in use');
      }
    }

    const user = await this.prisma.user.update({
      where: { id: userId },
      data: {
        ...(dto.firstName !== undefined && { firstName: dto.firstName }),
        ...(dto.lastName !== undefined && { lastName: dto.lastName }),
        ...(dto.email !== undefined && { email: dto.email }),
        ...(dto.birthDate !== undefined && { birthDate: new Date(dto.birthDate) }),
        ...(dto.country !== undefined && { country: dto.country }),
      },
    });

    return toPublicProfile(user);
  }

  async getStats(_userId: string) {
    // TODO: aggregate CompletedSession count and total practice minutes.
    return { totalMinutes: 0, sessionsCompleted: 0 };
  }

  async getFavorites(_userId: string) {
    // TODO: fetch Favorite rows joined with Practice.
    return [];
  }

  async deleteAccount(userId: string) {
    // GDPR erasure: remove all rows referencing this user before the user
    // row itself, since none of these relations cascade at the DB level.
    await this.prisma.$transaction([
      this.prisma.favorite.deleteMany({ where: { userId } }),
      this.prisma.completedSession.deleteMany({ where: { userId } }),
      this.prisma.userAchievement.deleteMany({ where: { userId } }),
      this.prisma.deviceToken.deleteMany({ where: { userId } }),
      this.prisma.referralCode.deleteMany({ where: { userId } }),
      this.prisma.referral.deleteMany({
        where: { OR: [{ referrerId: userId }, { referredId: userId }] },
      }),
      this.prisma.subscription.deleteMany({ where: { userId } }),
      this.prisma.user.delete({ where: { id: userId } }),
    ]);
  }
}

function toPublicProfile(user: User) {
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    birthDate: user.birthDate,
    country: user.country,
    createdAt: user.createdAt,
  };
}
