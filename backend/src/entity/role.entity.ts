import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity("role")
export class Role{
    @ManyToOne(() => User, role => User.roleID)
    role : User;

    @Column()
    amount : string;
}