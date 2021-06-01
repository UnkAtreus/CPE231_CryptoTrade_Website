import { Module } from '@nestjs/common';
import { CurrencyResolver } from './currency.resolver';
import { CurrencyService } from './currency.service';

@Module({
  providers: [CurrencyResolver, CurrencyService],
})
export class CurrencyModule {}
