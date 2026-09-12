import { Injectable, NotFoundException } from '@nestjs/common';
import { DifficultyLevel, Equipment, Intensity, Practice, PracticeType, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { VideoService } from '../video/video.service';
import { PracticeFiltersDto } from './dto/practice-filters.dto';
import { fromEnum, toEnum } from './practice-mappers';

@Injectable()
export class PracticesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly videoService: VideoService,
  ) {}

  async findAll(filters: PracticeFiltersDto, userId: string) {
    const practices = await this.prisma.practice.findMany({
      where: buildWhere(filters),
      orderBy: { createdAt: 'asc' },
    });

    const completedIds = await this.getCompletedPracticeIds(userId);
    return practices.map((practice) => toPublicPractice(practice, completedIds.has(practice.id)));
  }

  async findById(id: string, userId: string, platform?: 'ios' | 'android') {
    const practice = await this.prisma.practice.findUnique({ where: { id } });
    if (!practice) {
      throw new NotFoundException('Practice not found');
    }

    const [isCompleted, playback] = await Promise.all([
      this.prisma.completedSession.findFirst({ where: { userId, practiceId: id } }),
      this.videoService.resolveForPlayback(practice, platform),
    ]);

    return { ...toPublicPractice(practice, isCompleted !== null), ...playback };
  }

  async markCompleted(userId: string, practiceId: string) {
    const practice = await this.prisma.practice.findUnique({ where: { id: practiceId } });
    if (!practice) {
      throw new NotFoundException('Practice not found');
    }

    await this.prisma.completedSession.create({ data: { userId, practiceId } });
    return { completed: true };
  }

  private async getCompletedPracticeIds(userId: string): Promise<Set<string>> {
    const rows = await this.prisma.completedSession.findMany({
      where: { userId },
      select: { practiceId: true },
      distinct: ['practiceId'],
    });
    return new Set(rows.map((row) => row.practiceId));
  }
}

function buildWhere(filters: PracticeFiltersDto): Prisma.PracticeWhereInput {
  return {
    ...(filters.type && { type: toEnum<PracticeType>(filters.type) }),
    ...(filters.durationMinutes && { durationMinutes: filters.durationMinutes }),
    ...(filters.equipment && { equipment: toEnum<Equipment>(filters.equipment) }),
    ...(filters.difficulty && { difficulty: toEnum<DifficultyLevel>(filters.difficulty) }),
    ...(filters.intensity && { intensity: toEnum<Intensity>(filters.intensity) }),
    ...(filters.bodyFocus && { bodyFocus: { has: filters.bodyFocus } }),
  };
}

function toPublicPractice(practice: Practice, isCompleted: boolean) {
  return {
    id: practice.id,
    title: practice.title,
    type: fromEnum(practice.type),
    durationMinutes: practice.durationMinutes,
    equipment: fromEnum(practice.equipment),
    difficulty: fromEnum(practice.difficulty),
    bodyFocus: practice.bodyFocus,
    intensity: fromEnum(practice.intensity),
    videoUrl: practice.videoUrl,
    thumbnailUrl: practice.thumbnailUrl,
    isCompleted,
  };
}
