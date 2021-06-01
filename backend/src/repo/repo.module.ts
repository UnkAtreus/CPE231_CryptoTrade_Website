import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bank } from 'src/models/object/bank.model';
import { CreditCard } from 'src/models/object/creditcard.model';
import { Currency } from 'src/models/object/currency.model';
import { Order } from 'src/models/object/order.model';
import { PtoP } from 'src/models/object/ptop.model';
import { Role } from 'src/models/object/role.model';
import { User } from 'src/models/object/user.model';
import { RepoService } from './repo.service';
import { TransactionCrypto } from '../models/object/transactionCrypto.model';
import { TransactionFiat } from '../models/object/transactionFiat.model';
import { Wallet } from 'src/models/object/wallet.model';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Role,
      Bank,
      CreditCard,
      Currency,
      Order,
      PtoP,
      TransactionCrypto,
      TransactionFiat,
      Wallet,
    ]),
  ],
  providers: [RepoService],
  exports: [RepoService],
})
export class RepoModule {}
