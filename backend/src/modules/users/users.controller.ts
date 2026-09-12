import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, UsePipes } from '@nestjs/common';
import { strictValidationPipe } from '../../common/strict-validation.pipe';
import { AuthenticatedUser } from '../auth/auth.types';
import { CurrentUser } from '../auth/current-user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UsersService } from './users.service';

@UseGuards(JwtAuthGuard)
@UsePipes(strictValidationPipe)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  getProfile(@CurrentUser() user: AuthenticatedUser) {
    return this.usersService.getProfile(user.userId);
  }

  @Patch('me')
  updateProfile(@CurrentUser() user: AuthenticatedUser, @Body() dto: UpdateProfileDto) {
    return this.usersService.updateProfile(user.userId, dto);
  }

  @Get('me/stats')
  getStats(@CurrentUser() user: AuthenticatedUser) {
    return this.usersService.getStats(user.userId);
  }

  @Get('me/favorites')
  getFavorites(@CurrentUser() user: AuthenticatedUser) {
    return this.usersService.getFavorites(user.userId);
  }

  @Post('me/favorites/:practiceId')
  addFavorite(@CurrentUser() user: AuthenticatedUser, @Param('practiceId') _practiceId: string) {
    // TODO: create Favorite row.
  }

  @Delete('me')
  deleteAccount(@CurrentUser() user: AuthenticatedUser) {
    return this.usersService.deleteAccount(user.userId);
  }
}
