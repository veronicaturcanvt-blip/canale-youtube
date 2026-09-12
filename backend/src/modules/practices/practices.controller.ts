import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PracticesService } from './practices.service';
import { PracticeFiltersDto } from './dto/practice-filters.dto';

@Controller('practices')
export class PracticesController {
  constructor(private readonly practicesService: PracticesService) {}

  @Get()
  findAll(@Query() filters: PracticeFiltersDto) {
    return this.practicesService.findAll(filters);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.practicesService.findById(id);
  }

  @Post(':id/complete')
  markCompleted(@Param('id') practiceId: string) {
    return this.practicesService.markCompleted('me', practiceId);
  }
}
