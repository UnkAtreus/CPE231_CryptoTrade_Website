import { Module } from '@nestjs/common';
import { BankResolver } from './bank.resolver';
import { BankService } from './bank.service';

@Module({
  providers: [BankResolver, BankService],
  exports: [BankService],
})
export class BankModule {}
