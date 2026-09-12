import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { GradientButton } from '@/components/GradientButton';
import { submitSupportMessage } from '@/services/api/support';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { radii } from '@/theme/spacing';

export function SupportScreen() {
  const { t } = useTranslation();
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSubmit = async () => {
    if (!message.trim()) {
      return;
    }
    setStatus('sending');
    try {
      // TODO: pass the real session token once auth token storage exists
      // on this client (see useAuthStore) — same gap as the other screens
      // that already call authenticated endpoints with a placeholder.
      await submitSupportMessage(message.trim(), '');
      setStatus('sent');
      setMessage('');
    } catch {
      setStatus('idle');
      Alert.alert(t('support.error'));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={typography.display}>{t('support.title')}</Text>
      <Text style={styles.subtitle}>{t('support.subtitle')}</Text>
      <TextInput
        style={styles.input}
        placeholder={t('support.placeholder')}
        placeholderTextColor={colors.textSecondary}
        multiline
        numberOfLines={6}
        value={message}
        onChangeText={setMessage}
      />
      {status === 'sent' ? (
        <Text style={styles.success}>{t('support.success')}</Text>
      ) : (
        <GradientButton
          label={t('support.submit')}
          onPress={handleSubmit}
          disabled={status === 'sending' || !message.trim()}
          style={styles.cta}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: colors.background },
  subtitle: { ...typography.body, color: colors.textSecondary, marginTop: 8, marginBottom: 20 },
  input: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    padding: 14,
    minHeight: 140,
    textAlignVertical: 'top',
    ...typography.body,
  },
  cta: { marginTop: 20 },
  success: {
    ...typography.bodyStrong,
    color: colors.primary,
    marginTop: 20,
    textAlign: 'center',
  },
});
