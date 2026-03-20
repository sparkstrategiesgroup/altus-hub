export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Users } from "lucide-react";
import Link from "next/link";

export default async function PeerGroupsPage() {
  const groups = await prisma.peerGroup.findMany({
    where: { isActive: true },
    include: {
      members: {
        include: {
          user: { select: { id: true, name: true, image: true, company: true } },
        },
      },
    },
    orderBy: { name: "asc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-altus-charcoal">
          Altus Six Peer Groups
        </h1>
        <p className="text-sm text-altus-slate">
          Peer groups organized by company size and sales volume for focused
          collaboration
        </p>
      </div>

      {groups.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <Users className="mx-auto h-10 w-10 text-altus-slate/50" />
            <p className="mt-3 text-altus-slate">
              Peer groups are being organized. Check back soon.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <Link key={group.id} href={`/peer-groups/${group.id}`}>
              <Card className="h-full hover:border-altus-gold/30 transition-colors">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-altus-charcoal">
                      <Users className="h-5 w-5 text-altus-gold" />
                    </div>
                    <Badge variant="gold">
                      {group.members.length}/{group.maxMembers}
                    </Badge>
                  </div>
                  <h3 className="mt-3 font-semibold text-altus-charcoal">
                    {group.name}
                  </h3>
                  {group.description && (
                    <p className="mt-1 text-sm text-altus-slate line-clamp-2">
                      {group.description}
                    </p>
                  )}
                  <div className="mt-3 flex flex-wrap gap-1">
                    {group.companySizeRange && (
                      <Badge variant="outline">{group.companySizeRange}</Badge>
                    )}
                    {group.salesVolumeRange && (
                      <Badge variant="outline">{group.salesVolumeRange}</Badge>
                    )}
                  </div>
                  {group.members.length > 0 && (
                    <div className="mt-4 flex -space-x-2">
                      {group.members.slice(0, 4).map((m) => (
                        <Avatar
                          key={m.id}
                          name={m.user.name || "User"}
                          src={m.user.image}
                          size="sm"
                          className="ring-2 ring-white"
                        />
                      ))}
                      {group.members.length > 4 && (
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-altus-light-gray ring-2 ring-white text-xs font-medium text-altus-slate">
                          +{group.members.length - 4}
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
