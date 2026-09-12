import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable, Share, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { apiRequest } from '@/services/api/client';
import { Achievement } from '@/types';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';

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
      <Text style={typography.h1}>{t('achievements.title')}</Text>
      <FlatList
        data={achievements}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={typography.body}>
              {item.title} · {item.streakDays}-day streak
            </Text>
            <Pressable onPress={() => Share.share({ message: item.title })}>
              <Text style={{ color: colors.primary }}>Share</Text>
            </Pressable>
          </View>
        )}
      />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
