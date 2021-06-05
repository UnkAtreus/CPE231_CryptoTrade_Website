import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import { BankResolver } from './bank.resolver';
import { BankService } from './bank.service';

@Module({
  imports: [UserModule],
  providers: [BankResolver, BankService],
  exports: [BankService],
})
export class BankModule {}
