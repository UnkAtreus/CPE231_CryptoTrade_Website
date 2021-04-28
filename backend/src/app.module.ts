import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { LoginModule } from "./login/login.module";
import { RegisterModule } from "./register/register.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import config from "../ormconfig";
import { User } from "./entity/user.entity";

@Module({
  imports: [
    LoginModule,
    RegisterModule,
    TypeOrmModule.forRoot(config),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
