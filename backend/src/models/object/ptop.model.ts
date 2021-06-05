import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
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
  @Column()
  amount?: string;

  @Field()
  @Column()
  walletFromBalance?: string;

  @Field()
  @Column()
  walletToBalance?: string;

  @Field(() => Date)
  @CreateDateColumn()
  created_at?: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  updated_at?: Date;
}
