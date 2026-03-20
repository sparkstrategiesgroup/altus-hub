export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RsvpButton } from "@/components/portal/rsvp-button";
import { CalendarDays, MapPin, Clock, Users } from "lucide-react";
import Link from "next/link";

export default async function EventsPage() {
  const session = await auth();

  const events = await prisma.event.findMany({
    include: {
      _count: { select: { rsvps: true } },
      rsvps: {
        where: { userId: session?.user?.id || "" },
        select: { id: true },
      },
    },
    orderBy: { startDate: "asc" },
  });

  const upcoming = events.filter(
    (e) => new Date(e.startDate) >= new Date()
  );
  const past = events.filter((e) => new Date(e.startDate) < new Date());

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-altus-navy">Events</h1>
        <p className="text-sm text-altus-slate">
          Networking events, workshops, and industry conferences
        </p>
      </div>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-altus-navy">
          Upcoming Events
        </h2>
        {upcoming.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <CalendarDays className="mx-auto h-10 w-10 text-altus-slate/50" />
              <p className="mt-3 text-altus-slate">
                No upcoming events. Check back soon.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {upcoming.map((event) => (
              <Card
                key={event.id}
                className="hover:border-altus-gold/30 transition-colors"
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-2">
                    <Badge variant="gold">{event.type}</Badge>
                    {event.isVirtual && (
                      <Badge variant="outline">Virtual</Badge>
                    )}
                  </div>
                  <h3 className="mt-3 font-semibold text-altus-navy">
                    {event.title}
                  </h3>
                  {event.description && (
                    <p className="mt-1 text-sm text-altus-slate line-clamp-2">
                      {event.description}
                    </p>
                  )}
                  <div className="mt-4 space-y-1 text-xs text-altus-slate">
                    <div className="flex items-center gap-1">
                      <CalendarDays size={14} />
                      {new Date(event.startDate).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    {event.location && (
                      <div className="flex items-center gap-1">
                        <MapPin size={14} />
                        {event.location}
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Users size={14} />
                      {event._count.rsvps} attending
                      {event.maxAttendees && ` / ${event.maxAttendees} max`}
                    </div>
                  </div>
                  <div className="mt-4">
                    <RsvpButton
                      eventId={event.id}
                      hasRsvp={event.rsvps.length > 0}
                      type="event"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {past.length > 0 && (
        <section>
          <h2 className="mb-4 text-lg font-semibold text-altus-navy">
            Past Events
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {past.map((event) => (
              <Card key={event.id} className="opacity-60">
                <CardContent className="p-5">
                  <Badge variant="outline">{event.type}</Badge>
                  <h3 className="mt-3 font-semibold text-altus-navy">
                    {event.title}
                  </h3>
                  <p className="mt-2 text-xs text-altus-slate">
                    {new Date(event.startDate).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
