import { Role } from 'src/models/role.model';

export default class AllRole {
  static customer: Role = {
    id: 1,
    role: 'customer',
  };
  static staff: Role = {
    id: 1,
    role: 'staff',
  };
  static owner: Role = {
    id: 1,
    role: 'owner',
  };
  static admin: Role = {
    id: 1,
    role: 'admin',
  };
}
