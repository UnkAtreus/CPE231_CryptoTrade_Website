import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  userID: string;

  @Column()
  roleID: string;

  @Column({ length: 64 })
  firstName: string;

  @Column({ length: 64 })
  lastName: string;

  @Column({ length: 64 })
  email: string;

  @Column({ length: 64 })
  nationality: string;

  @Column({ length: 2 })
  countryCode: string;

  @Column({ length: 13 })
  citizenID: string;

  @Column({ length: 8 })
  passportNumber: string;

  @Column({ length: 10 })
  telephone: string;

  @Column()
  birthDate: Date;

  @Column({ type: 'varchar', length: 1 })
  gender: string;

  @Column()
  address: string;

  @Column({ length: 64 })
  city: string;

  @Column({ type: 'varchar', length: 6 })
  postcode: string;

  @Column({ type: 'varchar', length: 64 })
  password: string;

  @Column({ nullable: true, length: 6 })
  pincode: string;

  @Column({ nullable: true, length: 64 })
  token: string;

  @Column({ default: false })
  verify: boolean;

  static userID: any;
  static roleID: any;
}
