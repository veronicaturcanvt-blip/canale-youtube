import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/store/useAuthStore';
import { GradientButton } from '@/components/GradientButton';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { radii } from '@/theme/spacing';

export function PinLoginScreen() {
  const { t } = useTranslation();
  const loginWithPin = useAuthStore((s) => s.loginWithPin);
  const [pin, setPin] = useState('');

  return (
    <View style={styles.container}>
      <Text style={typography.display}>{t('auth.loginWithPin')}</Text>
      <TextInput
        style={styles.input}
        placeholder="PIN"
        placeholderTextColor={colors.textSecondary}
        keyboardType="number-pad"
        secureTextEntry
        maxLength={6}
        value={pin}
        onChangeText={setPin}
      />
      <GradientButton label={t('auth.login')} onPress={() => loginWithPin(pin)} style={styles.cta} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: colors.background, justifyContent: 'center' },
  input: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    padding: 14,
    marginTop: 14,
    textAlign: 'center',
    ...typography.h2,
    letterSpacing: 8,
  },
  cta: { marginTop: 24 },
});
