import { RegisterService } from './register.service';
import { Controller } from '@nestjs/common';

@Controller('register')
export class RegisterController {
    constructor(private registerService:RegisterService){
        
    }
}
