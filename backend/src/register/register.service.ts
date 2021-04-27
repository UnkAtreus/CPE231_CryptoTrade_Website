import { BadRequestException, HttpStatus, HttpException } from "@nestjs/common";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Gender } from "src/common/constrants/gender";
import { user } from "src/entity/user.entity";
import { Repository } from "typeorm";
import { v4 as uuidv4 } from "uuid";
@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(user)
    private userRepository: Repository<user>,
  ){}
  register(
    firstName: string,
    lastName: string,
    email: string,
    nationality: string,
    citizenID: string,
    passportNumber: string,
    telephone: string,
    birthDate: Date,
    gender: Gender,
    address: string,
    city: string,
    postcode: string,
    password: string,
    confrimPassword: string
  ) {
    if (!firstName) {
      throw new BadRequestException();
    } else {
        var profile = new user()
        profile.id = uuidv4()
        profile = {
          firstName, lastName, email, nationality, citizenID, passportNumber, telephone, birthDate, gender, address, city, postcode, password  
        }
        createOrUpdate(profile)
      }
    }
  }
async function createOrUpdate(user: user) {
    return await this.userRepository.save(user)
}

