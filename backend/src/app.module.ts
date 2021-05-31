import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { RepoModule } from './repo/repo.module';
import { CardModule } from './card/card.module';
import graphql_config from './config/graphql.config';
import typeorm_config from './config/orm.config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './middleware/guard/auth.guard';
@Module({
  imports: [
    GraphQLModule.forRoot(graphql_config),
    TypeOrmModule.forRoot(typeorm_config),
    RepoModule,
    UserModule,
    CardModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
