import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';

interface Props {
  // HLS/DASH manifest URL served by the DRM-protected CDN (e.g. Mux, Cloudflare Stream).
  streamUrl: string;
  drmLicenseUrl?: string;
}

// Expo Go build: uses expo-video for quick preview. DRM playback
// (Widevine/FairPlay) is not available through Expo Go — the production
// bare React Native app (see ../mobile/) wires that up via
// react-native-video once a real CDN license server URL exists.
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
