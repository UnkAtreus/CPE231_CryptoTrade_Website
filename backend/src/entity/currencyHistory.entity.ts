import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Wallet } from "./wallet.entity";

@Entity("currencHistory")
export class CurrencHistory{
    @PrimaryGeneratedColumn()
    currencyHistoryID: string;

    @ManyToOne(() =>  Wallet, currency => Wallet.currencyID)
    currency : Wallet;
    
    @Column()
    DateTime : Date;

    @Column()
    open : number;

    @Column()
    close : number;

    @Column()
    high : number;

    @Column()
    low : number;
}