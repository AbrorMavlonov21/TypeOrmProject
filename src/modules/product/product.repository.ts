import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/common/base.repository';
import { ProductEntity } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductRepository extends BaseRepository<
  ProductEntity,
  CreateProductDto
> {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productModel: Repository<ProductEntity>,
  ) {
    super(productModel);
  }
}
