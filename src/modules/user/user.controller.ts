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
  UseGuards,
  // UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Bcrypt } from '../../lib/bcrypt';
import { Roles } from '../../role/roles.decorator';
import { Role } from '../../role/role.enum';
import { JwtAuthGuard } from '../../shared/jwt.guard';
import { RolesGuard } from '../../role/roles.guard';
// import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';

@Controller('user')
export class UserController {
  constructor(
    @Inject('IUserService')
    private readonly userService: UserService,
  ) {}

  @Post('create-typeorm')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const { meta } = await this.userService.getByLogin(createUserDto.login);
      if (meta.statusCode === 200) {
        throw new HttpException(
          'User with this Login name already exist',
          HttpStatus.BAD_REQUEST,
        );
      }
      const hashedPassword = await Bcrypt.hash(createUserDto.password);
      const dto = { ...createUserDto, password: hashedPassword };
      const resData = await this.userService.create(dto);
      return resData;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to create User',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  // @UseInterceptors(CacheInterceptor)
  // @Get('get-all-typeorm')
  // @CacheKey('all_users_data')
  // @CacheTTL(60000)
  async findAll() {
    try {
      console.log('Cache Key: all_users_data');
      const resData = await this.userService.findAll();
      return resData;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to find Users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  // @UseInterceptors(CacheInterceptor)
  @Get('get-typeorm/:id')
  // @CacheKey('user_data')
  // @CacheTTL(60)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const resData = await this.userService.findOne(id);
      return resData;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to find User',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch('update-typeorm/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      await this.userService.findOne(id);
      const user = await this.userService.getByLogin(updateUserDto.login);
      if (user.meta.statusCode === 200 && user.data.id != id) {
        throw new HttpException(
          'User with this Login name already exist',
          HttpStatus.BAD_REQUEST,
        );
      }
      const hashedPassword = await Bcrypt.hash(updateUserDto.password);
      const dto = { ...updateUserDto, password: hashedPassword };
      const resData = await this.userService.update(id, dto);
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
      await this.userService.findOne(id);
      const resData = await this.userService.remove(id);
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
