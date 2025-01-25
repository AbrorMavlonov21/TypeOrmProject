import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { CategoryRepository } from './category.repository';
import { ProductEntity } from '../product/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity, ProductEntity])],
  controllers: [CategoryController],
  providers: [
    { provide: 'ICategoryService', useClass: CategoryService },
    { provide: 'ICategoryRepository', useClass: CategoryRepository },
  ],
})
export class CategoryModule {}
