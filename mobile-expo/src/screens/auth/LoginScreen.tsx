import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/store/useAuthStore';
import { GradientButton } from '@/components/GradientButton';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { radii } from '@/theme/spacing';

export function LoginScreen({ navigation }: any) {
  const { t } = useTranslation();
  const loginWithCredentials = useAuthStore((s) => s.loginWithCredentials);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Text style={typography.display}>{t('auth.login')}</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={colors.textSecondary}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={colors.textSecondary}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <GradientButton
        label={t('auth.login')}
        onPress={() => loginWithCredentials(email, password)}
        style={styles.cta}
      />
      <Pressable onPress={() => navigation.navigate('PinLogin')}>
        <Text style={styles.link}>{t('auth.loginWithPin')}</Text>
      </Pressable>
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
    ...typography.body,
  },
  cta: { marginTop: 24 },
  link: { textAlign: 'center', marginTop: 18, color: colors.secondaryDark, fontWeight: '600' },
});
