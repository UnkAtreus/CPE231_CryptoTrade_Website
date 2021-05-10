import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Currency } from "./currency.entity";
import { Wallet } from "./wallet.entity";

@Entity("currencHistory")
export class CurrencHistory {
  @PrimaryGeneratedColumn()
  currencyHistoryID: string;

  @ManyToOne(() => Currency, (currency) => currency.currencyID)
  currency: Currency;

  @Column()
  DateTime: Date;

  @Column()
  open: number;

  @Column()
  close: number;

  @Column()
  high: number;

  @Column()
  low: number;
}
