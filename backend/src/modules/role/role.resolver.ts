import { RoleService } from './role.service';
import { Mutation, Resolver, Query, Args, ID } from '@nestjs/graphql';
import { Roles } from 'src/middleware/guard/roles.decorator';
import { Role } from 'src/models/object/role.model';

@Resolver()
export class RoleResolver {
  constructor(private readonly roleService: RoleService) {}

  @Mutation(() => String)
  async createAllRoles(): Promise<string> {
    return await this.roleService.createRoles();
  }

  @Query(() => [Role])
  async getAllRole(): Promise<Role[]> {
    return await this.roleService.getAllRole();
  }
  @Mutation(() => Role)
  async createRole(@Args('role') role: string): Promise<Role> {
    return await this.roleService.createRole(role);
  }
  @Mutation(() => Role)
  async updateRole(
    @Args('id', { type: () => ID }) id: number,
    @Args('role') role: string,
  ): Promise<Role> {
    return await this.roleService.updateRole(id, role);
  }
}
