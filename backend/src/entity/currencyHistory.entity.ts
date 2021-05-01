import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("currencHistory")
export class CurrencHistory{
    @PrimaryGeneratedColumn()
    currencyHistoryID: string;

    @PrimaryGeneratedColumn()
    currencyID: string;

    @Column()
    DateTime : Date

    @Column()
    open : number

    @Column()
    close : number

    @Column()
    high : number

    @Column()
    low : number
}