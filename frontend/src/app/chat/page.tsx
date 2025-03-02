"use client";

import { useState } from "react";
import Image from "next/image";
import Header from "@/components/header";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";

const mockThreads = [
  { id: "1", title: "hi" },
  { id: "2", title: "gimme research on struggles with OPT" },
  { id: "3", title: "recent trends in visa policy" },
  { id: "4", title: "handicap of international students" },
];

export default function ChatPage() {
  const [currentThread, setCurrentThread] = useState(mockThreads[0]);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Message sent:", inputValue);
    setInputValue(""); // Clear input after sending
  };

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
      <div className="flex h-[93vh]">
        {/* Left Sidebar */}
        <aside className="w-96 h-[93vh] p-4 space-y-4 bg-[#F5F7F7]">
          <h2 className="text-xl font-bold text-[#012538]">Library</h2>
          <ul className="space-y-2">
            {mockThreads.map((thread) => (
              <li
                key={thread.id}
                className={`cursor-pointer p-2 rounded-md transition ${
                  thread.id === currentThread.id
                    ? "bg-[#1B768E] text-white"
                    : "hover:bg-[#EBEFFF] text-[#4D555B]"
                }`}
                onClick={() => setCurrentThread(thread)}
              >
                {thread.title}
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Chat Area */}
        <main className="flex-1 flex flex-col h-[93vh] bg-white">
          <header className="border-b p-4">
            <h1 className="text-3xl font-bold text-[#012538]">
              {currentThread.title}
            </h1>
          </header>

          {/* Chat Messages - Scrollable */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className={`flex items-start gap-3 ${
                  i % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
              >
                {/* Avatar */}
                {i % 2 === 0 ? (
                  <Image
                    src="/logo.png" // Make sure this logo exists in public folder
                    alt="Flock AI"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm font-bold text-gray-700">
                    U
                  </div>
                )}

                {/* Message Bubble */}
                <div
                  className={`p-4 rounded-md ${
                    i % 2 === 0
                      ? "bg-neutral-100 text-black"
                      : "bg-blue-100 text-black"
                  }`}
                >
                  <p>
                    {i % 2 === 0
                      ? `Hello! How can I help you with ${currentThread.title}?`
                      : `What are the common struggles with OPT for CS majors?`}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area - This is where the magic happens */}
          <div className="p-4 border-t flex justify-center bg-white">
            <div className="w-full">
              <PlaceholdersAndVanishInput
                placeholders={[
                  "Ask about H-1B...",
                  "What are OPT struggles?",
                  "What are F-1 visa tips?",
                  "What's the latest on visa policies?",
                ]}
                onChange={handleInputChange}
                onSubmit={handleInputSubmit}
              />
            </div>
          </div>
        </main>

        {/* Right Sidebar - Helpful Links */}
        <aside className="w-96 h-[93vh] p-4 space-y-4 bg-[#F5F7F7]">
          <h2 className="text-xl font-bold text-[#012538]">Helpful Links</h2>
          <button className="w-full p-2 rounded-md bg-[#1B768E] text-white">
            Sources here
          </button>
        </aside>
      </div>
    </>
  );
}
