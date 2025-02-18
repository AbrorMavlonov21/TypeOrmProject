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
import { CacheModule } from '@nestjs/cache-manager';
import { Keyv } from 'keyv';
import { CacheableMemory } from 'cacheable';
import { createKeyv } from '@keyv/redis';

@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: async () => {
        return {
          stores: [
            new Keyv({
              store: new CacheableMemory({ lruSize: 5000 }),
            }),
            createKeyv('redis://localhost:6379'),
          ],
        };
      },
      isGlobal: true,
    }),
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
