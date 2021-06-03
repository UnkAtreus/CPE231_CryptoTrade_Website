import { CurrencyModule } from './../currency/currency.module';
import { Module } from '@nestjs/common';
import { TransactionCryptoService } from './transaction-crypto.service';
import { TransactionCryptoResolver } from './transaction-crypto.resolver';
import { CurrencyService } from '../currency/currency.service';
import { WalletService } from '../wallet/wallet.service';
import { TransactionCrypto } from 'src/models/object/transactionCrypto.model';
import { WalletModule } from '../wallet/wallet.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [WalletModule, UserModule, CurrencyModule],
  providers: [TransactionCryptoResolver, TransactionCryptoService],
  exports: [TransactionCryptoService],
})
export class TransactionCryptoModule {}
