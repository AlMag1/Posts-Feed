"use client";
import PostItem from "./PostItem";
import { useAppDispatch, useAppSelector } from "@src/lib/hooks";
import {
  getPosts,
  selectEnd,
  selectHasMoreResults,
  selectPostStatusError,
  selectPostStatusIsLoading,
  selectPosts,
  selectStart
} from "@src/lib/features/posts/postsSlice";
import { memo, useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const PostsList = () => {
  const posts = useAppSelector(selectPosts);
  const start = useAppSelector(selectStart);
  const end = useAppSelector(selectEnd);
  const hasMoreResults = useAppSelector(selectHasMoreResults);
  const postsAreLoading = useAppSelector(selectPostStatusIsLoading);
  const postsHasError = useAppSelector(selectPostStatusError);
  const dispatch = useAppDispatch();
  const { ref, inView } = useInView();

  const getMorePosts = useCallback(async () => {
    if (hasMoreResults && !postsAreLoading) {
      await dispatch(getPosts({ start, end }));
    }
  }, [dispatch, start, end, hasMoreResults, postsAreLoading]);

  useEffect(() => {
    if (inView) {
      getMorePosts();
    }
  }, [inView, getMorePosts]);

  if (postsHasError) {
    return (
      <div className="flex items-center flex-col gap-4 justify-center">
        <span>{`We're sorry we couldn't load the posts.`}</span>
      </div>
    );
  }

  return posts.length ? (
    <>
      <section className="flex flex-col gap-3">
        {posts.map(post => (
          <PostItem key={post.id} post={post} />
        ))}
      </section>
      <section className="text-center mt-5">
        {hasMoreResults && !postsAreLoading && (
          <span ref={ref}>Loading more...</span>
        )}
        {postsAreLoading && <span>Loading...</span>}
      </section>
    </>
  ) : (
    <span>Posts are loading.....</span>
  );
};

export default memo(PostsList);
