import { Module } from '@nestjs/common';
import { UserProductController } from './user-product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProduct } from './entities/user-product.entity';
import { UserEntity } from '../user/entities/user.entity';
import { ProductEntity } from '../product/entities/product.entity';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user.repository';
import { UserProductService } from './user-product.service';
import { UserProductRepository } from './user-product.repository';
import { ProductService } from '../product/product.service';
import { ProductRepository } from '../product/product.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserProduct, UserEntity, ProductEntity])],
  controllers: [UserProductController],
  providers: [
    { provide: 'IUserProductService', useClass: UserProductService },
    { provide: 'IUserProductRepository', useClass: UserProductRepository },
    { provide: 'IUserService', useClass: UserService },
    { provide: 'IUserRepository', useClass: UserRepository },
    { provide: 'IProductService', useClass: ProductService },
    { provide: 'IProductRepository', useClass: ProductRepository },
  ],
})
export class UserProductModule {}
