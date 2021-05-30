import { Role } from "src/models/role.model";

export default class AllRole {
  customer: Role = {
    id: 1,
    role: "customer",
  };
  staff: Role = {
    id: 1,
    role: "staff",
  };
  owner: Role = {
    id: 1,
    role: "owner",
  };
  admin: Role = {
    id: 1,
    role: "admin",
  };
}
