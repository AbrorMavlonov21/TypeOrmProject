import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from 'src/common/base.repository';
import { UserProduct } from './entities/user-product.entity';
import { CreateUserProductDto } from './dto/create-user-product.dto';

@Injectable()
export class UserProductRepository extends BaseRepository<
  UserProduct,
  CreateUserProductDto
> {
  constructor(
    @InjectRepository(UserProduct)
    private readonly userProductModel: Repository<UserProduct>,
  ) {
    super(userProductModel);
  }
}
