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
  currency?: string;

  @Field()
  @Column()
  currencyLongName?: string;

  @Field()
  @Column()
  volume?: string;

  @Field(() => [User])
  @OneToMany(() => User, (user) => user.id)
  user?: User[];

  @Field(() => [Wallet])
  @OneToMany(() => Wallet, (wallet) => wallet.currency)
  wallet?: Wallet[];
}
