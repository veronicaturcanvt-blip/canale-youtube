import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import { Practice } from '@/types';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';

interface Props {
  practice: Practice;
  onPress: (practice: Practice) => void;
}

export function PracticeCard({ practice, onPress }: Props) {
  return (
    <Pressable
      onPress={() => onPress(practice)}
      style={[styles.card, practice.isCompleted && styles.cardCompleted]}
    >
      <Text style={styles.title}>{practice.title}</Text>
      <Text style={styles.meta}>
        {practice.durationMinutes} min · {practice.type} · {practice.difficulty}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  cardCompleted: {
    backgroundColor: colors.completed,
  },
  title: {
    ...typography.h2,
    color: colors.textPrimary,
  },
  meta: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 4,
  },
});
