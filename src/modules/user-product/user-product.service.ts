import { Inject, Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base.service';
import { UserProduct } from './entities/user-product.entity';
import { CreateUserProductDto } from './dto/create-user-product.dto';
import { UpdateUserProductDto } from './dto/update-user-product.dto';
import { UserProductRepository } from './user-product.repository';

@Injectable()
export class UserProductService extends BaseService<
  UserProduct,
  CreateUserProductDto,
  UpdateUserProductDto
> {
  constructor(
    @Inject('IUserProductRepository')
    private readonly userProductRepository: UserProductRepository,
  ) {
    super(userProductRepository, 'UserProduct');
  }
}
