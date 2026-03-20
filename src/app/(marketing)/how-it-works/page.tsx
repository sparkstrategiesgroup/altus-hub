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
} from "lucide-react";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Learn how the Altus Forum works — from Principal-led discussions to Altus Six peer group breakouts.",
};

const steps = [
  {
    number: "01",
    icon: Presentation,
    title: "Principal-Led Discussion",
    description:
      "Each monthly session begins with an Altus Principal facilitating a conversation around a key business topic relevant to BSC leaders. Rather than a traditional presentation, the discussion is designed to surface practical insights, real-world experiences, and lessons learned from leaders operating in the field.",
    highlight: "Facilitated by recognized industry experts",
  },
  {
    number: "02",
    icon: Users,
    title: "Altus Six Peer Breakouts",
    description:
      "Following the opening discussion, participants move into smaller peer groups known as Altus Six. These groups are organized by company size and sales volume, allowing participants to engage with peers facing similar business challenges and growth stages.",
    highlight: "Groups matched by company size & revenue",
  },
  {
    number: "03",
    icon: MessageCircle,
    title: "Peer Exchange",
    description:
      "Within these peer groups, members exchange ideas, discuss how the topic applies to their organizations, and share strategies that have worked in their businesses. This is where the real value emerges — practical, peer-to-peer knowledge sharing.",
    highlight: "Real strategies from real operators",
  },
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
      "Access session recordings, presentations, documents, and curated resources shared by Principals and fellow members.",
  },
  {
    icon: Calendar,
    title: "Events & Scheduling",
    description:
      "Stay connected with upcoming forum sessions, networking events, workshops, and industry conferences.",
  },
];

export default function HowItWorksPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-altus-navy py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold text-white sm:text-5xl">
              How the <span className="text-altus-gold">Forum Works</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/70">
              Each Altus Forum session follows a structured format designed to
              balance thought leadership with peer collaboration. Here&apos;s what
              to expect.
            </p>
          </div>
        </div>
      </section>

      {/* Session Flow */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-altus-navy">
            The Monthly Session
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-altus-slate">
            Each session is carefully structured to maximize both learning and
            peer connection.
          </p>

          <div className="mt-16 space-y-8">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className="relative flex flex-col gap-6 rounded-2xl border border-altus-border bg-white p-8 md:flex-row md:items-start md:gap-8"
              >
                <div className="flex shrink-0 items-start gap-4">
                  <span className="text-4xl font-bold text-altus-gold/30">
                    {step.number}
                  </span>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-altus-navy">
                    <step.icon className="h-6 w-6 text-altus-gold" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-altus-navy">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-altus-slate leading-relaxed">
                    {step.description}
                  </p>
                  <div className="mt-4 inline-flex items-center rounded-full bg-altus-gold/10 px-3 py-1 text-sm font-medium text-altus-gold-dark">
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

      {/* Beyond the Session */}
      <section className="bg-altus-light-gray py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-altus-navy">
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
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-altus-navy">
                  <item.icon className="h-5 w-5 text-altus-gold" />
                </div>
                <h3 className="mt-4 font-semibold text-altus-navy">
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
          <div className="rounded-2xl bg-altus-navy p-8 sm:p-12 lg:p-16">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold text-white">
                Led by Industry Principals
              </h2>
              <p className="mt-4 text-white/70 leading-relaxed">
                Altus Principals are recognized subject matter experts selected
                for their industry influence, operational expertise, and
                demonstrated success. Each Principal represents a key business
                discipline: Sales & Marketing, Strategy, Technology, Operations,
                Human Resources, and Finance.
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
          <h2 className="text-3xl font-bold text-altus-navy">
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
