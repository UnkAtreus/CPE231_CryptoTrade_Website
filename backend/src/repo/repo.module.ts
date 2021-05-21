import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Role } from "src/models/role.model";
import { User } from "src/models/user.model";
import { RepoService } from "./repo.service";

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  providers: [RepoService],
  exports: [RepoService],
})
export class RepoModule {}
