export const colors = {
  // Sage (primary)
  primary: '#4F9D5C',
  primaryDark: '#2E7D42',
  primaryLight: '#8FD19E',
  // Aqua (secondary)
  secondary: '#1FB8AA',
  secondaryDark: '#0F8C82',
  secondaryLight: '#7EE8DA',
  // Mustard (accent)
  accent: '#F5A623',
  accentDark: '#D9820A',
  accentLight: '#FFCB6B',
  // Coral — one energetic highlight color, used sparingly (badges, CTAs)
  coral: '#FF6B5B',
  coralLight: '#FFA396',

  background: '#FBF8F2',
  surface: '#FFFFFF',
  surfaceAlt: '#F1EEE4',
  textPrimary: '#1F2A1F',
  textSecondary: '#6B7280',
  textOnDark: '#FFFFFF',
  completed: '#E5E1D8',
  error: '#E5484D',

  // Difficulty badge colors
  beginner: '#4F9D5C',
  intermediate: '#F5A623',
  advanced: '#FF6B5B',
};

export const gradients = {
  primary: ['#4F9D5C', '#1FB8AA'] as const,
  sunset: ['#F5A623', '#FF6B5B'] as const,
  hero: ['#2E7D42', '#0F8C82'] as const,
  cardOverlay: ['rgba(20,30,20,0)', 'rgba(15,25,15,0.75)'] as const,
};
