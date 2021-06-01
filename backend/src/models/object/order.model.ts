import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { OrderMethod } from 'src/static/enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.model';
import { Wallet } from './wallet.model';
@ObjectType()
@Entity()
export class Order {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id?: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.transactionFiat)
  user?: User;

  @Field(() => String)
  @Column({ type: 'enum', enum: OrderMethod })
  method?: OrderMethod;

  @Field(() => Wallet)
  @ManyToOne(() => Wallet, (walletFrom) => walletFrom.order)
  walletFrom?: Wallet;

  @Field(() => Wallet)
  @ManyToOne(() => Wallet, (walletTo) => walletTo.order)
  walletTo?: Wallet;

  @Field(() => Float)
  @Column()
  price?: number;

  @Field(() => Float)
  @Column('decimal', {})
  amount?: number;

  @Field(() => Float)
  @Column()
  totalBalance?: number;

  @Field(() => Boolean)
  @Column()
  cancel?: boolean;

  @Field(() => Boolean)
  @Column()
  filled?: boolean;

  @Field(() => Date)
  @CreateDateColumn()
  created_at?: Date;

  @Field(() => Date)
  @Column()
  tradeDateTime?: Date;

  //   @OneToMany(() => User, (user) => user.role)
  //   user: User[];
}
