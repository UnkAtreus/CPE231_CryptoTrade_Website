import { LoginService } from './login.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('login')
export class LoginController {
  constructor(private loginService: LoginService) {}
  @Post()
  getLogin(@Body('email') email: string, @Body('password') password: string) {
    this.loginService.login(email, password);
  }
}
