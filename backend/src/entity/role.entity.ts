import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("role")
export class Role{
    @PrimaryGeneratedColumn()
    roleID: string;

    @Column()
    amount : string;
}