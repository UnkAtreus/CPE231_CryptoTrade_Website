import { RoleService } from './role.service';
import { Mutation, Resolver } from '@nestjs/graphql';
import { Roles } from 'src/middleware/guard/roles.decorator';

@Resolver()
export class RoleResolver {
  constructor(private readonly roleService: RoleService) {}

  @Mutation(() => String)
  @Roles(['customer', 'staff', 'admin'])
  async createRole(): Promise<string> {
    return await this.roleService.createRole();
  }
}
