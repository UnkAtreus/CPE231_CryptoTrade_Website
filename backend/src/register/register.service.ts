import { BadRequestException, HttpStatus, HttpException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Gender } from 'src/common/constrants/gender';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  // register(
  //   firstName: string,
  //   lastName: string,
  //   email: string,
  //   nationality: string,
  //   citizenID: string,
  //   passportNumber: string,
  //   telephone: string,
  //   birthDate: Date,
  //   gender: string,
  //   address: string,
  //   city: string,
  //   postcode: string,
  //   password: string,
  //   confrimPassword: string,
  // ) {
  // if (!firstName) {
  //   throw new BadRequestException();
  // } else {
  //   var profile = new User();
  //   profile.userID = uuidv4();
  //   profile.firstName = firstName;
  //   profile.lastName = lastName;
  //   profile.email = email;
  //   profile.nationality = nationality;
  //   profile.citizenID = citizenID;
  //   profile.passportNumber = passportNumber;
  //   profile.telephone = telephone;
  //   profile.birthDate = birthDate;
  //   profile.gender = gender;
  //   profile.address = address;
  //   profile.city = city;
  //   profile.postcode = postcode;
  //   profile.password = password;
  //   createOrUpdate(profile);
  // }
  async createOrUpdate(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }
}
