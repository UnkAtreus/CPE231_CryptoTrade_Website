import { Injectable } from '@nestjs/common';
import { RepoService } from 'src/repo/repo.service';

@Injectable()
export class OwnerService {
  constructor(private readonly repoService: RepoService) {}

  async sumFiatFee() {
    return this.repoService.transactionFiatRepo
      .createQueryBuilder('transactionfiat')
      .select('SUM(transactionfiat.fee)', 'sum')
      .addSelect(
        'year(transactionfiat.created_at), month(transactionfiat.created_at), day(transactionfiat.created_at)',
      )
      .groupBy(
        'year(transactionfiat.created_at), month(transactionfiat.created_at), day(transactionfiat.created_at)',
      )
      .getRawMany();
  }
  async countOrder() {
    return this.repoService.orderRepo
      .createQueryBuilder()
      .select('COUNT(*)', 'count')
      .addSelect(
        'year(order.created_at), month(order.created_at), day(order.created_at)',
        'date',
      )
      .groupBy(
        'year(order.created_at), month(order.created_at), day(order.created_at)',
      )
      .getRawMany();
  }
}
