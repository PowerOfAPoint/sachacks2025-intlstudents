import { JSONContent } from "novel";
import { z } from "zod";

export type TPost = z.infer<typeof Post>;
export const Post = z.object({
  groupId: z.string({ required_error: "Select a group" }),
  content: z.string().trim().min(1, { message: "Question is required" }),
  tags: z.array(z.string()).default([]),
});

export type TReply = z.infer<typeof Reply>;
export const Reply = z.object({
  postId: z.string(),
  content: z
    .custom<JSONContent>()
    .refine((data) => typeof data === "object" && Object.keys(data).length > 0),
});
