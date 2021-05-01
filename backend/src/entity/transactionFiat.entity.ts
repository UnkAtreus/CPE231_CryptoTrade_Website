import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("transactionFiat")
export class TransactionFiat{
    @PrimaryGeneratedColumn()
    transactionID: string;

    @PrimaryGeneratedColumn()
    userID: string;

    @Column()
    methodID : string

    @Column()
    cardID : string

    @Column()
    currencyID : string

    @Column()
    bankTypeID : string

    @Column()
    DateTime : Date

    @Column()
    amount : number

    @Column()
    bankNumber : number

    @Column()
    totalBalance : number

}