import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity";
import { Currency } from "./currency.entity";

@Entity("wallet")
export class Wallet {
  @PrimaryColumn()
  @ManyToOne(() => User, (user) => User.userID)
  user: User;

  @PrimaryColumn()
  @ManyToOne(() => Currency, (currency) => currency.currencyID)
  currencyID: Currency;

  @Column()
  amount: number;
}
