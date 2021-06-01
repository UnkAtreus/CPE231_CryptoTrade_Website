import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TransactionFiat } from './transactionFiat.model';
import { User } from './user.model';
import { Wallet } from './wallet.model';
@ObjectType()
@Entity()
export class Currency {
  @Field()
  @PrimaryGeneratedColumn()
  id?: number;

  @Field()
  @Column()
  currencyShortName?: string;

  @Field()
  @Column()
  currency?: string;

  @Field()
  @Column('decimal')
  volume?: number;

  @Field(() => [User])
  @OneToMany(() => User, (user) => user.id)
  user?: User[];

  @Field(() => [Wallet])
  @OneToMany(() => Wallet, (wallet) => wallet.currency)
  wallet?: Wallet[];

  @Field(() => [TransactionFiat])
  @OneToMany(
    () => TransactionFiat,
    (transactionFiat) => transactionFiat.currency,
  )
  transactionFiat?: TransactionFiat[];
}
