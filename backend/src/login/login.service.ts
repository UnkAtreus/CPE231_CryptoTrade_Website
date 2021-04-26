import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class LoginService {
    login(email:String , password:String){
        var uid = uuidv4();
        console.log(`Email -> ${email} , Passwird -> ${password} , UID -> ${uid}`)

        // EXCEPTION HANDLER
        throw new NotFoundException(`Todo with ${uid}`)
    }
}
