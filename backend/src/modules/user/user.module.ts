import { Module } from '@nestjs/common';
import { WalletService } from '../wallet/wallet.service';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { WalletModule } from '../wallet/wallet.module';
import { CurrencyModule } from '../currency/currency.module';

@Module({
  imports: [WalletModule, CurrencyModule],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
