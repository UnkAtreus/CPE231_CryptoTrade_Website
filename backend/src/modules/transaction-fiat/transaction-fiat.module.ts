import { Module } from '@nestjs/common';
import { TransactionFiatResolver } from './transaction-fiat.resolver';
import { TransactionFiatService } from './transaction-fiat.service';

@Module({
  providers: [TransactionFiatResolver, TransactionFiatService],
})
export class TransactionFiatModule {}
