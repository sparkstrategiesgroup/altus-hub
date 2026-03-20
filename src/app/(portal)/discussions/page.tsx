export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageSquare, Pin, Plus } from "lucide-react";
import Link from "next/link";

const categories = [
  { value: "all", label: "All" },
  { value: "general", label: "General" },
  { value: "sales", label: "Sales" },
  { value: "operations", label: "Operations" },
  { value: "technology", label: "Technology" },
  { value: "hr", label: "HR" },
  { value: "finance", label: "Finance" },
  { value: "strategy", label: "Strategy" },
];

export default async function DiscussionsPage() {
  const discussions = await prisma.discussion.findMany({
    include: {
      author: { select: { id: true, name: true, image: true, company: true } },
      _count: { select: { comments: true } },
    },
    orderBy: [{ isPinned: "desc" }, { createdAt: "desc" }],
  });

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-altus-navy">Discussions</h1>
          <p className="text-sm text-altus-slate">
            Connect with fellow BSC leaders across business topics
          </p>
        </div>
        <Link href="/discussions/new">
          <Button variant="gold">
            <Plus className="mr-2 h-4 w-4" />
            New Discussion
          </Button>
        </Link>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <span
            key={cat.value}
            className={`cursor-pointer rounded-full px-3 py-1 text-sm font-medium transition-colors ${
              cat.value === "all"
                ? "bg-altus-navy text-white"
                : "bg-altus-light-gray text-altus-slate hover:bg-altus-border"
            }`}
          >
            {cat.label}
          </span>
        ))}
      </div>

      {/* Discussion List */}
      {discussions.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <MessageSquare className="mx-auto h-10 w-10 text-altus-slate/50" />
            <p className="mt-3 text-altus-slate">
              No discussions yet. Start one!
            </p>
            <Link href="/discussions/new">
              <Button variant="gold" className="mt-4">
                Start a Discussion
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {discussions.map((d) => (
            <Link key={d.id} href={`/discussions/${d.id}`}>
              <Card className="hover:border-altus-gold/30 transition-colors mb-3">
                <CardContent className="flex items-start gap-4 p-5">
                  <Avatar
                    name={d.author.name || "User"}
                    src={d.author.image}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      {d.isPinned && (
                        <Pin size={14} className="text-altus-gold" />
                      )}
                      <h3 className="font-semibold text-altus-navy truncate">
                        {d.title}
                      </h3>
                    </div>
                    <p className="mt-1 text-sm text-altus-slate line-clamp-2">
                      {d.content}
                    </p>
                    <div className="mt-2 flex items-center gap-3 text-xs text-altus-slate">
                      <span>{d.author.name}</span>
                      {d.author.company && <span>{d.author.company}</span>}
                      <span>
                        {new Date(d.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-col items-center gap-1">
                    <Badge variant="outline">{d.category}</Badge>
                    <span className="flex items-center gap-1 text-xs text-altus-slate">
                      <MessageSquare size={12} />
                      {d._count.comments}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
