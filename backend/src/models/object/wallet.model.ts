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
@ObjectType()
@Entity()
export class Wallet {
  @Field()
  @PrimaryGeneratedColumn()
  id?: number;

  @Field()
  @Column({ type: 'decimal', precision: 38, scale: 19, default: 0 })
  amount?: number;

  @Field()
  @Column({ type: 'decimal', precision: 38, scale: 19, default: 0 })
  inOrder?: number;

  @ManyToOne(() => User, (user) => user.wallet)
  user?: User;

  @Field()
  @ManyToOne(() => Currency, (currency) => currency.wallet, {
    onDelete: 'CASCADE',
  })
  currency?: Currency;

  @Field(() => [Order])
  @OneToMany(() => Order, (order) => order.walletFrom)
  order?: Order[];

  @Field(() => [PtoP])
  @OneToMany(() => PtoP, (p2p) => p2p.walletFrom)
  p2pFrom?: PtoP[];

  @Field(() => [PtoP])
  @OneToMany(() => PtoP, (p2p) => p2p.walletTo)
  p2pTo?: PtoP[];

  @Field(() => [TransactionCrypto])
  @OneToMany(
    () => TransactionCrypto,
    (transactionCrypto) => transactionCrypto.wallet,
  )
  transactionCrypto?: TransactionCrypto[];

  @Field(() => [TransactionFiat])
  @OneToMany(() => TransactionFiat, (transactionFiat) => transactionFiat.wallet)
  transactionFiat?: TransactionFiat[];
}
