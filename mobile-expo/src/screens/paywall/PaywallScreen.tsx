import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';

// TODO: wire up to Stripe / App Store / Google Play billing SDK.
// Annual plan framed as "2 months free"; renewal year 2+ gets a 30% discount.
export function PaywallScreen({ navigation }: any) {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={typography.h1}>{t('paywall.title')}</Text>
      <Text style={styles.trial}>{t('paywall.trial')}</Text>

      <View style={styles.benefits}>
        <Text style={typography.body}>• Unlimited practices</Text>
        <Text style={typography.body}>• All difficulty levels</Text>
      </View>

      <Pressable style={styles.cta} onPress={() => navigation.navigate('Main')}>
        <Text style={styles.ctaText}>Start free trial</Text>
      </Pressable>

      <Pressable onPress={() => {/* TODO: restore purchases */}}>
        <Text style={styles.restore}>{t('paywall.restore')}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: colors.background, justifyContent: 'center' },
  trial: { ...typography.body, color: colors.accent, marginTop: 8 },
  benefits: { marginVertical: 24 },
  cta: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  ctaText: { color: colors.surface, fontWeight: '700' },
  restore: { textAlign: 'center', marginTop: 16, color: colors.textSecondary },
});
