import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { LoginModule } from "./login/login.module";
import { RegisterModule } from "./register/register.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./user/user.module";
import config from "../ormconfig";

@Module({
  imports: [
    LoginModule,
    RegisterModule,
    TypeOrmModule.forRoot(config),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
