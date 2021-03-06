import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { OrderMethod, OrderType } from 'src/static/enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.model';
import { Wallet } from './wallet.model';
@ObjectType()
@Entity()
export class Order {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ zerofill: true })
  id?: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.transactionFiat)
  user?: User;

  @Field(() => String)
  @Column({ type: 'enum', enum: OrderMethod })
  method?: OrderMethod;

  @Field(() => String)
  @Column({ type: 'enum', enum: OrderType })
  type?: OrderType;

  @Field(() => Wallet)
  @ManyToOne(() => Wallet, (walletFrom) => walletFrom.order)
  walletFrom?: Wallet;

  @Field(() => Wallet)
  @ManyToOne(() => Wallet, (walletTo) => walletTo.order)
  walletTo?: Wallet;

  @Field(() => String)
  @Column({ type: 'decimal', precision: 38, scale: 19 })
  price?: number;

  @Field(() => String)
  // @Column({ type: 'decimal', precision: 38, scale: 38 })
  @Column({ type: 'decimal', precision: 38, scale: 19 })
  amount?: number;

  @Field(() => String)
  @Column({ type: 'decimal', precision: 38, scale: 19 })
  totalBalance?: number;

  @Field(() => String)
  @Column({ type: 'decimal', precision: 38, scale: 19, default: 0 })
  fee?: number;

  @Field(() => Boolean)
  @Column()
  cancel?: boolean;

  @Field(() => Boolean)
  @Column()
  filled?: boolean;

  @Field(() => Date)
  @CreateDateColumn()
  created_at?: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  updated_at?: Date;

  //   @OneToMany(() => User, (user) => user.role)
  //   user: User[];
}
