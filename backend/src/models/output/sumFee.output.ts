import { Field, OutputType } from '@nestjs/graphql';

class SumFee {
  date: Date;
  BTC: string;
  ADA: string;
  ETH: string;
  BCH: string;
  DOT: string;
  USDT: string;
  THB: string;
}
export default SumFee;
