import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { radii, shadow } from '@/theme/spacing';

// TODO: fetch aggregated stats (total minutes, sessions count) from GET /users/me/stats
export function StatsScreen() {
  return (
    <View style={styles.container}>
      <Text style={typography.display}>Statistics</Text>
      <View style={styles.row}>
        <View style={[styles.tile, { backgroundColor: colors.primary }]}>
          <Text style={styles.tileValue}>—</Text>
          <Text style={styles.tileLabel}>Total time</Text>
        </View>
        <View style={[styles.tile, { backgroundColor: colors.secondary }]}>
          <Text style={styles.tileValue}>—</Text>
          <Text style={styles.tileLabel}>Sessions</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: colors.background },
  row: { flexDirection: 'row', gap: 12, marginTop: 20 },
  tile: {
    flex: 1,
    borderRadius: radii.lg,
    padding: 20,
    ...shadow.card,
  },
  tileValue: { ...typography.display, color: colors.textOnDark },
  tileLabel: { ...typography.caption, color: colors.textOnDark, marginTop: 4 },
});
