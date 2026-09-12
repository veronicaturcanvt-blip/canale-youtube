import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';

// TODO: fetch aggregated stats (total minutes, sessions count) from GET /users/me/stats
export function StatsScreen() {
  return (
    <View style={styles.container}>
      <Text style={typography.h1}>Statistics</Text>
      <Text style={typography.body}>Total time: —</Text>
      <Text style={typography.body}>Sessions completed: —</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: colors.background },
});
