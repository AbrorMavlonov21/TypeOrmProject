import * as dotenv from 'dotenv';
import { IConfig } from './interfaces/config.interface';

dotenv.config();

export const config: IConfig = {
  PORT: Number(process.env.PORT),
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || '',
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || '',
  DB_USER: process.env.DB_USER || '',
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  DB_NAME: process.env.DB_NAME || '',
  DB_PORT: Number(process.env.DB_PORT),
  DB_HOST: process.env.DB_HOST,
};
