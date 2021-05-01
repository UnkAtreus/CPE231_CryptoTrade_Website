import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TransactionMethod } from "./transactionMethod.entity";
import { User } from "./user.entity";
import { Wallet } from "./wallet.entity";

@Entity("transactionCrypto")
export class TransactionCrypto{
    @PrimaryGeneratedColumn()
    transactionID: string;

    @ManyToOne(() => User, user => User.userID)
    user: User;

    @ManyToOne(() => TransactionMethod, method => TransactionMethod.methodID)
    methodID : TransactionMethod;

    @ManyToOne(() =>  Wallet, currency => Wallet.currencyID)
    currency : Wallet;
    
    @Column()
    walletAddress : string;

    @Column()
    DateTime : Date;

    @Column()
    amount : number;

    @Column()
    totalBalance : number;

}