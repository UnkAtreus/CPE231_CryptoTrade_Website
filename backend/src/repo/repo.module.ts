<<<<<<< HEAD
import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Bank } from "src/models/bank.model";
import { CreditCard } from "src/models/creditcard.model";
import { Currency } from "src/models/currency.model";
import { Order } from "src/models/order.model";
import { PtoP } from "src/models/ptop.model";
import { Role } from "src/models/role.model";
import { User } from "src/models/user.model";
import { RepoService } from "./repo.service";
import { TransactionCrypto } from "../models/transactionCrypto.model";
import { TransactionFiat } from "../models/transactionFiat.model";
import { Wallet } from "src/models/wallet.model";
=======
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/models/role.model';
import { User } from 'src/models/user.model';
import { RepoService } from './repo.service';
>>>>>>> 82c1ec5acb062973f512147c6436451ca2056819

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
