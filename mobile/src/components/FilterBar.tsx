import React from 'react';
import { ScrollView, Text, Pressable, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors, gradients } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { radii } from '@/theme/spacing';

interface Props {
  options: string[];
  selected: string | null;
  onSelect: (option: string | null) => void;
  size?: 'md' | 'lg';
  // Per-option solid color for the active state, e.g. difficulty levels
  // (beginner/intermediate/advanced) each get their own color instead of
  // the default gradient.
  colorMap?: Record<string, string>;
}

export function FilterBar({ options, selected, onSelect, size = 'md', colorMap }: Props) {
  const chipStyle = size === 'lg' ? styles.chipLg : styles.chip;
  const textStyle = size === 'lg' ? styles.chipTextLg : styles.chipText;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {options.map((option) => {
        const isActive = selected === option;
        const solidColor = colorMap?.[option];
        return (
          <Pressable key={option} onPress={() => onSelect(isActive ? null : option)} style={styles.chipWrapper}>
            {isActive && solidColor ? (
              <View style={[chipStyle, { backgroundColor: solidColor }]}>
                <Text style={[textStyle, styles.chipTextActive]}>{option}</Text>
              </View>
            ) : isActive ? (
              <LinearGradient
                colors={[...gradients.primary]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={chipStyle}
              >
                <Text style={[textStyle, styles.chipTextActive]}>{option}</Text>
              </LinearGradient>
            ) : (
              <Text style={[chipStyle, textStyle]}>{option}</Text>
            )}
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 0, marginVertical: 8 },
  content: { flexDirection: 'row', alignItems: 'center' },
  chipWrapper: { marginRight: 8 },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: radii.pill,
    backgroundColor: colors.surface,
    overflow: 'hidden',
    textTransform: 'capitalize',
  },
  chipLg: {
    paddingHorizontal: 22,
    paddingVertical: 13,
    borderRadius: radii.pill,
    backgroundColor: colors.surface,
    overflow: 'hidden',
    textTransform: 'capitalize',
  },
  chipText: {
    ...typography.caption,
    color: colors.textPrimary,
  },
  chipTextLg: {
    ...typography.bodyStrong,
    color: colors.textPrimary,
  },
  chipTextActive: {
    color: colors.textOnDark,
    textTransform: 'capitalize',
  },
});
