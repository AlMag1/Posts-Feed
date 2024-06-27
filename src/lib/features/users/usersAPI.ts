import { User } from "@src/types";
import { UsersDTO } from "@src/types/api/user.type";
import axios, { AxiosResponse } from "axios";

export const fetchUsers = async ({ limit }: { limit: number }) => {
  const response: AxiosResponse<UsersDTO> = await axios.get(
    `https://dummyjson.com/users?limit=${limit}&select=firstName,lastName,id,image`,
  );

  return response.data.users;
};

export const fetchUser = async ({ id }: { id: number }) => {
  const response: AxiosResponse<User> = await axios.get(
    `https://dummyjson.com/users/${id}`,
  );

  return response.data;
};
