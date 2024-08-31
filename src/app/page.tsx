"use client";

import { getPosts, selectPosts } from "@src/lib/features/posts/postsSlice";
import { useAppDispatch, useAppSelector } from "@src/lib/hooks";
import { useEffect } from "react";
import dynamic from "next/dynamic";

const PostsList = dynamic(() => import("@src/components/PostsList"), {
  ssr: false
});

console.log('Test commit');

export default function Home() {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);

  useEffect(() => {
    if (posts.length) {
      return;
    }
    dispatch(getPosts({ start: 0, end: 20 }));
  }, [dispatch, posts.length]);

  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-24">
      <PostsList />
    </main>
  );
}
