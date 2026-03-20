export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { RsvpButton } from "@/components/portal/rsvp-button";
import { Calendar, Clock, MapPin, User, BookOpen } from "lucide-react";
import Link from "next/link";

export default async function SessionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();

  const forumSession = await prisma.forumSession.findUnique({
    where: { id },
    include: {
      principal: true,
      peerGroup: { include: { members: { include: { user: true } } } },
      resources: true,
      eventRsvps: { include: { user: true } },
    },
  });

  if (!forumSession) notFound();

  const hasRsvp = forumSession.eventRsvps.some(
    (r) => r.userId === session?.user?.id
  );

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <Badge variant="gold">
            {forumSession.type.replace("_", " ")}
          </Badge>
          <Badge
            variant={
              forumSession.status === "upcoming" ? "success" : "outline"
            }
          >
            {forumSession.status}
          </Badge>
        </div>
        <h1 className="text-2xl font-bold text-altus-navy">
          {forumSession.title}
        </h1>
        {forumSession.description && (
          <p className="mt-2 text-altus-slate">{forumSession.description}</p>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Details */}
          <Card>
            <CardHeader>
              <CardTitle>Session Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-altus-slate">
                <Calendar size={16} />
                {new Date(forumSession.scheduledAt).toLocaleDateString(
                  "en-US",
                  {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  }
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-altus-slate">
                <Clock size={16} />
                {forumSession.duration} minutes
              </div>
              {forumSession.location && (
                <div className="flex items-center gap-2 text-sm text-altus-slate">
                  <MapPin size={16} />
                  {forumSession.location}
                </div>
              )}
              {forumSession.principal && (
                <div className="flex items-center gap-2 text-sm text-altus-slate">
                  <User size={16} />
                  Led by {forumSession.principal.name} -{" "}
                  {forumSession.principal.title}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Resources */}
          {forumSession.resources.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {forumSession.resources.map((r) => (
                    <a
                      key={r.id}
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-lg p-2 text-sm hover:bg-altus-light-gray transition-colors"
                    >
                      <BookOpen size={16} className="text-altus-gold" />
                      <span className="text-altus-navy">{r.title}</span>
                      <Badge variant="outline" className="ml-auto">
                        {r.type}
                      </Badge>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          {/* RSVP */}
          {forumSession.status === "upcoming" && (
            <Card>
              <CardContent className="p-5">
                <RsvpButton
                  sessionId={forumSession.id}
                  hasRsvp={hasRsvp}
                  type="session"
                />
                <p className="mt-3 text-center text-xs text-altus-slate">
                  {forumSession.eventRsvps.length} attending
                  {forumSession.maxAttendees &&
                    ` / ${forumSession.maxAttendees} max`}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Attendees */}
          <Card>
            <CardHeader>
              <CardTitle>Attendees</CardTitle>
            </CardHeader>
            <CardContent>
              {forumSession.eventRsvps.length === 0 ? (
                <p className="text-sm text-altus-slate">No RSVPs yet.</p>
              ) : (
                <div className="space-y-2">
                  {forumSession.eventRsvps.map((r) => (
                    <div key={r.id} className="flex items-center gap-2">
                      <Avatar
                        name={r.user.name || "User"}
                        src={r.user.image}
                        size="sm"
                      />
                      <span className="text-sm text-altus-navy">
                        {r.user.name}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
