import { RepoService } from './../../repo/repo.service';
import { Injectable } from '@nestjs/common';
import { Role } from 'src/models/object/role.model';

@Injectable()
export class RoleService {
  constructor(private readonly repoService: RepoService) {}

  async createRoles(): Promise<string> {
    const role: string[] = ['customer', 'staff', 'owner', 'admin'];
    for (let i = 0; i < 4; i++) {
      const createRole = new Role();
      createRole.role = role[i];
      await this.repoService.roleRepo.save(createRole);
    }
    return 'create role';
  }
  async getAllRole() {
    return await this.repoService.roleRepo.find();
  }
  async createRole(roleName: string): Promise<Role> {
    return await this.repoService.roleRepo.save({ role: roleName });
  }
  async updateRole(id: number, roleName: string): Promise<Role> {
    return await this.repoService.roleRepo.save({ id, role: roleName });
  }
}
