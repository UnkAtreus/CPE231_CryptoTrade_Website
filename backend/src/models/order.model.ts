import { Field, Float, ID, ObjectType } from "@nestjs/graphql";
import { TranasctionMethod } from "src/enum/enum";
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Bank } from "./bank.model";
import { User } from "./user.model";
import { Currency } from "./currency.model";
import { CreditCard } from "./creditcard.model";
import { Wallet } from "./wallet.model";
@ObjectType()
@Entity()
export class Order {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.transactionFiat)
  user?: User;

  @Field(() => String)
  @Column({ type: "enum", enum: TranasctionMethod })
  method?: TranasctionMethod;

  @Field(() => Wallet)
  @ManyToOne(() => Wallet, (walletFrom) => walletFrom.order)
  walletFrom?: Wallet;

  @Field(() => Wallet)
  @ManyToOne(() => Wallet, (walletTo) => walletTo.order)
  walletTo?: Wallet;

  @Field(() => Date)
  @Column()
  orderDateTime?: Date;

  @Field(() => Date)
  @Column()
  tradeDateTime?: Date;

  @Field(() => Boolean)
  @Column()
  cancel?: boolean;

  @Field(() => Boolean)
  @Column()
  filled?: boolean;

  @Field(() => Float)
  @Column("decimal", {})
  amount?: number;

  @Field(() => String)
  @Column()
  targetWallet?: string;

  @Field(() => Float)
  @Column()
  totalBalance?: number;

  //   @OneToMany(() => User, (user) => user.role)
  //   user: User[];
}
