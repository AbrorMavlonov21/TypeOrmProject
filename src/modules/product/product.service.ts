import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from './product.repository';
import { BaseService } from 'common/base.service';
import { ProductEntity } from './entities/product.entity';

@Injectable()
export class ProductService extends BaseService<
  ProductEntity,
  CreateProductDto,
  UpdateProductDto
> {
  constructor(
    @Inject('IProductRepository')
    private readonly productRepository: ProductRepository,
  ) {
    super(productRepository, 'Product');
  }
}
