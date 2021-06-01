import { TransactionCrypto } from 'src/models/object/transactionCrypto.model';
import { TransactionCryptoService } from 'src/modules/transaction-crypto/transaction-crypto.service';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { Role } from 'src/models/object/role.model';
import { User } from 'src/models/object/user.model';
import CryptoInput from 'src/models/input/crypto.input';
import { Roles } from 'src/middleware/guard/roles.decorator';

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
}
