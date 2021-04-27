import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { user } from '../entity/user.entity';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';

@Module({
  imports: [TypeOrmModule.forFeature([user])],
  controllers: [RegisterController],
  providers: [RegisterService]
})
export class RegisterModule {}
