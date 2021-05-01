import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("order")
export class Order{
    @PrimaryGeneratedColumn()
    orderID: string;

    @PrimaryGeneratedColumn()
    userID: string;

    @Column()
    currencyIDFrom : string

    @Column()
    currencyIDTo : string

    @Column()
    DateTimeOrder : Date

    @Column()
    DateTimeTrade : Date

    @Column()
    cancel : boolean

    @Column()
    filed : boolean

    @Column()
    order : boolean

    @Column()
    amount : number

    @Column()
    price : number

}