export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Users, Building } from "lucide-react";

export default async function PeerGroupDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const group = await prisma.peerGroup.findUnique({
    where: { id },
    include: {
      members: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
              company: true,
              title: true,
              companySize: true,
            },
          },
        },
      },
      sessions: {
        include: { principal: true },
        orderBy: { scheduledAt: "desc" },
        take: 5,
      },
    },
  });

  if (!group) notFound();

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-altus-navy">
            <Users className="h-6 w-6 text-altus-gold" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-altus-navy">{group.name}</h1>
            {group.description && (
              <p className="text-sm text-altus-slate">{group.description}</p>
            )}
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {group.companySizeRange && (
            <Badge variant="gold">{group.companySizeRange}</Badge>
          )}
          {group.salesVolumeRange && (
            <Badge variant="gold">{group.salesVolumeRange}</Badge>
          )}
          <Badge variant="outline">
            {group.members.length}/{group.maxMembers} members
          </Badge>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Members</CardTitle>
          </CardHeader>
          <CardContent>
            {group.members.length === 0 ? (
              <p className="text-sm text-altus-slate">No members yet.</p>
            ) : (
              <div className="space-y-3">
                {group.members.map((m) => (
                  <div key={m.id} className="flex items-center gap-3">
                    <Avatar
                      name={m.user.name || "User"}
                      src={m.user.image}
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-altus-navy">
                        {m.user.name}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-altus-slate">
                        <Building size={12} />
                        {m.user.company || "No company"}
                        {m.user.title && ` - ${m.user.title}`}
                      </div>
                    </div>
                    {m.role === "facilitator" && (
                      <Badge variant="gold" className="ml-auto">
                        Facilitator
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Group Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            {group.sessions.length === 0 ? (
              <p className="text-sm text-altus-slate">
                No sessions scheduled for this group yet.
              </p>
            ) : (
              <div className="space-y-3">
                {group.sessions.map((s) => (
                  <div key={s.id} className="rounded-lg border border-altus-border p-3">
                    <p className="text-sm font-medium text-altus-navy">
                      {s.title}
                    </p>
                    <p className="text-xs text-altus-slate mt-1">
                      {new Date(s.scheduledAt).toLocaleDateString()}
                      {s.principal && ` - Led by ${s.principal.name}`}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
