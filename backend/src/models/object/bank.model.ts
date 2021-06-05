import { BankNum } from './banknum.model';
import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TransactionFiat } from './transactionFiat.model';
@ObjectType()
@Entity()
export class Bank {
  @Field()
  @PrimaryGeneratedColumn()
  id?: number;

  @Field()
  @Column({ type: 'varchar', length: 6 })
  bank?: string;

  @Field(() => [BankNum])
  @OneToMany(() => BankNum, (bankNum) => bankNum.banktype)
  banknum?: BankNum[];
}
