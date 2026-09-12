import { Injectable } from '@nestjs/common';
import { PracticeFiltersDto } from './dto/practice-filters.dto';

@Injectable()
export class PracticesService {
  async findAll(_filters: PracticeFiltersDto) {
    // TODO: query the Practice table filtered by type/duration/equipment/
    // difficulty/bodyFocus/intensity, and mark isCompleted per user.
    return [];
  }

  async findById(_id: string) {
    // TODO: fetch a single Practice row, resolving a signed DRM-protected
    // playback URL from the CDN provider before returning it.
    return null;
  }

  async markCompleted(_userId: string, _practiceId: string) {
    // TODO: create a CompletedSession row and update streak/achievements.
  }
}
