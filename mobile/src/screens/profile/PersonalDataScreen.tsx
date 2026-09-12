import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { radii } from '@/theme/spacing';

// TODO: load from GET /users/me, save via PATCH /users/me
export function PersonalDataScreen() {
  return (
    <View style={styles.container}>
      <Text style={typography.display}>Personal data</Text>
      <TextInput style={styles.input} placeholder="First name" placeholderTextColor={colors.textSecondary} />
      <TextInput style={styles.input} placeholder="Last name" placeholderTextColor={colors.textSecondary} />
      <TextInput style={styles.input} placeholder="Email" placeholderTextColor={colors.textSecondary} keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Birth date" placeholderTextColor={colors.textSecondary} />
      <TextInput style={styles.input} placeholder="Country" placeholderTextColor={colors.textSecondary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: colors.background },
  input: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    padding: 14,
    marginTop: 14,
    ...typography.body,
  },
});
