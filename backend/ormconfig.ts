import { TypeOrmModuleOptions } from "@nestjs/typeorm";

const config: TypeOrmModuleOptions = {
  type: "mariadb",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "123456",
  database: "cryptotrade",
  entities: [],
  synchronize: true,
};

export default config;
