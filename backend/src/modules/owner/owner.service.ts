import { Injectable } from '@nestjs/common';
import { addDays, subDays } from 'date-fns';
import { RepoService } from 'src/repo/repo.service';

@Injectable()
export class OwnerService {
  constructor(private readonly repoService: RepoService) {}

  async sumFiatFee() {
    return this.repoService.transactionFiatRepo
      .createQueryBuilder('tf')
      .addFrom('transaction_crypto', 'tc')
      .addFrom('order', 'od')
      .select('SUM(tf.fee)', 'sum')
      .addSelect('CAST(tf.created_at as varchar(10))', 'date')
      .groupBy('date')
      .getRawMany();
  }
  async countTransaction(date?: Date) {
    date = date ?? new Date();
    const start = subDays(date, 7).toISOString().slice(0, 10);
    const end = date.toISOString().slice(0, 10);
    const endd = addDays(date, 1).toISOString().slice(0, 10);
    return this.repoService.transactionFiatRepo
      .createQueryBuilder('transactionfiat')
      .select('COUNT(*)', 'count')
      .addSelect('CAST(transactionfiat.created_at AS varchar(10))', 'date')
      .where('created_at BETWEEN :start AND :end', {
        start: start,
        end: endd,
      })
      .groupBy('date')
      .getRawMany();
  }
  async countTopTransaction(date?: Date) {
    date = date ?? new Date();
    const start = subDays(date, 7).toISOString().slice(0, 10);
    //     const end = date.toISOString().slice(0, 10);
    const endd = addDays(date, 7).toISOString().slice(0, 10);
    return (
      this.repoService.transactionFiatRepo
        .createQueryBuilder('transactionfiat')
        .leftJoinAndSelect('transactionfiat.user', 'user')
        .select('COUNT(*)', 'count')
        .addSelect('user.id , user.firstName , user.lastName')
        .addSelect('CAST(transactionfiat.created_at AS varchar(10))', 'date')
        .orderBy('count')
        .limit(5)
        // .where('transactionfiat.user = :userid' , { })
        // .where('created_at BETWEEN :start AND :end', {
        //   start: start,
        //   end: endd,
        // })
        //       .groupBy('date')
        .getRawMany()
    );
  }
  async countOrder(date?: Date) {
    date = date ?? new Date();
    const start = subDays(date, 7).toISOString().slice(0, 10);
    const end = date.toISOString().slice(0, 10);
    return this.repoService.orderRepo
      .createQueryBuilder()
      .select('COUNT(*)', 'count')
      .addSelect('CAST(order.created_at AS varchar(10))', 'date')
      .where('created_at BETWEEN :start AND :end', {
        start: start,
        end: end,
      })
      .groupBy('date')
      .getRawMany();
  }
  async countOrderCancel(date?: Date) {
    date = date ?? new Date();
    const start = subDays(date, 7).toISOString().slice(0, 10);
    //     const end = date.toISOString().slice(0, 10);
    const end = addDays(date, 1).toISOString().slice(0, 10);
    return this.repoService.orderRepo
      .createQueryBuilder('order')
      .select('COUNT(*)', 'count')
      .addSelect('SUM(order.fee)', 'feeTotal')
      .addSelect('CAST(order.updated_at AS varchar(10))', 'date')
      .where('updated_at BETWEEN :start AND :end', {
        start: start,
        end: end,
      })
      .andWhere('cancel = :cancel', { cancel: true })
      .groupBy('date')
      .getRawMany();
  }
  async getMostCurrencyDominate() {
    const s = await this.repoService.walletRepo
      .createQueryBuilder('wallet')
      .leftJoinAndSelect('wallet.currency', 'currency')
      .leftJoinAndSelect('wallet.user', 'user')
      .select('MAX(wallet.amount + wallet.inOrder)', 'amount')
      .addSelect('currency')
      .addSelect('user')
      .groupBy('currency')
      .getRawMany();

    return s;
  }
  async getCountUserRegister(date?: Date) {
    date = date ?? new Date();
    const start = date.toISOString().slice(0, 10);
    const end = addDays(date, 1).toISOString().slice(0, 10);

    return await this.repoService.userRepo
      .createQueryBuilder('user')
      .select('COUNT (*) ', 'count')
      .addSelect('CAST(user.created_at AS varchar(10))', 'date')
      .where('created_at BETWEEN :start AND :end', {
        start: start,
        end: end,
      })
      .groupBy('date')
      .getRawMany();
  }
}
