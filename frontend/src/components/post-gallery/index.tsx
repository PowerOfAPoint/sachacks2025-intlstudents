"use client";

import { Post } from "@/lib/db/forum";
import { fetchPosts, PostData } from "@/lib/forum/posts";
import { getBaseUrl } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";

export function PostGallery({ posts }: { posts: PostData[] }) {
  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {posts.map((post) => (
        <Link key={post.id} href={`/posts/${post.id}`} className="block">
          <div
            key={post.id}
            className="bg-white p-4 rounded-lg w-full shadow-md space-y-2 border"
          >
            {/* {console.log(post)} */}
            {/* Title + Tags */}
            <div className="flex justify-between items-center">
              <p className="font-bold text-lg text-[#012538]">{post.content}</p>
              {/* <div className="flex space-x-2"> */}
              {/*   {post.tags.map((tag) => ( */}
              {/*     <span */}
              {/*       key={tag} */}
              {/*       className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded" */}
              {/*     > */}
              {/*       {tag} */}
              {/*     </span> */}
              {/*   ))} */}
              {/* </div> */}
            </div>

            {/* User + Stats */}
            <div className="flex justify-between items-center text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full" />
                <p>{post.author.name} • Today</p>
              </div>
              <div className="flex space-x-4">
                <p>3324 views</p>
                <p>12312 likes</p>
                <p>1231 comments</p>
                {/* <p>{post.views.toLocaleString()} Views</p> */}
                {/* <p>{post.likes.toLocaleString()} Likes</p> */}
                {/* <p>{post.comments.length} Comments</p> */}
              </div>
            </div>

            <p className="text-center text-muted-foreground text-lg py-4">
              This question has no comments. Be the first to answer!
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
