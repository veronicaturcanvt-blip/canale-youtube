export class PracticeFiltersDto {
  type?: 'yoga' | 'pilates';
  durationMinutes?: string;
  equipment?: 'none' | 'mat' | 'reformer';
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  bodyFocus?: string;
  intensity?: 'low' | 'medium' | 'high';
}
