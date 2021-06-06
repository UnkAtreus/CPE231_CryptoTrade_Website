import { Bank } from 'src/models/object/bank.model';
import { BankNum } from 'src/models/object/banknum.model';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Gender } from 'src/static/enum';
import { Role } from './role.model';
import { Wallet } from './wallet.model';
import { CreditCard } from './creditcard.model';
import { TransactionFiat } from './transactionFiat.model';
import { Verification } from './verification.model';
import { verify } from 'crypto';

@ObjectType()
@Entity()
export class User {
  @PrimaryGeneratedColumn({ zerofill: true })
  id?: number;

  @Field(() => Role)
  @ManyToOne(() => Role, (role) => role.user)
  role?: Role;

  @Field(() => String)
  @Column({ length: 64 })
  firstName?: string;

  @Field(() => String)
  @Column({ length: 64 })
  lastName?: string;

  @Field(() => String)
  @Column('text', { nullable: false, unique: true })
  email?: string;

  @Field(() => String)
  @Column('varchar', { length: 15 })
  phone?: string;

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

  @Field(() => String)
  @Column({ type: 'enum', enum: Gender })
  gender?: Gender;

  @Field(() => String)
  @Column('text')
  address?: string;

  @Field(() => String)
  @Column({ length: 64 })
  city?: string;

  @Field(() => String)
  @Column({ type: 'varchar', length: 6 })
  postcode?: string;

  @Field(() => String)
  @Column({ type: 'varchar', length: 64 })
  password?: string;

  @Field(() => String)
  @Column({ nullable: true, length: 6 })
  pincode?: string;

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

  @Field(() => [BankNum])
  @OneToMany(() => BankNum, (bankNum) => bankNum.user)
  bank?: BankNum[];

  @Field(() => [TransactionFiat])
  @OneToMany(() => TransactionFiat, (transactionFiat) => transactionFiat.user)
  transactionFiat?: TransactionFiat[];

  @OneToMany(() => Verification, (veri) => veri.user)
  verification?: Verification;
}
//   @Field((type) => [InvoiceModel], { nullable: true })
//   @OneToMany((type) => InvoiceModel, (invoice) => invoice.customer)
//   invoices: InvoiceModel[];
