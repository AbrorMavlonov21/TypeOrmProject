import { Module } from '@nestjs/common';
import { JwtStrategy } from './jwtStrategy';
import { JwtModule } from '@nestjs/jwt';
import { config } from '../config/index';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from 'src/modules/user/user.service';
import { UserRepository } from 'src/modules/user/user.repository';
import { UserEntity } from 'src/modules/user/entities/user.entity';

@Module({
  imports: [
    JwtModule.register({ secret: config.JWT_ACCESS_SECRET, global: true }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [
    { provide: 'IUserService', useClass: UserService },
    { provide: 'IUserRepository', useClass: UserRepository },
    JwtStrategy,
  ],
  exports: [
    { provide: 'IUserService', useClass: UserService },
    { provide: 'IUserRepository', useClass: UserRepository },
    JwtStrategy,
  ],
})
export class SharedModule { }
