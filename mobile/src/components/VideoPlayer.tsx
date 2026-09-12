import React from 'react';
import { StyleSheet, View } from 'react-native';
import Video, { DRMType } from 'react-native-video';
import { DrmInfo } from '@/types';

interface Props {
  // Signed HLS manifest URL from the backend (Mux) — never a plain
  // downloadable file, and short-lived (see PracticesService/VideoService).
  streamUrl: string;
  // Present only once the practice has a Mux DRM configuration attached;
  // absent means the stream is still signed/token-gated but not
  // hardware-DRM-protected (see VideoService.resolveForPlayback).
  drm?: DrmInfo;
}

export function VideoPlayer({ streamUrl, drm }: Props) {
  return (
    <View style={styles.container}>
      <Video
        source={{ uri: streamUrl }}
        style={styles.video}
        controls
        resizeMode="contain"
        drm={
          drm
            ? {
                type: drm.type === 'fairplay' ? DRMType.FAIRPLAY : DRMType.WIDEVINE,
                licenseServer: drm.licenseServerUrl,
                certificateUrl: drm.certificateUrl,
              }
            : undefined
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', aspectRatio: 16 / 9 },
  video: { flex: 1 },
});
