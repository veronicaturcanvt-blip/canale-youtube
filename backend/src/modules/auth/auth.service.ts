import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { PinLoginDto } from './dto/pin-login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(_dto: LoginDto) {
    // TODO: verify email/password hash against the User table (Prisma).
    throw new UnauthorizedException('Not implemented');
  }

  async loginWithPin(_dto: PinLoginDto) {
    // TODO: verify PIN hash for the given device/user.
    throw new UnauthorizedException('Not implemented');
  }

  async setPin(_userId: string, _pin: string) {
    // TODO: hash and store the new PIN.
  }
}
