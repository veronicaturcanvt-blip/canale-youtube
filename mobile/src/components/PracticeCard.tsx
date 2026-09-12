import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Practice } from '@/types';
import { colors, gradients } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { radii, shadow } from '@/theme/spacing';
import { Badge } from './Badge';

interface Props {
  practice: Practice;
  onPress: (practice: Practice) => void;
}

const DIFFICULTY_COLOR: Record<string, string> = {
  beginner: colors.beginner,
  intermediate: colors.intermediate,
  advanced: colors.advanced,
};

export function PracticeCard({ practice, onPress }: Props) {
  return (
    <Pressable onPress={() => onPress(practice)} style={styles.card}>
      <View style={styles.imageWrapper}>
        <Image source={{ uri: practice.thumbnailUrl }} style={styles.image} />
        <LinearGradient colors={[...gradients.cardOverlay]} style={StyleSheet.absoluteFill} />
        <View style={styles.topBadges}>
          <Badge label={`${practice.durationMinutes} min`} tone="onImage" />
          {practice.isCompleted ? (
            <View style={styles.completedPill}>
              <Text style={styles.completedText}>✓ Done</Text>
            </View>
          ) : (
            <Badge label={practice.difficulty} tone="onImage" />
          )}
        </View>
        <Text style={styles.imageTitle} numberOfLines={2}>
          {practice.title}
        </Text>
      </View>
      <View style={styles.footer}>
        <View
          style={[
            styles.dot,
            { backgroundColor: DIFFICULTY_COLOR[practice.difficulty] ?? colors.primary },
          ]}
        />
        <Text style={styles.meta}>
          {practice.type} · {practice.equipment}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    marginBottom: 16,
    overflow: 'hidden',
    ...shadow.card,
  },
  imageWrapper: {
    height: 140,
    justifyContent: 'flex-end',
    backgroundColor: colors.surfaceAlt,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  topBadges: {
    position: 'absolute',
    top: 12,
    left: 12,
    right: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  completedPill: {
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radii.pill,
  },
  completedText: {
    ...typography.label,
    color: colors.textOnDark,
  },
  imageTitle: {
    ...typography.h2,
    color: colors.textOnDark,
    padding: 14,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  meta: {
    ...typography.caption,
    color: colors.textSecondary,
    textTransform: 'capitalize',
  },
});
