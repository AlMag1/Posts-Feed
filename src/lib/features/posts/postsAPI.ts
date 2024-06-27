import { PostDTO } from "@/types/api";
import axios, { AxiosResponse } from "axios";

export const fetchPosts = async ({
  start,
  end,
}: {
  start: number;
  end: number;
}) => {
  const response: AxiosResponse<PostDTO[]> = await axios.get(
    `https://jsonplaceholder.typicode.com/posts?_start=${start}&_end=${end}`
  );

  return response.data;
};

export const fetchPost = async ({ id }: { id: number }) => {
  const response: AxiosResponse<PostDTO> = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );

  return response.data;
};
