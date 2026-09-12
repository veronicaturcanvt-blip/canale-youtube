import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/store/useAuthStore';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';

export function PinLoginScreen() {
  const { t } = useTranslation();
  const loginWithPin = useAuthStore((s) => s.loginWithPin);
  const [pin, setPin] = useState('');

  return (
    <View style={styles.container}>
      <Text style={typography.h1}>{t('auth.loginWithPin')}</Text>
      <TextInput
        style={styles.input}
        placeholder="PIN"
        keyboardType="number-pad"
        secureTextEntry
        maxLength={6}
        value={pin}
        onChangeText={setPin}
      />
      <Pressable style={styles.cta} onPress={() => loginWithPin(pin)}>
        <Text style={{ color: colors.surface }}>{t('auth.login')}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: colors.background, justifyContent: 'center' },
  input: { backgroundColor: colors.surface, borderRadius: 8, padding: 12, marginTop: 12, textAlign: 'center' },
  cta: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
  },
});
