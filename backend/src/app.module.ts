import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { RepoModule } from './repo/repo.module';
import { CardModule } from './modules/card/card.module';
import graphql_config from './config/graphql.config';
import typeorm_config from './config/orm.config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './middleware/guard/auth.guard';
import { OrderModule } from './modules/order/order.module';
import { PubSub } from 'graphql-subscriptions';
import { ScheduleModule } from '@nestjs/schedule';
import { TestResolver } from './test/test.resolver';
@Module({
  imports: [
    GraphQLModule.forRoot(graphql_config),
    TypeOrmModule.forRoot(typeorm_config),
    ScheduleModule.forRoot(),
    RepoModule,
    UserModule,
    CardModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
    TestResolver,
  ],
})
export class AppModule {}
