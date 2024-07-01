"use client";

import {
  getPost,
  selectPost,
  selectPostStatusError,
  selectPostStatusIsLoading
} from "@src/lib/features/posts/postsSlice";
import { useAppDispatch, useAppSelector } from "@src/lib/hooks";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function PostPage({ params }: { params: { id: number } }) {
  const dispatch = useAppDispatch();
  const selectedPost = useAppSelector(selectPost);
  const postStatusIsLoading = useAppSelector(selectPostStatusIsLoading);
  const postError = useAppSelector(selectPostStatusError);
  const { author, body } = selectedPost || {};

  useEffect(() => {
    dispatch(getPost({ postId: params.id }));
  }, [dispatch, params.id]);

  if (postStatusIsLoading) {
    return <div className="flex items-center justify-center">Loading...</div>;
  }

  if (postError) {
    return (
      <div className="flex items-center flex-col gap-4 justify-center">
        <span>{`We're sorry we couldn't load your post.`}</span>
        <Link href="/">{`<- Back to homepage`}</Link>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <div className="p-8 rounded-lg bg-orange-100 w-full max-w-xl">
        <Link href="/" className="p-2">{`<- Back`}</Link>
        <div className="flex flex-col gap-4 items-center mt-4">
          {author?.image && (
            <Image
              src={author.image}
              alt={`${author.firstName} ${author.lastName}'s avatar`}
              width={40}
              height={40}
              className="rounded-full"
            />
          )}
          <h2 className="text-xl font-semibold text-center">
            {author?.firstName} {author?.lastName}
          </h2>
          <p className="first-letter:uppercase text-sm text-gray-900 max-w-[700px] text-center">
            {body}
          </p>
        </div>
      </div>
    </div>
  );
}
