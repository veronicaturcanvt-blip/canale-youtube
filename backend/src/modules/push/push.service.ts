import { Injectable, Logger } from '@nestjs/common';
import { App, cert, initializeApp } from 'firebase-admin/app';
import { getMessaging } from 'firebase-admin/messaging';
import * as apn from '@parse/node-apn';
import { PrismaService } from '../../prisma/prisma.service';

interface SendResult {
  token: string;
  platform: string;
  success: boolean;
  error?: string;
}

@Injectable()
export class PushService {
  private readonly logger = new Logger(PushService.name);
  private firebaseApp: App | null = null;
  private apnProvider: apn.Provider | null = null;

  constructor(private readonly prisma: PrismaService) {}

  async registerDevice(userId: string, token: string, platform: 'ios' | 'android') {
    await this.prisma.deviceToken.upsert({
      where: { token },
      create: { userId, token, platform },
      update: { userId, platform },
    });
    return { registered: true };
  }

  async sendToUser(userId: string, title: string, body: string) {
    const devices = await this.prisma.deviceToken.findMany({ where: { userId } });
    if (devices.length === 0) {
      return { sent: 0, failed: 0, results: [] as SendResult[], message: 'No registered devices for this user' };
    }

    const results = await Promise.all(
      devices.map((device) => this.sendToDevice(device.token, device.platform, title, body)),
    );

    return {
      sent: results.filter((r) => r.success).length,
      failed: results.filter((r) => !r.success).length,
      results,
    };
  }

  private async sendToDevice(
    token: string,
    platform: string,
    title: string,
    body: string,
  ): Promise<SendResult> {
    if (platform === 'android') {
      return this.sendViaFcm(token, title, body);
    }
    if (platform === 'ios') {
      return this.sendViaApns(token, title, body);
    }
    return { token, platform, success: false, error: `Unknown platform: ${platform}` };
  }

  private getFirebaseApp(): App {
    if (this.firebaseApp) {
      return this.firebaseApp;
    }

    const raw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
    if (!raw) {
      throw new Error('FIREBASE_SERVICE_ACCOUNT_JSON is not configured');
    }

    const credentials = JSON.parse(raw);
    this.firebaseApp = initializeApp({ credential: cert(credentials) }, 'push-service');
    return this.firebaseApp;
  }

  private async sendViaFcm(token: string, title: string, body: string): Promise<SendResult> {
    try {
      const app = this.getFirebaseApp();
      await getMessaging(app).send({
        token,
        notification: { title, body },
      });
      return { token, platform: 'android', success: true };
    } catch (error) {
      this.logger.error(`FCM send failed for token ${token}`, error as Error);
      return { token, platform: 'android', success: false, error: (error as Error).message };
    }
  }

  private getApnProvider(): apn.Provider {
    if (this.apnProvider) {
      return this.apnProvider;
    }

    const key = process.env.APNS_KEY;
    const keyId = process.env.APNS_KEY_ID;
    const teamId = process.env.APNS_TEAM_ID;
    if (!key || !keyId || !teamId) {
      throw new Error('APNS_KEY / APNS_KEY_ID / APNS_TEAM_ID are not configured');
    }

    this.apnProvider = new apn.Provider({
      token: { key, keyId, teamId },
      production: process.env.APNS_PRODUCTION === 'true',
      // Local-testing-only overrides — leave unset in production, in which
      // case node-apn talks to Apple's real (sandbox/production) servers.
      ...(process.env.APNS_HOST && { address: process.env.APNS_HOST }),
      ...(process.env.APNS_PORT && { port: Number(process.env.APNS_PORT) }),
      ...(process.env.APNS_REJECT_UNAUTHORIZED === 'false' && { rejectUnauthorized: false }),
    });
    return this.apnProvider;
  }

  private async sendViaApns(token: string, title: string, body: string): Promise<SendResult> {
    try {
      const bundleId = process.env.APNS_BUNDLE_ID;
      if (!bundleId) {
        throw new Error('APNS_BUNDLE_ID is not configured');
      }

      const provider = this.getApnProvider();
      const notification = new apn.Notification();
      notification.alert = { title, body };
      notification.topic = bundleId;
      notification.sound = 'default';

      const result = await provider.send(notification, token);
      if (result.failed.length > 0) {
        const failure = result.failed[0];
        const reason = failure.response?.reason ?? failure.error?.message ?? 'APNs send failed';
        throw new Error(reason);
      }
      return { token, platform: 'ios', success: true };
    } catch (error) {
      this.logger.error(`APNs send failed for token ${token}`, error as Error);
      return { token, platform: 'ios', success: false, error: (error as Error).message };
    }
  }
}
