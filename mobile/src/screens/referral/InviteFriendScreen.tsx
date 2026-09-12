import React, { useEffect, useState } from 'react';
import { View, Text, Share, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTranslation } from 'react-i18next';
import { apiRequest } from '@/services/api/client';
import { GradientButton } from '@/components/GradientButton';
import { colors, gradients } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { radii } from '@/theme/spacing';

// TODO: fetch the user's personal referral link from GET /referrals/me
export function InviteFriendScreen() {
  const { t } = useTranslation();
  const [referralLink, setReferralLink] = useState('');

  useEffect(() => {
    apiRequest<{ link: string }>('/referrals/me')
      .then((res) => setReferralLink(res.link))
      .catch(() => setReferralLink(''));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={typography.display}>{t('referral.title')}</Text>
      <LinearGradient colors={[...gradients.sunset]} style={styles.card}>
        <Text style={styles.emoji}>🎁</Text>
        <Text style={styles.reward}>{t('referral.reward')}</Text>
      </LinearGradient>
      <Text style={styles.link}>{referralLink}</Text>
      <GradientButton label="Share" onPress={() => Share.share({ message: referralLink })} style={styles.cta} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: colors.background },
  card: { borderRadius: radii.lg, padding: 20, marginTop: 20, alignItems: 'center' },
  emoji: { fontSize: 36, marginBottom: 8 },
  reward: { ...typography.bodyStrong, color: colors.textOnDark, textAlign: 'center' },
  link: { ...typography.body, marginTop: 16, color: colors.secondaryDark, textAlign: 'center' },
  cta: { marginTop: 24 },
});
