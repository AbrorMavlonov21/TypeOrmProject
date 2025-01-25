import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductEntity } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from './product.repository';
import { CategoryService } from '../category/category.service';
import { CategoryRepository } from '../category/category.repository';
import { CategoryEntity } from '../category/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, CategoryEntity])],
  controllers: [ProductController],
  providers: [
    { provide: 'IProductService', useClass: ProductService },
    { provide: 'IProductRepository', useClass: ProductRepository },
    { provide: 'ICategoryService', useClass: CategoryService },
    { provide: 'ICategoryRepository', useClass: CategoryRepository },
  ],
})
export class ProductModule {}
