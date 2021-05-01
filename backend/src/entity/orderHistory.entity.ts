import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Wallet } from "./wallet.entity";

@Entity("order")
export class Order{
    @PrimaryGeneratedColumn()
    orderID: string;

    @ManyToOne(() => User, user => User.userID)
    user: User;

    @ManyToOne(() =>  Wallet, currencyFrom => Wallet.currencyID)
    currencyFrom : Wallet;

    @ManyToOne(() =>  Wallet, currencyTO => Wallet.currencyID)
    currencyTO : Wallet;

    @Column()
    DateTimeOrder : Date;

    @Column()
    DateTimeTrade : Date;

    @Column()
    cancel : boolean;

    @Column()
    filed : boolean;

    @Column()
    order : boolean;

    @Column()
    amount : number;

    @Column()
    price : number;

}