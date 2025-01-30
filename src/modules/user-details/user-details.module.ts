import { Module } from '@nestjs/common';
import { UserDetailsService } from './user-details.service';
import { UserDetailsController } from './user-details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDetail } from './entities/user-detail.entity';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user.repository';
import { UserDetailsRepository } from './user-details.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserDetail, UserEntity])],
  controllers: [UserDetailsController],
  providers: [
    { provide: 'IUserDetailsService', useClass: UserDetailsService },
    { provide: 'IUserDetailRepository', useClass: UserDetailsRepository },
    { provide: 'IUserService', useClass: UserService },
    { provide: 'IUserRepository', useClass: UserRepository },
  ],
})
export class UserDetailsModule {}
