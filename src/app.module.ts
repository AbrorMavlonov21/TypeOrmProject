import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from '../config/index';
import { CatchEverythingFilter } from 'lib/exceptionFilter';
import { UserModule } from './modules/user/user.module';
import { ProductModule } from './modules/product/product.module';
import { CategoryModule } from './modules/category/category.module';
import { UserProductModule } from './modules/user-product/user-product.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config.DB_HOST,
      port: Number(config.DB_PORT),
      username: config.DB_USER,
      password: config.DB_PASSWORD,
      database: config.DB_NAME,
      entities: [__dirname + '/modules/**/entities/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UserModule,
    ProductModule,
    CategoryModule,
    UserProductModule,
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
