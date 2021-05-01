import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BankType } from "./bankType.entity";
import { CreditDebitCard } from "./creditDebitCard.entity";
import { TransactionMethod } from "./transactionMethod.entity";
import { User } from "./user.entity";
import { Wallet } from "./wallet.entity";

@Entity("transactionFiat")
export class TransactionFiat{
    @PrimaryGeneratedColumn()
    transactionID: string;

    @ManyToOne(() => User, user => User.userID)
    user: User;

    @ManyToOne(() => TransactionMethod, method => TransactionMethod.methodID)
    methodID : TransactionMethod;

    @ManyToOne(() => CreditDebitCard, card => CreditDebitCard.cardID)
    cardID : CreditDebitCard;

    @ManyToOne(() =>  Wallet, currency => Wallet.currencyID)
    currency : Wallet;
    
    @ManyToOne(() =>  BankType, bank => BankType.bankTypeID)
    bank : Wallet;

    @Column()
    DateTime : Date;

    @Column()
    amount : number;

    @Column()
    bankNumber : number;

    @Column()
    totalBalance : number;

}