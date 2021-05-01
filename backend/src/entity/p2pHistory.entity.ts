import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Wallet } from "./wallet.entity";

@Entity("p2p")
export class P2PHistory{
    @PrimaryGeneratedColumn()
    p2pID: string;

    @ManyToOne(() => User, userFrom => User.userID)
    userFrom: User;
    
    @ManyToOne(() => User, userTo => User.userID)
    userTo: User;

    @ManyToOne(() =>  Wallet , currency => Wallet.currencyID)
    currency : Wallet;
    
    @Column()
    amount : number;

}