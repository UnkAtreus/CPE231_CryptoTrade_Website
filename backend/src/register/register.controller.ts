import { RegisterService } from './register.service';
import { Controller } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Gender } from 'src/common/constrants/gender';

@Controller('register')
export class RegisterController {
  constructor(private registerService: RegisterService) {}
  @Post()
  getRegister(
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('email') email: string,
    @Body('nationality') nationality: string,
    @Body('citizenID') citizenID: string,
    @Body('passportNumber') passportNumber: string,
    @Body('telephone') telephone: string,
    @Body('birthDate') birthDate: Date,
    @Body('gender') gender: Gender,
    @Body('address') address: string,
    @Body('city') city: string,
    @Body('postCode') postCode: string,
    @Body('password') password: string,
    @Body('confrimPassword') confrimPassword: string,
  ) {
    this.registerService.register(
      firstName,
      lastName,
      email,
      nationality,
      citizenID,
      passportNumber,
      telephone,
      birthDate,
      gender,
      address,
      city,
      postCode,
      password,
      confrimPassword,
    );
  }
}
