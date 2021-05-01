import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("transactionCrypto")
export class TransactionCrypto{
    @PrimaryGeneratedColumn()
    transactionID: string;

    @PrimaryGeneratedColumn()
    userID: string;

    @Column()
    methodID : string

    @Column()
    currencyID : string

    @Column()
    walletAddress : string

    @Column()
    DateTime : Date

    @Column()
    amount : number

    @Column()
    totalBalance : number

}