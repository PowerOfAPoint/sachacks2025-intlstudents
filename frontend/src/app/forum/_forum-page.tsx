import { Search, Send } from "lucide-react";
import Header from "@/components/header";
import { Input } from "@/components/ui/input";
import { PostSearch } from "./_post-search";
import { PostCreator } from "./_post-creator";
import { PostGallery } from "@/components/post-gallery";
import { mock } from "node:test";
import { fetchPosts } from "@/lib/forum/posts";
import { db } from "@/lib/db";
import Link from "next/link";

export async function ForumPage({ groupId }: { groupId?: string }) {
  const posts = await fetchPosts({
    groupId,
    limit: 9999,
    offset: 0,
  });
  const groups = await db.query.group.findMany({});
  const group = groupId
    ? await db.query.group.findFirst({
        where: (t, { eq }) => eq(t.id, groupId),
      })
    : undefined;

  return (
    <div className="h-screen flex flex-col">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Header />
      </div>

      {/* Main Layout with Sidebar + Content */}
      <div className="flex flex-1 overflow-hidden pt-16">
        {/* Sidebar */}
        <aside className="w-1/4 bg-white border-r p-4 space-y-6">
          {/* <nav className="space-y-4"> */}
          {/*   <p className="font-bold text-lg">Navigation</p> */}
          {/*   {["Home", "Trending", "Answers", "All"].map((item) => ( */}
          {/*     <p */}
          {/*       key={item} */}
          {/*       className="cursor-pointer p-2 rounded-md hover:bg-gray-100 transition" */}
          {/*     > */}
          {/*       {item} */}
          {/*     </p> */}
          {/*   ))} */}
          {/* </nav> */}
          <div>
            <p className="font-bold text-lg">Groups</p>
            <div className="mt-2 space-y-2">
              {groups.map((group) => (
                <Link
                  key={group.id}
                  href={`/forum/groups/${group.slug}`}
                  className="block p-2 rounded-md hover:bg-gray-100"
                >
                  {group.name}
                </Link>
              ))}
            </div>
          </div>

          {/* <div> */}
          {/*   <p className="font-bold text-lg">Popular Tags</p> */}
          {/*   <div className="mt-2 space-y-2"> */}
          {/*     {["#day1cpt", "#opt", "#h1b", "#f1"].map((tag) => ( */}
          {/*       <p */}
          {/*         key={tag} */}
          {/*         className="cursor-pointer p-2 rounded-md bg-gray-100 text-[#1B768E]" */}
          {/*       > */}
          {/*         {tag} */}
          {/*       </p> */}
          {/*     ))} */}
          {/*   </div> */}
          {/* </div> */}
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {/* Search Bar */}
          <PostSearch />

          {/* Post Creator */}
          <PostCreator />

          {groupId && group ? (
            <h1 className="text-2xl font-bold max-w-3xl mx-auto">
              {group.name}
            </h1>
          ) : null}

          {/* Filter Options */}
          <div className="flex justify-between items-center max-w-3xl mx-auto text-gray-600 mb-4">
            {/* <p className="font-semibold">Popular Tags/ #day1cpt</p> */}
            <p className="cursor-pointer">Most Recent ▾</p>
          </div>

          {/* Post List */}
          <PostGallery
            // TODO
            posts={posts}
          />
        </main>
      </div>
    </div>
  );
}
