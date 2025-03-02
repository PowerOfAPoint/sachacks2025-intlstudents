"use client";

import { Input } from "@/components/ui/input";
import { FormEventHandler, useRef, useState, useTransition } from "react";
import { createPost } from "../api/_actions/post";
import { Post } from "@/lib/validation/forum";
import { GroupSearch } from "./_group-search";
import { toast } from "sonner";
import { redirect } from "../api/_actions/redirect";
import { Group } from "@/lib/db/forum";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

export function PostCreator() {
  const [content, setContent] = useState("");
  const [isPending, startTransition] = useTransition();
  const group = useRef<{ value: Group | null }>(null!);

  const queryClient = useQueryClient();

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    const validate = Post.safeParse({
      content,
      groupId: group.current.value?.id,
      tags: [],
    });
    if (!validate.success) {
      toast.error("Invalid input", {
        description: validate.error.issues[0].message,
      });
      return;
    }

    const { data } = validate;

    startTransition(async () => {
      const res = await createPost({
        content: data.content,
        groupId: data.groupId,
        tags: data.tags,
      });

      if (!res.ok) {
        if (res.error.type === "redirect") {
          toast.error("An error occurred", {
            description: "You must be signed in to create a post",
          });
          await redirect(res.error.url);
        } else {
          toast.error("An error occurred", {
            description: res.error.message,
          });
        }
      } else {
        setContent("");
        toast.success("Post created!");
        queryClient.invalidateQueries({
          queryKey: ["posts"],
        });
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-md shadow-md max-w-3xl mx-auto mb-4 space-y-4"
    >
      <Input
        type="text"
        placeholder="Let's share what's on your mind..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="py-2"
      />
      <div className="flex items-center justify-end space-x-2">
        <GroupSearch ref={group} />
        <Button
          type="submit"
          className={cn("bg-[#012538] text-white px-4 py-2 rounded-md", {
            "opacity-50": isPending,
          })}
          disabled={isPending}
        >
          {isPending && <Loader2 className="animate-spin size-4 mr-2" />}
          Create Post
        </Button>
      </div>
    </form>
  );
}
