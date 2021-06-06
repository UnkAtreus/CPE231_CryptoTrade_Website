import { Module } from '@nestjs/common';
import { VerificationService } from './verification.service';
import { VerificationResolver } from './verification.resolver';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  providers: [VerificationResolver, VerificationService],
})
export class VerificationModule {}
