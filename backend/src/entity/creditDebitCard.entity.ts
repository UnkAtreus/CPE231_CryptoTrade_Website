import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity("creditDebitCard")
export class CreditDebitCard{
    @PrimaryGeneratedColumn()
    cardID: string;

    @ManyToOne(() => User, user => User.userID)
    user: User;

    @Column()
    cardNumber : string;

    @Column()
    expired : Date;

    @Column()
    cvv : string;

    @Column()
    address : string;

    @Column()
    postCode : string;

    @Column()
    city : string;

    @Column()
    country : string;
    static cardID: any;
}