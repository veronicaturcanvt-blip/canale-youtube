import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { VideoPlayer } from '@/components/VideoPlayer';
import { Badge } from '@/components/Badge';
import { fetchPracticeById } from '@/services/api/practices';
import { Practice } from '@/types';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';

export function PracticePlayerScreen({ route }: any) {
  const { id } = route.params;
  const [practice, setPractice] = useState<Practice | null>(null);

  useEffect(() => {
    fetchPracticeById(id).then(setPractice).catch(() => setPractice(null));
  }, [id]);

  if (!practice) {
    return (
      <View style={styles.container}>
        <Text style={typography.body}>Loading…</Text>
      </View>
    );
  }

  if (!practice.videoUrl) {
    return (
      <View style={styles.container}>
        <Text style={typography.body}>This practice isn't ready to stream yet.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <VideoPlayer streamUrl={practice.videoUrl} drm={practice.drm} />
      <View style={styles.info}>
        <Text style={typography.h1}>{practice.title}</Text>
        <View style={styles.badges}>
          <Badge label={`${practice.durationMinutes} min`} />
          <Badge label={practice.difficulty} color={colors.accentLight} />
          <Badge label={practice.intensity} color={colors.secondaryLight} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  info: { padding: 20 },
  badges: { flexDirection: 'row', gap: 8, marginTop: 10 },
});
