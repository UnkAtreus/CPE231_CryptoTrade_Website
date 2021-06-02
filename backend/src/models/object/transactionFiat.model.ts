import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { TranasctionMethod } from 'src/static/enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Bank } from './bank.model';
import { User } from './user.model';
import { Currency } from './currency.model';
import { CreditCard } from './creditcard.model';
import { Wallet } from './wallet.model';
@ObjectType()
@Entity()
/// THIS IS FOR TRANSACTION FROM STABLE COIN ONLY !!!
export class TransactionFiat {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id?: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.transactionFiat)
  user?: User;

  @Field(() => Bank)
  @ManyToOne(() => Bank, (bank) => bank.transactionFiat)
  bank?: Bank;

  @Field(() => String)
  @Column({ type: 'enum', enum: TranasctionMethod })
  method?: TranasctionMethod;

  @Field(() => Wallet)
  @ManyToOne(() => Wallet, (wallet) => wallet.transactionFiat)
  wallet?: Wallet;

  @Field(() => CreditCard)
  @ManyToOne(() => CreditCard, (creditCard) => creditCard.transactionFiat)
  creditCard?: CreditCard;

  @Field()
  @Column()
  @CreateDateColumn()
  created_at?: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  updated_at?: Date;

  @Field(() => Float)
  @Column({ type: 'decimal', precision: 10, scale: 10 })
  amount?: number;

  @Field(() => String)
  @Column()
  bankNumber?: string;

  @Field(() => Float)
  @Column({ type: 'decimal', precision: 10, scale: 10 })
  totalBalanceLeft?: number;

  //   @OneToMany(() => User, (user) => user.role)
  //   user: User[];
}
