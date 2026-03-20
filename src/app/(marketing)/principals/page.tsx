import type { Metadata } from "next";
import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";

export const metadata: Metadata = {
  title: "Principals & Team",
  description:
    "Meet the Altus Principals and the Altus Team — the leaders who guide the ISSA | Altus Collective.",
};

const principals = [
  {
    name: "Jill Frey",
    slug: "jill-frey",
    title: "President & CEO",
    bio: "Jill brings executive leadership and strategic vision to the Altus Collective. As President & CEO, she drives the direction of the community and ensures every initiative serves the needs of BSC leaders nationwide.",
  },
  {
    name: "Steve Mastin",
    slug: "steve-mastin",
    title: "Chief Financial Officer",
    bio: "Steve brings deep financial expertise to the Altus community. His guidance on financial strategy, margin optimization, and sustainable growth helps BSC leaders make smarter decisions for their businesses.",
  },
  {
    name: "Chase Carlson",
    slug: "chase-carlson",
    title: "Chief Executive Officer & President",
    bio: "Chase combines operational excellence with visionary leadership. As CEO & President, he works to build meaningful connections and deliver practical value to BSC operators across every Altus Level.",
  },
  {
    name: "Ricky Regalado",
    slug: "ricky-regalado",
    title: "Chief Executive Officer & Founder",
    bio: "Ricky is the driving force behind the Altus Collective. As CEO & Founder, he created the community to give BSC leaders a trusted space to learn, grow, and elevate the profession — built by BSCs, for BSCs.",
  },
];

const team = [
  { name: "Alejandra Gramajo" },
  { name: "Jocelyn Rangel" },
  { name: "Karina Neff" },
  { name: "Nancy Viazzi" },
];

export default function PrincipalsPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-altus-charcoal py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold uppercase tracking-wide text-white sm:text-5xl">
              Altus{" "}
              <span className="relative inline-block">
                <span className="text-altus-blue">Principals</span>
                <span className="absolute bottom-0 left-0 right-0 h-2 bg-altus-blue/40" />
              </span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/70">
              The ISSA | Altus Collective is led by a select group of industry
              leaders known as Altus Principals. These individuals bring
              executive experience and thought leadership to every session and
              initiative.
            </p>
          </div>
        </div>
      </section>

      {/* Principals Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold uppercase tracking-wide text-altus-charcoal">
            Meet the Principals
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {principals.map((principal) => (
              <Link
                key={principal.slug}
                href={`/principals/${principal.slug}`}
                className="group rounded-2xl border border-altus-border bg-white p-6 transition-all hover:border-altus-blue/30 hover:shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <Avatar name={principal.name} size="lg" />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-altus-charcoal group-hover:text-altus-blue transition-colors">
                      {principal.name}
                    </h3>
                    <p className="text-sm text-altus-slate">{principal.title}</p>
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

      {/* Altus Team */}
      <section className="bg-altus-light-gray py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold uppercase tracking-wide text-altus-charcoal">
            The Altus{" "}
            <span className="relative inline-block">
              <span>Team</span>
              <span className="absolute bottom-0 left-0 right-0 h-2 bg-altus-blue/40" />
            </span>
          </h2>
          <p className="mt-4 text-altus-slate leading-relaxed max-w-2xl">
            Behind the scenes, the Altus Team works to deliver an exceptional
            experience for every member — coordinating sessions, supporting
            Principals, and keeping the community running smoothly.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {team.map((member) => (
              <div
                key={member.name}
                className="flex items-center gap-3 rounded-xl bg-white border border-altus-border p-4"
              >
                <Avatar name={member.name} size="sm" />
                <span className="text-sm font-medium text-altus-charcoal">
                  {member.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How Principals Contribute */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold uppercase tracking-wide text-altus-charcoal">
            How Principals Contribute
          </h2>
          <p className="mt-4 text-altus-slate leading-relaxed">
            Each Principal brings executive-level experience to the Altus
            community. Throughout the year, Principals rotate leadership of the
            monthly Academy sessions, sharing their experience, lessons learned,
            and insights from operating and scaling successful BSC businesses.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {["Sales & Marketing", "Strategy", "Technology", "Operations", "Human Resources", "Finance"].map(
              (d) => (
                <div
                  key={d}
                  className="rounded-lg bg-white px-4 py-3 text-sm font-medium text-altus-charcoal shadow-sm"
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
