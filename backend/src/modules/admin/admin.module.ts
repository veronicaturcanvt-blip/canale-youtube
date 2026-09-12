import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { BasicAuthGuard } from './basic-auth.guard';

@Module({
  controllers: [AdminController],
  providers: [BasicAuthGuard],
})
export class AdminModule {}
