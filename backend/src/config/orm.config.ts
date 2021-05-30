import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const typeorm_config: TypeOrmModuleOptions = {
  type: 'mariadb',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'crypto',
  synchronize: true,
  entities: ['dist/**/*.model.js'],
};
export default typeorm_config;