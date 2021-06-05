import { Bank } from 'src/models/object/bank.model';
import { Field, ObjectType } from '@nestjs/graphql';
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
export class BankNum {
  @Field()
  @PrimaryGeneratedColumn({ zerofill: true })
  id?: number;

  @Field()
  @Column('varchar', { length: 64 })
  bankNumber?: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.id)
  user?: User;

  @Field(() => Bank)
  @ManyToOne(() => Bank, (bank) => bank.id)
  banktype?: Bank;

  @Field(() => [TransactionFiat])
  @OneToMany(() => TransactionFiat, (transactionFiat) => transactionFiat.bank)
  transactionFiat: TransactionFiat[];
}
