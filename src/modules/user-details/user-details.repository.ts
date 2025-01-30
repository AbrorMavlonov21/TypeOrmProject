import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from 'src/common/base.repository';
import { UserDetail } from './entities/user-detail.entity';
import { CreateUserDetailDto } from './dto/create-user-detail.dto';

@Injectable()
export class UserDetailsRepository extends BaseRepository<
  UserDetail,
  CreateUserDetailDto
> {
  constructor(
    @InjectRepository(UserDetail)
    private readonly userDetailModel: Repository<UserDetail>,
  ) {
    super(userDetailModel);
  }
  async getByFullname(fullname: string): Promise<UserDetail> {
    return await this.userDetailModel.findOneBy({ fullname });
  }
}
