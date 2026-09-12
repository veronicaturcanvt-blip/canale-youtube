import { Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common';
import { strictValidationPipe } from '../../common/strict-validation.pipe';
import { AuthenticatedUser } from '../auth/auth.types';
import { CurrentUser } from '../auth/current-user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RegisterDeviceDto } from './dto/register-device.dto';
import { PushService } from './push.service';

@UseGuards(JwtAuthGuard)
@UsePipes(strictValidationPipe)
@Controller('push')
export class PushController {
  constructor(private readonly pushService: PushService) {}

  @Post('register')
  register(@CurrentUser() user: AuthenticatedUser, @Body() dto: RegisterDeviceDto) {
    return this.pushService.registerDevice(user.userId, dto.token, dto.platform);
  }

  // Sends a canned "time to practice" reminder to every device the
  // authenticated user has registered — lets the app (or you, via curl)
  // trigger a real test push without waiting for a scheduled job to exist.
  @Post('test')
  sendTest(@CurrentUser() user: AuthenticatedUser) {
    return this.pushService.sendToUser(
      user.userId,
      'Time to practice! 🧘',
      'Your mat is waiting — got 15 minutes for a quick session?',
    );
  }
}
