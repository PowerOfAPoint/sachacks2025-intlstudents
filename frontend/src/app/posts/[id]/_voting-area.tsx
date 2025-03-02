"use client";

import { castVote } from "@/app/api/_actions/post";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, MessageSquare } from "lucide-react";

export function VotingArea({
  objId,
  objType,
}: {
  objId: string;
  objType: "post" | "comment";
}) {
  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="gap-1"
        onClick={async () =>
          await castVote({
            objId,
            objType,
            voteType: "upvote",
          })
        }
      >
        <ChevronUp className="size-6" />
        <span>12</span>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="gap-1"
        onClick={async () =>
          await castVote({
            objId,
            objType,
            voteType: "downvote",
          })
        }
      >
        <ChevronDown className="size-6" />
        <span>-2</span>
      </Button>
    </>
  );
}
