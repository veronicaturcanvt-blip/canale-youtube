import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { radii } from '@/theme/spacing';

interface Props {
  label: string;
  tone?: 'light' | 'onImage';
  color?: string;
}

export function Badge({ label, tone = 'light', color }: Props) {
  const backgroundColor = tone === 'onImage' ? 'rgba(255,255,255,0.92)' : (color ?? colors.surfaceAlt);
  return (
    <View style={[styles.badge, { backgroundColor }]}>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radii.pill,
    alignSelf: 'flex-start',
  },
  label: {
    ...typography.label,
    color: colors.textPrimary,
  },
});
