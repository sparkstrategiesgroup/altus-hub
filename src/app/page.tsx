import Link from "next/link";
import { MarketingNav } from "@/components/marketing/nav";
import { MarketingFooter } from "@/components/marketing/footer";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  Mountain,
  BookOpen,
  Users,
  Calendar,
  MessageSquare,
  Mic,
  ArrowRight,
} from "lucide-react";

const programs = [
  {
    icon: GraduationCap,
    title: "Altus Academy",
    description:
      "Monthly executive working sessions anchored by an Altus Principal Brief, followed by peer-led unpacking and decision-making in Altus Six breakouts.",
  },
  {
    icon: Mountain,
    title: "Altus Summit",
    description:
      "An annual multi-day exchange in Chicago where established and emerging leaders connect through workshops, keynotes, and networking rooted in clarity, connection, and forward momentum.",
  },
  {
    icon: BookOpen,
    title: "Altus Perspective",
    description:
      "Insight reports that advance every member. Real problems, real solutions, and real growth — delivered as actionable intelligence from the Altus community.",
  },
  {
    icon: Mic,
    title: "Altus Podcast",
    description:
      "Conversations with BSC leaders who share what actually works — the strategies, decisions, and lessons that drive real results in the cleaning industry.",
  },
];

const tiers = [
  {
    name: "Aspire",
    range: "$0–$1M",
    spend: "$50K–$150K",
    description: "Early-stage operators building their foundation",
  },
  {
    name: "Advance",
    range: "$1M–$5M",
    spend: "$150K–$500K",
    description: "Growing companies optimizing systems and scalability",
  },
  {
    name: "Achieve",
    range: "$5M–$20M",
    spend: "$500K–$2M+",
    description: "Enterprise platforms making multi-market decisions",
  },
  {
    name: "Ascend",
    range: "$20M+",
    spend: "$2M–$10M+",
    description: "National leaders driving strategic industry influence",
  },
];

const features = [
  {
    icon: Users,
    title: "Altus Six Peer Groups",
    description:
      "Peer groups aligned by Altus Level — Aspire, Advance, Achieve, Ascend — so you engage with leaders at a similar stage of growth.",
  },
  {
    icon: Calendar,
    title: "Monthly Academy Sessions",
    description:
      "45-minute Principal-Led insights followed by 45-minute peer group breakouts for application, challenges, and next steps.",
  },
  {
    icon: MessageSquare,
    title: "Community Discussions",
    description:
      "Ongoing conversations across Operations, Finance, Tech, Sales & Marketing, HR, and Strategy.",
  },
  {
    icon: BookOpen,
    title: "Resources & Insights",
    description:
      "Session recordings, Principal Briefs, Perspective reports, and curated resources from the Altus community.",
  },
];

const stats = [
  { value: "50.4%", label: "are $5M+ organizations" },
  { value: "1 in 4", label: "is a $20M+ organization" },
  { value: "1 in 2", label: "controls enterprise-level spend" },
];

export default function HomePage() {
  return (
    <>
      <MarketingNav />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-altus-charcoal">
          <div className="absolute inset-0 bg-gradient-to-br from-altus-charcoal-dark via-altus-charcoal to-altus-charcoal-light opacity-90" />
          <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
            <div className="max-w-3xl">
              <div className="mb-6 inline-flex items-center gap-2 text-sm tracking-widest text-altus-blue uppercase">
                ISSA | Altus Collective
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl uppercase">
                Where the Industry{" "}
                <span className="relative">
                  <span className="relative z-10">Rises Together</span>
                  <span className="absolute bottom-1 left-0 right-0 h-3 bg-altus-blue/30 -z-0" />
                </span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
                The Altus Collective is a curated leadership ecosystem within ISSA,
                designed to bring clarity, connection, and momentum to the Building
                Service Contractor community. Built by BSCs, for BSCs.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/register">
                  <Button variant="primary" size="lg" className="bg-white text-altus-charcoal hover:bg-altus-blue-light">
                    Join the Collective
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/how-it-works">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white/20 text-white hover:bg-white/10 hover:text-white"
                  >
                    How It Works
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* What is Altus */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-altus-charcoal sm:text-4xl uppercase tracking-wide">
                What is{" "}
                <span className="relative inline-block">
                  <span>Altus</span>
                  <span className="absolute bottom-0 left-0 right-0 h-2 bg-altus-blue/40" />
                </span>
                ?
              </h2>
              <p className="mt-6 text-altus-slate leading-relaxed">
                Altus is a community for Building Service Contractors, built by BSCs,
                for BSCs. Through Altus Academy, Altus Principals, the Altus Podcast,
                and Altus Summit, the Collective transforms expertise into shared
                understanding, and understanding into better decisions — at scale.
              </p>
              <p className="mt-4 text-sm text-altus-slate/70 italic">
                ALTUS | Latin. To rise; deep, noble. It holds both height and
                depth — elevating your work, always grounded in purpose.
              </p>
            </div>
          </div>
        </section>

        {/* Programs */}
        <section className="bg-altus-light-gray py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-altus-charcoal sm:text-4xl uppercase tracking-wide">
                The Altus Ecosystem
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-altus-slate">
                Four programs designed to move the BSC industry forward — together.
              </p>
            </div>
            <div className="mt-16 grid gap-6 sm:grid-cols-2">
              {programs.map((program) => (
                <div
                  key={program.title}
                  className="group rounded-2xl border border-altus-border bg-white p-8 transition-all hover:border-altus-blue hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-altus-blue/20">
                    <program.icon className="h-6 w-6 text-altus-charcoal" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-altus-charcoal uppercase tracking-wide">
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

        {/* Member Composition */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-altus-charcoal sm:text-4xl uppercase tracking-wide">
                Member{" "}
                <span className="relative inline-block">
                  <span>Composition</span>
                  <span className="absolute bottom-0 left-0 right-0 h-2 bg-altus-blue/40" />
                </span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-altus-slate">
                Altus has near-equal representation across all growth stages,
                enabling peer-to-peer credibility, upward influence, and
                long-term partnerships.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl bg-altus-blue/10 p-6 text-center"
                >
                  <p className="text-3xl font-bold text-altus-charcoal">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-altus-slate">
                    of Altus members {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Tiers */}
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {tiers.map((tier) => (
                <div
                  key={tier.name}
                  className="rounded-2xl border border-altus-border bg-white p-6"
                >
                  <h3 className="text-lg font-bold text-altus-charcoal uppercase tracking-wide">
                    {tier.name}
                  </h3>
                  <p className="text-sm font-medium text-altus-blue-dark">
                    ({tier.range})
                  </p>
                  <div className="mt-3 border-t border-altus-border pt-3">
                    <p className="text-xs text-altus-slate uppercase tracking-wide">
                      Annual Controlled Spend
                    </p>
                    <p className="text-sm font-semibold text-altus-charcoal">
                      {tier.spend}
                    </p>
                  </div>
                  <p className="mt-3 text-xs text-altus-slate">
                    {tier.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Digital Hub Features */}
        <section className="bg-altus-light-gray py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-altus-charcoal sm:text-4xl uppercase tracking-wide">
                Your Digital Hub
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-altus-slate">
                The Altus platform extends the experience beyond sessions,
                giving members tools to connect, learn, and grow year-round.
              </p>
            </div>
            <div className="mt-16 grid gap-6 sm:grid-cols-2">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="flex gap-4 rounded-xl border border-altus-border bg-white p-6"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-altus-charcoal">
                    <feature.icon className="h-5 w-5 text-altus-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-altus-charcoal">
                      {feature.title}
                    </h3>
                    <p className="mt-1 text-sm text-altus-slate">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-altus-charcoal sm:text-4xl uppercase tracking-wide">
              Ready to Rise?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-altus-slate">
              Join a community where BSC leaders learn from one another,
              exchange real-world strategies, and shape the future of the
              cleaning industry — together.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href="/register">
                <Button variant="primary" size="lg">
                  Join the Collective
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <MarketingFooter />
    </>
  );
}
