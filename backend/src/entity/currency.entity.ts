import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Wallet } from "./wallet.entity";

@Entity("currency")
export class Currency{
    @ManyToOne(() =>  Wallet , currency => Wallet.currencyID)
    currency : Wallet;

    @Column()
    currencyName: string;

    @Column()
    volumn : number;
}