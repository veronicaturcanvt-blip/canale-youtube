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
      <Text style={typography.h1}>{t('home.title')}</Text>
      <FlatList
        data={practices}
        keyExtractor={(item) => item.id}
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
  container: { flex: 1, padding: 24, backgroundColor: colors.background },
});
