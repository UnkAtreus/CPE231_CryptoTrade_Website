import { Module } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import { CardResolver } from './card.resolver';
import { CardService } from './card.service';

@Module({
  providers: [CardService, CardResolver, UserService],
})
export class CardModule {}
