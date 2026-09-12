import { BadGatewayException, BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import Mux from '@mux/mux-node';
import { VideoPlaybackPolicy } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

export interface PlaybackInfo {
  videoUrl: string | null;
  drm?: {
    type: 'widevine' | 'fairplay';
    licenseServerUrl: string;
    certificateUrl?: string;
  };
}

interface PracticeVideoFields {
  videoUrl: string | null;
  muxPlaybackId: string | null;
  muxPlaybackPolicy: VideoPlaybackPolicy | null;
}

@Injectable()
export class VideoService {
  private readonly logger = new Logger(VideoService.name);
  private mux: Mux | null = null;

  constructor(private readonly prisma: PrismaService) {}

  private getClient(): Mux {
    if (this.mux) {
      return this.mux;
    }
    this.mux = new Mux({
      tokenId: requireEnv('MUX_TOKEN_ID'),
      tokenSecret: requireEnv('MUX_TOKEN_SECRET'),
      webhookSecret: process.env.MUX_WEBHOOK_SECRET,
      jwtSigningKey: process.env.MUX_SIGNING_KEY_ID,
      jwtPrivateKey: process.env.MUX_SIGNING_KEY_PRIVATE,
      // Local-testing-only override — leave unset in production, in which
      // case the SDK talks to https://api.mux.com.
      ...(process.env.MUX_BASE_URL && { baseURL: process.env.MUX_BASE_URL }),
    });
    return this.mux;
  }

  // Kicks off encoding for freshly filmed footage. Upload the raw file
  // somewhere Mux can fetch it from (a presigned S3/GCS URL works fine),
  // then call this with that URL — Mux ingests it asynchronously and
  // `handleWebhook` below fills in the playback ID once it's ready.
  //
  // A real DRM playback ID (Widevine/FairPlay) requires a DRM
  // configuration to already exist on the Mux account (Mux dashboard ->
  // Settings -> DRM Configurations, or the /video/v1/drm-configurations
  // API) — that's an enterprise-tier Mux feature that provisions FairPlay
  // (Apple) and Widevine (Google) certificates for you. Until
  // MUX_DRM_CONFIGURATION_ID is set, we fall back to a signed (token-gated,
  // non-DRM) playback ID: still not a downloadable file, just without
  // hardware-backed content protection.
  async ingestPractice(practiceId: string, sourceUrl: string) {
    const practice = await this.prisma.practice.findUnique({ where: { id: practiceId } });
    if (!practice) {
      throw new NotFoundException('Practice not found');
    }

    const mux = this.getClient();
    const drmConfigurationId = process.env.MUX_DRM_CONFIGURATION_ID;
    const policy: VideoPlaybackPolicy = drmConfigurationId ? 'DRM' : 'SIGNED';

    let asset;
    try {
      asset = await mux.video.assets.create({
        inputs: [{ url: sourceUrl }],
        passthrough: practiceId,
        video_quality: 'plus',
        ...(drmConfigurationId
          ? { advanced_playback_policies: [{ policy: 'drm', drm_configuration_id: drmConfigurationId }] }
          : { playback_policies: ['signed'] }),
      });
    } catch (error) {
      throw new BadGatewayException(`Mux asset creation failed: ${message(error)}`);
    }

    await this.prisma.practice.update({
      where: { id: practiceId },
      data: {
        muxAssetId: asset.id,
        muxPlaybackId: asset.playback_ids?.[0]?.id ?? null,
        muxPlaybackPolicy: policy,
        // Cleared once we have a real Mux-backed source; kept until then so
        // existing test/preview links keep working while encoding runs.
        videoUrl: asset.playback_ids?.[0]?.id ? null : practice.videoUrl,
      },
    });

    return { assetId: asset.id, status: asset.status, policy };
  }

  async handleWebhook(rawBody: Buffer, signatureHeader: string | undefined) {
    const webhookSecret = requireEnv('MUX_WEBHOOK_SECRET');
    if (!signatureHeader) {
      throw new BadRequestException('Missing mux-signature header');
    }

    const mux = this.getClient();
    let event: Awaited<ReturnType<Mux['webhooks']['unwrap']>>;
    try {
      event = await mux.webhooks.unwrap(
        rawBody.toString('utf8'),
        { 'mux-signature': signatureHeader },
        webhookSecret,
      );
    } catch (error) {
      throw new BadRequestException(`Invalid Mux signature: ${message(error)}`);
    }

    const data = event.data as Record<string, unknown>;

    if (event.type === 'video.asset.ready') {
      const practiceId = typeof data.passthrough === 'string' ? data.passthrough : undefined;
      const playbackIds = data.playback_ids as Array<{ id: string }> | undefined;
      const playbackId = playbackIds?.[0]?.id;
      if (practiceId && playbackId) {
        await this.prisma.practice.updateMany({
          where: { id: practiceId, muxAssetId: data.id as string },
          data: { muxPlaybackId: playbackId, videoUrl: null },
        });
      }
    } else if (event.type === 'video.asset.errored') {
      this.logger.error(`Mux asset ${data.id} failed to process: ${JSON.stringify(data.errors)}`);
    }

    return { received: true, type: event.type };
  }

  // Resolves what the app should actually play: a signed, time-limited HLS
  // URL for Mux-backed practices (plus DRM license info once a DRM config
  // is wired up), or the legacy/test stream URL for everything else.
  async resolveForPlayback(practice: PracticeVideoFields, platform?: 'ios' | 'android'): Promise<PlaybackInfo> {
    if (!practice.muxPlaybackId) {
      return { videoUrl: practice.videoUrl };
    }

    const mux = this.getClient();
    let playbackToken: string;
    try {
      playbackToken = await mux.jwt.signPlaybackId(practice.muxPlaybackId, {
        type: 'video',
        expiration: '4h',
      });
    } catch (error) {
      throw new BadGatewayException(`Failed to sign Mux playback token: ${message(error)}`);
    }
    const videoUrl = `https://stream.mux.com/${practice.muxPlaybackId}.m3u8?token=${playbackToken}`;

    if (practice.muxPlaybackPolicy !== 'DRM') {
      return { videoUrl };
    }

    const isIos = platform === 'ios';
    const drmToken = await mux.jwt.signDrmLicense(practice.muxPlaybackId, { expiration: '4h' });
    const drmType = isIos ? ('fairplay' as const) : ('widevine' as const);
    return {
      videoUrl,
      drm: {
        type: drmType,
        licenseServerUrl: `https://license.mux.com/license/${drmType}?token=${drmToken}`,
        ...(isIos && { certificateUrl: `https://license.mux.com/appcert/fairplay?token=${drmToken}` }),
      },
    };
  }
}

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new BadGatewayException(`${name} is not configured`);
  }
  return value;
}

function message(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
