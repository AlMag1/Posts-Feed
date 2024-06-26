import { User } from "../user.type";

export type UserDTO = {
  total: number;
  skip: number;
  limit: number;
  users: User[];
};
