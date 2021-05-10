import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Wallet } from "./wallet.entity";
import { Currency } from "./currency.entity";

@Entity("p2p")
export class P2PHistory {
  @PrimaryGeneratedColumn()
  p2pID: string;

  @ManyToOne(() => User, (userFrom) => User.userID)
  userFrom: User;

  @ManyToOne(() => User, (userTo) => User.userID)
  userTo: User;

  @ManyToOne(() => Currency, (currency) => currency.currencyID)
  currency: Currency;

  @Column()
  amount: number;
}
