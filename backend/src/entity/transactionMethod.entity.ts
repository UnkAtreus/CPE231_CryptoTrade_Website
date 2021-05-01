import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("transactionMethod")
export class TransactionMethod{
    @PrimaryGeneratedColumn()
    methodID: string;

    @Column()
    method: string;
    static methodID: any;
}