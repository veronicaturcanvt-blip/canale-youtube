import { Body, Controller, Headers, Param, Post, UseGuards, UsePipes } from '@nestjs/common';
import { strictValidationPipe } from '../../common/strict-validation.pipe';
import { BasicAuthGuard } from '../admin/basic-auth.guard';
import { IngestVideoDto } from './dto/ingest-video.dto';
import { VideoService } from './video.service';

@Controller()
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  // Triggers real encoding for a filmed practice — call this once the raw
  // footage is uploaded somewhere Mux can fetch it from. Reuses the same
  // admin Basic Auth login as the support-message panel.
  @UseGuards(BasicAuthGuard)
  @UsePipes(strictValidationPipe)
  @Post('admin/practices/:practiceId/video')
  ingest(@Param('practiceId') practiceId: string, @Body() dto: IngestVideoDto) {
    return this.videoService.ingestPractice(practiceId, dto.sourceUrl);
  }

  // Raw body (configured in main.ts) is required here so the Mux
  // signature check in the service can verify the exact bytes Mux sent.
  @Post('webhooks/mux')
  webhook(@Body() rawBody: Buffer, @Headers('mux-signature') signature?: string) {
    return this.videoService.handleWebhook(rawBody, signature);
  }
}
