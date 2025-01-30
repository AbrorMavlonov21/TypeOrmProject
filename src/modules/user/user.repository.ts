import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { BaseRepository } from 'src/common/base.repository';

@Injectable()
export class UserRepository extends BaseRepository<UserEntity, CreateUserDto> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userModel: Repository<UserEntity>,
  ) {
    super(userModel);
  }
  async getByLogin(login: string): Promise<UserEntity> {
    return await this.userModel.findOneBy({ login });
  }
}
