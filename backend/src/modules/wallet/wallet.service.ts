import { Injectable } from "@nestjs/common";
import { User } from "src/models/object/user.model";
import { RepoService } from "src/repo/repo.service";

@Injectable()
export class WalletService {
  constructor(private readonly repoService: RepoService) {}
  async createWallet(user: User) {}
}
