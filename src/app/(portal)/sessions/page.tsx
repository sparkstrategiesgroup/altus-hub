export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Calendar, Clock, User } from "lucide-react";

export default async function SessionsPage() {
  const sessions = await prisma.forumSession.findMany({
    include: {
      principal: true,
      peerGroup: true,
      _count: { select: { eventRsvps: true } },
    },
    orderBy: { scheduledAt: "asc" },
  });

  const upcoming = sessions.filter((s) => s.status === "upcoming");
  const past = sessions.filter((s) => s.status === "completed");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-altus-navy">Forum Sessions</h1>
        <p className="text-sm text-altus-slate">
          Monthly sessions led by Altus Principals
        </p>
      </div>

      {/* Upcoming */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-altus-navy">
          Upcoming Sessions
        </h2>
        {upcoming.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-altus-slate">
                No upcoming sessions scheduled yet.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {upcoming.map((s) => (
              <Link key={s.id} href={`/sessions/${s.id}`}>
                <Card className="h-full hover:border-altus-gold/30 transition-colors">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-2">
                      <Badge variant="gold">{s.type.replace("_", " ")}</Badge>
                      <Badge variant="success">Upcoming</Badge>
                    </div>
                    <h3 className="mt-3 font-semibold text-altus-navy">
                      {s.title}
                    </h3>
                    {s.description && (
                      <p className="mt-1 text-sm text-altus-slate line-clamp-2">
                        {s.description}
                      </p>
                    )}
                    <div className="mt-4 flex flex-wrap gap-3 text-xs text-altus-slate">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {new Date(s.scheduledAt).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {s.duration} min
                      </span>
                      {s.principal && (
                        <span className="flex items-center gap-1">
                          <User size={14} />
                          {s.principal.name}
                        </span>
                      )}
                    </div>
                    <div className="mt-3 text-xs text-altus-slate">
                      {s._count.eventRsvps} attending
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Past */}
      {past.length > 0 && (
        <section>
          <h2 className="mb-4 text-lg font-semibold text-altus-navy">
            Past Sessions
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {past.map((s) => (
              <Link key={s.id} href={`/sessions/${s.id}`}>
                <Card className="h-full opacity-75 hover:opacity-100 transition-opacity">
                  <CardContent className="p-5">
                    <Badge variant="outline">Completed</Badge>
                    <h3 className="mt-3 font-semibold text-altus-navy">
                      {s.title}
                    </h3>
                    <div className="mt-3 flex gap-3 text-xs text-altus-slate">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {new Date(s.scheduledAt).toLocaleDateString()}
                      </span>
                      {s.principal && (
                        <span className="flex items-center gap-1">
                          <User size={14} />
                          {s.principal.name}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
