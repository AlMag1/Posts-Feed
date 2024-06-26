import { PostDTO } from "./api/post.type";
import { User } from "./user.type";

export type Post = PostDTO & {
  author: User | undefined;
};
