import { db } from "@/lib/db";
import { err, ok } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";
import "@total-typescript/ts-reset/filter-boolean";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const query = searchParams.get("query");
  const groupId = searchParams.get("group");
  const offset = searchParams.get("offset");
  const limit = searchParams.get("limit");

  const res = await db.query.post.findMany({
    where: (t, { ilike, or, eq }) => {
      const conditions = [
        query
          ? or(ilike(t.content, `%${query}%`), ilike(t.content, query))
          : null,
        groupId ? eq(t.groupId, groupId) : null,
      ];

      return or(...conditions.filter(Boolean));
    },
    ...(offset ? { offset: Number(offset) } : {}),
    ...(limit ? { limit: Number(limit) } : {}),
    orderBy: (t, { desc }) => desc(t.createdAt),

    with: {
      author: true,
      group: true,
      tags: true,
      comments: true,
    },
  });

  return NextResponse.json(ok(res), {
    status: 200,
  });
}
