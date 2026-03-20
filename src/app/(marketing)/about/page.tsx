import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Lightbulb, Handshake } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about the Altus Forum — a leadership community designed for Building Service Contractor executives.",
};

const values = [
  {
    icon: Shield,
    title: "Trusted Community",
    description:
      "Altus is a confidential space where experienced operators speak openly about their challenges, strategies, and successes.",
  },
  {
    icon: Lightbulb,
    title: "Practical Insights",
    description:
      "Every session is designed to surface actionable ideas — not theory. Members leave with strategies they can apply immediately.",
  },
  {
    icon: Handshake,
    title: "Peer Accountability",
    description:
      "Through Altus Six peer groups, members hold each other accountable and support one another's growth over time.",
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-altus-navy py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold text-white sm:text-5xl">
              About the <span className="text-altus-gold">Altus Forum</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/70">
              The Altus Forum is a leadership community designed for Building
              Service Contractor executives who are committed to strengthening
              their businesses and advancing the cleaning industry.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <h2 className="text-3xl font-bold text-altus-navy">
                Why Altus Exists
              </h2>
              <p className="mt-6 text-altus-slate leading-relaxed">
                The Altus Forum was created to provide a space where experienced
                operators can learn from one another while helping shape the
                future of the cleaning industry.
              </p>
              <p className="mt-4 text-altus-slate leading-relaxed">
                By combining thought leadership, practical education, and peer
                collaboration, Altus empowers leaders to strengthen their
                companies while elevating the voice and influence of Building
                Service Contractors across the industry.
              </p>
              <p className="mt-4 text-altus-slate leading-relaxed">
                Altus brings together operators who want to learn from one
                another, exchange real-world strategies, and tackle the
                operational and leadership challenges facing the industry today.
              </p>
            </div>
            <div className="space-y-6">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="flex gap-4 rounded-xl border border-altus-border bg-white p-6"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-altus-gold/10">
                    <value.icon className="h-5 w-5 text-altus-gold" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-altus-navy">
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

      {/* Three Pillars Detail */}
      <section className="bg-altus-light-gray py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-altus-navy">
            Our Guiding Principles
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <div className="text-3xl font-bold text-altus-gold">01</div>
              <h3 className="mt-4 text-xl font-semibold text-altus-navy">
                Engage with Intention
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-altus-slate">
                Every interaction within the Altus community is designed to be
                purposeful. From monthly forum sessions to peer group breakouts,
                every conversation drives toward actionable outcomes for BSC
                leaders.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <div className="text-3xl font-bold text-altus-gold">02</div>
              <h3 className="mt-4 text-xl font-semibold text-altus-navy">
                Empower with Education
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-altus-slate">
                Altus Principals — recognized industry subject matter experts —
                lead discussions that deliver practical insights, real-world case
                studies, and proven strategies for growing and strengthening BSC
                organizations.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <div className="text-3xl font-bold text-altus-gold">03</div>
              <h3 className="mt-4 text-xl font-semibold text-altus-navy">
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
          <h2 className="text-3xl font-bold text-altus-navy">
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
