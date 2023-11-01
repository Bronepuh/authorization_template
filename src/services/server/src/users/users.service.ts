import { ConflictException, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/@common/dto/users/create-user.dto';
import { UpdateUserDto } from 'src/@common/dto/users/update-user.dto';
import { UserEntity } from 'src/@common/entities/user.entity';
import { Repository } from 'typeorm';
import { omit } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { UUID } from 'crypto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private jwtService: JwtService
  ) { }

  async createUser(dto: CreateUserDto): Promise<Omit<UserEntity, "password">> {
    const userEntity = await this.createEntity(dto);
    console.log('createUser', dto);

    const existsUser = await this.usersRepository.findOne({
      where: [{ email: dto.email }],
    });

    if (existsUser) {
      throw new ConflictException(`User with email "${dto.email}" already exists`);
    }

    const uniqueId = uuidv4();

    const user = await this.usersRepository.save({ ...userEntity, id: uniqueId as UUID });

    return this.mapUser(user);
  }

  async getAllUsers() {
    const [result, total] = await this.usersRepository.findAndCount();

    const users = result.map(u => this.mapUser(u));
    return [users, total];
  }

  async getMe(accessToken: string) {
    const userData = this.jwtService.decode(accessToken);
    const user = await this.usersRepository.findOneBy({ id: userData['id'] });
    const me = this.mapUser(user);
    return me
  }

  async createEntity(dto: CreateUserDto | UpdateUserDto): Promise<UserEntity> {
    return this.usersRepository.create({
      ...dto,
    });
  }

  mapUser(user: UserEntity): Omit<UserEntity, "password"> {
    return omit(user, ['password']);
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    try {
      const user = await this.usersRepository.findOneBy({ email });
      return user
    } catch (error) {
      console.log(error);
    }
  }

  async updateUserAccessToken(id: string, accessToken: string): Promise<UserEntity> {
    try {
      await this.usersRepository.update({ id }, {
        access_token: accessToken
      });
      const user = await this.usersRepository.findOneBy({ id });
      return user
    } catch (error) {
      console.log(error);
    }
  }
}
