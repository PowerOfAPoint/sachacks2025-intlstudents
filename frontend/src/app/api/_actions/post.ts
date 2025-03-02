"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { comment, post, vote } from "@/lib/db/forum";
import { AsyncResult, err, ok } from "@/lib/types";
import { getBaseUrl } from "@/lib/utils";
import {
  Post,
  Reply,
  TPost,
  TReply,
  TVote,
  Vote,
} from "@/lib/validation/forum";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { JSONContent } from "novel";

type Err =
  | {
      type: "redirect";
      url: string;
    }
  | {
      type: "message";
      message: string;
    };

export async function createPost(data: TPost): AsyncResult<string, Err> {
  const validate = Post.safeParse(data);
  if (!validate.success) {
    return err({
      type: "message",
      message: validate.error.issues[0].message,
    });
  }

  const user = await auth.api
    .getSession({
      headers: await headers(),
    })
    .then((s) => s?.user);
  if (!user) {
    return err({
      type: "redirect",
      url: "/sign-in",
    });
  }

  try {
    const [postId] = await db
      .insert(post)
      .values([
        {
          content: data.content,
          groupId: data.groupId,
          authorId: user.id,
        },
      ])
      .returning({
        id: post.id,
      });

    return ok(`/posts/${postId.id}`);
  } catch (error) {
    console.error("Error creating post:", error);
    return err({
      type: "message",
      message: "Failed to create post",
    });
  }
}

export async function createReply(data: TReply): AsyncResult<void, string> {
  const validate = Reply.safeParse(data);
  if (!validate.success) {
    return err(validate.error.issues[0].message);
  }

  const user = await auth.api
    .getSession({
      headers: await headers(),
    })
    .then((s) => s?.user);
  if (!user) {
    return redirect("/sign-in");
  }

  try {
    const [replyId] = await db
      .insert(comment)
      .values([
        {
          content: data.content,
          postId: data.postId,
          authorId: user.id,
        },
      ])
      .returning({
        id: comment.id,
      });

    revalidatePath(`/forum/posts/${data.postId}`);
    return ok();
  } catch (error) {
    console.error("Error creating post:", error);
    return err("Failed to create post");
  }
}

export async function castVote(data: TVote): AsyncResult<void, string> {
  const validate = Vote.safeParse(data);
  if (!validate.success) {
    return err(validate.error.issues[0].message);
  }

  const { voteType, objId, objType } = validate.data;

  const user = await auth.api
    .getSession({
      headers: await headers(),
    })
    .then((s) => s?.user);
  if (!user) {
    return redirect("/sign-in");
  }

  try {
    await db
      .insert(vote)
      .values([
        {
          userId: user.id,
          voteType,
          objId,
          objType,
        },
      ])
      .onConflictDoNothing();
    revalidatePath(`${getBaseUrl()}/api/forum/posts/${objId}`);

    return ok();
  } catch (error) {
    console.error("Error creating post:", error);
    return err("Failed to vote on post");
  }
}
