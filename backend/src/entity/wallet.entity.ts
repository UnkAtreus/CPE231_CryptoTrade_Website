import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity("wallet")
export class Wallet{
    @ManyToOne(() => User, user => User.userID)
    user: User;

    @PrimaryGeneratedColumn()
    currencyID: string;

    @Column()
    amount : number
    static currencyID: any;
}