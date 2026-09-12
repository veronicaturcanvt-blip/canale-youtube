import { Injectable } from '@nestjs/common';

@Injectable()
export class PushService {
  async registerDevice(_userId: string, _token: string, _platform: 'ios' | 'android') {
    // TODO: upsert a DeviceToken row.
  }

  async sendToUser(_userId: string, _title: string, _body: string) {
    // TODO: send via Firebase Cloud Messaging (Android) / APNs (iOS).
  }
}
