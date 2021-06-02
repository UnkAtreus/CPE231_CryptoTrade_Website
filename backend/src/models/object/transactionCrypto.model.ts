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
export class TransactionCrypto {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id?: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.transactionFiat)
  user?: User;

  @Field(() => Wallet)
  @ManyToOne(() => Wallet, (wallet) => wallet.transactionCrypto)
  wallet?: Wallet;

  @Field(() => String)
  @Column({ type: 'enum', enum: TranasctionMethod })
  method?: TranasctionMethod;

  //   @Field(() => Currency)
  //   @ManyToOne(() => Currency, (currency) => currency.transactionFiat)
  //   currency?: Currency;

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
  targetWallet?: string;

  @Field(() => Float)
  @Column({ type: 'decimal', precision: 10, scale: 10 })
  totalBalanceLeft?: number;

  //   @OneToMany(() => User, (user) => user.role)
  //   user: User[];
}
