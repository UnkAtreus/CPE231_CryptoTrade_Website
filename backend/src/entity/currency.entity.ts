import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("currency")
export class Currency{
    @PrimaryGeneratedColumn()
    currencyID: string;

    @Column()
    currencyName: string;

    @Column()
    volumn : number
}