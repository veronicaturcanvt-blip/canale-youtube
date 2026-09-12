import React from 'react';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, gradients } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { radii, shadow } from '@/theme/spacing';

interface Props {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'sunset';
  style?: ViewStyle;
  disabled?: boolean;
}

export function GradientButton({ label, onPress, variant = 'primary', style, disabled }: Props) {
  const colorsForVariant = variant === 'sunset' ? gradients.sunset : gradients.primary;

  return (
    <Pressable onPress={onPress} disabled={disabled} style={[styles.wrapper, style, disabled && styles.disabled]}>
      <LinearGradient
        colors={colorsForVariant}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <Text style={styles.label}>{label}</Text>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: radii.lg,
    ...shadow.button,
  },
  disabled: {
    opacity: 0.5,
  },
  gradient: {
    borderRadius: radii.lg,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    ...typography.bodyStrong,
    color: colors.textOnDark,
  },
});
