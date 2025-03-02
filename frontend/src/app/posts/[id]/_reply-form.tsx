"use client";

import { createReply } from "@/app/api/_actions/post";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Editor } from "@/components/wysiwyg";
import { Reply } from "@/lib/validation/forum";
import { User } from "better-auth";
import { ChevronUp, Plus } from "lucide-react";
import { JSONContent } from "novel";
import { FormEventHandler, useRef, useState, useTransition } from "react";
import { toast } from "sonner";

export function ReplyForm({ user, postId }: { user: User; postId: string }) {
  const [open, setOpen] = useState(false);
  const editor = useRef<{ content: JSONContent }>(null!);
  const [isPending, startTransition] = useTransition();

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    const { content } = editor.current;
    const validate = Reply.safeParse({
      content,
      postId,
    });
    if (!validate.success) {
      return toast.error("Invalid input", {
        description: validate.error.issues[0].message,
      });
    }

    const data = validate.data;
    startTransition(async () => {
      const res = await createReply({
        content: data.content,
        postId: data.postId,
      });

      if (!res.ok) {
        toast.error("An error occurred", {
          description: res.error,
        });
        return;
      }

      setOpen(false);
      toast.success("Reply created succesfully");
    });
  };

  if (!open) {
    return (
      <div className="relative my-8 max-w-4xl w-full mx-auto">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
        </div>
        <div className="relative flex justify-center">
          <Button
            className="bg-white hover:bg-gray-50 text-gray-600 border border-gray-300 px-4"
            variant="outline"
            onClick={() => setOpen(true)}
          >
            <Plus />
            Add Answer
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="shadow-lg border-2 border-[#1B768E]/75 max-w-4xl mx-auto pb-4">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <Avatar className="h-10 w-10 border">
                <AvatarImage src={user.image ?? ""} alt={user.name} />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-semibold">{user.name}</span>
                  <span className="text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-full">
                    Verified
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">this is a bio</p>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Editor ref={editor} />
        </CardContent>
        <CardFooter className="pt-4 flex justify-between border-t">
          <Button type="submit">Reply</Button>
        </CardFooter>
      </Card>
    </form>
  );
}
