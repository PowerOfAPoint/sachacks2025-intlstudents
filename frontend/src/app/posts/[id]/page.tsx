import Header from "@/components/header";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { fetchPost } from "@/lib/forum/posts";
import {
  ChevronDown,
  ChevronUp,
  MessageSquare,
  MoreHorizontal,
  Plus,
  Share2,
} from "lucide-react";
import { notFound } from "next/navigation";
import { ReplyForm } from "./_reply-form";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { generateHTML } from "@tiptap/html";
import { defaultExtensions } from "@/components/wysiwyg/extensions";
import { JSONContent } from "novel";
import { RenderReply } from "./_render-reply";
import { castVote } from "@/app/api/_actions/post";
import { VotingArea } from "./_voting-area";

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: postId } = await params;
  const post = await fetchPost(postId);
  if (!post) return notFound();

  const user = await auth.api
    .getSession({
      headers: await headers(),
    })
    .then((s) => s?.user);

  return (
    <>
      <div className="sticky top-0 left-0 w-full z-20 bg-white shadow-md">
        <Header />
      </div>
      <main className="p-8 space-y-8">
        <Card className="shadow-sm max-w-4xl mx-auto pb-4">
          <CardHeader className="pb-2">
            <div className="flex items-start gap-3">
              <Avatar className="h-10 w-10 border">
                <AvatarImage
                  src={post.author.image ?? ""}
                  alt={post.author.name}
                />
                <AvatarFallback>{post.author.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-bold">{post.content}</h2>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  <span>Asked by {post.author.name}</span>
                  <span>•</span>
                  <span>{new Date(post.createdAt).toDateString()}</span>
                </div>
              </div>
            </div>
          </CardHeader>
          {/* <CardContent> */}
          {/*   <p className="text-muted-foreground"> */}
          {/*     I'm struggling to balance work, studies, and personal life. What */}
          {/*     techniques or systems have you found most effective for managing */}
          {/*     time and increasing productivity? */}
          {/*   </p> */}
          {/* </CardContent> */}
          <CardFooter className="pt-4 border-t">
            <div className="flex items-center gap-4 text-sm">
              <VotingArea objId={post.id} objType="post" />
              <Button variant="ghost" size="sm" className="gap-1">
                <MessageSquare className="size-5" />
                <span>{post.comments.length} Answers</span>
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="size-5" />
              </Button>
            </div>
          </CardFooter>
        </Card>

        {user ? <ReplyForm user={user} postId={postId} /> : null}

        <div className="space-y-4">
          {post.comments.map((reply) => {
            return (
              <Card key={reply.id} className="shadow-sm max-w-4xl mx-auto pb-4">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10 border flex items-center justify-center">
                        <AvatarImage src="" alt="Sarah Johnson" />
                        <AvatarFallback>{reply.author.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="font-semibold">
                            {reply.author.name}
                          </span>
                          <span className="text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-full">
                            Verified
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {/* H-1B holder */}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <RenderReply content={reply.content as JSONContent} />
                </CardContent>
                <CardFooter className="pt-4 flex justify-between border-t">
                  <div className="flex items-center gap-4 text-sm">
                    <VotingArea objId={reply.id} objType="comment" />
                    <Button variant="ghost" size="sm" className="gap-1">
                      <MessageSquare className="size-5" />
                      <span>0</span>
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share2 className="size-5" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </main>
    </>
  );
}
