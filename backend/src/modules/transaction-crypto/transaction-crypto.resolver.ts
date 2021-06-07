import { TransactionCrypto } from 'src/models/object/transactionCrypto.model';
import { TransactionCryptoService } from 'src/modules/transaction-crypto/transaction-crypto.service';
import { Args, Context, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Role } from 'src/models/object/role.model';
import { User } from 'src/models/object/user.model';
import CryptoInput from 'src/models/input/crypto.input';
import { Roles } from 'src/middleware/guard/roles.decorator';
import { TransactionStatus } from 'src/static/enum';

@Resolver()
export class TransactionCryptoResolver {
  constructor(private crytoService: TransactionCryptoService) {}

  @Mutation(() => TransactionCrypto)
  @Roles(['customer'])
  async createTransCrypto(
    @Context('user') user: User,
    @Args('cryptoInput') input: CryptoInput,
  ): Promise<TransactionCrypto> {
    return this.crytoService.createTransCrypto(user, input);
  }
  @Query(() => [TransactionCrypto])
  async getAllCrypto(): Promise<TransactionCrypto[]> {
    return await this.crytoService.getAllCrypto();
  }
  @Query(() => [TransactionCrypto])
  @Roles(['customer'])
  async getAllCryptoByUser(
    @Context('user') user: User,
  ): Promise<TransactionCrypto[]> {
    return await this.crytoService.getAllCryptoByUser(user);
  }
  @Mutation(() => TransactionCrypto)
  async updateCryptoStatus(
    @Args('status') status: TransactionStatus,
    @Args('id', { type: () => ID }) id: number,
  ): Promise<TransactionCrypto> {
    return this.crytoService.updateCrypto(id, status);
  }
}
