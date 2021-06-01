import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { WalletModule } from '../wallet/wallet.module';
import { TransactionFiatResolver } from './transaction-fiat.resolver';
import { TransactionFiatService } from './transaction-fiat.service';

@Module({
  imports: [WalletModule, UserModule],
  providers: [TransactionFiatResolver, TransactionFiatService],
  exports: [TransactionFiatService],
})
export class TransactionFiatModule {}
