import { LoginService } from './login.service';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('login')
export class LoginController {
    constructor(private loginService:LoginService){
    }
    @Post()
    getLogin(@Body("email") email:String , @Body("password") password:String){
        this.loginService.login(email , password)
        // return `Email -> ${email} , Passwird -> ${password}`;
    }

    // @Delete("/:id")
    // delete(@Param("id") id:String)
}
