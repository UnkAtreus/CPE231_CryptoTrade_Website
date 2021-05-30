import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.model';
@ObjectType()
@Entity()
export class Role {
  @Field()
  @PrimaryGeneratedColumn()
  id?: number;

  @Field()
  @Column()
  role?: string;

  @OneToMany(() => User, (user) => user.role)
  user?: User[];
}
