import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { RepoModule } from './repo/repo.module';
import { LoginModule } from './login/login.module';
import { CardResolver } from './card/card.resolver';
import { CardModule } from './card/card.module';
import graphql_config from './config/graphql.config';
import typeorm_config from './config/orm.config';
@Module({
  imports: [
    GraphQLModule.forRoot(graphql_config),
    TypeOrmModule.forRoot(typeorm_config),
    RepoModule,
    UserModule,
    LoginModule,

    CardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
