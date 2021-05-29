import { Field, Float, ObjectType } from "@nestjs/graphql";
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TransactionFiat } from "./transactionFiat.model";
import { Wallet } from "./wallet.model";
@ObjectType()
@Entity("ptop")
export class PtoP {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column("varchar", { length: 64 })
  bank?: string;

  @Field(() => Wallet)
  @ManyToOne(() => Wallet, (wallet) => wallet.p2pFrom)
  walletFrom?: Wallet;

  @Field(() => Wallet)
  @ManyToOne(() => Wallet, (wallet) => wallet.p2pTo)
  walletTo?: Wallet;

  @Field(() => Float)
  @Column("decimal", {})
  amount?: number;

  @Field(() => Float)
  @Column("decimal", {})
  walletFromBalance?: number;

  @Field(() => Float)
  @Column("decimal", {})
  walletToBalance?: number;
}
