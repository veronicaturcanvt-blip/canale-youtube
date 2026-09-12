import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useOnboardingStore } from '@/store/useOnboardingStore';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';

const DURATIONS = [5, 15, 30, 45] as const;

export function OnboardingTimeScreen({ navigation }: any) {
  const { t } = useTranslation();
  const setDuration = useOnboardingStore((s) => s.setDuration);

  return (
    <View style={styles.container}>
      <Text style={typography.h1}>{t('onboarding.chooseTime')}</Text>
      {DURATIONS.map((minutes) => (
        <Pressable
          key={minutes}
          style={styles.option}
          onPress={() => {
            setDuration(minutes);
            navigation.navigate('OnboardingEquipment');
          }}
        >
          <Text style={typography.body}>{minutes} min</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: colors.background },
  option: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
  },
});
