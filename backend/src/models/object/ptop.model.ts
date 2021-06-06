import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Wallet } from './wallet.model';
@ObjectType()
@Entity()
export class PtoP {
  @Field()
  @PrimaryGeneratedColumn()
  id?: number;

  @Field(() => Wallet)
  @ManyToOne(() => Wallet, (wallet) => wallet.p2pFrom)
  walletFrom?: Wallet;

  @Field(() => Wallet)
  @ManyToOne(() => Wallet, (wallet) => wallet.p2pTo)
  walletTo?: Wallet;

  @Field()
  @Column({ type: 'decimal', precision: 38, scale: 19 })
  amount?: number;

  @Field()
  @Column({ type: 'decimal', precision: 38, scale: 19 })
  walletFromBalance?: number;

  @Field()
  @Column({ type: 'decimal', precision: 38, scale: 19 })
  walletToBalance?: number;

  @Field(() => Date)
  @CreateDateColumn()
  created_at?: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  updated_at?: Date;
}
