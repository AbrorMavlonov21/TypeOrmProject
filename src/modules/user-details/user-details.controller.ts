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
import { UserDetailsService } from './user-details.service';
import { CreateUserDetailDto } from './dto/create-user-detail.dto';
import { UpdateUserDetailDto } from './dto/update-user-detail.dto';
import { UserService } from '../user/user.service';

@Controller('user-details')
export class UserDetailsController {
  constructor(
    @Inject('IUserDetailsService')
    private readonly userDetailsService: UserDetailsService,
    @Inject('IUserService')
    private readonly userService: UserService,
  ) {}

  @Post('create-typeorm')
  async create(@Body() createUserDetailDto: CreateUserDetailDto) {
    try {
      const user = await this.userDetailsService.getByFullname(
        createUserDetailDto.fullname,
      );
      if (user.meta.statusCode === 200) {
        throw new HttpException(
          'User with this name already exist',
          HttpStatus.BAD_REQUEST,
        );
      }
      await this.userService.findOne(createUserDetailDto.userId);
      const resData = await this.userDetailsService.create(createUserDetailDto);
      return resData;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      if (
        error.code === '23505' ||
        error.message.includes('duplicate key value violates unique constraint')
      ) {
        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'User details already exist for this user.',
            error: 'Bad Request',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Failed to create User Details',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('get-all-typeorm')
  async findAll() {
    try {
      const resData = await this.userDetailsService.findAll();
      return resData;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to find Users details',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('get-typeorm/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const resData = await this.userDetailsService.findOne(id);
      return resData;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to find User details',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch('update-typeorm/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDetailDto: UpdateUserDetailDto,
  ) {
    try {
      await this.userDetailsService.findOne(id);
      const user = await this.userDetailsService.getByFullname(
        updateUserDetailDto.fullname,
      );
      if (user.meta.statusCode === 200 && user.data.id != id) {
        throw new HttpException(
          'User with this name already exist',
          HttpStatus.BAD_REQUEST,
        );
      }
      const resData = await this.userDetailsService.update(
        id,
        updateUserDetailDto,
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
      await this.userDetailsService.findOne(id);
      const resData = await this.userDetailsService.remove(id);
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
