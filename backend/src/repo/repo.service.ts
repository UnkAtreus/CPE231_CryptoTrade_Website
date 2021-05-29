import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Bank } from "src/models/bank.model";
import { CreditCard } from "src/models/creditcard.model";
import { Currency } from "src/models/currency.model";
import { Order } from "src/models/order.model";
import { PtoP } from "src/models/ptop.model";
import { Role } from "src/models/role.model";
import { TransactionFiat } from "src/models/transactionFiat.model";
import { User } from "src/models/user.model";
import { Wallet } from "src/models/wallet.model";
import { Repository } from "typeorm";
import { TransactionCrypto } from "../models/transactionCrypto.model";

@Injectable()
export class RepoService {
  public constructor(
    @InjectRepository(User) public readonly userRepo: Repository<User>,
    @InjectRepository(Role) public readonly roleRepo: Repository<Role>,
    @InjectRepository(Bank) public readonly bankRepo: Repository<Bank>,
    @InjectRepository(CreditCard)
    public readonly creditCardRepo: Repository<CreditCard>,
    @InjectRepository(Currency)
    public readonly currencyRepo: Repository<Currency>,
    @InjectRepository(Order) public readonly orderRepo: Repository<Order>,
    @InjectRepository(PtoP) public readonly ptopRepo: Repository<PtoP>,
    @InjectRepository(TransactionCrypto)
    public readonly transactionCryptoRepo: Repository<TransactionCrypto>,
    @InjectRepository(TransactionFiat)
    public readonly transactionCryptoFiat: Repository<TransactionFiat>,
    @InjectRepository(Wallet) public readonly walletRepo: Repository<Wallet>
  ) {}
}
