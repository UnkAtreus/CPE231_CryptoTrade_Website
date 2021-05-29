import { Field, ID, ObjectType } from "@nestjs/graphql";
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TransactionFiat } from "./transactionFiat.model";
import { User } from "./user.model";
@ObjectType()
@Entity()
export class CreditCard {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id?: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.creditCard)
  user?: User;

  @Field(() => String)
  @Column("varchar", { length: 16 })
  cardNumber?: string;

  @Field(() => String)
  @Column("varchar", { length: 2 })
  expiredDate?: string;

  @Field(() => String)
  @Column("varchar", { length: 2 })
  expiredMonth?: string;

  @Field(() => String)
  @Column("varchar", { length: 3 })
  cvv?: string;

  @Field(() => String)
  @Column("text", { nullable: true })
  address?: string;

  @Field(() => String)
  @Column({ nullable: true })
  postCode?: string;

  @Field(() => String)
  @Column({ nullable: true })
  city?: string;

  @Field(() => String)
  @Column({ nullable: true })
  country?: string;

  @Field(() => [TransactionFiat])
  @OneToMany(
    () => TransactionFiat,
    (transactionFiat) => transactionFiat.creditCard
  )
  transactionFiat?: TransactionFiat[];
}
