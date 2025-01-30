import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDetailDto } from './dto/create-user-detail.dto';
import { UpdateUserDetailDto } from './dto/update-user-detail.dto';
import { UserDetailsRepository } from './user-details.repository';
import { BaseService } from 'src/common/base.service';
import { UserDetail } from './entities/user-detail.entity';
import { ResData } from 'src/lib/resData';

@Injectable()
export class UserDetailsService extends BaseService<
  UserDetail,
  CreateUserDetailDto,
  UpdateUserDetailDto
> {
  constructor(
    @Inject('IUserDetailRepository')
    private readonly userDetailRepository: UserDetailsRepository,
  ) {
    super(userDetailRepository, 'UserDetails');
  }
  async getByFullname(fullname: string): Promise<ResData<UserDetail>> {
    const data = await this.userDetailRepository.getByFullname(fullname);
    const resData = new ResData(
      200,
      `User with this ${fullname} found successfully`,
      data,
    );
    if (!data) {
      resData.meta.statusCode = 404;
      resData.meta.message = `User not found by this ${fullname}`;
    }
    return resData;
  }
}
