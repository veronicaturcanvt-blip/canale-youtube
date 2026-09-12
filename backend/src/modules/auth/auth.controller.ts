import { Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common';
import { strictValidationPipe } from '../../common/strict-validation.pipe';
import { AuthService } from './auth.service';
import { CurrentUser } from './current-user.decorator';
import { AuthenticatedUser } from './auth.types';
import { LoginDto } from './dto/login.dto';
import { PinLoginDto } from './dto/pin-login.dto';
import { RegisterDto } from './dto/register.dto';
import { SetPinDto } from './dto/set-pin.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@UsePipes(strictValidationPipe)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('login-pin')
  loginWithPin(@Body() dto: PinLoginDto) {
    return this.authService.loginWithPin(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('pin')
  setPin(@CurrentUser() user: AuthenticatedUser, @Body() dto: SetPinDto) {
    return this.authService.setPin(user.userId, dto.pin);
  }
}
