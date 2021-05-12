import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Wallet } from "./wallet.entity";
import { Currency } from "./currency.entity";

@Entity("order")
export class Order {
  @PrimaryGeneratedColumn()
  orderID: string;

  @ManyToOne(() => User, (user) => User.userID)
  user: User;

  @ManyToOne(() => Currency, (currencyFrom) => currencyFrom.currencyID)
  currencyFrom: Currency;

  @ManyToOne(() => Currency, (currencyTO) => currencyTO.currencyID)
  currencyTO: Currency;

  @Column()
  DateTimeOrder: Date;

  @Column()
  DateTimeTrade: Date;

  @Column()
  cancel: boolean;

  @Column()
  filed: boolean;

  @Column()
  order: boolean;

  @Column()
  amount: number;

  @Column()
  price: number;
}
