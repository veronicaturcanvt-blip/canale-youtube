import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { FilterBar } from '@/components/FilterBar';
import { PracticeCard } from '@/components/PracticeCard';
import { fetchPractices, PracticeFilters } from '@/services/api/practices';
import { Practice } from '@/types';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';

const TYPE_OPTIONS = ['yoga', 'pilates'];
const DIFFICULTY_OPTIONS = ['beginner', 'intermediate', 'advanced'];
const INTENSITY_OPTIONS = ['low', 'medium', 'high'];

export function SearchScreen({ navigation }: any) {
  const { t } = useTranslation();
  const [type, setType] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<string | null>(null);
  const [intensity, setIntensity] = useState<string | null>(null);
  const [results, setResults] = useState<Practice[]>([]);

  const runSearch = (overrides: Partial<PracticeFilters> = {}) => {
    fetchPractices({
      type: (type as PracticeFilters['type']) ?? undefined,
      difficulty: difficulty ?? undefined,
      intensity: intensity ?? undefined,
      ...overrides,
    })
      .then(setResults)
      .catch(() => setResults([]));
  };

  return (
    <View style={styles.container}>
      <Text style={[typography.display, styles.title]}>{t('search.title')}</Text>
      <View style={styles.filters}>
        <FilterBar options={TYPE_OPTIONS} selected={type} onSelect={(v) => { setType(v); runSearch(); }} />
        <FilterBar options={DIFFICULTY_OPTIONS} selected={difficulty} onSelect={(v) => { setDifficulty(v); runSearch(); }} />
        <FilterBar options={INTENSITY_OPTIONS} selected={intensity} onSelect={(v) => { setIntensity(v); runSearch(); }} />
      </View>
      <FlatList
        data={results}
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
  title: { paddingHorizontal: 24, paddingTop: 24 },
  filters: { paddingHorizontal: 24 },
  list: { paddingHorizontal: 24, paddingBottom: 24 },
});
