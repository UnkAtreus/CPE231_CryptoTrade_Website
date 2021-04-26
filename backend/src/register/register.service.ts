import { BadRequestException, HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import e from 'express';
import { exception } from 'node:console';
import { v4 as uuidv4 } from 'uuid';
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
    confrimPassword: String,
  ) {
    var uid = uuidv4();
    if (
      !firstName ||
      !lastName ||
      !email ||
      !nationality ||
      (!citizenID && !passportNumber) ||
      !telephone ||
      !BirthDate ||
      !gender ||
      !address ||
      !city ||
      !postCode ||
      !password ||
      !confrimPassword
    ) {
      throw new BadRequestException();
    } else {
      console.log(
        // this is debug
        ` id : ${uid} \n first : ${firstName}\n last : ${lastName}\n citizen : ${citizenID}\n passport : ${passportNumber}\n phone : ${telephone}\n BirthDate : ${BirthDate} \n gender : ${gender}\n address : ${address}\n city : ${city} \n postCode : ${postCode}\n password : ${password}\n conPass : ${confrimPassword}`,
      );
    }
  }
}
