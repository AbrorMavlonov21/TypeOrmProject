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
import { UserProductService } from './user-product.service';
import { CreateUserProductDto } from './dto/create-user-product.dto';
import { UpdateUserProductDto } from './dto/update-user-product.dto';
import { UserService } from '../user/user.service';
import { ProductService } from '../product/product.service';

@Controller('user-product')
export class UserProductController {
  constructor(
    @Inject('IUserProductService')
    private readonly userProductService: UserProductService,
    @Inject('IUserService')
    private readonly userService: UserService,
    @Inject('IProductService')
    private readonly productService: ProductService,
  ) {}

  @Post('create-typeorm')
  async create(@Body() createUserProductDto: CreateUserProductDto) {
    try {
      const user = await this.userService.findOne(createUserProductDto.userId);
      const product = await this.productService.findOne(
        createUserProductDto.productId,
      );
      const resData = await this.userProductService.create({
        userId: user.data.id,
        productId: product.data.id,
        quantity: createUserProductDto.quantity,
      });
      return resData;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to create User and Products',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('get-all-typeorm')
  async findAll() {
    try {
      const resData = await this.userProductService.findAll();
      return resData;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to find Users and Products',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('get-typeorm/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const resData = await this.userProductService.findOne(id);
      return resData;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to find User and Products',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch('update-typeorm/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserProductDto: UpdateUserProductDto,
  ) {
    try {
      await this.userService.findOne(updateUserProductDto.userId);
      await this.productService.findOne(updateUserProductDto.productId);
      const resData = await this.userProductService.update(
        id,
        updateUserProductDto,
      );
      return resData;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to update User',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('delete-typeorm/:id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.userProductService.findOne(id);
      const resData = await this.userProductService.remove(id);
      return resData;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to delete User',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
