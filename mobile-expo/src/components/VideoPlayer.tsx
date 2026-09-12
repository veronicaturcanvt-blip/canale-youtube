import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';
import { DrmInfo } from '@/types';

interface Props {
  // Signed HLS manifest URL from the backend (Mux) — never a plain
  // downloadable file, and short-lived (see PracticesService/VideoService).
  streamUrl: string;
  drm?: DrmInfo;
}

// Expo Go build: uses expo-video for quick preview. DRM playback
// (Widevine/FairPlay) is not available through Expo Go — a managed build
// can't embed the custom native DRM modules that would need — so `drm` is
// accepted (for prop parity with the bare app) but intentionally unused
// here. The production bare React Native app (see ../mobile/) wires DRM up
// for real via react-native-video.
export function VideoPlayer({ streamUrl }: Props) {
  const player = useVideoPlayer(streamUrl, (instance) => {
    instance.loop = false;
  });

  return (
    <View style={styles.container}>
      <VideoView style={styles.video} player={player} nativeControls contentFit="contain" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', aspectRatio: 16 / 9 },
  video: { flex: 1 },
});
