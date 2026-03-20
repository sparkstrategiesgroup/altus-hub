import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Lightbulb, Handshake, BarChart3, Users, Globe, Mic } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about the Altus Collective — a community for Building Service Contractors, built by BSCs, for BSCs.",
};

const values = [
  {
    icon: Shield,
    title: "Trusted Community",
    description:
      "Altus is a confidential space where experienced operators speak openly about their challenges, strategies, and successes — built by BSCs, for BSCs.",
  },
  {
    icon: Lightbulb,
    title: "Practical Insights",
    description:
      "Every session is designed to surface actionable ideas — not theory. Members leave with strategies they can apply immediately to their businesses.",
  },
  {
    icon: Handshake,
    title: "Peer Accountability",
    description:
      "Through the Altus Six peer group format, members hold each other accountable and support one another's growth over time.",
  },
];

const programs = [
  {
    icon: Users,
    title: "Altus Academy",
    description:
      "Monthly virtual sessions featuring the Altus Six format — 45 minutes of Principal-Led Insight followed by 45 minutes of peer breakouts organized by Altus Level.",
  },
  {
    icon: Globe,
    title: "Altus Summit",
    description:
      "Our annual in-person event in Chicago bringing together BSC leaders for workshops, keynotes, and dine-around networking experiences.",
  },
  {
    icon: BarChart3,
    title: "Altus Perspective",
    description:
      "Insight reports and data-driven analysis designed to give BSC leaders a clearer view of industry trends, benchmarks, and opportunities.",
  },
  {
    icon: Mic,
    title: "Altus Podcast",
    description:
      "Conversations with BSC leaders on the topics that matter most — candid discussions about growth, operations, and the future of the cleaning industry.",
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-altus-charcoal py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold uppercase tracking-wide text-white sm:text-5xl">
              About{" "}
              <span className="relative inline-block">
                <span className="text-altus-blue">Altus Collective</span>
                <span className="absolute bottom-0 left-0 right-0 h-2 bg-altus-blue/40" />
              </span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/70">
              A community for Building Service Contractors, built by BSCs, for
              BSCs. In partnership with ISSA, Altus Collective brings together
              the leaders shaping the future of the cleaning industry.
            </p>
          </div>
        </div>
      </section>

      {/* What is Altus */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <h2 className="text-3xl font-bold uppercase tracking-wide text-altus-charcoal">
                Why{" "}
                <span className="relative inline-block">
                  <span>Altus</span>
                  <span className="absolute bottom-0 left-0 right-0 h-2 bg-altus-blue/40" />
                </span>{" "}
                Exists
              </h2>
              <p className="mt-6 text-altus-slate leading-relaxed">
                The word <em>Altus</em> is Latin for &ldquo;to rise&rdquo; — and
                also carries the meaning of &ldquo;deep&rdquo; and
                &ldquo;noble.&rdquo; It reflects our belief that BSC leaders
                deserve a community as ambitious and purposeful as the
                businesses they run.
              </p>
              <p className="mt-4 text-altus-slate leading-relaxed">
                ISSA | Altus Collective was created to provide a space where
                experienced operators can learn from one another while helping
                shape the future of the cleaning industry. Through our
                partnership with ISSA, we amplify the voice and influence of
                Building Service Contractors across the industry.
              </p>
              <p className="mt-4 text-altus-slate leading-relaxed">
                By combining thought leadership, practical education, and peer
                collaboration, Altus empowers leaders to strengthen their
                companies while elevating the profession as a whole.
              </p>
            </div>
            <div className="space-y-6">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="flex gap-4 rounded-xl border border-altus-border bg-white p-6"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-altus-blue/10">
                    <value.icon className="h-5 w-5 text-altus-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-altus-charcoal">
                      {value.title}
                    </h3>
                    <p className="mt-1 text-sm text-altus-slate">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Membership Stats */}
      <section className="bg-altus-charcoal py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold uppercase tracking-wide text-white">
            Our Membership at a Glance
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="text-4xl font-bold text-altus-blue">50.4%</div>
              <p className="mt-2 text-sm text-white/70">
                of members are $5M+ in annual revenue
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-altus-gold">1 in 4</div>
              <p className="mt-2 text-sm text-white/70">
                members are $20M+ (Ascend level)
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-altus-blue">4 Levels</div>
              <p className="mt-2 text-sm text-white/70">
                Aspire, Advance, Achieve, Ascend — peer groups matched by revenue
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="bg-altus-light-gray py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold uppercase tracking-wide text-altus-charcoal">
            Our{" "}
            <span className="relative inline-block">
              <span>Programs</span>
              <span className="absolute bottom-0 left-0 right-0 h-2 bg-altus-blue/40" />
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-altus-slate">
            Altus Collective offers multiple touchpoints designed to keep BSC
            leaders learning, connecting, and growing year-round.
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {programs.map((program) => (
              <div
                key={program.title}
                className="rounded-2xl bg-white p-8 shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-altus-blue/10">
                  <program.icon className="h-5 w-5 text-altus-blue" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-altus-charcoal">
                  {program.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-altus-slate">
                  {program.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guiding Principles */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold uppercase tracking-wide text-altus-charcoal">
            Our Guiding Principles
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl bg-white border border-altus-border p-8">
              <div className="text-3xl font-bold text-altus-blue">01</div>
              <h3 className="mt-4 text-xl font-semibold text-altus-charcoal">
                Engage with Intention
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-altus-slate">
                Every interaction within the Altus community is designed to be
                purposeful. From monthly Academy sessions to peer group breakouts,
                every conversation drives toward actionable outcomes for BSC
                leaders.
              </p>
            </div>
            <div className="rounded-2xl bg-white border border-altus-border p-8">
              <div className="text-3xl font-bold text-altus-blue">02</div>
              <h3 className="mt-4 text-xl font-semibold text-altus-charcoal">
                Empower with Education
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-altus-slate">
                Altus Principals — recognized industry subject matter experts —
                lead discussions that deliver practical insights, real-world case
                studies, and proven strategies for growing and strengthening BSC
                organizations.
              </p>
            </div>
            <div className="rounded-2xl bg-white border border-altus-border p-8">
              <div className="text-3xl font-bold text-altus-gold">03</div>
              <h3 className="mt-4 text-xl font-semibold text-altus-charcoal">
                Elevate with Influence
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-altus-slate">
                Together, Altus members amplify the voice of Building Service
                Contractors across the industry. By collaborating and sharing
                knowledge, members shape industry standards and elevate the
                profession.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold uppercase tracking-wide text-altus-charcoal">
            Become an Altus Member
          </h2>
          <p className="mt-4 text-altus-slate">
            Join a select community of BSC executives who are learning from one
            another and shaping the future of the cleaning industry.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/register">
              <Button variant="gold" size="lg">
                Apply to Join
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/how-it-works">
              <Button variant="outline" size="lg">
                See How It Works
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
