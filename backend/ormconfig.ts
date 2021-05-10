import { TypeOrmModuleOptions } from "@nestjs/typeorm";
// import { User } from "./src/entity/user.entity";

const config: TypeOrmModuleOptions = {
  type: "mariadb",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "123456",
  database: "cryptotrade",
  entities: ["../entity/*.entity.ts"],
  // entities: [User],
  synchronize: true,
};

export default config;
