import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TransactionFiat } from "./transactionFiat.model";
@ObjectType()
@Entity()
export class Bank {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column("varchar", { length: 64 })
  bank?: string;

  @Field(() => [TransactionFiat])
  @OneToMany(() => TransactionFiat, (transactionFiat) => transactionFiat.bank)
  transactionFiat: TransactionFiat[];
}
