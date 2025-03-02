"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { FormEventHandler, useState, useTransition } from "react";
import { redirect } from "../api/_actions/redirect";

export function PostSearch() {
  const [value, setValue] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    if (value.trim() === "") return;

    startTransition(async () => {
      await redirect(`/forum/search?query=${value}`);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative w-full max-w-3xl mx-auto mb-6">
        <Input
          placeholder="Type here to search..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={isPending}
          className="w-full p-3 pl-10 rounded-md border focus:outline-none focus:ring-2 focus:ring-[#1B768E]"
        />
        <Search
          className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
          size={20}
        />
      </div>
    </form>
  );
}
