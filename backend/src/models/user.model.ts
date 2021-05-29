import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Gender } from 'src/enum/enum';
import { Role } from './role.model';

@ObjectType()
@Entity()
export class User {
  @Field((type) => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Role)
  @ManyToOne(() => Role, (role) => role.user)
  role: Role;

  @Field()
  @Column({ length: 64 })
  firstName: string;

  @Field()
  @Column({ length: 64 })
  lastName: string;

  @Field()
  @Column('text', { nullable: false, unique: true })
  email: string;

  @Field()
  @Column('varchar', { length: 15 })
  phone: string;

  @Field()
  @Column({ length: 64 })
  nationality: string;

  @Field()
  @Column({ length: 13, nullable: true })
  citizenID: string;

  @Field()
  @Column({ length: 8, nullable: true })
  passportNumber: string;

  @Field()
  @Column()
  birthDate: Date;

  @Field()
  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

  @Field()
  @Column('text')
  address: string;

  @Field()
  @Column({ length: 64 })
  city: string;

  @Field()
  @Column({ type: 'varchar', length: 6 })
  postcode: string;

  @Field()
  @Column({ type: 'varchar', length: 64 })
  password: string;

  @Field()
  @Column({ nullable: true, length: 6 })
  pincode: string;

  @Field()
  @Column({ nullable: true, length: 64 })
  token: string;

  @Field()
  @Column({ default: false })
  verify: boolean;

  @Field()
  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  updated_at: Date;
}
//   @Field((type) => [InvoiceModel], { nullable: true })
//   @OneToMany((type) => InvoiceModel, (invoice) => invoice.customer)
//   invoices: InvoiceModel[];
