import { UserDTO } from "@/types/api/user.type";
import axios, { AxiosResponse } from "axios";

export const fetchUsers = async ({ limit }: { limit: number }) => {
  const response: AxiosResponse<UserDTO> = await axios.get(
    `https://dummyjson.com/users?limit=${limit}&select=firstName,lastName,id,image`
  );

  return response.data.users;
};
