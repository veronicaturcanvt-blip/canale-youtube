import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useOnboardingStore } from '@/store/useOnboardingStore';
import { Equipment } from '@/types';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { radii, shadow } from '@/theme/spacing';

const EQUIPMENT_OPTIONS: { value: Equipment; emoji: string; color: string }[] = [
  { value: 'none', emoji: '🧘', color: colors.coral },
  { value: 'mat', emoji: '🟩', color: colors.primary },
  { value: 'reformer', emoji: '⚙️', color: colors.secondary },
];

export function OnboardingEquipmentScreen({ navigation }: any) {
  const { t } = useTranslation();
  const setEquipment = useOnboardingStore((s) => s.setEquipment);

  return (
    <View style={styles.container}>
      <Text style={typography.display}>{t('onboarding.chooseEquipment')}</Text>
      {EQUIPMENT_OPTIONS.map(({ value, emoji, color }) => (
        <Pressable
          key={value}
          style={styles.option}
          onPress={() => {
            setEquipment(value);
            navigation.navigate('Paywall');
          }}
        >
          <View style={[styles.iconCircle, { backgroundColor: color }]}>
            <Text style={styles.icon}>{emoji}</Text>
          </View>
          <Text style={[typography.bodyStrong, styles.label]}>{value}</Text>
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
  label: { textTransform: 'capitalize' },
});
