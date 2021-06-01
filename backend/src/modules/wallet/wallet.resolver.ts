import { Resolver } from "@nestjs/graphql";
import { WalletService } from "../wallet/wallet.service";

@Resolver()
export class WalletResolver {
  constructor(private walletService: WalletService) {}
}
