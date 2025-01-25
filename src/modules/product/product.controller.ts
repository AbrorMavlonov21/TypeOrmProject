import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  HttpException,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CategoryService } from '../category/category.service';

@Controller('product')
export class ProductController {
  constructor(
    @Inject('IProductService')
    private readonly productService: ProductService,
    @Inject('ICategoryService')
    private readonly categoryService: CategoryService,
  ) {}

  @Post('create-typeorm')
  async create(@Body() createProductDto: CreateProductDto) {
    try {
      await this.categoryService.findOne(createProductDto.categoryId);
      const resData = await this.productService.create(createProductDto);
      return resData;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to create product',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('get-all-typeorm')
  async findAll() {
    try {
      const resData = await this.productService.findAll();
      return resData;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to find product',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('get-typeorm/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const resData = await this.productService.findOne(id);
      return resData;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to find product',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch('update-typeorm/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    try {
      await this.productService.findOne(id);
      await this.categoryService.findOne(updateProductDto.categoryId);
      const resData = await this.productService.update(id, updateProductDto);
      return resData;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to update product',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('delete-typeorm/:id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.productService.findOne(id);
      const resData = await this.productService.remove(id);
      return resData;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to delete product',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
