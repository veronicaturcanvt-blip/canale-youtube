import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useOnboardingStore } from '@/store/useOnboardingStore';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { radii, shadow } from '@/theme/spacing';

const DURATIONS = [
  { minutes: 5, emoji: '⚡', color: colors.coral },
  { minutes: 15, emoji: '🌿', color: colors.primary },
  { minutes: 30, emoji: '🌊', color: colors.secondary },
  { minutes: 45, emoji: '🔥', color: colors.accent },
] as const;

export function OnboardingTimeScreen({ navigation }: any) {
  const { t } = useTranslation();
  const setDuration = useOnboardingStore((s) => s.setDuration);

  return (
    <View style={styles.container}>
      <Text style={typography.display}>{t('onboarding.chooseTime')}</Text>
      {DURATIONS.map(({ minutes, emoji, color }) => (
        <Pressable
          key={minutes}
          style={styles.option}
          onPress={() => {
            setDuration(minutes);
            navigation.navigate('OnboardingEquipment');
          }}
        >
          <View style={[styles.iconCircle, { backgroundColor: color }]}>
            <Text style={styles.icon}>{emoji}</Text>
          </View>
          <Text style={typography.bodyStrong}>{minutes} min</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: colors.background },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: 14,
    marginTop: 14,
    ...shadow.card,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  icon: { fontSize: 20 },
});
