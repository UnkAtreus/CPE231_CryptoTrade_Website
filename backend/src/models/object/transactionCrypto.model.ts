import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { TranasctionMethod, TransactionStatus } from 'src/static/enum';
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

  @Field(() => String)
  @Column({ type: 'enum', enum: TransactionStatus })
  status?: TransactionStatus;
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
  @Column({ type: 'decimal', precision: 7, scale: 4 })
  amount?: number;

  @Field(() => String)
  @Column()
  targetWallet?: string;

  @Field(() => Float)
  @Column({ type: 'decimal', precision: 7, scale: 4 })
  totalBalanceLeft?: number;

  //   @OneToMany(() => User, (user) => user.role)
  //   user: User[];
}
