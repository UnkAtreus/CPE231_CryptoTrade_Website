import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/models/role.model';

export const Roles = (role: string) => SetMetadata('roles', role);
