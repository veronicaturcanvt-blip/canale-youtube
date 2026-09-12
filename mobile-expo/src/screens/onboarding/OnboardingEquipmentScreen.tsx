import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useOnboardingStore } from '@/store/useOnboardingStore';
import { Equipment } from '@/types';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';

const EQUIPMENT_OPTIONS: Equipment[] = ['none', 'mat', 'reformer'];

export function OnboardingEquipmentScreen({ navigation }: any) {
  const { t } = useTranslation();
  const setEquipment = useOnboardingStore((s) => s.setEquipment);

  return (
    <View style={styles.container}>
      <Text style={typography.h1}>{t('onboarding.chooseEquipment')}</Text>
      {EQUIPMENT_OPTIONS.map((equipment) => (
        <Pressable
          key={equipment}
          style={styles.option}
          onPress={() => {
            setEquipment(equipment);
            navigation.navigate('Paywall');
          }}
        >
          <Text style={typography.body}>{equipment}</Text>
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
