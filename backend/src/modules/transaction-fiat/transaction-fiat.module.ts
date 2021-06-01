import { Module } from '@nestjs/common';
import { CurrencyService } from '../currency/currency.service';
import { UserModule } from '../user/user.module';
import { WalletModule } from '../wallet/wallet.module';
import { WalletService } from '../wallet/wallet.service';
import { TransactionFiatResolver } from './transaction-fiat.resolver';
import { TransactionFiatService } from './transaction-fiat.service';

@Module({
  imports: [WalletModule, UserModule],
  providers: [
    TransactionFiatResolver,
    TransactionFiatService,
    CurrencyService,
    WalletService,
  ],
  exports: [TransactionFiatService],
})
export class TransactionFiatModule {}
