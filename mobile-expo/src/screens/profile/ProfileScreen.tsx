import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/store/useAuthStore';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { radii, shadow } from '@/theme/spacing';

const MENU_ITEMS = [
  { key: 'Stats', labelKey: 'profile.stats', emoji: '📊', color: colors.primary },
  { key: 'Favorites', labelKey: 'profile.favorites', emoji: '❤️', color: colors.coral },
  { key: 'SubscriptionDetails', labelKey: 'profile.subscription', emoji: '💳', color: colors.secondary },
  { key: 'PersonalData', labelKey: 'profile.personalData', emoji: '👤', color: colors.accent },
  { key: 'Support', labelKey: 'profile.support', emoji: '💬', color: colors.secondaryDark },
] as const;

export function ProfileScreen({ navigation }: any) {
  const { t } = useTranslation();
  const logout = useAuthStore((s) => s.logout);

  return (
    <View style={styles.container}>
      <Text style={[typography.display, styles.title]}>{t('profile.title')}</Text>
      <Text style={styles.sectionLabel}>{t('profile.language')}</Text>
      <LanguageSwitcher />
      {MENU_ITEMS.map((item) => (
        <Pressable key={item.key} style={styles.row} onPress={() => navigation.navigate(item.key)}>
          <View style={[styles.iconCircle, { backgroundColor: item.color }]}>
            <Text style={styles.icon}>{item.emoji}</Text>
          </View>
          <Text style={typography.bodyStrong}>{t(item.labelKey)}</Text>
        </Pressable>
      ))}
      <Pressable style={[styles.row, styles.logoutRow]} onPress={logout}>
        <View style={[styles.iconCircle, { backgroundColor: colors.error }]}>
          <Text style={styles.icon}>🚪</Text>
        </View>
        <Text style={[typography.bodyStrong, { color: colors.error }]}>{t('profile.logout')}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: colors.background },
  title: { marginBottom: 16 },
  sectionLabel: {
    ...typography.label,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: 14,
    marginTop: 12,
    ...shadow.card,
  },
  logoutRow: { marginTop: 24 },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  icon: { fontSize: 18 },
});
