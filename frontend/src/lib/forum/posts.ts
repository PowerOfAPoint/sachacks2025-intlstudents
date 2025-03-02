import { toast } from "sonner";
import { getBaseUrl } from "../utils";
import { AwaitedReturn, Result } from "../types";
import type { db } from "../db";
import { User } from "../auth";

export type PostData = NonNullable<
  AwaitedReturn<
    typeof db.query.post.findFirst<{
      with: {
        author: true;
        group: true;
        tags: true;
        comments: {
          with: {
            author: true;
          };
        };
      };
    }>
  >
>;
export async function fetchPosts(
  {
    query,
    groupId,
    offset,
    limit,
  }: {
    query?: string;
    groupId?: string;
    offset?: number;
    limit?: number;
  },
  signal?: AbortSignal,
) {
  const url = new URL(`${getBaseUrl()}/api/forum/posts`);
  if (query) url.searchParams.set("query", query);
  if (groupId) url.searchParams.set("group", groupId);
  if (offset) url.searchParams.set("offset", offset.toString());
  if (limit) url.searchParams.set("limit", limit.toString());

  try {
    const res = await fetch(url, { signal });

    const json = (await res.json()) as Result<PostData[], string>;
    if (!json.ok) {
      toast.error("An error occurred", {
        description: json.error,
      });
      return [];
    }

    return json.data;
  } catch (err) {
    // toast.error("An error occurred", {
    //   description: "Something went wrong. Please try again later.",
    // });
    return [];
  }
}

export async function fetchPost(id: string) {
  const url = new URL(`${getBaseUrl()}/api/forum/posts/${id}`);

  const res = await fetch(url);

  const json = (await res.json()) as Result<PostData | undefined, string>;
  if (!json.ok) {
    toast.error("An error occurred", {
      description: json.error,
    });
    return null;
  }

  return json.data;
}
