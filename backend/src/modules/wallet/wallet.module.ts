import { Module } from '@nestjs/common';
import { WalletResolver } from './wallet.resolver';
import { WalletService } from './wallet.service';
import { CurrencyService } from '../currency/currency.service';
import { CurrencyModule } from '../currency/currency.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [CurrencyModule, UserModule],
  providers: [WalletResolver, WalletService, CurrencyService],
  exports: [WalletService],
})
export class WalletModule {}
