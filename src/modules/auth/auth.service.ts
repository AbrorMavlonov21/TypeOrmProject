import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ResData } from 'src/lib/resData';
import { UserEntity } from '../user/entities/user.entity';
import { Bcrypt } from 'src/lib/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('IUserService') private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async login(dto: CreateAuthDto): Promise<ResData<UserEntity>> {
    const foundUser = await this.userService.getByLogin(dto.login);
    if (!foundUser) {
      throw new HttpException(
        'Login or Password is wrong',
        HttpStatus.BAD_REQUEST,
      );
    }

    const validPass = await Bcrypt.compare(
      dto.password,
      foundUser.data.password,
    );
    if (!validPass) {
      throw new HttpException(
        'Login or Password is wrong',
        HttpStatus.BAD_REQUEST,
      );
    }
    const token = await this.jwtService.signAsync({
      id: foundUser.data.id,
      roles: foundUser.data.roles,
    });
    const resData = new ResData<UserEntity>(
      HttpStatus.OK,
      'success',
      foundUser.data,
      {
        token,
      },
    );
    return resData;
  }
  async register(dto: CreateAuthDto): Promise<ResData<UserEntity>> {
    const { meta } = await this.userService.getByLogin(dto.login);
    if (meta.statusCode !== 404) {
      throw new HttpException(
        'This username already exist',
        HttpStatus.BAD_REQUEST,
      );
    }
    const data = await this.userService.create(dto);
    return data;
  }
}
