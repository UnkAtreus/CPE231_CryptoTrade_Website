import { Module } from '@nestjs/common';
import { OwnerResolver } from './owner.resolver';
import { OwnerService } from './owner.service';

@Module({
  providers: [OwnerResolver, OwnerService],
})
export class OwnerModule {}
