import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("transactionMethod")
export class transactionMethod{
    @PrimaryGeneratedColumn()
    methodID: string;

    @Column()
    method: string;
}