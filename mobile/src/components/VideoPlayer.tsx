import React from 'react';
import { StyleSheet, View } from 'react-native';
import Video from 'react-native-video';

interface Props {
  // HLS/DASH manifest URL served by the DRM-protected CDN (e.g. Mux, Cloudflare Stream).
  streamUrl: string;
  drmLicenseUrl?: string;
}

// Placeholder wiring for DRM playback. `react-native-video` supports the
// `drm` prop (Widevine on Android, FairPlay on iOS) once a real license
// server URL is available from the CDN provider — not yet configured here.
export function VideoPlayer({ streamUrl, drmLicenseUrl }: Props) {
  return (
    <View style={styles.container}>
      <Video
        source={{ uri: streamUrl }}
        style={styles.video}
        controls
        resizeMode="contain"
        drm={drmLicenseUrl ? { licenseServer: drmLicenseUrl } : undefined}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', aspectRatio: 16 / 9 },
  video: { flex: 1 },
});
