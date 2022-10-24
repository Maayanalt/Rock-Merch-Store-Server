/* eslint-disable prettier/prettier */
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'Aa123456',
  database: 'rock_merch',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
};
