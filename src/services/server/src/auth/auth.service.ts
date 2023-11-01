import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/@common/dto/users/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs'
import { UserEntity } from 'src/@common/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }


    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto);
        const accessToken = await this.generateToken(user);
        const updateUser = await this.usersService.updateUserAccessToken(user.id, accessToken);

        return JSON.stringify(updateUser);
    }

    async registration(userDto: CreateUserDto) {
        const candidate = await this.usersService.getUserByEmail(userDto.email);

        if (candidate) {
            throw new HttpException('Пользователь с таким email уже существует', HttpStatus.BAD_REQUEST)
        }

        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.usersService.createUser({ ...userDto, password: hashPassword });

        if (user) {
            return { message: 'пользователь успешно создан' }
        }
    }

    private async generateToken(user: Omit<UserEntity, "password">) {
        const payload = { email: user.email, id: user.id }

        return this.jwtService.sign(payload)
    }

    private async validateUser(userDto: CreateUserDto) {
        const user = await this.usersService.getUserByEmail(userDto.email);
        if (user) {
            const passwordEquals = await bcrypt.compare(userDto.password, user.password);
            if (passwordEquals) {
                const { password, ...rest } = user;
                return rest;
            }
        }

        throw new UnauthorizedException({ message: 'Неправильный email или пароль' })
    }
}
