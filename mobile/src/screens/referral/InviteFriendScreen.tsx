import React, { useEffect, useState } from 'react';
import { View, Text, Share, Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { apiRequest } from '@/services/api/client';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';

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
      <Text style={typography.h1}>{t('referral.title')}</Text>
      <Text style={typography.body}>{t('referral.reward')}</Text>
      <Text style={styles.link}>{referralLink}</Text>
      <Pressable
        style={styles.cta}
        onPress={() => Share.share({ message: referralLink })}
      >
        <Text style={{ color: colors.surface }}>Share</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: colors.background },
  link: { ...typography.body, marginTop: 16, color: colors.primary },
  cta: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
  },
});
