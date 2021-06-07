import { Injectable } from '@nestjs/common';
import { addDays, subDays } from 'date-fns';
import { RepoService } from 'src/repo/repo.service';
import { getConnection } from 'typeorm';
@Injectable()
export class OwnerService {
  constructor(private readonly repoService: RepoService) {}

  // async sumFiatFee() {
  //   return this.repoService.transactionFiatRepo
  //     .createQueryBuilder('tf')
  //     .addFrom('transaction_crypto', 'tc')
  //     .addFrom('order', 'od')
  //     .select('SUM(tf.fee) + SUM(tc.fee) + SUM(od.fee)', 'sum1')
  //     .select('SUM(tc.fee)', 'sum2')
  //     .select('SUM(od.fee)', 'sum3')
  //     .addSelect('CAST(tf.created_at as varchar(10))', 'date')
  //     .groupBy('date')
  //     .orderBy('date', 'DESC')
  //     .getRawMany();
  // }
  async countTransaction(date?: Date) {
    date = date ?? new Date();
    const start = subDays(date, 7).toISOString().slice(0, 10);
    // const end = date.toISOString().slice(0, 10);
    const end = addDays(date, 1).toISOString().slice(0, 10);
    const resultFiat = await this.repoService.transactionFiatRepo
      .createQueryBuilder('tf')
      .select('COUNT(*)', 'count')
      .addSelect('CAST(tf.created_at AS varchar(10))', 'date')
      .where(
        'tf.created_at BETWEEN :start AND :end ',
        // 'tf.created_at BETWEEN :start AND :end OR tc.created_at BETWEEN :start',
        {
          start: start,
          end: end,
        },
      )
      .groupBy('date')
      .orderBy('date', 'DESC')
      .getRawMany();
    const resultCrypto = await this.repoService.transactionCryptoRepo
      .createQueryBuilder('tc')
      .select('COUNT(*)', 'count')
      .addSelect('CAST(tc.created_at AS varchar(10))', 'date')
      .where(
        'tc.created_at BETWEEN :start AND :end ',
        // 'tf.created_at BETWEEN :start AND :end OR tc.created_at BETWEEN :start',
        {
          start: start,
          end: end,
        },
      )
      .groupBy('date')
      .getRawMany();
    resultFiat.forEach((fiat) => {
      resultCrypto.forEach((crypto) => {
        if (crypto.date == fiat.date) {
          fiat.count = String(Number(fiat.count) + Number(crypto.count));
        }
      });
    });
    return resultFiat;
  }
  async countTopOrder(date?: Date) {
    date = date ?? new Date();
    const start = subDays(date, 7).toISOString().slice(0, 10);
    //     const end = date.toISOString().slice(0, 10);
    const end = addDays(date, 1).toISOString().slice(0, 10);
    const subQuey =
      '(SELECT `od`.`id` AS `od_id`,`od`.`created_at`, COUNT(*) AS `count`, ROW_NUMBER() OVER (PARTITION BY date ORDER BY count desc) as row_num, `user`.`id` , `user`.`firstName` , `user`.`lastName`, CAST(`od`.`created_at` AS varchar(10)) AS `date` FROM `order` `od` LEFT JOIN `user` `user` ON `user`.`id`=`od`.`userId`   GROUP BY date, `user`.`id` ORDER BY date DESC)';
    return getConnection()
      .createQueryBuilder()
      .from(subQuey, 'd')
      .where('created_at BETWEEN :start AND :end', {
        start: start,
        end: end,
      })
      .andWhere('row_num < 6')
      .getRawMany();
    // .andWhere({date })
    // .getSql()
    // return this.repoService.orderRepo
    //   .createQueryBuilder('od')
    //   .leftJoinAndSelect('od.user', 'user')
    //   .select('od.id')
    //   .addSelect('COUNT(*)', 'count')
    //   .addSelect(
    //     'ROW_NUMBER() OVER (PARTITION BY date ORDER BY count desc) as row_num',
    //   )
    //   .addSelect('user.id , user.firstName , user.lastName')
    //   .addSelect('CAST(od.created_at AS varchar(10))', 'date')
    //   .where('od.created_at BETWEEN :start AND :end', {
    //     start: start,
    //     end: end,
    //   })
    //   .andWhere('row_num < 6')
    //   .groupBy('date')
    //   .addGroupBy('user.id')
    //   .orderBy('date', 'DESC')
    //   .getRawMany();
  }
  async countOrder(date?: Date) {
    date = date ?? new Date();
    const start = subDays(date, 7).toISOString().slice(0, 10);
    // const end = date.toISOString().slice(0, 10);
    const end = addDays(date, 1).toISOString().slice(0, 10);
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
  async countOrderCancelOrFilled(isCancel: boolean, date?: Date) {
    date = date ?? new Date();
    const start = subDays(date, 7).toISOString().slice(0, 10);
    //     const end = date.toISOString().slice(0, 10);
    const end = addDays(date, 3).toISOString().slice(0, 10);
    return this.repoService.orderRepo
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.walletFrom', 'wf')
      .leftJoinAndSelect('order.walletTo', 'wt')
      .addSelect('COUNT (*)', 'count')
      .addSelect('wf.currencyId', 'wf_currencyId')
      .addSelect('wt.currencyId', 'wt_currencyId')
      .addSelect('SUM (order.fee) ', 'sum')
      .addSelect(
        '(SELECT currency FROM currency WHERE id = wf_currencyId)',
        'currencyFrom',
      )
      .addSelect(
        '(SELECT currency FROM currency WHERE id = wt_currencyId)',
        'currencyTo',
      )
      .addSelect('CAST(order.updated_at AS varchar(10))', 'date')
      .where('updated_at BETWEEN :start AND :end', {
        start: start,
        end: end,
      })
      .andWhere('cancel = :cancel ', { cancel: isCancel })
      .andWhere('filled = :filled ', { filled: !isCancel })
      .groupBy('date')
      .groupBy('currencyTo')
      .getRawMany();
  }
  async getMostCurrencyDominate() {
    const s = await this.repoService.walletRepo
      .createQueryBuilder('wallet')
      .leftJoinAndSelect('wallet.currency', 'currency')
      .leftJoinAndSelect('wallet.user', 'user')
      .select('MAX(wallet.amount + wallet.inOrder)', 'amount')
      .addSelect('currency.currency', 'currency')
      .addSelect('user.id ')
      .addSelect('user.firstName ')
      .addSelect('user.lastName ')
      .groupBy('currency')
      .getRawMany();

    return s;
  }
  async getCountUserRegister(date?: Date) {
    date = date ?? new Date();
    const start = subDays(date, 7).toISOString().slice(0, 10);
    // const end = date.toISOString().slice(0, 10);
    const end = addDays(date, 1).toISOString().slice(0, 10);

    return await this.repoService.userRepo
      .createQueryBuilder('user')
      .select('COUNT (*) ', 'count')
      .addSelect('CAST(user.created_at AS varchar(10))', 'date')
      .where('created_at BETWEEN :start AND :end', {
        start: start,
        end: end,
      })
      .andWhere('roleId =:role', { role: 1 })
      .groupBy('date')
      .getRawMany();
  }
  async getSumFiatFee(date?: Date) {
    date = date ?? new Date();
    const start = subDays(date, 7).toISOString().slice(0, 10);
    // const end = date.toISOString().slice(0, 10);
    const end = addDays(date, 1).toISOString().slice(0, 10);

    return await this.repoService.transactionFiatRepo
      .createQueryBuilder('fiat')
      .select('SUM(fiat.fee)', 'sumFiatFee')
      // .select('SUM(fee)', 'sumFee')
      .addSelect('CAST(fiat.created_at AS varchar(10))', 'date')
      // .innerJoin('transaction_crypto', 'crypto', 'fiat.userId = crypto.userId')
      // .leftJoin('wallet', 'wallet', 'wallet.id = crypto.walletId')
      .groupBy('date')
      .orderBy('date')
      // .addSelect('SUM(crypto.fee)', 'sumCryptoFEE')
      .getRawMany();
  }

  async getSumCryptoFee(date?: Date) {
    date = date ?? new Date();
    const start = subDays(date, 7).toISOString().slice(0, 10);
    // const end = date.toISOString().slice(0, 10);
    const end = addDays(date, 1).toISOString().slice(0, 10);

    return await this.repoService.transactionCryptoRepo
      .createQueryBuilder('crypto')
      .select('SUM(crypto.fee)', 'sumCryptoFee')
      // .select('SUM(fee)', 'sumFee')
      .addSelect('CAST(crypto.created_at AS varchar(10))', 'date')
      // .innerJoin('transaction_crypto', 'crypto', 'fiat.userId = crypto.userId')
      .leftJoin('crypto.wallet', 'wt')
      .leftJoin('currency', 'cc', 'cc.id = wt.currency')
      .groupBy('date')
      .groupBy('wt.currency')
      .addSelect('cc.currency')
      .orderBy('date')
      // .addSelect('SUM(crypto.fee)', 'sumCryptoFEE')
      .getRawMany();
  }

  // async getSumFee(date?: Date) {
  //   date = date ?? new Date();
  //   const start = subDays(date, 7).toISOString().slice(0, 10);
  //   // const end = date.toISOString().slice(0, 10);
  //   const end = addDays(date, 1).toISOString().slice(0, 10);

  //   return await this.repoService.transactionFiatRepo
  //     .createQueryBuilder('fiat')
  //     .select('SUM(fiat.fee)', 'sumFiatFee')
  //     .addSelect('CAST(fiat.created_at AS varchar(10))', 'date')
  //     .leftJoin('user', 'u', 'u.id = fiat.user')
  //     .leftJoin('transaction_crypto', 'crypto', 'u.id = crypto.user')
  //     .groupBy('date')
  //     .getRawMany();
  // }
}
