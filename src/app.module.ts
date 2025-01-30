import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatchEverythingFilter } from 'src/lib/exceptionFilter';
import { UserModule } from './modules/user/user.module';
import { ProductModule } from './modules/product/product.module';
import { CategoryModule } from './modules/category/category.module';
import { UserProductModule } from './modules/user-product/user-product.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserDetailsModule } from './modules/user-details/user-details.module';
import { typeormConfig } from './config/typeorm-config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    UserModule,
    ProductModule,
    CategoryModule,
    UserProductModule,
    AuthModule,
    UserDetailsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: CatchEverythingFilter,
    },
  ],
})
export class AppModule {}
