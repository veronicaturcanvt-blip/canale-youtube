import { Type } from 'class-transformer';
import { IsIn, IsOptional, IsString } from 'class-validator';

const PRACTICE_TYPES = ['yoga', 'pilates'] as const;
const EQUIPMENT = ['none', 'mat', 'reformer'] as const;
const DIFFICULTIES = ['beginner', 'intermediate', 'advanced'] as const;
const INTENSITIES = ['low', 'medium', 'high'] as const;
const DURATIONS = [5, 15, 30, 45] as const;

export class PracticeFiltersDto {
  @IsOptional()
  @IsIn(PRACTICE_TYPES)
  type?: (typeof PRACTICE_TYPES)[number];

  @IsOptional()
  @Type(() => Number)
  @IsIn(DURATIONS)
  durationMinutes?: (typeof DURATIONS)[number];

  @IsOptional()
  @IsIn(EQUIPMENT)
  equipment?: (typeof EQUIPMENT)[number];

  @IsOptional()
  @IsIn(DIFFICULTIES)
  difficulty?: (typeof DIFFICULTIES)[number];

  @IsOptional()
  @IsString()
  bodyFocus?: string;

  @IsOptional()
  @IsIn(INTENSITIES)
  intensity?: (typeof INTENSITIES)[number];
}
