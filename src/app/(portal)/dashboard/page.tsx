export const dynamic = "force-dynamic";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MessageSquare, Users, BookOpen } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth();

  const [sessionCount, discussionCount, resourceCount, upcomingSessions, recentDiscussions] =
    await Promise.all([
      prisma.forumSession.count({ where: { status: "upcoming" } }),
      prisma.discussion.count(),
      prisma.resource.count(),
      prisma.forumSession.findMany({
        where: { status: "upcoming" },
        include: { principal: true },
        orderBy: { scheduledAt: "asc" },
        take: 3,
      }),
      prisma.discussion.findMany({
        include: {
          author: { select: { name: true, company: true } },
          _count: { select: { comments: true } },
        },
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
    ]);

  const stats = [
    {
      label: "Upcoming Sessions",
      value: sessionCount,
      icon: Calendar,
      href: "/sessions",
    },
    {
      label: "Discussions",
      value: discussionCount,
      icon: MessageSquare,
      href: "/discussions",
    },
    {
      label: "Resources",
      value: resourceCount,
      icon: BookOpen,
      href: "/resources",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-altus-charcoal">Dashboard</h1>
        <p className="text-sm text-altus-slate">
          Welcome back, {session?.user?.name || "Member"}
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card className="hover:border-altus-gold/30 transition-colors">
              <CardContent className="flex items-center gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-altus-gold/10">
                  <stat.icon className="h-5 w-5 text-altus-gold" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-altus-charcoal">
                    {stat.value}
                  </p>
                  <p className="text-sm text-altus-slate">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Upcoming Sessions */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Upcoming Sessions</CardTitle>
              <Link
                href="/sessions"
                className="text-sm text-altus-gold hover:text-altus-gold-dark"
              >
                View all
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {upcomingSessions.length === 0 ? (
              <p className="text-sm text-altus-slate">
                No upcoming sessions scheduled.
              </p>
            ) : (
              <div className="space-y-3">
                {upcomingSessions.map((s) => (
                  <Link
                    key={s.id}
                    href={`/sessions/${s.id}`}
                    className="flex items-start gap-3 rounded-lg p-3 hover:bg-altus-light-gray transition-colors"
                  >
                    <div className="flex h-10 w-10 shrink-0 flex-col items-center justify-center rounded-lg bg-altus-charcoal text-white">
                      <span className="text-[10px] font-medium">
                        {new Date(s.scheduledAt).toLocaleDateString("en-US", {
                          month: "short",
                        })}
                      </span>
                      <span className="text-sm font-bold">
                        {new Date(s.scheduledAt).getDate()}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-altus-charcoal truncate">
                        {s.title}
                      </p>
                      {s.principal && (
                        <p className="text-xs text-altus-slate">
                          Led by {s.principal.name}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Discussions */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Discussions</CardTitle>
              <Link
                href="/discussions"
                className="text-sm text-altus-gold hover:text-altus-gold-dark"
              >
                View all
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {recentDiscussions.length === 0 ? (
              <p className="text-sm text-altus-slate">
                No discussions yet. Start one!
              </p>
            ) : (
              <div className="space-y-3">
                {recentDiscussions.map((d) => (
                  <Link
                    key={d.id}
                    href={`/discussions/${d.id}`}
                    className="block rounded-lg p-3 hover:bg-altus-light-gray transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium text-altus-charcoal truncate">
                        {d.title}
                      </p>
                      <Badge variant="outline" className="shrink-0">
                        {d._count.comments}
                      </Badge>
                    </div>
                    <p className="text-xs text-altus-slate mt-1">
                      {d.author.name}
                      {d.author.company ? ` - ${d.author.company}` : ""}
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
