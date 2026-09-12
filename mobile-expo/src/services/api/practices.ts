import { apiRequest } from './client';
import { Practice, Equipment } from '@/types';

export interface PracticeFilters {
  type?: 'yoga' | 'pilates';
  durationMinutes?: 5 | 15 | 30 | 45;
  equipment?: Equipment;
  difficulty?: string;
  bodyFocus?: string;
  intensity?: string;
}

export function fetchPractices(filters: PracticeFilters = {}) {
  const query = new URLSearchParams(filters as Record<string, string>).toString();
  return apiRequest<Practice[]>(`/practices?${query}`);
}

export function fetchPracticeById(id: string) {
  return apiRequest<Practice>(`/practices/${id}`);
}
