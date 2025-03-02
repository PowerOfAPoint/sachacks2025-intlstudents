"use client";

import { RenderReply } from "@/app/posts/[id]/_render-reply";
import { Post } from "@/lib/db/forum";
import { fetchPosts, PostData } from "@/lib/forum/posts";
import { getBaseUrl } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { JSONContent } from "novel";
import { useState } from "react";

export function PostGallery({ posts }: { posts: PostData[] }) {
  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {posts.length > 0 ? (
        posts.map((post) => (
          <Link key={post.id} href={`/posts/${post.id}`} className="block">
            <div
              key={post.id}
              className="bg-white p-4 rounded-lg w-full shadow-md space-y-2 border"
            >
              {/* {console.log(post)} */}
              {/* Title + Tags */}
              <div className="flex justify-between items-center">
                <p className="font-bold text-lg text-[#012538]">
                  {post.content}
                </p>
                <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">
                  {post.group.name}
                </span>
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
                  {/* <p>3324 views</p> */}
                  {/* <p>12312 likes</p> */}
                  <p>{post.comments.length} comments</p>
                  {/* <p>{post.views.toLocaleString()} Views</p> */}
                  {/* <p>{post.likes.toLocaleString()} Likes</p> */}
                  {/* <p>{post.comments.length} Comments</p> */}
                </div>
              </div>

              {post.comments.length > 0 ? (
                <div className="relative max-h-64 overflow-clip">
                  <RenderReply
                    content={post.comments[0].content as JSONContent}
                  />
                  {/* <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-gray-50 to-transparent"></div> */}
                </div>
              ) : (
                <p className="text-center text-muted-foreground text-lg py-4">
                  This question has no comments. Be the first to answer!
                </p>
              )}
            </div>
          </Link>
        ))
      ) : (
        <div className="mt-12">
          <p className="text-center text-xl">
            No posts available. Check back later or submit a post!
          </p>
        </div>
      )}
    </div>
  );
}
