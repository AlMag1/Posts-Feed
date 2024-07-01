import { Post } from "@src/types";

export const __MOCK_POSTS__: Post[] = [
  {
    title: "This is a cool post tile",
    body: "And this is the coolest post body",
    id: 1,
    userId: 1,
    author: {
      firstName: "Kendrick",
      lastName: "Nunn",
      id: 1,
      image: undefined
    }
  }
];
