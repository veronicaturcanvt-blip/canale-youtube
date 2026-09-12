import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/store/useAuthStore';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';

const MENU_ITEMS = [
  { key: 'Stats', labelKey: 'profile.stats' },
  { key: 'Favorites', labelKey: 'profile.favorites' },
  { key: 'SubscriptionDetails', labelKey: 'profile.subscription' },
  { key: 'PersonalData', labelKey: 'profile.personalData' },
] as const;

export function ProfileScreen({ navigation }: any) {
  const { t } = useTranslation();
  const logout = useAuthStore((s) => s.logout);

  return (
    <View style={styles.container}>
      <Text style={typography.h1}>{t('profile.title')}</Text>
      {MENU_ITEMS.map((item) => (
        <Pressable key={item.key} style={styles.row} onPress={() => navigation.navigate(item.key)}>
          <Text style={typography.body}>{t(item.labelKey)}</Text>
        </Pressable>
      ))}
      <Pressable style={styles.row} onPress={logout}>
        <Text style={[typography.body, { color: colors.error }]}>{t('profile.logout')}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: colors.background },
  row: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
  },
});
