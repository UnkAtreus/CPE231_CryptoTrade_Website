import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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
  status?: TransactionStatus;

  @Field()
  @Column({ type: 'text' })
  imageUrl?: string;

  @OneToOne(() => User, (user) => user.wallet)
  user?: User;

  @Field()
  @Column()
  @CreateDateColumn()
  created_at?: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  updated_at?: Date;
}
