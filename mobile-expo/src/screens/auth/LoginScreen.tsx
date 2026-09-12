import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/store/useAuthStore';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';

export function LoginScreen({ navigation }: any) {
  const { t } = useTranslation();
  const loginWithCredentials = useAuthStore((s) => s.loginWithCredentials);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Text style={typography.h1}>{t('auth.login')}</Text>
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Pressable style={styles.cta} onPress={() => loginWithCredentials(email, password)}>
        <Text style={{ color: colors.surface }}>{t('auth.login')}</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('PinLogin')}>
        <Text style={styles.link}>{t('auth.loginWithPin')}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: colors.background, justifyContent: 'center' },
  input: { backgroundColor: colors.surface, borderRadius: 8, padding: 12, marginTop: 12 },
  cta: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  link: { textAlign: 'center', marginTop: 16, color: colors.textSecondary },
});
