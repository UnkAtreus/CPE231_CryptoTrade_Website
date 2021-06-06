import { BankNum } from './banknum.model';
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
/// THIS IS FOR TRANSACTION FROM STABLE COIN ONLY !!!
export class TransactionFiat {
  @PrimaryGeneratedColumn({ zerofill: true })
  id?: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.transactionFiat)
  user?: User;

  @Field(() => BankNum)
  @ManyToOne(() => BankNum, (bankNum) => bankNum.transactionFiat)
  bank?: BankNum;

  @Field(() => String)
  @Column({ type: 'enum', enum: TransactionStatus })
  status?: TransactionStatus;

  @Field(() => String)
  @Column({ type: 'enum', enum: TranasctionMethod })
  method?: TranasctionMethod;

  @Field(() => Wallet)
  @ManyToOne(() => Wallet, (wallet) => wallet.transactionFiat, {
    onDelete: 'CASCADE',
  })
  wallet?: Wallet;

  @Field(() => CreditCard)
  @ManyToOne(() => CreditCard, (creditCard) => creditCard.transactionFiat, {
    onDelete: 'CASCADE',
  })
  creditCard?: CreditCard;

  @Field()
  @Column()
  @CreateDateColumn()
  created_at?: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  updated_at?: Date;

  @Field(() => String)
  @Column({ type: 'decimal', precision: 38, scale: 19 })
  amount?: number;

  @Field(() => String)
  @Column({ type: 'decimal', precision: 38, scale: 19 })
  totalBalanceLeft?: number;

  @Field(() => String)
  @Column({ type: 'decimal', precision: 38, scale: 19, default: 0 })
  fee?: number;

  //   @OneToMany(() => User, (user) => user.role)
  //   user: User[];
}
