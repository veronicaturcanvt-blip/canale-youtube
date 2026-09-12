import React from 'react';
import { ScrollView, Text, Pressable, StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';

interface Props {
  options: string[];
  selected: string | null;
  onSelect: (option: string | null) => void;
}

export function FilterBar({ options, selected, onSelect }: Props) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
      {options.map((option) => (
        <Pressable
          key={option}
          onPress={() => onSelect(selected === option ? null : option)}
          style={[styles.chip, selected === option && styles.chipActive]}
        >
          <Text style={selected === option ? styles.chipTextActive : styles.chipText}>
            {option}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', marginVertical: 8 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.surface,
    marginRight: 8,
  },
  chipActive: { backgroundColor: colors.primary },
  chipText: { color: colors.textPrimary },
  chipTextActive: { color: colors.surface, fontWeight: '600' },
});
