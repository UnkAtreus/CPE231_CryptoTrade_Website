import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Wallet } from "./wallet.entity";

@Entity("currency")
export class Currency {
  @PrimaryGeneratedColumn()
  currencyID: string;

  @Column()
  currencyName: string;

  @Column()
  volumn: number;
}
