import { RepoService } from './../../repo/repo.service';
import { Injectable } from '@nestjs/common';
import { Role } from 'src/models/object/role.model';

@Injectable()
export class RoleService {
  constructor(private readonly repoService: RepoService) {}

  async createRole(): Promise<string> {
    const role: string[] = ['customer', 'staff', 'owner', 'admin'];
    for (let i = 0; i < 4; i++) {
      const createRole = new Role();
      createRole.role = role[i];
      await this.repoService.roleRepo.save(createRole);
    }
    return 'create role';
  }
}
