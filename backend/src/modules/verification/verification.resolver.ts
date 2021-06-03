import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { VerificationService } from './verification.service';

import { CreateVerificationInput } from './dto/create-verification.input';
import { UpdateVerificationInput } from './dto/update-verification.input';
import { Verification } from 'src/models/object/verification.model';

@Resolver(() => Verification)
export class VerificationResolver {
  constructor(private readonly verificationService: VerificationService) {}

  @Mutation(() => Verification)
  createVerification(
    @Args('createVerificationInput')
    createVerificationInput: CreateVerificationInput,
  ) {
    return this.verificationService.create(createVerificationInput);
  }

  @Query(() => [Verification], { name: 'verification' })
  findAll() {
    return this.verificationService.findAll();
  }

  @Query(() => Verification, { name: 'verification' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.verificationService.findOne(id);
  }

  @Mutation(() => Verification)
  updateVerification(
    @Args('updateVerificationInput')
    updateVerificationInput: UpdateVerificationInput,
  ) {
    return this.verificationService.update(
      updateVerificationInput.id,
      updateVerificationInput,
    );
  }

  @Mutation(() => Verification)
  removeVerification(@Args('id', { type: () => Int }) id: number) {
    return this.verificationService.remove(id);
  }
}
