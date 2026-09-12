import { Module } from '@nestjs/common';
import { AdminModule } from '../admin/admin.module';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';

@Module({
  imports: [AdminModule],
  controllers: [VideoController],
  providers: [VideoService],
  exports: [VideoService],
})
export class VideoModule {}
