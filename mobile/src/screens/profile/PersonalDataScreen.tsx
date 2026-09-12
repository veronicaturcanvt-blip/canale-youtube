import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';

// TODO: load from GET /users/me, save via PATCH /users/me
export function PersonalDataScreen() {
  return (
    <View style={styles.container}>
      <Text style={typography.h1}>Personal data</Text>
      <TextInput style={styles.input} placeholder="First name" />
      <TextInput style={styles.input} placeholder="Last name" />
      <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Birth date" />
      <TextInput style={styles.input} placeholder="Country" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: colors.background },
  input: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
  },
});
