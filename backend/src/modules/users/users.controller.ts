import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  getProfile() {
    // TODO: read userId from the authenticated request (JWT guard).
    return this.usersService.getProfile('me');
  }

  @Patch('me')
  updateProfile(@Body() dto: UpdateProfileDto) {
    return this.usersService.updateProfile('me', dto);
  }

  @Get('me/stats')
  getStats() {
    return this.usersService.getStats('me');
  }

  @Get('me/favorites')
  getFavorites() {
    return this.usersService.getFavorites('me');
  }

  @Post('me/favorites/:practiceId')
  addFavorite(@Param('practiceId') _practiceId: string) {
    // TODO: create Favorite row.
  }

  @Delete('me')
  deleteAccount() {
    return this.usersService.deleteAccount('me');
  }
}
