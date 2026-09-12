import { Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common';
import { strictValidationPipe } from '../../common/strict-validation.pipe';
import { AuthenticatedUser } from '../auth/auth.types';
import { CurrentUser } from '../auth/current-user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateSupportMessageDto } from './dto/create-support-message.dto';
import { SupportService } from './support.service';

@UseGuards(JwtAuthGuard)
@UsePipes(strictValidationPipe)
@Controller('support')
export class SupportController {
  constructor(private readonly supportService: SupportService) {}

  @Post()
  create(@CurrentUser() user: AuthenticatedUser, @Body() dto: CreateSupportMessageDto) {
    return this.supportService.create(user.userId, dto);
  }
}
