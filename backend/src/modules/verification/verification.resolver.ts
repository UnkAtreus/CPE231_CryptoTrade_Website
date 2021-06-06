import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { VerificationService } from './verification.service';

import { Verification } from 'src/models/object/verification.model';
import { Roles } from 'src/middleware/guard/roles.decorator';
import { User } from 'src/models/object/user.model';
import { TransactionStatus } from 'src/static/enum';

@Resolver(() => Verification)
export class VerificationResolver {
  constructor(private readonly verificationService: VerificationService) {}
  @Mutation(() => Verification)
  @Roles(['customer'])
  async createVertification(
    @Context('user') user: User,
    @Args('imagename') image: string,
  ): Promise<Verification> {
    return await this.verificationService.create(user, image);
  }
  @Query(() => [Verification])
  async allVeri(): Promise<Verification[]> {
    return await this.verificationService.findAll();
  }
  @Query(() => [Verification])
  @Roles(['staff'])
  async allVeriForStaff(): Promise<Verification[]> {
    return await this.verificationService.findAllForStaff();
  }
  @Mutation(() => Boolean)
  @Roles(['staff'])
  async updateVeri(
    @Args('id') id: number,
    @Args('status') status: TransactionStatus,
  ): Promise<boolean> {
    return await this.verificationService.update(id, status);
  }
  @Query(() => Verification)
  @Roles(['customer'])
  async verfiForUser(@Context('user') user: User): Promise<Verification> {
    return await this.verificationService.findOneByUser(user);
  }
}
