import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/common/base.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryRepository extends BaseRepository<
  CategoryEntity,
  CreateCategoryDto
> {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryModel: Repository<CategoryEntity>,
  ) {
    super(categoryModel);
  }
  async getByName(name: string): Promise<CategoryEntity> {
    return await this.categoryModel.findOneBy({ name });
  }
}
