import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TransactionFiat } from './transactionFiat.model';
import { User } from './user.model';
@ObjectType()
@Entity()
export class CreditCard {
  @PrimaryGeneratedColumn({ zerofill: true })
  id?: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.creditCard)
  user?: User;

  @Field(() => String)
  @Column('varchar', { length: 16 })
  cardNumber?: string;

  @Field(() => String)
  @Column('varchar', { length: 2 })
  expiredMonth?: string;

  @Field(() => String)
  @Column('varchar', { length: 2 })
  expiredYear?: string;

  @Field(() => String)
  @Column('varchar', { length: 3 })
  cvv?: string;

  @Field(() => [TransactionFiat])
  @OneToMany(
    () => TransactionFiat,
    (transactionFiat) => transactionFiat.creditCard,
  )
  transactionFiat?: TransactionFiat[];
}
