import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("creditDebitCard")
export class CreditDebitCard{
    @PrimaryGeneratedColumn()
    cardID: string;

    @PrimaryGeneratedColumn()
    userID: string;

    @Column()
    cardNumber : string

    @Column()
    expired : Date

    @Column()
    cvv : string

    @Column()
    address : string

    @Column()
    postCode : string

    @Column()
    city : string

    @Column()
    country : string
}