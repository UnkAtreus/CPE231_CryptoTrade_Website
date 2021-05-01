import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("wallet")
export class Wallet{
    @PrimaryGeneratedColumn()
    userID: string;

    @PrimaryGeneratedColumn()
    currencyID: string;

    @Column()
    amount : number
}