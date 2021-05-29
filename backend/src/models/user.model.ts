import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
<<<<<<< HEAD
} from "typeorm";
import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Gender } from "src/enum/enum";
import { Role } from "./role.model";
import { Wallet } from "./wallet.model";
import { CreditCard } from "./creditcard.model";
import { TransactionFiat } from "./transactionFiat.model";
=======
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Gender } from 'src/enum/enum';
import { Role } from './role.model';
>>>>>>> 82c1ec5acb062973f512147c6436451ca2056819

@ObjectType()
@Entity()
export class User {
  @Field((type) => ID)
<<<<<<< HEAD
  @PrimaryGeneratedColumn()
=======
  @PrimaryGeneratedColumn('uuid')
>>>>>>> 82c1ec5acb062973f512147c6436451ca2056819
  id: string;

  @Field(() => Role)
  @ManyToOne(() => Role, (role) => role.user)
  role?: Role;

  @Field(() => String)
  @Column({ length: 64 })
  firstName?: string;

  @Field(() => String)
  @Column({ length: 64 })
  lastName?: string;

<<<<<<< HEAD
  @Field(() => String)
  @Column("text", { nullable: false, unique: true })
  email?: string;

  @Field(() => String)
  @Column("varchar", { length: 15 })
  phone?: string;
=======
  @Field()
  @Column('text', { nullable: false, unique: true })
  email: string;

  @Field()
  @Column('varchar', { length: 15 })
  phone: string;
>>>>>>> 82c1ec5acb062973f512147c6436451ca2056819

  @Field(() => String)
  @Column({ length: 64 })
  nationality?: string;

  @Field(() => String)
  @Column({ length: 13, nullable: true })
  citizenID?: string;

  @Field(() => String)
  @Column({ length: 8, nullable: true })
  passportNumber?: string;

  @Field(() => String)
  @Column()
  birthDate?: Date;

<<<<<<< HEAD
  @Field(() => String)
  @Column({ type: "enum", enum: Gender })
  gender?: Gender;

  @Field(() => String)
  @Column("text")
  address?: string;
=======
  @Field()
  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

  @Field()
  @Column('text')
  address: string;
>>>>>>> 82c1ec5acb062973f512147c6436451ca2056819

  @Field(() => String)
  @Column({ length: 64 })
  city?: string;

<<<<<<< HEAD
  @Field(() => String)
  @Column({ type: "varchar", length: 6 })
  postcode?: string;

  @Field(() => String)
  @Column({ type: "varchar", length: 64 })
  password?: string;
=======
  @Field()
  @Column({ type: 'varchar', length: 6 })
  postcode: string;

  @Field()
  @Column({ type: 'varchar', length: 64 })
  password: string;
>>>>>>> 82c1ec5acb062973f512147c6436451ca2056819

  @Field(() => String)
  @Column({ nullable: true, length: 6 })
  pincode?: string;

  @Field(() => String)
  @Column({ nullable: true, length: 64 })
  token?: string;

  @Field(() => Boolean)
  @Column({ default: false })
  verify?: boolean;

  @Field()
  @Column()
  @CreateDateColumn()
  created_at?: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  updated_at?: Date;

  @Field(() => [Wallet])
  @OneToMany(() => Wallet, (wallet) => wallet.user)
  wallet?: Wallet[];

  @Field(() => [CreditCard])
  @OneToMany(() => CreditCard, (creditCard) => creditCard.user)
  creditCard?: CreditCard[];

  @Field(() => [TransactionFiat])
  @OneToMany(() => TransactionFiat, (transactionFiat) => transactionFiat.user)
  transactionFiat?: TransactionFiat[];
}
//   @Field((type) => [InvoiceModel], { nullable: true })
//   @OneToMany((type) => InvoiceModel, (invoice) => invoice.customer)
//   invoices: InvoiceModel[];
