import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTranslation } from 'react-i18next';
import { GradientButton } from '@/components/GradientButton';
import { colors, gradients } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { radii } from '@/theme/spacing';

// TODO: wire up to Stripe / App Store / Google Play billing SDK.
// Annual plan framed as "2 months free"; renewal year 2+ gets a 30% discount.
export function PaywallScreen({ navigation }: any) {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <LinearGradient colors={[...gradients.hero]} style={styles.hero}>
        <Text style={styles.heroTitle}>{t('paywall.title')}</Text>
        <View style={styles.trialPill}>
          <Text style={styles.trialText}>{t('paywall.trial')}</Text>
        </View>
      </LinearGradient>

      <View style={styles.body}>
        <View style={styles.benefitRow}>
          <View style={[styles.bullet, { backgroundColor: colors.primary }]} />
          <Text style={typography.body}>Unlimited practices</Text>
        </View>
        <View style={styles.benefitRow}>
          <View style={[styles.bullet, { backgroundColor: colors.secondary }]} />
          <Text style={typography.body}>All difficulty levels</Text>
        </View>

        <GradientButton
          label="Start free trial"
          variant="sunset"
          onPress={() => navigation.navigate('Main')}
          style={styles.cta}
        />

        <Pressable onPress={() => {/* TODO: restore purchases */}}>
          <Text style={styles.restore}>{t('paywall.restore')}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  hero: {
    paddingTop: 72,
    paddingBottom: 40,
    paddingHorizontal: 24,
    borderBottomLeftRadius: radii.lg,
    borderBottomRightRadius: radii.lg,
  },
  heroTitle: {
    ...typography.display,
    color: colors.textOnDark,
  },
  trialPill: {
    marginTop: 12,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: radii.pill,
  },
  trialText: {
    ...typography.caption,
    color: colors.textOnDark,
  },
  body: { flex: 1, padding: 24, justifyContent: 'center' },
  benefitRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  bullet: { width: 10, height: 10, borderRadius: 5, marginRight: 12 },
  cta: { marginTop: 24 },
  restore: { textAlign: 'center', marginTop: 16, color: colors.textSecondary },
});
