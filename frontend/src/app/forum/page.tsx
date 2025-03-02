"use client";

import { useState } from "react";
import { Search, Send } from "lucide-react";
import Header from "@/components/header";

type Comment = {
  user: string;
  text: string;
};

type Post = {
  id: number;
  user: string;
  content: string;
  comments: Comment[];
  views: number;
  likes: number;
  tags: string[];
};

const mockPosts: Post[] = [
  {
    id: 1,
    user: "Alice",
    content: "What is the difference between CPT and OPT?",
    comments: [],
    views: 651324,
    likes: 36545,
    tags: ["Work Authorization", "CPT", "OPT"],
  },
  {
    id: 2,
    user: "Bob",
    content: "How to prepare for Day 1 CPT?",
    comments: [],
    views: 512314,
    likes: 24532,
    tags: ["Day 1 CPT", "International Students"],
  },
];

export default function ForumPage() {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [newPost, setNewPost] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [commentInputs, setCommentInputs] = useState<{ [key: number]: string }>({});

  const handleAddComment = (postId: number) => {
    if (!commentInputs[postId]?.trim()) return;

    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [
                ...post.comments,
                { user: "You", text: commentInputs[postId] },
              ],
            }
          : post
      )
    );

    setCommentInputs((prev) => ({ ...prev, [postId]: "" }));
  };

  const filteredPosts = posts.filter((post) =>
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-screen flex flex-col">
      <div className="fixed top-0 left-0 w-full z-50">
        <Header />
      </div>
      <div className="flex flex-1 overflow-hidden pt-16">
        {/* Sidebar */}
        <aside className="w-1/4 bg-white border-r p-4 space-y-6">
          {/* (Sidebar code stays the same) */}
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {/* (Search bar and post creation UI stays the same) */}

          {/* Post List */}
          <div className="space-y-4 max-w-3xl mx-auto">
            {filteredPosts.map((post) => (
              <div key={post.id} className="bg-white p-4 rounded-lg shadow-md space-y-2 border">
                <p className="font-bold text-lg text-[#012538]">{post.content}</p>
                {/* (Tags, user info, etc.) */}

                {/* Comments */}
                <div className="mt-2 space-y-2">
                  {post.comments.map((comment, index) => (
                    <div key={index} className="bg-gray-100 p-2 rounded-md">
                      <p className="text-sm font-semibold">{comment.user}</p>
                      <p className="text-gray-700">{comment.text}</p>
                    </div>
                  ))}
                </div>

                {/* Add Comment */}
                <div className="mt-2 flex space-x-2">
                  <input
                    type="text"
                    placeholder="Write a comment..."
                    className="flex-1 p-2 border rounded-md"
                    value={commentInputs[post.id] || ""}
                    onChange={(e) =>
                      setCommentInputs((prev) => ({
                        ...prev,
                        [post.id]: e.target.value,
                      }))
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleAddComment(post.id);
                      }
                    }}
                  />
                  <button
                    onClick={() => handleAddComment(post.id)}
                    className="bg-[#1B768E] text-white p-2 rounded-md"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
