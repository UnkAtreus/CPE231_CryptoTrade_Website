import { Module } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import { UserModule } from '../user/user.module';
import { WalletModule } from '../wallet/wallet.module';
import { WalletService } from '../wallet/wallet.service';
import { CardResolver } from './card.resolver';
import { CardService } from './card.service';

@Module({
  imports: [UserModule, WalletModule],
  providers: [CardService, CardResolver],
  exports: [CardService],
})
export class CardModule {}
