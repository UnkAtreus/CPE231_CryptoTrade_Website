import { BankNum } from './../models/object/banknum.model';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bank } from 'src/models/object/bank.model';
import { CreditCard } from 'src/models/object/creditcard.model';
import { Currency } from 'src/models/object/currency.model';
import { Order } from 'src/models/object/order.model';
import { PtoP } from 'src/models/object/ptop.model';
import { Role } from 'src/models/object/role.model';
import { TransactionFiat } from 'src/models/object/transactionFiat.model';
import { User } from 'src/models/object/user.model';
import { Verification } from 'src/models/object/verification.model';
import { Wallet } from 'src/models/object/wallet.model';
import { Repository } from 'typeorm';
import { TransactionCrypto } from '../models/object/transactionCrypto.model';

@Injectable()
export class RepoService {
  public constructor(
    @InjectRepository(User) public readonly userRepo: Repository<User>,
    @InjectRepository(Role) public readonly roleRepo: Repository<Role>,
    @InjectRepository(Bank) public readonly bankRepo: Repository<Bank>,
    @InjectRepository(BankNum) public readonly bankNumRepo: Repository<BankNum>,
    @InjectRepository(CreditCard)
    public readonly creditCardRepo: Repository<CreditCard>,
    @InjectRepository(Currency)
    public readonly currencyRepo: Repository<Currency>,
    @InjectRepository(Order) public readonly orderRepo: Repository<Order>,
    @InjectRepository(PtoP) public readonly ptopRepo: Repository<PtoP>,
    @InjectRepository(TransactionCrypto)
    public readonly transactionCryptoRepo: Repository<TransactionCrypto>,
    @InjectRepository(TransactionFiat)
    public readonly transactionFiatRepo: Repository<TransactionFiat>,
    @InjectRepository(Wallet) public readonly walletRepo: Repository<Wallet>,
    @InjectRepository(Verification)
    public readonly veriRepo: Repository<Verification>,
  ) {}
}
