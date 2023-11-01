import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/@common/dto/users/create-user.dto';
import { getApiPath } from 'src/@common/utils/api.utils';
import { AuthService } from './auth.service';

@Controller(getApiPath('auth'))
export class AuthController {

    constructor(
        private authService: AuthService,
    ) { }

    @Post('/login')
    login(@Body() userDto: CreateUserDto) {
        return this.authService.login(userDto)
    }

    @Post('/registration')
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto)
    }
}
