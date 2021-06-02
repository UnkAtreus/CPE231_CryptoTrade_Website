import { CurrencyModule } from './../currency/currency.module';
import { Module } from '@nestjs/common';
import { CurrencyService } from '../currency/currency.service';
import { TransactionFiatResolver } from '../transaction-fiat/transaction-fiat.resolver';
import { TransactionFiatService } from '../transaction-fiat/transaction-fiat.service';
import { UserModule } from '../user/user.module';
import { WalletModule } from '../wallet/wallet.module';
import { WalletService } from '../wallet/wallet.service';
import { P2PResolver } from './p2p.resolver';
import { P2PService } from './p2p.service';

@Module({
  imports: [WalletModule, UserModule, CurrencyModule],
  providers: [P2PService, P2PResolver],
})
export class P2PModule {}
