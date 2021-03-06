import PtoPInput from 'src/models/input/p2p.input';
import { Args, Context, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Role } from 'src/models/object/role.model';
import { P2PService } from './p2p.service';
import { PtoP } from 'src/models/object/ptop.model';
import { User } from 'src/models/object/user.model';
import { Roles } from 'src/middleware/guard/roles.decorator';

@Resolver()
export class P2PResolver {
  constructor(private p2pService: P2PService) {}

  @Mutation(() => PtoP)
  @Roles(['customer'])
  async createP2P(
    @Context('user') user: User,
    @Args('p2pInput') input: PtoPInput,
  ): Promise<PtoP> {
    return this.p2pService.createP2P(input, user);
  }

  @Query(() => [PtoP])
  async getAllP2P(): Promise<PtoP[]> {
    return this.p2pService.getAllP2P();
  }

  @Query(() => [PtoP])
  @Roles(['customer'])
  async getP2PByToken(@Context('user') user: User): Promise<PtoP[]> {
    return this.p2pService.getP2PByToken(user);
  }
}
