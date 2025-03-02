import { db } from "@/lib/db";
import { err, ok } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const query = searchParams.get("query");

  if (!query || query.trim() === "") {
    const res = await db.query.group.findMany({
      limit: 10,
    });

    return NextResponse.json(ok(res), {
      status: 200,
    });
  }

  const res = await db.query.group.findMany({
    where: (t, { ilike, or }) =>
      or(ilike(t.name, `%${query}%`), ilike(t.name, query)),
    limit: 10,
  });

  return NextResponse.json(ok(res), {
    status: 200,
  });
}
