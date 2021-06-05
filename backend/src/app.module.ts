import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
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
import { WalletModule } from './modules/wallet/wallet.module';
import { CurrencyModule } from './modules/currency/currency.module';
import { TransactionFiatModule } from './modules/transaction-fiat/transaction-fiat.module';
import { BankModule } from './modules/bank/bank.module';
import { TransactionCryptoModule } from './modules/transaction-crypto/transaction-crypto.module';
import { P2PModule } from './modules/p2p/p2p.module';

import { DownloadResolver } from './modules/uploadfile/download.resolver';
import { AppController } from './app.controller';
import { VerificationModule } from './modules/verification/verification.module';
import { RoleModule } from './modules/role/role.module';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot(graphql_config),
    TypeOrmModule.forRoot(typeorm_config),
    ScheduleModule.forRoot(),
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'uploads'),
    // }),
    RepoModule,
    UserModule,
    CardModule,
    OrderModule,
    WalletModule,
    CurrencyModule,
    TransactionFiatModule,
    BankModule,
    TransactionCryptoModule,
    P2PModule,
    VerificationModule,
    RoleModule,
    // TestsocketModule,
  ],
  controllers: [AppController],
  providers: [
    DownloadResolver,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
  ],
})
export class AppModule {}
