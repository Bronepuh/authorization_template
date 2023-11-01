import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { getApiPath } from 'src/@common/utils/api.utils';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { UserEntity } from 'src/@common/entities/user.entity';

@Controller(getApiPath('users'))
export class UsersController {

  constructor(
    private readonly usersService: UsersService,
  ) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(): Promise<any> {
    const [users, total] = await this.usersService.getAllUsers();
    return [users, total];
  }

  @Get('/me')
  async getMe(@Query('accessToken') accessToken: string) {
    return await this.usersService.getMe(accessToken);
  }
}
