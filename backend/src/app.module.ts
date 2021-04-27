import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { LoginModule } from "./login/login.module";
import { RegisterModule } from "./register/register.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import config from "../ormconfig";
import { user } from "./entity/user.entity";

@Module({
  imports: [
    LoginModule,
    RegisterModule,
    TypeOrmModule.forRoot({
      "type": "mysql",
      "host": "localhost",
      "port": 3306,
      "username": "root",
      "password": "123456",
      "database": "cryptotrade",
      "entities": [user],
      "synchronize": true
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
