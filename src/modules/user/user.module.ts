import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { SharedModule } from 'src/shared/shared.module';
import { UserDetail } from '../user-details/entities/user-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserDetail]), SharedModule],
  controllers: [UserController],
  providers: [
    { provide: 'IUserService', useClass: UserService },
    { provide: 'IUserRepository', useClass: UserRepository },
  ],
})
export class UserModule {}
