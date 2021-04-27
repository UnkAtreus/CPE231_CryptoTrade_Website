import { Gender } from "src/common/constrants/gender";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class user{
    @PrimaryGeneratedColumn()
    id: string;

    @Column({length: 11})
    roleID: number;

    @Column({length: 64})
    firstName: string;

    @Column({length: 64})
    lastName: string;

    @Column({length: 64})
    email: string;

    @Column({length: 64})
    nationality:  string;

    @Column({length: 2})
    countryCode:  string;

    @Column({length: 13})
    citizenID: string;

    @Column({length: 8})
    passportNumber: string;

    @Column({length: 10})
    telephone: string;

    @Column()
    birthDate: Date;

    @Column({length: 1})
    gender: Gender;

    @Column()
    address: string;

    @Column({length: 64})
    city: string;

    @Column({length: 6})
    postcode: string;

    @Column({length: 64})
    password: string;

    @Column({length: 6})
    pincode: string;

    @Column({length: 64})
    token: string;

    @Column({length: 1})
    verify: number;
}