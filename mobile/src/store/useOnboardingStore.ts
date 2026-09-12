import { create } from 'zustand';
import { Equipment } from '@/types';

interface OnboardingState {
  durationMinutes: 5 | 15 | 30 | 45 | null;
  equipment: Equipment | null;
  setDuration: (minutes: 5 | 15 | 30 | 45) => void;
  setEquipment: (equipment: Equipment) => void;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  durationMinutes: null,
  equipment: null,
  setDuration: (minutes) => set({ durationMinutes: minutes }),
  setEquipment: (equipment) => set({ equipment }),
}));
