import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("bankType")
export class BankType{
    @PrimaryGeneratedColumn()
    bankTypeID: string;

    @Column()
    bankType: string;
}