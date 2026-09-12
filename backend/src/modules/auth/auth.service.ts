import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { PinLoginDto } from './dto/pin-login.dto';
import { RegisterDto } from './dto/register.dto';

const PASSWORD_SALT_ROUNDS = 10;
const PIN_SALT_ROUNDS = 10;

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (existing) {
      throw new ConflictException('Email is already registered');
    }

    const passwordHash = await bcrypt.hash(dto.password, PASSWORD_SALT_ROUNDS);
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        passwordHash,
        firstName: dto.firstName,
        lastName: dto.lastName,
      },
    });

    return this.buildSession(user.id, user.email);
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user || !(await bcrypt.compare(dto.password, user.passwordHash))) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return this.buildSession(user.id, user.email);
  }

  async loginWithPin(dto: PinLoginDto) {
    const user = await this.prisma.user.findUnique({ where: { id: dto.userId } });
    if (!user?.pinHash || !(await bcrypt.compare(dto.pin, user.pinHash))) {
      throw new UnauthorizedException('Invalid user or PIN');
    }

    return this.buildSession(user.id, user.email);
  }

  async setPin(userId: string, pin: string) {
    const pinHash = await bcrypt.hash(pin, PIN_SALT_ROUNDS);
    await this.prisma.user.update({ where: { id: userId }, data: { pinHash } });
  }

  private async buildSession(userId: string, email: string) {
    const accessToken = await this.jwtService.signAsync({ sub: userId, email });
    return { accessToken, user: { id: userId, email } };
  }
}
