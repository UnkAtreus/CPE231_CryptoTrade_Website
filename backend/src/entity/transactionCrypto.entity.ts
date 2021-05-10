import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Currency } from "./currency.entity";
import { TransactionMethod } from "./transactionMethod.entity";
import { User } from "./user.entity";
import { Wallet } from "./wallet.entity";

@Entity("transactionCrypto")
export class TransactionCrypto {
  @PrimaryGeneratedColumn()
  transactionID: string;

  @ManyToOne(() => User, (user) => User.userID)
  user: User;

  @ManyToOne(() => TransactionMethod, (method) => method.methodID)
  methodID: TransactionMethod;

  @ManyToOne(() => Currency, (currency) => currency.currencyID)
  currency: Currency;

  @Column()
  walletAddress: string;

  @Column()
  DateTime: Date;

  @Column()
  amount: number;

  @Column()
  totalBalance: number;
}
