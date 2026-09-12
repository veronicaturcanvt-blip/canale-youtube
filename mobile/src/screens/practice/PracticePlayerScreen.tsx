import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { VideoPlayer } from '@/components/VideoPlayer';
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

  return (
    <View style={styles.container}>
      <VideoPlayer streamUrl={practice.videoUrl} />
      <Text style={[typography.h2, styles.title]}>{practice.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  title: { padding: 16, color: colors.textPrimary },
});
