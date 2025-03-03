import Header from "@/components/header";
import { PostGallery } from "@/components/post-gallery";
import { fetchPosts } from "@/lib/forum/posts";
import { redirect } from "next/navigation";

export default async function ForumSearch({
  searchParams,
}: {
  searchParams: Promise<Partial<{ query: string }>>;
}) {
  const { query } = await searchParams;
  if (!query || query.length < 1) {
    redirect("/forum");
  }

  const posts = await fetchPosts({
    query,
    limit: 9999,
    offset: 0,
  });

  return (
    <>
      {/* Fixed Header */}
      <div className="sticky top-0 left-0 w-full z-50">
        <Header />
      </div>
      <main className="p-6">
        <div className="max-w-3xl mx-auto mb-6">
          <h1 className="text-2xl">Results for "{query}"</h1>
        </div>
        <PostGallery posts={posts} />
      </main>
    </>
  );
}
