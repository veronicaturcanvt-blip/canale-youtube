import { Controller, Get, Param, Post, Query, UseGuards, UsePipes } from '@nestjs/common';
import { strictValidationPipe } from '../../common/strict-validation.pipe';
import { AuthenticatedUser } from '../auth/auth.types';
import { CurrentUser } from '../auth/current-user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PracticeFiltersDto } from './dto/practice-filters.dto';
import { PracticesService } from './practices.service';

@UseGuards(JwtAuthGuard)
@Controller('practices')
export class PracticesController {
  constructor(private readonly practicesService: PracticesService) {}

  @UsePipes(strictValidationPipe)
  @Get()
  findAll(@CurrentUser() user: AuthenticatedUser, @Query() filters: PracticeFiltersDto) {
    return this.practicesService.findAll(filters, user.userId);
  }

  @Get(':id')
  findById(@CurrentUser() user: AuthenticatedUser, @Param('id') id: string) {
    return this.practicesService.findById(id, user.userId);
  }

  @Post(':id/complete')
  markCompleted(@CurrentUser() user: AuthenticatedUser, @Param('id') practiceId: string) {
    return this.practicesService.markCompleted(user.userId, practiceId);
  }
}
