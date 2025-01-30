import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from './index';

export const typeormConfig: DataSourceOptions = {
  type: 'postgres',
  host: config.DB_HOST,
  port: Number(config.DB_PORT),
  username: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  entities: [__dirname + '/../modules/**/entities/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
  synchronize: false,
};

const dataSource = new DataSource(typeormConfig);
export default dataSource;
