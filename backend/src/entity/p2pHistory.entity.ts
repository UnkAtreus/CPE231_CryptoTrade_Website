import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("p2p")
export class P2PHistory{
    @PrimaryGeneratedColumn()
    p2pID: string;

    @PrimaryGeneratedColumn()
    userIDFrom: string;

    @Column()
    userIDTo : string

    @Column()
    currencyID : string

    @Column()
    amount : number

}