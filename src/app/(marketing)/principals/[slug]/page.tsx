import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const principals = [
  {
    name: "Sarah Mitchell",
    slug: "sarah-mitchell",
    title: "Principal, Sales & Marketing",
    discipline: "Sales & Marketing",
    company: "CleanPro National Services",
    bio: "With 20+ years driving revenue growth in the BSC industry, Sarah has built and scaled sales organizations from startup to $100M+. She specializes in consultative selling, key account management, and building high-performance sales teams.",
    fullBio:
      "Sarah Mitchell is one of the BSC industry's most respected sales and marketing leaders. Over two decades, she has built and scaled sales organizations from startup operations to enterprises exceeding $100M in annual revenue. Her expertise spans consultative selling, key account strategy, proposal development, and building high-performance sales teams.\n\nAs a Principal of the Altus Forum, Sarah brings a practitioner's perspective to every discussion — sharing what actually works in the field, not just what sounds good in theory. Her sessions focus on real sales challenges facing BSC companies: winning competitive bids, retaining key accounts, building referral engines, and developing sales leaders from within.",
  },
  {
    name: "David Chen",
    slug: "david-chen",
    title: "Principal, Strategy",
    discipline: "Strategy",
    company: "Apex Facility Solutions",
    bio: "David brings a strategic lens to every business challenge. As CEO of Apex Facility Solutions, he has led multiple acquisitions and market expansions.",
    fullBio:
      "David Chen is a strategic thinker and proven operator who has transformed Apex Facility Solutions from a regional player into a national platform through organic growth and strategic acquisitions. His approach to strategy is grounded in financial discipline, market analysis, and operational reality.\n\nAs an Altus Principal, David leads discussions on strategic planning, market positioning, competitive analysis, and growth through acquisition. He challenges members to think beyond their day-to-day operations and build businesses that can compete and win at any scale.",
  },
  {
    name: "Maria Rodriguez",
    slug: "maria-rodriguez",
    title: "Principal, Technology",
    discipline: "Technology",
    company: "BrightClean Technologies",
    bio: "Maria is at the forefront of technology adoption in the cleaning industry.",
    fullBio:
      "Maria Rodriguez is a technology innovator in the building services space. She has implemented IoT-based quality assurance systems, deployed AI-powered workforce scheduling, and built data analytics platforms that give cleaning companies real-time visibility into their operations.\n\nAs an Altus Principal, Maria helps BSC leaders evaluate and adopt technology that delivers measurable ROI — not just shiny tools. Her sessions cover workforce management platforms, customer-facing technology, operational analytics, and building a technology roadmap that scales with your business.",
  },
  {
    name: "James Walker",
    slug: "james-walker",
    title: "Principal, Operations",
    discipline: "Operations",
    company: "Walker Building Services",
    bio: "A second-generation BSC leader who has modernized his family's operations into a multi-state enterprise.",
    fullBio:
      "James Walker represents the best of the BSC industry's next generation. Taking the reins of his family's cleaning business, he modernized operations from the ground up — implementing standardized processes, quality management systems, and operational metrics that drove consistent, scalable growth.\n\nAs an Altus Principal, James focuses on the operational engine that powers every successful BSC company. His sessions cover workforce management, quality assurance, supply chain optimization, account startups, and building operational systems that deliver consistent results across multiple markets.",
  },
  {
    name: "Angela Foster",
    slug: "angela-foster",
    title: "Principal, Human Resources",
    discipline: "Human Resources",
    company: "Premier Janitorial Group",
    bio: "Angela has built some of the industry's most effective talent acquisition and retention programs.",
    fullBio:
      "Angela Foster has spent her career solving the BSC industry's biggest challenge: people. She has designed and implemented talent acquisition pipelines, employee engagement programs, training systems, and retention strategies that have dramatically reduced turnover and improved service quality.\n\nAs an Altus Principal, Angela brings a people-first perspective to every discussion. Her sessions cover recruitment strategies, onboarding best practices, leadership development, employee engagement, compliance, and building a culture that attracts and retains top talent in a competitive labor market.",
  },
  {
    name: "Robert Kim",
    slug: "robert-kim",
    title: "Principal, Finance",
    discipline: "Finance",
    company: "Summit Cleaning Partners",
    bio: "Robert brings deep financial expertise to the Altus community.",
    fullBio:
      "Robert Kim combines deep financial acumen with hands-on BSC industry experience. He has guided companies through financial restructuring, M&A transactions, equity raises, and the complex financial planning required to scale a service-based business.\n\nAs an Altus Principal, Robert demystifies finance for BSC operators. His sessions cover financial modeling, margin analysis, pricing strategy, cash flow management, M&A valuation, and building the financial infrastructure that supports sustainable growth.",
  },
];

export function generateStaticParams() {
  return principals.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const principal = principals.find((p) => p.slug === slug);
  if (!principal) return { title: "Principal Not Found" };
  return {
    title: principal.name,
    description: principal.bio,
  };
}

export default async function PrincipalDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const principal = principals.find((p) => p.slug === slug);
  if (!principal) notFound();

  return (
    <div>
      <section className="bg-altus-navy py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/principals"
            className="inline-flex items-center gap-1 text-sm text-white/60 hover:text-altus-gold transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Principals
          </Link>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <Avatar name={principal.name} size="lg" className="h-20 w-20 text-2xl" />
            <div>
              <h1 className="text-3xl font-bold text-white sm:text-4xl">
                {principal.name}
              </h1>
              <p className="mt-1 text-lg text-white/70">{principal.company}</p>
              <Badge variant="gold" className="mt-3">
                {principal.discipline}
              </Badge>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-slate max-w-none">
            {principal.fullBio.split("\n\n").map((paragraph, i) => (
              <p key={i} className="text-altus-slate leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-12 rounded-2xl bg-altus-light-gray p-8">
            <h3 className="text-lg font-semibold text-altus-navy">
              Area of Expertise
            </h3>
            <p className="mt-1 text-sm text-altus-slate">{principal.title}</p>
            <div className="mt-6">
              <Link href="/register">
                <Button variant="gold">
                  Join to Attend Sessions
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
