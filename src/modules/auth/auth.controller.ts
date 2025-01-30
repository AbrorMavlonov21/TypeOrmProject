import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login-typeorm')
  async login(@Body() createAuthDto: CreateAuthDto) {
    try {
      const resData = await this.authService.login(createAuthDto);
      return resData;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to Login',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Post('register-typeorm')
  async register(@Body() createAuthDto: CreateAuthDto) {
    try {
      const resData = await this.authService.register(createAuthDto);
      return resData;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to register',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
