import { Platform } from 'react-native';
import { apiRequest } from './client';
import { Practice, Equipment, PracticeType } from '@/types';

export interface PracticeFilters {
  type?: PracticeType;
  durationMinutes?: 5 | 15 | 30 | 45;
  equipment?: Equipment;
  difficulty?: string;
  bodyFocus?: string;
  intensity?: string;
}

export function fetchPractices(filters: PracticeFilters = {}) {
  // URLSearchParams stringifies `undefined` as the literal text "undefined"
  // instead of dropping the key, which then fails the backend's filter
  // validation (or, since it never matches a real value, silently zeroes
  // out results) — so only pass through keys that actually have a value.
  const definedEntries = Object.entries(filters).filter(([, value]) => value !== undefined);
  const query = new URLSearchParams(
    Object.fromEntries(definedEntries.map(([key, value]) => [key, String(value)])),
  ).toString();
  return apiRequest<Practice[]>(`/practices?${query}`);
}

export function fetchPracticeById(id: string) {
  // Tells the backend which DRM scheme to hand back (FairPlay vs Widevine)
  // for practices delivered through Mux — see VideoPlayer.
  return apiRequest<Practice>(`/practices/${id}?platform=${Platform.OS}`);
}
