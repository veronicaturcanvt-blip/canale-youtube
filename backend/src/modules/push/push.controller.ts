import { Body, Controller, Post } from '@nestjs/common';
import { PushService } from './push.service';

@Controller('push')
export class PushController {
  constructor(private readonly pushService: PushService) {}

  @Post('register')
  register(@Body() body: { token: string; platform: 'ios' | 'android' }) {
    return this.pushService.registerDevice('me', body.token, body.platform);
  }
}
