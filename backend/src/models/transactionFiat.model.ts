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
@ObjectType()
@Entity()
/// THIS IS FOR TRANSACTION FROM STABLE COIN ONLY !!!
export class TransactionFiat {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.transactionFiat)
  user?: User;

  @Field(() => Bank)
  @ManyToOne(() => Bank, (bank) => bank.transactionFiat)
  bank?: Bank;

  @Field(() => String)
  @Column({ type: "enum", enum: TranasctionMethod })
  method?: TranasctionMethod;

  @Field(() => Currency)
  @ManyToOne(() => Currency, (currency) => currency.transactionFiat)
  currency?: Currency;

  @Field(() => CreditCard)
  @ManyToOne(() => CreditCard, (creditCard) => creditCard.transactionFiat)
  creditCard?: CreditCard;

  @Field(() => Date)
  @Column()
  datetime?: Date;

  @Field(() => Float)
  @Column("decimal", {})
  amount?: number;

  @Field(() => String)
  @Column()
  bankNumber?: string;

  @Field(() => Float)
  @Column()
  totalBalance?: number;

  //   @OneToMany(() => User, (user) => user.role)
  //   user: User[];
}
