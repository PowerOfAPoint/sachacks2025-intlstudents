"use client";

import { useState } from "react";
import { Search, Send } from "lucide-react";
import Header from "@/components/header";

const mockPosts = [
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
  const [posts, setPosts] = useState(mockPosts);
  const [newPost, setNewPost] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [commentInputs, setCommentInputs] = useState<{ [key: number]: string }>(
    {}
  );

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

    setCommentInputs((prev) => ({ ...prev, [postId]: "" })); // Clear input
  };

  const filteredPosts = posts.filter((post) =>
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-screen flex flex-col">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Header />
      </div>

      {/* Main Layout with Sidebar + Content */}
      <div className="flex flex-1 overflow-hidden pt-16">
        {/* Sidebar */}
        <aside className="w-1/4 bg-white border-r p-4 space-y-6">
          <nav className="space-y-4">
            <p className="font-bold text-lg">Navigation</p>
            {["Home", "Trending", "Answers", "All"].map((item) => (
              <p
                key={item}
                className="cursor-pointer p-2 rounded-md hover:bg-gray-100 transition"
              >
                {item}
              </p>
            ))}
          </nav>

          <div>
            <p className="font-bold text-lg">Popular Tags</p>
            <div className="mt-2 space-y-2">
              {["#day1cpt", "#opt", "#h1b", "#f1"].map((tag) => (
                <p
                  key={tag}
                  className="cursor-pointer p-2 rounded-md bg-gray-100 text-[#1B768E]"
                >
                  {tag}
                </p>
              ))}
            </div>
          </div>

          <div>
            <p className="font-bold text-lg">My Group</p>
            <div className="mt-2 space-y-2">
              {["Internship", "OPT", "H1B", "F1"].map((group) => (
                <p
                  key={group}
                  className="cursor-pointer p-2 rounded-md hover:bg-gray-100"
                >
                  {group}
                </p>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {/* Search Bar */}
          <div className="relative w-full max-w-3xl mx-auto mb-6">
            <input
              type="text"
              placeholder="Type here to search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 pl-10 rounded-md border focus:outline-none focus:ring-2 focus:ring-[#1B768E]"
            />
            <Search
              className="absolute top-1/3 left-3 -translate-y-1/2 text-gray-400"
              size={20} 
            />
          </div>

          {/* Post Creator */}
          <div className="bg-white p-4 rounded-md shadow-md max-w-3xl mx-auto mb-4 flex items-center space-x-4">
            <input
              type="text"
              placeholder="Let's share what's going on your mind..."
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1B768E]"
            />
            <button
              onClick={() => {
                if (newPost.trim()) {
                  setPosts([
                    {
                      id: Date.now(),
                      user: "You",
                      content: newPost,
                      comments: [],
                      views: 0,
                      likes: 0,
                      tags: ["User Post"],
                    },
                    ...posts,
                  ]);
                  setNewPost("");
                }
              }}
              className="bg-[#012538] text-white px-4 py-2 rounded-md"
            >
              Create Post
            </button>
          </div>

          {/* Filter Options */}
          <div className="flex justify-between items-center max-w-3xl mx-auto text-gray-600 mb-4">
            <p className="font-semibold">Popular Tags/ #day1cpt</p>
            <p className="cursor-pointer">Most Recent ▾</p>
          </div>

          {/* Post List */}
          <div className="space-y-4 max-w-3xl mx-auto">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white p-4 rounded-lg shadow-md space-y-2 border"
                >
                  {/* Title + Tags */}
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-lg text-[#012538]">
                      {post.content}
                    </p>
                    <div className="flex space-x-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* User + Stats */}
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gray-300 rounded-full" />
                      <p>{post.user} • Today</p>
                    </div>
                    <div className="flex space-x-4">
                      <p>{post.views.toLocaleString()} Views</p>
                      <p>{post.likes.toLocaleString()} Likes</p>
                      <p>{post.comments.length} Comments</p>
                    </div>
                  </div>

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

                    <button className="bg-[#1B768E] text-white p-2 rounded-md">
                      <Send size={16} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center">
                No matching posts found.
              </p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
