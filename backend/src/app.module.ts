import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { rootCertificates } from 'node:tls';
 
@Module({
  imports: [LoginModule, RegisterModule,TypeOrmModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
