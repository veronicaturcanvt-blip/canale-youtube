export type Equipment = 'none' | 'mat' | 'kettlebells' | 'resistance_bands';

export type PracticeType = 'yoga' | 'pilates' | 'stretching';

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export interface Practice {
  id: string;
  title: string;
  type: PracticeType;
  durationMinutes: 5 | 15 | 30 | 45;
  equipment: Equipment;
  difficulty: DifficultyLevel;
  bodyFocus: string[];
  intensity: 'low' | 'medium' | 'high';
  videoUrl: string;
  thumbnailUrl: string;
  isCompleted?: boolean;
}

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  country: string;
}

export interface SubscriptionInfo {
  plan: 'annual';
  startedAt: string;
  expiresAt: string;
  price: number;
  currency: string;
  isPaused: boolean;
  trialEndsAt?: string;
}

export interface Achievement {
  id: string;
  title: string;
  streakDays: number;
  unlockedAt?: string;
}
