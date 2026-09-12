import React from 'react';
import { ScrollView, Text, Pressable, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, gradients } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { radii } from '@/theme/spacing';

interface Props {
  options: string[];
  selected: string | null;
  onSelect: (option: string | null) => void;
}

export function FilterBar({ options, selected, onSelect }: Props) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
      {options.map((option) => {
        const isActive = selected === option;
        return (
          <Pressable key={option} onPress={() => onSelect(isActive ? null : option)} style={styles.chipWrapper}>
            {isActive ? (
              <LinearGradient
                colors={gradients.primary}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.chip}
              >
                <Text style={styles.chipTextActive}>{option}</Text>
              </LinearGradient>
            ) : (
              <Text style={[styles.chip, styles.chipText]}>{option}</Text>
            )}
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', marginVertical: 8 },
  chipWrapper: { marginRight: 8 },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: radii.pill,
    backgroundColor: colors.surface,
    overflow: 'hidden',
    textTransform: 'capitalize',
  },
  chipText: {
    ...typography.caption,
    color: colors.textPrimary,
  },
  chipTextActive: {
    ...typography.caption,
    color: colors.textOnDark,
    textTransform: 'capitalize',
  },
});
