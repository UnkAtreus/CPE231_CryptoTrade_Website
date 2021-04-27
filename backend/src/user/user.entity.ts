import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: String;

  @Column()
  firstName: String;

  @Column()
  lastName: String;
}
