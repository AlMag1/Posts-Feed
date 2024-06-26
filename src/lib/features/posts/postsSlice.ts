import { createAppSlice } from "@/lib/createAppSlice";
import { Post, User } from "@/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPosts } from "./postsAPI";
import { fetchUsers } from "../users/usersAPI";

export interface PostsSliceState {
  posts: Post[];
  start: number;
  end: number;
  hasMoreResults: boolean;
}

const initialState: PostsSliceState = {
  posts: [],
  start: 0,
  end: 20,
  hasMoreResults: true,
};

export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (data: { start: number; end: number }) => {
    const apiPosts = await fetchPosts({ start: data.start, end: data.end });
    const authors = await fetchUsers({ limit: data.end });

    const posts: Post[] = apiPosts.map((post) => ({
      ...post,
      author: authors.find((author) => author.id === post.userId),
    }));

    return posts;
  }
);

export const postsSlice = createAppSlice({
  name: "posts",
  initialState,
  reducers: () => ({}),
  selectors: {
    selectPosts: (posts) => posts.posts,
    selectStart: (posts) => posts.start,
    selectEnd: (posts) => posts.end,
    selectHasMoreResults: (posts) => posts.hasMoreResults,
  },
  extraReducers: (builder) => {
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.posts = [...state.posts, ...action.payload];
      state.start += 20;
      state.end += 20;
      state.hasMoreResults = !!action.payload.length;
    });
  },
});

export const { selectPosts, selectStart, selectEnd, selectHasMoreResults } =
  postsSlice.selectors;
