export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Video, FileText, Link as LinkIcon, Presentation } from "lucide-react";

const typeIcons: Record<string, React.ElementType> = {
  recording: Video,
  document: FileText,
  presentation: Presentation,
  link: LinkIcon,
};

const typeFilters = [
  { value: "all", label: "All" },
  { value: "recording", label: "Recordings" },
  { value: "document", label: "Documents" },
  { value: "presentation", label: "Presentations" },
  { value: "link", label: "Links" },
];

export default async function ResourcesPage() {
  const resources = await prisma.resource.findMany({
    include: {
      session: { select: { id: true, title: true } },
      uploadedBy: { select: { id: true, name: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-altus-charcoal">Resources</h1>
        <p className="text-sm text-altus-slate">
          Session recordings, documents, and curated resources
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {typeFilters.map((f) => (
          <span
            key={f.value}
            className={`cursor-pointer rounded-full px-3 py-1 text-sm font-medium transition-colors ${
              f.value === "all"
                ? "bg-altus-charcoal text-white"
                : "bg-altus-light-gray text-altus-slate hover:bg-altus-border"
            }`}
          >
            {f.label}
          </span>
        ))}
      </div>

      {resources.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <BookOpen className="mx-auto h-10 w-10 text-altus-slate/50" />
            <p className="mt-3 text-altus-slate">
              No resources available yet. Resources will appear here as
              sessions are completed.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {resources.map((r) => {
            const Icon = typeIcons[r.type] || BookOpen;
            return (
              <a
                key={r.id}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Card className="h-full hover:border-altus-gold/30 transition-colors">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-altus-gold/10">
                        <Icon className="h-5 w-5 text-altus-gold" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-altus-charcoal truncate">
                          {r.title}
                        </h3>
                        {r.description && (
                          <p className="mt-1 text-sm text-altus-slate line-clamp-2">
                            {r.description}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <Badge variant="outline">{r.type}</Badge>
                      <span className="text-xs text-altus-slate">
                        {new Date(r.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    {r.session && (
                      <p className="mt-2 text-xs text-altus-slate">
                        From: {r.session.title}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
