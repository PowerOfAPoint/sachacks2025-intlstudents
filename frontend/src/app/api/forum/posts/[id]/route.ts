import { db } from "@/lib/db";
import { ok } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const id = await params.then((p) => p.id);

  const res = await db.query.post.findFirst({
    where: (t, { eq }) => eq(t.id, id),
    with: {
      author: true,
      comments: {
        with: {
          author: true,
        },
      },
      group: true,
      tags: true,
    },
  });

  return NextResponse.json(ok(res), {
    status: 200,
  });
}
