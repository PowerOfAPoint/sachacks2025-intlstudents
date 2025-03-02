import { db } from "@/lib/db";
import { ForumPage } from "../../_forum-page";
import { notFound } from "next/navigation";

export default async function GroupPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: groupSlug } = await params;
  const groupId = await db.query.group
    .findFirst({
      where: (t, { eq }) => eq(t.slug, groupSlug),
      columns: { id: true },
    })
    .then((res) => res?.id);
  if (!groupId) return notFound();

  return <ForumPage groupId={groupId} />;
}
