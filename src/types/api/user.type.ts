import { User } from "../user.type";

export type UsersDTO = {
  total: number;
  skip: number;
  limit: number;
  users: User[];
};
