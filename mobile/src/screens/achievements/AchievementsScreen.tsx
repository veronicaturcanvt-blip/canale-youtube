import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable, Share, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { apiRequest } from '@/services/api/client';
import { Achievement } from '@/types';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { radii, shadow } from '@/theme/spacing';

// TODO: fetch from GET /achievements/me
export function AchievementsScreen() {
  const { t } = useTranslation();
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    apiRequest<Achievement[]>('/achievements/me')
      .then(setAchievements)
      .catch(() => setAchievements([]));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={[typography.display, styles.title]}>{t('achievements.title')}</Text>
      <FlatList
        data={achievements}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={styles.badgeCircle}>
              <Text style={styles.badgeEmoji}>🏅</Text>
            </View>
            <View style={styles.info}>
              <Text style={typography.bodyStrong}>{item.title}</Text>
              <Text style={styles.streak}>{item.streakDays}-day streak</Text>
            </View>
            <Pressable onPress={() => Share.share({ message: item.title })}>
              <Text style={styles.share}>Share</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  title: { paddingHorizontal: 24, paddingTop: 24, paddingBottom: 8 },
  list: { paddingHorizontal: 24, paddingBottom: 24 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: 14,
    marginTop: 12,
    ...shadow.card,
  },
  badgeCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.accentLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  badgeEmoji: { fontSize: 20 },
  info: { flex: 1 },
  streak: { ...typography.caption, color: colors.textSecondary, marginTop: 2 },
  share: { ...typography.caption, color: colors.secondaryDark },
});
