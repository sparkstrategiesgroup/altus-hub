import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Linkedin } from "lucide-react";

export const metadata: Metadata = {
  title: "Principals",
  description:
    "Meet the Altus Principals — recognized industry leaders who guide the Altus Forum sessions.",
};

const disciplines = [
  "All",
  "Sales & Marketing",
  "Strategy",
  "Technology",
  "Operations",
  "Human Resources",
  "Finance",
] as const;

const principals = [
  {
    name: "Sarah Mitchell",
    slug: "sarah-mitchell",
    title: "Principal, Sales & Marketing",
    discipline: "Sales & Marketing",
    company: "CleanPro National Services",
    bio: "With 20+ years driving revenue growth in the BSC industry, Sarah has built and scaled sales organizations from startup to $100M+. She specializes in consultative selling, key account management, and building high-performance sales teams.",
  },
  {
    name: "David Chen",
    slug: "david-chen",
    title: "Principal, Strategy",
    discipline: "Strategy",
    company: "Apex Facility Solutions",
    bio: "David brings a strategic lens to every business challenge. As CEO of Apex Facility Solutions, he has led multiple acquisitions and market expansions, turning a regional player into a national platform in under a decade.",
  },
  {
    name: "Maria Rodriguez",
    slug: "maria-rodriguez",
    title: "Principal, Technology",
    discipline: "Technology",
    company: "BrightClean Technologies",
    bio: "Maria is at the forefront of technology adoption in the cleaning industry. She has implemented IoT-based quality assurance systems, workforce management platforms, and data-driven operations that have transformed service delivery.",
  },
  {
    name: "James Walker",
    slug: "james-walker",
    title: "Principal, Operations",
    discipline: "Operations",
    company: "Walker Building Services",
    bio: "A second-generation BSC leader, James has modernized his family's operations from a single-market company to a multi-state enterprise. He is known for his systematic approach to operational excellence and quality management.",
  },
  {
    name: "Angela Foster",
    slug: "angela-foster",
    title: "Principal, Human Resources",
    discipline: "Human Resources",
    company: "Premier Janitorial Group",
    bio: "Angela has built some of the industry's most effective talent acquisition and retention programs. Her work on employee engagement, training systems, and culture-building has earned her recognition as a top HR leader in the BSC space.",
  },
  {
    name: "Robert Kim",
    slug: "robert-kim",
    title: "Principal, Finance",
    discipline: "Finance",
    company: "Summit Cleaning Partners",
    bio: "Robert brings deep financial expertise to the Altus community. From financial modeling and margin optimization to M&A due diligence, he helps BSC leaders make smarter financial decisions that drive sustainable growth.",
  },
];

export default function PrincipalsPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-altus-navy py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold text-white sm:text-5xl">
              Altus <span className="text-altus-gold">Principals</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/70">
              The Altus Forum is led by a select group of industry leaders known
              as Altus Principals. These individuals are recognized subject matter
              experts and thought leaders within the building services industry.
            </p>
          </div>
        </div>
      </section>

      {/* Discipline Tags */}
      <section className="border-b border-altus-border bg-white py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {disciplines.map((d) => (
              <span
                key={d}
                className={`rounded-full px-3 py-1 text-sm font-medium cursor-pointer transition-colors ${
                  d === "All"
                    ? "bg-altus-navy text-white"
                    : "bg-altus-light-gray text-altus-slate hover:bg-altus-border"
                }`}
              >
                {d}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Principals Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {principals.map((principal) => (
              <Link
                key={principal.slug}
                href={`/principals/${principal.slug}`}
                className="group rounded-2xl border border-altus-border bg-white p-6 transition-all hover:border-altus-gold/30 hover:shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <Avatar name={principal.name} size="lg" />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-altus-navy group-hover:text-altus-gold transition-colors">
                      {principal.name}
                    </h3>
                    <p className="text-sm text-altus-slate">{principal.company}</p>
                    <Badge variant="gold" className="mt-2">
                      {principal.discipline}
                    </Badge>
                  </div>
                </div>
                <p className="mt-4 text-sm text-altus-slate leading-relaxed line-clamp-3">
                  {principal.bio}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How Principals Contribute */}
      <section className="bg-altus-light-gray py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-altus-navy">
            How Principals Contribute
          </h2>
          <p className="mt-4 text-altus-slate leading-relaxed">
            Each Principal represents a key business discipline that drives
            successful cleaning companies. Throughout the year, the Altus
            Principals rotate leadership of the monthly forum sessions, sharing
            their experience, lessons learned, and insights from operating and
            scaling successful businesses.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {["Sales & Marketing", "Strategy", "Technology", "Operations", "Human Resources", "Finance"].map(
              (d) => (
                <div
                  key={d}
                  className="rounded-lg bg-white px-4 py-3 text-sm font-medium text-altus-navy shadow-sm"
                >
                  {d}
                </div>
              )
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
