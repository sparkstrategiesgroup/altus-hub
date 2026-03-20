import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Presentation,
  Users,
  MessageCircle,
  BookOpen,
  Calendar,
  FileText,
} from "lucide-react";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Learn how the Altus Collective works — from Principal-led insights to Altus Six peer group breakouts.",
};

const steps = [
  {
    number: "01",
    icon: Presentation,
    title: "Principal-Led Insight (45 min)",
    description:
      "Each monthly Altus Academy session begins with an Altus Principal facilitating a 45-minute conversation around a key business topic relevant to BSC leaders. Rather than a traditional presentation, the discussion is designed to surface practical insights, real-world experiences, and lessons learned from leaders operating in the field. Principals also share a Principal Brief — a concise pre-read document that frames the topic and prepares members for a deeper conversation.",
    highlight: "Facilitated by recognized industry experts",
  },
  {
    number: "02",
    icon: Users,
    title: "Altus Six Peer Breakouts (45 min)",
    description:
      "Following the opening insight, participants move into smaller peer groups known as Altus Six for 45 minutes. These groups are organized by Altus Level — Aspire ($0–$1M), Advance ($1M–$5M), Achieve ($5M–$20M), and Ascend ($20M+) — allowing participants to engage with peers facing similar business challenges and growth stages.",
    highlight: "Groups matched by Altus Level (revenue tier)",
  },
  {
    number: "03",
    icon: MessageCircle,
    title: "Peer Exchange",
    description:
      "Within these peer groups, members exchange ideas, discuss how the topic applies to their organizations, and share strategies that have worked in their businesses. This is where the real value emerges — practical, peer-to-peer knowledge sharing among operators who understand each other's world.",
    highlight: "Real strategies from real operators",
  },
];

const sessionCalendar = [
  { date: "Mar 5", topic: "Welcome Session" },
  { date: "Mar 26", topic: "Operations" },
  { date: "Apr 23", topic: "Sales & Marketing" },
  { date: "May 28", topic: "Technology" },
  { date: "Jun 8–10", topic: "Altus Summit (Chicago)" },
  { date: "Jul 23", topic: "Strategy+" },
  { date: "Aug 27", topic: "Finance" },
  { date: "Sep 28–30", topic: "VEO (Dallas)" },
  { date: "Oct 22", topic: "Human Resources" },
  { date: "Nov", topic: "ISSA Show" },
];

const ongoing = [
  {
    icon: MessageCircle,
    title: "Community Discussions",
    description:
      "Continue the conversation between sessions with topic-based discussion boards spanning all key business disciplines.",
  },
  {
    icon: BookOpen,
    title: "Resources Library",
    description:
      "Access session recordings, Principal Briefs, presentations, documents, and curated resources shared by Principals and fellow members.",
  },
  {
    icon: Calendar,
    title: "Events & Scheduling",
    description:
      "Stay connected with upcoming Academy sessions, Summit details, networking events, workshops, and industry conferences.",
  },
];

export default function HowItWorksPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-altus-charcoal py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold uppercase tracking-wide text-white sm:text-5xl">
              How{" "}
              <span className="relative inline-block">
                <span className="text-altus-blue">Altus</span>
                <span className="absolute bottom-0 left-0 right-0 h-2 bg-altus-blue/40" />
              </span>{" "}
              Works
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/70">
              Each Altus Academy session follows a structured format designed to
              balance thought leadership with peer collaboration. Here&apos;s what
              to expect.
            </p>
          </div>
        </div>
      </section>

      {/* Altus Academy Format */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold uppercase tracking-wide text-altus-charcoal">
            The{" "}
            <span className="relative inline-block">
              <span>Altus Academy</span>
              <span className="absolute bottom-0 left-0 right-0 h-2 bg-altus-blue/40" />
            </span>{" "}
            Format
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-altus-slate">
            Monthly virtual sessions featuring the Altus Six format — carefully
            structured to maximize both learning and peer connection.
          </p>

          <div className="mt-16 space-y-8">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className="relative flex flex-col gap-6 rounded-2xl border border-altus-border bg-white p-8 md:flex-row md:items-start md:gap-8"
              >
                <div className="flex shrink-0 items-start gap-4">
                  <span className="text-4xl font-bold text-altus-blue/30">
                    {step.number}
                  </span>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-altus-charcoal">
                    <step.icon className="h-6 w-6 text-altus-blue" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-altus-charcoal">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-altus-slate leading-relaxed">
                    {step.description}
                  </p>
                  <div className="mt-4 inline-flex items-center rounded-full bg-altus-blue/10 px-3 py-1 text-sm font-medium text-altus-charcoal">
                    {step.highlight}
                  </div>
                </div>
                {i < steps.length - 1 && (
                  <div className="absolute -bottom-5 left-1/2 hidden h-10 w-px bg-altus-border md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Principal Brief */}
      <section className="bg-altus-light-gray py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-altus-charcoal">
              <FileText className="h-6 w-6 text-altus-blue" />
            </div>
            <h2 className="mt-6 text-2xl font-bold uppercase tracking-wide text-altus-charcoal">
              The Principal Brief
            </h2>
            <p className="mt-4 text-altus-slate leading-relaxed">
              Before each Altus Academy session, Principals share a concise
              briefing document that frames the topic, poses key questions, and
              provides context so members arrive prepared for a deeper, more
              productive conversation. The Principal Brief ensures every
              participant can engage meaningfully from minute one.
            </p>
          </div>
        </div>
      </section>

      {/* Altus Summit */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-altus-charcoal p-8 sm:p-12 lg:p-16">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold uppercase tracking-wide text-white">
                Altus{" "}
                <span className="relative inline-block">
                  <span className="text-altus-blue">Summit</span>
                  <span className="absolute bottom-0 left-0 right-0 h-2 bg-altus-blue/40" />
                </span>
              </h2>
              <p className="mt-2 text-altus-gold font-semibold uppercase tracking-wide text-sm">
                June 8–10 &middot; Chicago
              </p>
              <p className="mt-4 text-white/70 leading-relaxed">
                Our annual in-person event brings together BSC leaders for an
                immersive experience featuring workshops, keynotes, and
                dine-around networking. The Summit is where relationships deepen,
                ideas ignite, and the Altus community comes together face to
                face.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-white/60">
                <span>Workshops</span>
                <span className="text-altus-blue">&#x2022;</span>
                <span>Keynotes</span>
                <span className="text-altus-blue">&#x2022;</span>
                <span>Dine Arounds</span>
                <span className="text-altus-blue">&#x2022;</span>
                <span>Peer Networking</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Altus Perspective */}
      <section className="bg-altus-light-gray py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold uppercase tracking-wide text-altus-charcoal">
              Altus Perspective
            </h2>
            <p className="mt-4 text-altus-slate leading-relaxed">
              Data-driven insight reports designed to give BSC leaders a clearer
              view of industry trends, benchmarks, and emerging opportunities.
              Altus Perspective delivers the analysis you need to make informed
              strategic decisions for your business.
            </p>
          </div>
        </div>
      </section>

      {/* Session Calendar */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold uppercase tracking-wide text-altus-charcoal">
            Session{" "}
            <span className="relative inline-block">
              <span>Calendar</span>
              <span className="absolute bottom-0 left-0 right-0 h-2 bg-altus-blue/40" />
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-altus-slate">
            The Altus Academy year covers key business disciplines, plus in-person events and industry conferences.
          </p>
          <div className="mx-auto mt-12 max-w-2xl">
            <div className="space-y-3">
              {sessionCalendar.map((session) => (
                <div
                  key={session.date}
                  className="flex items-center gap-4 rounded-lg border border-altus-border bg-white px-5 py-3"
                >
                  <span className="w-24 shrink-0 text-sm font-bold uppercase tracking-wide text-altus-blue">
                    {session.date}
                  </span>
                  <span className="text-sm font-medium text-altus-charcoal">
                    {session.topic}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Beyond the Session */}
      <section className="bg-altus-light-gray py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold uppercase tracking-wide text-altus-charcoal">
            Beyond the Monthly Session
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-altus-slate">
            The Altus digital hub keeps the community connected year-round with
            tools for ongoing learning and collaboration.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {ongoing.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl bg-white p-8 shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-altus-charcoal">
                  <item.icon className="h-5 w-5 text-altus-blue" />
                </div>
                <h3 className="mt-4 font-semibold text-altus-charcoal">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-altus-slate leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Principals Preview */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-altus-charcoal p-8 sm:p-12 lg:p-16">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold uppercase tracking-wide text-white">
                Led by Industry Principals
              </h2>
              <p className="mt-4 text-white/70 leading-relaxed">
                Altus Principals are recognized subject matter experts selected
                for their industry influence, operational expertise, and
                demonstrated success. They lead each Academy session with
                practical insight drawn from real experience.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link href="/principals">
                  <Button variant="gold" size="lg">
                    Meet the Principals
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-3xl font-bold uppercase tracking-wide text-altus-charcoal">
            Ready to Join?
          </h2>
          <p className="mt-4 text-altus-slate">
            Apply to become an Altus member and start engaging with BSC
            executives who are committed to excellence.
          </p>
          <div className="mt-8">
            <Link href="/register">
              <Button variant="gold" size="lg">
                Apply to Join
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
