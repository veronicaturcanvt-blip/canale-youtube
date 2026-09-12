import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { FilterBar } from '@/components/FilterBar';
import { PracticeCard } from '@/components/PracticeCard';
import { fetchPractices, PracticeFilters } from '@/services/api/practices';
import { Practice } from '@/types';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';

const TYPE_OPTIONS = ['yoga', 'pilates', 'stretching'];
const DIFFICULTY_OPTIONS = ['beginner', 'intermediate', 'advanced'];
const INTENSITY_OPTIONS = ['low', 'medium', 'high'];

const DIFFICULTY_COLORS: Record<string, string> = {
  beginner: colors.secondary,
  intermediate: colors.accent,
  advanced: colors.error,
};

export function SearchScreen({ navigation }: any) {
  const { t } = useTranslation();
  const [type, setType] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<string | null>(null);
  const [intensity, setIntensity] = useState<string | null>(null);
  const [results, setResults] = useState<Practice[]>([]);

  // Filters passed explicitly as overrides rather than read back from state,
  // since setType/setDifficulty/setIntensity haven't applied yet when this
  // runs right after them in the same event handler (stale closure).
  const runSearch = (overrides: Partial<PracticeFilters>) => {
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
        <FilterBar
          options={TYPE_OPTIONS}
          selected={type}
          size="lg"
          onSelect={(v) => {
            setType(v);
            runSearch({ type: (v as PracticeFilters['type']) ?? undefined });
          }}
        />
        <FilterBar
          options={DIFFICULTY_OPTIONS}
          selected={difficulty}
          colorMap={DIFFICULTY_COLORS}
          onSelect={(v) => {
            setDifficulty(v);
            runSearch({ difficulty: v ?? undefined });
          }}
        />
        <FilterBar
          options={INTENSITY_OPTIONS}
          selected={intensity}
          onSelect={(v) => {
            setIntensity(v);
            runSearch({ intensity: v ?? undefined });
          }}
        />
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
