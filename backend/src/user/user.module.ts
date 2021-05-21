import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Role } from "src/models/role.model";
import { User } from "src/models/user.model";
import { UserResolver } from "./user.resolver";
import { UserService } from './user.service';

@Module({
  providers: [UserResolver, UserService],

})
export class UserModule {}
