"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "../components/header";

const mockThreads = [
  { id: "1", title: "hi" },
  { id: "2", title: "gimme research on struggles with OPT" },
  { id: "3", title: "recent trends in visa policy" },
  { id: "4", title: "handicap of international students" },
];

export default function ChatPage() {
  const [currentThread, setCurrentThread] = useState(mockThreads[0]);

  return (
    <>
          <style>
        {`
          html, body {
            height: 100%;
            overflow: hidden;
          }
        `}
      </style>

      <Header />
      <div className="flex h-[93vh] bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200">
        
        {/* Left Sidebar */}
        <aside className="w-96 h-[93vh] border-r border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-4 space-y-4">
          <h2 className="text-xl font-bold">Library</h2>
          <ul className="space-y-2">
            {mockThreads.map((thread) => (
              <li
                key={thread.id}
                className={`cursor-pointer p-2 rounded-md ${
                  thread.id === currentThread.id
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
                    : "hover:bg-neutral-200 dark:hover:bg-neutral-800"
                }`}
                onClick={() => setCurrentThread(thread)}
              >
                {thread.title}
              </li>
            ))}
          </ul>

        </aside>

        {/* Main Chat Area */}
        <main className="flex-1 flex flex-col h-[93vh] bg-white dark:bg-neutral-950">
          <header className="border-b p-4">
            <h1 className="text-3xl font-bold">{currentThread.title}</h1>
          </header>

          {/* Chat Messages - Only this section scrolls */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-md">
              <p>Hello! How can I help you with {currentThread.title}?</p>
            </div>
            <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-md self-end">
              <p>What are the common struggles with OPT for CS majors?</p>
            </div>
            <div className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-md">
              <p>Hello! How can I help you with {currentThread.title}?</p>
            </div>
            <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-md self-end">
              <p>What are the common struggles with OPT for CS majors?</p>
            </div>
            <div className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-md">
              <p>Hello! How can I help you with {currentThread.title}?</p>
            </div>
            <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-md self-end">
              <p>What are the common struggles with OPT for CS majors?</p>
            </div>
            <div className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-md">
              <p>Hello! How can I help you with {currentThread.title}?</p>
            </div>
            <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-md self-end">
              <p>What are the common struggles with OPT for CS majors?</p>
            </div>
            <div className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-md">
              <p>Hello! How can I help you with {currentThread.title}?</p>
            </div>
            <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-md self-end">
              <p>What are the common struggles with OPT for CS majors?</p>
            </div>
            <div className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-md">
              <p>Hello! How can I help you with {currentThread.title}?</p>
            </div>
            <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-md self-end">
              <p>What are the common struggles with OPT for CS majors?</p>
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 border-t bg-white dark:bg-neutral-950">
            <form className="flex gap-2">
              <input
                type="text"
                placeholder="Ask follow-up..."
                className="flex-1 px-4 py-2 border rounded-md dark:bg-neutral-800 dark:border-neutral-700 focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500"
              >
                Send
              </button>
            </form>
          </div>
        </main>

        {/* Right Sidebar - Actions */}
        <aside className="w-96 h-[93vh] border-l border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-4 space-y-4">
          <h2 className="text-xl font-bold">Helpful Links</h2>
          <button className="w-full p-2 rounded-md bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700">
            Sources here
          </button>
        </aside>
      </div>
    </>
  );
}

