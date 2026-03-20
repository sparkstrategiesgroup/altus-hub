export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Pin } from "lucide-react";
import { CommentSection } from "@/components/portal/comment-section";

export default async function DiscussionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const discussion = await prisma.discussion.findUnique({
    where: { id },
    include: {
      author: {
        select: { id: true, name: true, image: true, company: true, title: true },
      },
      comments: {
        where: { parentId: null },
        include: {
          author: { select: { id: true, name: true, image: true } },
          replies: {
            include: {
              author: { select: { id: true, name: true, image: true } },
            },
            orderBy: { createdAt: "asc" },
          },
        },
        orderBy: { createdAt: "asc" },
      },
    },
  });

  if (!discussion) notFound();

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <Avatar
              name={discussion.author.name || "User"}
              src={discussion.author.image}
              size="lg"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                {discussion.isPinned && (
                  <Pin size={14} className="text-altus-gold" />
                )}
                <h1 className="text-xl font-bold text-altus-charcoal">
                  {discussion.title}
                </h1>
              </div>
              <div className="mt-1 flex items-center gap-2 text-sm text-altus-slate">
                <span>{discussion.author.name}</span>
                {discussion.author.company && (
                  <>
                    <span>-</span>
                    <span>{discussion.author.company}</span>
                  </>
                )}
                <span>-</span>
                <span>
                  {new Date(discussion.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <Badge variant="outline" className="mt-2">
                {discussion.category}
              </Badge>
            </div>
          </div>

          <div className="mt-6 text-altus-charcoal leading-relaxed whitespace-pre-wrap">
            {discussion.content}
          </div>
        </CardContent>
      </Card>

      {/* Comments */}
      <Card>
        <CardHeader>
          <CardTitle>
            Comments ({discussion.comments.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CommentSection
            discussionId={discussion.id}
            initialComments={discussion.comments}
          />
        </CardContent>
      </Card>
    </div>
  );
}
