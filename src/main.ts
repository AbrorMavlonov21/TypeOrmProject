import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from '../config/index';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(config.PORT, (): void => {
    console.log('http://localhost:3000');
  });
}
bootstrap();
