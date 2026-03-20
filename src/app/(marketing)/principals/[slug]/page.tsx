import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const principals = [
  {
    name: "Jill Frey",
    slug: "jill-frey",
    title: "President & CEO",
    bio: "Jill brings executive leadership and strategic vision to the Altus Collective. As President & CEO, she drives the direction of the community and ensures every initiative serves the needs of BSC leaders nationwide.",
    fullBio:
      "Jill Frey serves as President & CEO of the ISSA | Altus Collective, bringing executive leadership and strategic vision to the community. Under her guidance, Altus has grown into a trusted space where BSC leaders come together to learn, collaborate, and elevate the profession.\n\nJill is deeply committed to ensuring that every Altus initiative — from Academy sessions to the annual Summit — delivers practical, actionable value to members. Her leadership style is grounded in listening to the community and building programs that reflect the real challenges and opportunities facing Building Service Contractors today.",
  },
  {
    name: "Steve Mastin",
    slug: "steve-mastin",
    title: "Chief Financial Officer",
    bio: "Steve brings deep financial expertise to the Altus community. His guidance on financial strategy, margin optimization, and sustainable growth helps BSC leaders make smarter decisions for their businesses.",
    fullBio:
      "Steve Mastin serves as Chief Financial Officer of the ISSA | Altus Collective. He brings deep financial acumen and a practical understanding of the economics of running a successful Building Service Contracting business.\n\nSteve's expertise spans financial strategy, margin optimization, cash flow management, and the financial planning required to scale service-based businesses. Within the Altus community, he helps members think critically about the financial foundations of their companies — ensuring they build businesses that are not just growing, but growing profitably and sustainably.",
  },
  {
    name: "Chase Carlson",
    slug: "chase-carlson",
    title: "Chief Executive Officer & President",
    bio: "Chase combines operational excellence with visionary leadership. As CEO & President, he works to build meaningful connections and deliver practical value to BSC operators across every Altus Level.",
    fullBio:
      "Chase Carlson serves as Chief Executive Officer & President of the ISSA | Altus Collective. He combines operational excellence with visionary leadership, working to build meaningful connections and deliver practical value to BSC operators across every Altus Level.\n\nChase is passionate about creating experiences that bring BSC leaders together in ways that are both productive and transformative. Whether through monthly Academy sessions, the annual Summit in Chicago, or the day-to-day community platform, Chase ensures that Altus remains a space where operators can speak openly, challenge one another, and grow together.",
  },
  {
    name: "Ricky Regalado",
    slug: "ricky-regalado",
    title: "Chief Executive Officer & Founder",
    bio: "Ricky is the driving force behind the Altus Collective. As CEO & Founder, he created the community to give BSC leaders a trusted space to learn, grow, and elevate the profession — built by BSCs, for BSCs.",
    fullBio:
      "Ricky Regalado is the Chief Executive Officer & Founder of the ISSA | Altus Collective. He created Altus out of a conviction that BSC leaders deserve a community as ambitious and purposeful as the businesses they run — a space built by BSCs, for BSCs.\n\nRicky's vision for Altus was shaped by his own experience as a BSC operator and his belief that the industry's best ideas come from the operators themselves. By partnering with ISSA, he amplified the reach and influence of the Altus Collective, giving Building Service Contractors a powerful platform to learn from one another, shape industry standards, and elevate the profession as a whole. The name Altus — Latin for \"to rise\" — reflects Ricky's founding mission.",
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
      <section className="bg-altus-charcoal py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/principals"
            className="inline-flex items-center gap-1 text-sm text-white/60 hover:text-altus-blue transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Principals
          </Link>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <Avatar name={principal.name} size="lg" className="h-20 w-20 text-2xl" />
            <div>
              <h1 className="text-3xl font-bold uppercase tracking-wide text-white sm:text-4xl">
                {principal.name}
              </h1>
              <p className="mt-1 text-lg text-altus-blue">{principal.title}</p>
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
            <h3 className="text-lg font-semibold uppercase tracking-wide text-altus-charcoal">
              Role
            </h3>
            <p className="mt-1 text-sm text-altus-slate">{principal.title}</p>
            <div className="mt-6">
              <Link href="/register">
                <Button variant="gold">
                  Join Altus Collective
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
