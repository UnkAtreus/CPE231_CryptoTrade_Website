import { Module } from '@nestjs/common';
import { OrderResolver } from './order.resolver';
import { OrderService } from './order.service';
import { WalletModule } from '../wallet/wallet.module';
import { UserModule } from '../user/user.module';
import { PubSub } from 'graphql-subscriptions';

@Module({
  imports: [WalletModule, UserModule],
  providers: [
    OrderResolver,
    OrderService,
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
  ],
  exports: [OrderService],
})
export class OrderModule {}
