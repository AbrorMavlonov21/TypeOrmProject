import { Inject, Injectable } from '@nestjs/common';
import { BaseService } from 'common/base.service';
import { CategoryEntity } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryRepository } from './category.repository';
import { ResData } from 'lib/resData';

@Injectable()
export class CategoryService extends BaseService<
  CategoryEntity,
  CreateCategoryDto,
  UpdateCategoryDto
> {
  constructor(
    @Inject('ICategoryRepository')
    private readonly categoryRepository: CategoryRepository,
  ) {
    super(categoryRepository, 'Category');
  }
  async getByName(name: string): Promise<ResData<CategoryEntity>> {
    const data = await this.categoryRepository.getByName(name);
    const resData = new ResData(200, `Category found successfully`, data);
    if (!data) {
      resData.meta.statusCode = 404;
      resData.meta.message = 'Category not found by Name';
    }
    return resData;
  }
}
