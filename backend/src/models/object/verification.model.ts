import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.model';
import { Currency } from './currency.model';
import { Order } from './order.model';
import { PtoP } from './ptop.model';
import { TransactionCrypto } from './transactionCrypto.model';
import { TransactionFiat } from './transactionFiat.model';
import { OneToOne } from 'typeorm';
import { TransactionStatus } from 'src/static/enum';
@ObjectType()
@Entity()
export class Verification {
  @Field()
  @PrimaryGeneratedColumn()
  id?: number;

  @Field()
  @Column({ type: 'enum', enum: TransactionStatus })
  status?: number;

  @Field()
  @Column({ type: 'text' })
  imageUrl?: number;

  @OneToOne(() => User, (user) => user.wallet)
  user?: User;
}
