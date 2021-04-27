import { BadRequestException, HttpStatus, HttpException } from "@nestjs/common";
import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";
@Injectable()
export class RegisterService {
  register(
    firstName: String,
    lastName: String,
    email: String,
    nationality: String,
    citizenID: String,
    passportNumber: String,
    telephone: String,
    BirthDate: String,
    gender: String,
    address: String,
    city: String,
    postCode: String,
    password: String,
    confrimPassword: String
  ) {
    var uid = uuidv4();
    if (!firstName) {
      throw new BadRequestException();
    } else {
    }
  }
}
