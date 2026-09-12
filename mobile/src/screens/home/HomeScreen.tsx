import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { PracticeCard } from '@/components/PracticeCard';
import { fetchPractices } from '@/services/api/practices';
import { useOnboardingStore } from '@/store/useOnboardingStore';
import { Practice } from '@/types';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';

export function HomeScreen({ navigation }: any) {
  const { t } = useTranslation();
  const { durationMinutes, equipment } = useOnboardingStore();
  const [practices, setPractices] = useState<Practice[]>([]);

  useEffect(() => {
    fetchPractices({
      durationMinutes: durationMinutes ?? undefined,
      equipment: equipment ?? undefined,
    })
      .then(setPractices)
      .catch(() => setPractices([]));
  }, [durationMinutes, equipment]);

  return (
    <View style={styles.container}>
      <Text style={[typography.display, styles.title]}>{t('home.title')}</Text>
      <FlatList
        data={practices}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <PracticeCard
            practice={item}
            onPress={(practice) => navigation.navigate('PracticePlayer', { id: practice.id })}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  title: { paddingHorizontal: 24, paddingTop: 24, paddingBottom: 8 },
  list: { paddingHorizontal: 24, paddingBottom: 24 },
});
