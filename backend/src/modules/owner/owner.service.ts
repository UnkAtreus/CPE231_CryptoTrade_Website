import { Injectable } from '@nestjs/common';
import { RepoService } from 'src/repo/repo.service';

@Injectable()
export class OwnerService {
  constructor(private readonly repoService: RepoService) {}

  async sumFiatFee() {
    return this.repoService.transactionFiatRepo
      .createQueryBuilder('transactionfiat')
      .select('SUM(transactionfiat.fee)', 'sum')
      .addSelect('CAST(transactionfiat.created_at as varchar(10))', 'date')
      .groupBy('date')
      .getRawMany();
  }
  async countOrder() {
    return this.repoService.orderRepo
      .createQueryBuilder()
      .select('COUNT(*)', 'count')
      .addSelect('CAST(order.created_at AS varchar(10))', 'date')
      .groupBy('date')
      .getRawMany();
  }
}
