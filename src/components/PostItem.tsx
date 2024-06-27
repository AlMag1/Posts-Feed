import { Post as PostType } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

const PostItem = ({ post }: { post: PostType }) => {
  const { firstName, lastName, image } = post.author || {};

  return (
    <Link href={`/post/${post.id}`}>
      <div className="p-8 rounded-lg bg-orange-100">
        <div className="flex items-start gap-4">
          <div className="h-10 w-10">
            {image ? (
              <Image
                src={image}
                alt={`${firstName} ${lastName}'s avatar`}
                width={40}
                height={40}
              />
            ) : null}
          </div>
          <div>
            <h2 className="first-letter:uppercase mb-4 font-semibold">
              {firstName} {lastName}
            </h2>
            <p className="first-letter:uppercase text-sm text-gray-900">
              {post.body.length > 100
                ? `${post.body.slice(0, 100)}...`
                : post.body}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default memo(PostItem);
