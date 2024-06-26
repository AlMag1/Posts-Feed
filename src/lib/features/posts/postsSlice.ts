import { createAppSlice } from "@/lib/createAppSlice";
import type { AppThunk } from "@/lib/store";
import { Post } from "@/types";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface PostsSliceState {
  posts: Post[];
}

const initialState: PostsSliceState = {
  posts: [],
};

export const postsSlice = createAppSlice({
  name: "posts",
  initialState,
  reducers: (create) => ({
    update: create.reducer((state) => {
      state.posts = [];
    }),
  }),
  selectors: {
    selectPosts: (posts) => posts.posts,
  },
});

export const { update } = postsSlice.actions;

export const { selectPosts } = postsSlice.selectors;
