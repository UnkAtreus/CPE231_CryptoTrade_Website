import { RegisterService } from './register.service';
import { Controller } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Post } from '@nestjs/common';

@Controller('register')
export class RegisterController {
  constructor(private registerService: RegisterService) {}
  @Post()
  getRegister(
    @Body('firstName') firstName: String,
    @Body('lastName') lastName: String,
    @Body('email') email: String,
    @Body('nationality') nationality,
    @Body('citizenID') citizenID: String,
    @Body('passportNumber') passportNumber: String,
    @Body('telephone') telephone: String,
    @Body('BirthDate') BirthDate: String,
    @Body('gender') gender: String,
    @Body('address') address: String,
    @Body('city') city: String,
    @Body('postCode') postCode: String,
    @Body('password') password: String,
    @Body('confrimPassword') confrimPassword: String,
  ) {
    this.registerService.register(
      firstName,
      lastName,
      email,
      nationality,
      citizenID,
      passportNumber,
      telephone,
      BirthDate,
      gender,
      address,
      city,
      postCode,
      password,
      confrimPassword,
    );
  }
}
