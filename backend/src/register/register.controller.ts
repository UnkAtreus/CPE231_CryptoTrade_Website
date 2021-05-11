import { RegisterService } from './register.service';
import { Controller } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Gender } from 'src/common/constrants/gender';
import { User } from 'src/entity/user.entity';

@Controller('register')
export class RegisterController {
  constructor(private registerService: RegisterService) {}
  @Post()
  async getRegister(
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('email') email: string,
    @Body('nationality') nationality: string,
    @Body('citizenID') citizenID: string,
    @Body('passportNumber') passportNumber: string,
    @Body('telephone') telephone: string,
    @Body('birthDate') birthDate: Date,
    @Body('gender') gender: string,
    @Body('address') address: string,
    @Body('city') city: string,
    @Body('postCode') postCode: string,
    @Body('password') password: string,
    @Body('confrimPassword') confrimPassword: string,
  ): Promise<User> {
    const profile = new User();
    profile.firstName = firstName;
    profile.lastName = lastName;
    profile.email = email;
    profile.nationality = nationality;
    profile.citizenID = citizenID;
    profile.passportNumber = passportNumber;
    profile.telephone = telephone;
    profile.birthDate = birthDate;
    profile.gender = gender;
    profile.address = address;
    profile.city = city;
    profile.postcode = postCode;
    profile.password = password;
    return await this.registerService.createOrUpdate(profile);

    // this.registerService.register(
    //   firstName,
    //   lastName,
    //   email,
    //   nationality,
    //   citizenID,
    //   passportNumber,
    //   telephone,
    //   birthDate,
    //   gender,
    //   address,
    //   city,
    //   postCode,
    //   password,
    //   confrimPassword,
    // );
  }
}
