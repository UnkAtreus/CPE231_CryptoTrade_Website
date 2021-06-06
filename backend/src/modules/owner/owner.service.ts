import { Injectable } from '@nestjs/common';
import { RepoService } from 'src/repo/repo.service';

@Injectable()
export class OwnerService {
  constructor(private readonly repoService: RepoService) {}

  async sumFiatFee() {
    return;
  }
}
