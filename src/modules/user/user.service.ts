import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { BaseService } from '../../common/base.service';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResData } from '../../lib/resData';

@Injectable()
export class UserService extends BaseService<
  UserEntity,
  CreateUserDto,
  UpdateUserDto
> {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: UserRepository,
  ) {
    super(userRepository, 'User');
  }
  async getByLogin(login: string): Promise<ResData<UserEntity>> {
    const data = await this.userRepository.getByLogin(login);
    const resData = new ResData(200, `User found successfully`, data);
    if (!data) {
      resData.meta.statusCode = 404;
      resData.meta.message = 'User not found by Login';
    }
    return resData;
  }
}
