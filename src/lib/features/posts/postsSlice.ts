import { createAppSlice } from "@src/lib/createAppSlice";
import { Post } from "@src/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPost, fetchPosts } from "./postsAPI";
import { fetchUser, fetchUsers } from "../users/usersAPI";

export interface PostsSliceState {
  posts: Post[];
  selectedPost: Post | null;
  start: number;
  end: number;
  hasMoreResults: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: PostsSliceState = {
  posts: [],
  selectedPost: null,
  start: 0,
  end: 20,
  hasMoreResults: true,
  loading: false,
  error: null
};

export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (data: { start: number; end: number }) => {
    const apiPosts = await fetchPosts({ start: data.start, end: data.end });
    const authors = await fetchUsers({ limit: data.end });

    const posts: Post[] = apiPosts.map(post => ({
      ...post,
      author: authors.find(author => author.id === post.userId)
    }));

    return posts;
  }
);

export const getPost = createAsyncThunk(
  "posts/getPost",
  async (data: { postId: number }) => {
    const apiPost = await fetchPost({ id: data.postId });
    const author = await fetchUser({ id: apiPost.userId });

    const post: Post = {
      ...apiPost,
      author
    };

    return post;
  }
);

export const postsSlice = createAppSlice({
  name: "posts",
  initialState,
  reducers: () => ({}),
  selectors: {
    selectPosts: posts => posts.posts,
    selectStart: posts => posts.start,
    selectEnd: posts => posts.end,
    selectHasMoreResults: posts => posts.hasMoreResults,
    selectPost: posts => posts.selectedPost,
    selectPostStatusIsLoading: posts => posts.loading,
    selectPostStatusError: posts => posts.error
  },
  extraReducers: builder => {
    builder
      .addCase(getPosts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.posts = [...state.posts, ...action.payload];
        state.start += 20;
        state.end += 20;
        state.hasMoreResults = !!action.payload.length;
        state.loading = false;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch posts";
      })
      .addCase(getPost.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.selectedPost = action.payload;
        state.loading = false;
      })
      .addCase(getPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch post";
      });
  }
});

export const {
  selectPosts,
  selectStart,
  selectEnd,
  selectHasMoreResults,
  selectPost,
  selectPostStatusIsLoading,
  selectPostStatusError
} = postsSlice.selectors;
