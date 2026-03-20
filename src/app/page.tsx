import Link from "next/link";
import { MarketingNav } from "@/components/marketing/nav";
import { MarketingFooter } from "@/components/marketing/footer";
import { Button } from "@/components/ui/button";
import {
  Target,
  GraduationCap,
  TrendingUp,
  Users,
  Calendar,
  MessageSquare,
  BookOpen,
  ArrowRight,
} from "lucide-react";

const pillars = [
  {
    icon: Target,
    title: "Engage with Intention",
    description:
      "Every conversation at Altus is purposeful. We bring together BSC leaders who are ready to share real-world strategies, ask tough questions, and tackle the challenges that matter most.",
  },
  {
    icon: GraduationCap,
    title: "Empower with Education",
    description:
      "Led by recognized industry Principals, each forum session delivers practical insights and lessons learned from operators who have scaled successful cleaning businesses.",
  },
  {
    icon: TrendingUp,
    title: "Elevate with Influence",
    description:
      "Altus members don't just learn — they shape the future of the cleaning industry. Together, we amplify the voice and influence of Building Service Contractors.",
  },
];

const features = [
  {
    icon: Users,
    title: "Altus Six Peer Groups",
    description:
      "Small peer groups organized by company size and sales volume, so you engage with leaders facing similar challenges.",
  },
  {
    icon: Calendar,
    title: "Monthly Forum Sessions",
    description:
      "Structured sessions led by industry Principals, combining thought leadership with collaborative peer discussion.",
  },
  {
    icon: MessageSquare,
    title: "Community Discussions",
    description:
      "Ongoing conversations across key business disciplines — from sales and operations to technology and strategy.",
  },
  {
    icon: BookOpen,
    title: "Resources Library",
    description:
      "Access session recordings, presentations, and curated resources from the Altus community.",
  },
];

export default function HomePage() {
  return (
    <>
      <MarketingNav />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-altus-navy">
          <div className="absolute inset-0 bg-gradient-to-br from-altus-navy via-altus-navy-light to-altus-navy opacity-90" />
          <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
            <div className="max-w-3xl">
              <div className="mb-6 inline-flex items-center rounded-full border border-altus-gold/30 bg-altus-gold/10 px-4 py-1.5 text-sm text-altus-gold">
                A Leadership Community for BSC Executives
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Where Industry Leaders{" "}
                <span className="text-altus-gold">Rise Together</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
                The Altus Forum brings together Building Service Contractor
                executives who are committed to strengthening their businesses and
                advancing the cleaning industry through purposeful dialogue, peer
                collaboration, and thought leadership.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/register">
                  <Button variant="gold" size="lg">
                    Join the Forum
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

        {/* Pillars */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-altus-navy sm:text-4xl">
                Three Pillars of Altus
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-altus-slate">
                Every aspect of the Altus Forum is guided by these core principles,
                ensuring discussions are purposeful, practical, and focused on
                meaningful industry impact.
              </p>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {pillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="group rounded-2xl border border-altus-border bg-white p-8 transition-all hover:border-altus-gold/30 hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-altus-gold/10">
                    <pillar.icon className="h-6 w-6 text-altus-gold" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-altus-navy">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-altus-slate">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="bg-altus-light-gray py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-altus-navy sm:text-4xl">
                Your Digital Hub
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-altus-slate">
                The Altus platform extends the forum experience beyond monthly
                sessions, giving members tools to connect, learn, and grow year-round.
              </p>
            </div>
            <div className="mt-16 grid gap-6 sm:grid-cols-2">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="flex gap-4 rounded-xl border border-altus-border bg-white p-6"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-altus-navy">
                    <feature.icon className="h-5 w-5 text-altus-gold" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-altus-navy">
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
            <h2 className="text-3xl font-bold text-altus-navy sm:text-4xl">
              Ready to Elevate Your Leadership?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-altus-slate">
              Join a select community of BSC executives who are learning from one
              another, exchanging real-world strategies, and shaping the future of
              the cleaning industry.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href="/register">
                <Button variant="gold" size="lg">
                  Apply to Join
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
