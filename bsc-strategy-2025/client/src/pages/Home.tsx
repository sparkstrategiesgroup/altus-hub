/*
 * BSC Industry Strategy 2025 — Home Page
 * Design: Editorial Modernism
 * Colors: Warm white bg, charcoal text, teal accent (#0D9488)
 * Typography: Playfair Display (headings) + DM Sans (body)
 * Layout: Asymmetric, data-forward, generous whitespace
 */

import { useState, useEffect, useRef } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, LineChart, Line, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, AreaChart, Area
} from "recharts";

// ─── Data ────────────────────────────────────────────────────────────────────

const marketSizeData = [
  { year: "2022", value: 340 },
  { year: "2023", value: 378 },
  { year: "2024", value: 416 },
  { year: "2025", value: 451 },
  { year: "2026E", value: 482 },
  { year: "2027E", value: 515 },
  { year: "2028E", value: 550 },
  { year: "2030E", value: 625 },
];

const bscChallengesData = [
  { challenge: "Labor / Staffing", pct: 63, color: "#0D9488" },
  { challenge: "Customer Retention", pct: 58, color: "#0F766E" },
  { challenge: "Rising Costs / Margins", pct: 52, color: "#14B8A6" },
  { challenge: "Digital Transformation", pct: 40, color: "#2DD4BF" },
  { challenge: "Client Expectations", pct: 35, color: "#5EEAD4" },
];

const revenueSourceData = [
  { name: "Ongoing Contracts", value: 53, color: "#0D9488" },
  { name: "Repeat Customers", value: 40, color: "#14B8A6" },
  { name: "New Business", value: 7, color: "#D97706" },
];

const growthPriorityData = [
  { priority: "New Customer Acquisition", pct: 61 },
  { priority: "Revenue Growth", pct: 61 },
  { priority: "Improve Cash Flow", pct: 55 },
  { priority: "Sales & Marketing", pct: 50 },
  { priority: "Digitize Customer Experience", pct: 27 },
];

const techAdoptionData = [
  { tool: "Payroll Software", pct: 56 },
  { tool: "Accounting Software", pct: 54 },
  { tool: "Invoicing Tools", pct: 50 },
  { tool: "End-to-End Platform", pct: 43 },
  { tool: "Robotics / IoT", pct: 28 },
  { tool: "AI Tools", pct: 19 },
];

const serviceVerticalData = [
  { sector: "Office Buildings", pct: 95 },
  { sector: "Government Facilities", pct: 73 },
  { sector: "Healthcare Centers", pct: 64 },
  { sector: "Industrial Buildings", pct: 63 },
  { sector: "Specialty Cleaning", pct: 21 },
];

const bscGrowthStages = [
  { stage: "Stage 1", label: "All the Hats", revenue: "$0–500K", focus: "Getting off the ground" },
  { stage: "Stage 2", label: "All Alone", revenue: "$500K–1M", focus: "Building foundation" },
  { stage: "Stage 3", label: "Help!", revenue: "$1M–2M", focus: "Adding staff & systems" },
  { stage: "Stage 4", label: "Old Smoothie", revenue: "$2M–4M", focus: "Operational maturity" },
  { stage: "Stage 5", label: "Launching Pad", revenue: "$4M–8M", focus: "Scaling operations" },
  { stage: "Stage 6", label: "In Orbit", revenue: "$8M+", focus: "Multi-region leadership" },
];

const strategicPillars = [
  {
    id: "market",
    number: "01",
    title: "Market Dynamics",
    subtitle: "A $450B industry at a crossroads",
    color: "teal",
    icon: "📈",
  },
  {
    id: "workforce",
    number: "02",
    title: "Workforce Strategy",
    subtitle: "Solving the #1 challenge",
    color: "amber",
    icon: "👥",
  },
  {
    id: "technology",
    number: "03",
    title: "Digital Transformation",
    subtitle: "Technology as a competitive moat",
    color: "teal",
    icon: "🤖",
  },
  {
    id: "sustainability",
    number: "04",
    title: "Sustainability & ESG",
    subtitle: "Green as a growth driver",
    color: "green",
    icon: "🌿",
  },
  {
    id: "growth",
    number: "05",
    title: "Growth Strategy",
    subtitle: "Escaping the commodity trap",
    color: "teal",
    icon: "🚀",
  },
];

// ─── Animated Counter ─────────────────────────────────────────────────────────

function AnimatedCounter({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1500;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  );
}

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-lg text-sm">
        <p className="font-semibold text-gray-800 mb-1">{label}</p>
        {payload.map((entry: any, i: number) => (
          <p key={i} style={{ color: entry.color || "#0D9488" }}>
            {entry.name}: <span className="font-bold">{entry.value}{entry.unit || ""}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// ─── Section Wrapper ──────────────────────────────────────────────────────────

function Section({ id, children, className = "" }: { id?: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`py-16 md:py-24 ${className}`}>
      <div className="container max-w-6xl mx-auto px-4 md:px-8">
        {children}
      </div>
    </section>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({ value, label, source, prefix = "", suffix = "" }: {
  value: number; label: string; source: string; prefix?: string; suffix?: string;
}) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="stat-number text-5xl md:text-6xl mb-2">
        <AnimatedCounter target={value} prefix={prefix} suffix={suffix} />
      </div>
      <p className="text-gray-700 font-medium text-base leading-snug mb-2">{label}</p>
      <p className="section-label text-xs text-gray-400">{source}</p>
    </div>
  );
}

// ─── Navigation ───────────────────────────────────────────────────────────────

function Navigation() {
  const [active, setActive] = useState("hero");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
      const sections = ["hero", "market", "workforce", "technology", "sustainability", "growth", "action"];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "market", label: "Market" },
    { id: "workforce", label: "Workforce" },
    { id: "technology", label: "Technology" },
    { id: "sustainability", label: "Sustainability" },
    { id: "growth", label: "Growth" },
    { id: "action", label: "Action Plan" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100" : "bg-transparent"
    }`}>
      <div className="container max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <span className="section-label text-xs font-semibold tracking-widest" style={{ color: "#0D9488" }}>
              BSC
            </span>
            <span className={`text-sm font-medium transition-colors ${scrolled ? "text-gray-800" : "text-white"}`}>
              Industry Strategy 2025
            </span>
          </div>
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  active === item.id
                    ? "text-white"
                    : scrolled
                    ? "text-gray-600 hover:text-gray-900"
                    : "text-white/80 hover:text-white"
                }`}
                style={active === item.id ? { backgroundColor: "#0D9488" } : {}}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* ── HERO ── */}
      <section id="hero" className="relative min-h-screen flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663475723270/kbx7sAKuq9YAyXkpYWPCak/bsc-hero-CYcohSEW6GxkoZrX48dhQY.webp)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-900/50 to-gray-900/20" />
        <div className="relative container max-w-6xl mx-auto px-4 md:px-8 pb-20 pt-32">
          <div className="max-w-3xl">
            <p className="section-label text-sm mb-4" style={{ color: "#2DD4BF" }}>
              BSCAI Industry Strategy Session · 2025
            </p>
            <h1 className="text-white text-5xl md:text-7xl font-bold leading-tight mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Building the<br />
              <span style={{ color: "#2DD4BF" }}>Future BSC</span>
            </h1>
            <p className="text-gray-200 text-xl md:text-2xl leading-relaxed mb-8 max-w-2xl font-light">
              A strategic framework for navigating workforce challenges, digital transformation, and market growth in the janitorial industry.
            </p>
            <div className="flex flex-wrap gap-6 mb-12">
              {[
                { value: "$450B", label: "Global Market Size" },
                { value: "6.9%", label: "CAGR to 2030" },
                { value: "57%", label: "BSCs Project Revenue Growth" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>{stat.value}</div>
                  <div className="text-gray-300 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              {strategicPillars.map((p) => (
                <a
                  key={p.id}
                  href={`#${p.id}`}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all border border-white/20 text-white/80 hover:text-white hover:border-white/50 hover:bg-white/10"
                >
                  <span>{p.icon}</span>
                  <span>{p.title}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50">
          <span className="text-xs tracking-widest uppercase font-medium">Scroll to explore</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/50 to-transparent animate-pulse" />
        </div>
      </section>

      {/* ── SESSION OVERVIEW ── */}
      <Section className="bg-gray-50 border-y border-gray-100">
        <div className="text-center mb-12">
          <p className="section-label mb-3">45-Minute Strategy Session</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What We'll Cover Today</h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Five strategic pillars that define competitive advantage for Building Service Contractors in 2025 and beyond.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {strategicPillars.map((pillar) => (
            <a
              key={pillar.id}
              href={`#${pillar.id}`}
              className="group bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all text-left"
            >
              <div className="text-3xl mb-3">{pillar.icon}</div>
              <div className="section-label text-xs mb-2">{pillar.number}</div>
              <h3 className="font-bold text-gray-900 text-base mb-1 group-hover:text-teal-700 transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
                {pillar.title}
              </h3>
              <p className="text-gray-500 text-sm">{pillar.subtitle}</p>
            </a>
          ))}
        </div>
      </Section>

      {/* ── SECTION 01: MARKET DYNAMICS ── */}
      <Section id="market">
        <div className="flex items-start gap-4 mb-12">
          <span className="section-label text-5xl font-bold opacity-10 leading-none" style={{ fontFamily: "'Playfair Display', serif", color: "#0D9488" }}>01</span>
          <div>
            <p className="section-label mb-2">Market Dynamics</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              A $450 Billion Industry<br />
              <span style={{ color: "#0D9488" }}>at a Crossroads</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">
          <div>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              The global cleaning services market reached approximately <strong>$415–$451 billion</strong> in 2024–2025, 
              with projections indicating a compound annual growth rate of <strong>6.4–6.9%</strong> through 2030. 
              North America holds the largest revenue share at <strong>36.4%</strong> of the global contract cleaning market.
            </p>
            <div className="strategy-box mb-6">
              <p className="section-label text-xs mb-2">Industry Sentiment</p>
              <p className="text-gray-700 text-base leading-relaxed">
                <strong>57% of BSCs</strong> project increased revenue in 2025. More than one-third (34%) 
                think 2025 sales will end up <em>significantly higher</em> than 2024, with nearly half (48%) 
                expecting at least slight growth.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <StatCard value={416} prefix="$" suffix="B" label="Global market size (2024)" source="Grand View Research" />
              <StatCard value={6.9} suffix="%" label="CAGR projected to 2030" source="Grand View Research" />
              <StatCard value={57} suffix="%" label="BSCs projecting revenue growth" source="Aspire 2025 Report" />
              <StatCard value={93} suffix="%" label="Revenue from existing clients" source="Aspire 2025 Report" />
            </div>
          </div>
          <div>
            <p className="section-label mb-4">Global Market Size (USD Billions)</p>
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={marketSizeData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="tealGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0D9488" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#0D9488" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="year" tick={{ fontSize: 12, fill: "#6b7280" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} axisLine={false} tickLine={false} unit="B" domain={[280, 680]} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="value" stroke="#0D9488" strokeWidth={2.5} fill="url(#tealGrad)" name="Market Size" unit="B USD" dot={{ fill: "#0D9488", r: 4 }} activeDot={{ r: 6 }} />
              </AreaChart>
            </ResponsiveContainer>
            <p className="text-xs text-gray-400 mt-2 text-center">E = Estimated projection. Sources: Grand View Research, Fortune Business Insights</p>
          </div>
        </div>

        {/* Revenue Sources */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-gray-50 rounded-2xl p-8">
          <div>
            <p className="section-label mb-3">Revenue Composition</p>
            <h3 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Existing Relationships Drive 93% of Revenue
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              The BSC revenue model is built on continuity. Ongoing contracts generate 53% of total revenue, 
              while repeat customers contribute another 40%. This means <strong>losing even a few key accounts 
              can dramatically impact financial stability</strong> — making customer retention a strategic imperative.
            </p>
            <div className="strategy-box">
              <p className="section-label text-xs mb-1">Strategic Implication</p>
              <p className="text-gray-700 text-sm">
                Strengthening existing client relationships delivers better ROI than constantly chasing new business. 
                Invest in digital tools that enhance communication, transparency, and service reporting.
              </p>
            </div>
          </div>
          <div>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={revenueSourceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {revenueSourceData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, ""]} />
                <Legend
                  formatter={(value) => <span style={{ color: "#374151", fontSize: "13px" }}>{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Section>

      {/* ── SECTION 02: WORKFORCE ── */}
      <Section id="workforce" className="bg-gray-950 text-white">
        <div className="flex items-start gap-4 mb-12">
          <span className="section-label text-5xl font-bold opacity-10 leading-none" style={{ fontFamily: "'Playfair Display', serif", color: "#D97706" }}>02</span>
          <div>
            <p className="section-label mb-2" style={{ color: "#FCD34D" }}>Workforce Strategy</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              The #1 Strategic<br />
              <span style={{ color: "#FCD34D" }}>Challenge: People</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { value: 63, suffix: "%", label: "of BSCs cite staffing as their #1 risk factor", color: "#FCD34D" },
            { value: 200, suffix: "%+", label: "annual turnover rate in janitorial sector", color: "#F87171" },
            { value: 1, prefix: "$", suffix: "B", label: "annual industry loss from turnover & vacancies", color: "#FCD34D" },
          ].map((stat) => (
            <div key={stat.label} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="text-5xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif", color: stat.color }}>
                <AnimatedCounter target={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </div>
              <p className="text-gray-300 text-sm leading-snug">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-12">
          <div>
            <p className="section-label mb-4" style={{ color: "#5EEAD4" }}>Top BSC Challenges (% of Respondents)</p>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={bscChallengesData} layout="vertical" margin={{ left: 0, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} unit="%" domain={[0, 80]} />
                <YAxis dataKey="challenge" type="category" tick={{ fontSize: 12, fill: "#d1d5db" }} axisLine={false} tickLine={false} width={160} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="pct" name="Respondents" unit="%" radius={[0, 4, 4, 0]}>
                  {bscChallengesData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div>
            <div className="flex items-start gap-4 mb-6">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663475723270/kbx7sAKuq9YAyXkpYWPCak/bsc-workforce-aDVLWzShUHWD2izctdeYRB.webp"
                alt="BSC workforce professional"
                className="w-full rounded-xl object-cover"
                style={{ maxHeight: "220px" }}
              />
            </div>
            <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
              <p className="section-label text-xs mb-2" style={{ color: "#5EEAD4" }}>Root Causes</p>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-start gap-2"><span style={{ color: "#FCD34D" }}>→</span> Workers migrating to warehousing & logistics for perceived stability</li>
                <li className="flex items-start gap-2"><span style={{ color: "#FCD34D" }}>→</span> Labor costs up ~8% sector-wide; margins remain razor-thin (12–16%)</li>
                <li className="flex items-start gap-2"><span style={{ color: "#FCD34D" }}>→</span> Legislative changes reducing production rates per worker</li>
                <li className="flex items-start gap-2"><span style={{ color: "#FCD34D" }}>→</span> Immigration policy changes reducing available workforce pool</li>
                <li className="flex items-start gap-2"><span style={{ color: "#FCD34D" }}>→</span> Industry perceived as "dead-end" — limited career advancement visibility</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Workforce Solutions */}
        <div>
          <p className="section-label mb-6" style={{ color: "#5EEAD4" }}>Strategic Solutions Framework</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: "Demand-Based Deployment",
                icon: "🎯",
                desc: "Replace static schedules with occupant-triggered alerts. QR codes in high-traffic areas let users flag issues, directing staff only where needed. Reduces 'ghost cleaning' by up to 40%.",
                impact: "40% reduction in wasted labor time",
              },
              {
                title: "Total Compensation Strategy",
                icon: "💰",
                desc: "Competitive wages (46% offer $10–12/hr), performance bonuses, referral programs, and flexible full-time scheduling. Address the perception of cleaning as a dead-end career through visible advancement paths.",
                impact: "Improved retention & recruitment",
              },
              {
                title: "Expanded Talent Pools",
                icon: "🌐",
                desc: "Second-chance hiring programs, semi-retired workers for part-time roles, vocational school partnerships, and proactive visa program utilization to diversify and stabilize the workforce pipeline.",
                impact: "Broader, more resilient workforce",
              },
            ].map((solution) => (
              <div key={solution.title} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-teal-600 transition-colors">
                <div className="text-3xl mb-3">{solution.icon}</div>
                <h4 className="font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{solution.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{solution.desc}</p>
                <div className="bg-teal-900/40 rounded-lg px-3 py-2 border border-teal-700/40">
                  <p className="text-teal-300 text-xs font-medium">{solution.impact}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── SECTION 03: TECHNOLOGY ── */}
      <Section id="technology">
        <div className="flex items-start gap-4 mb-12">
          <span className="section-label text-5xl font-bold opacity-10 leading-none" style={{ fontFamily: "'Playfair Display', serif", color: "#0D9488" }}>03</span>
          <div>
            <p className="section-label mb-2">Digital Transformation</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Technology as a<br />
              <span style={{ color: "#0D9488" }}>Competitive Moat</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">
          <div>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              The commercial cleaning industry stands at a digital crossroads. While <strong>43% of companies</strong> have 
              embraced end-to-end software solutions, a narrow majority still operate with fragmented systems — 
              45% manage operations across <strong>5–7 disconnected applications</strong>, creating costly information silos.
            </p>
            <div className="pull-quote mb-6 text-lg">
              "Companies will need more sophisticated technology tools and employees capable of using them."
              <footer className="text-sm text-gray-500 mt-2 not-italic font-normal" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                — Greg Buchner, President, CleanOffice
              </footer>
            </div>
            <div className="strategy-box">
              <p className="section-label text-xs mb-1">Key Barrier to Adoption</p>
              <p className="text-gray-700 text-sm">
                <strong>56% cite time</strong> (not cost) as the primary barrier to software adoption. 
                Onboarding complexity and learning curves are the real obstacles — not budget.
              </p>
            </div>
          </div>
          <div>
            <p className="section-label mb-4">Current Technology Adoption Rates</p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={techAdoptionData} margin={{ left: 0, right: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis dataKey="tool" tick={{ fontSize: 10, fill: "#6b7280" }} axisLine={false} tickLine={false} angle={-25} textAnchor="end" height={60} />
                <YAxis tick={{ fontSize: 11, fill: "#6b7280" }} axisLine={false} tickLine={false} unit="%" domain={[0, 70]} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="pct" name="Adoption Rate" unit="%" fill="#0D9488" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Three Technology Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            {
              title: "Proof of Service",
              icon: "📋",
              color: "#0D9488",
              points: [
                "Time-stamped digital reports",
                "QR code verification at service points",
                "GPS-based crew tracking",
                "Real-time client dashboards",
                "Photo documentation of completed tasks",
              ],
              quote: "Clients increasingly expect real-time visibility into cleaning operations.",
              author: "Kristina Thayer, MSNW Group",
            },
            {
              title: "Robotics & Automation",
              icon: "🤖",
              color: "#14B8A6",
              points: [
                "Autonomous floor scrubbers & vacuums",
                "AI-powered scheduling systems",
                "Sensor-based traffic routing",
                "Robotic window cleaning drones",
                "Staff upskilling to 'robotic technicians'",
              ],
              quote: "Robotics will significantly help with labor shortages, but we'll need to train staff as robotic technicians.",
              author: "Peter Cain, Marsden Services",
            },
            {
              title: "Data Analytics",
              icon: "📊",
              color: "#0F766E",
              points: [
                "Hourly-updated management dashboards",
                "IoT sensor data for predictive cleaning",
                "Traffic-pattern-based service customization",
                "Performance tracking & KPI reporting",
                "Business intelligence platforms",
              ],
              quote: "Data allows for tailored cleaning programs based on traffic patterns and specific facility needs.",
              author: "Kristy Elmore, Harvard Maintenance",
            },
          ].map((pillar) => (
            <div key={pillar.title} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{pillar.icon}</span>
                <h4 className="font-bold text-gray-900 text-lg" style={{ fontFamily: "'Playfair Display', serif", color: pillar.color }}>{pillar.title}</h4>
              </div>
              <ul className="space-y-2 mb-4">
                {pillar.points.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm text-gray-600">
                    <span style={{ color: pillar.color }} className="mt-0.5 flex-shrink-0">✓</span>
                    {point}
                  </li>
                ))}
              </ul>
              <div className="bg-gray-50 rounded-lg p-3 border-l-2" style={{ borderColor: pillar.color }}>
                <p className="text-gray-600 text-xs italic">"{pillar.quote}"</p>
                <p className="text-gray-400 text-xs mt-1">— {pillar.author}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Technology image */}
        <div className="rounded-2xl overflow-hidden relative">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663475723270/kbx7sAKuq9YAyXkpYWPCak/bsc-technology-k4XVyQb4eboJVvYxovwmxH.webp"
            alt="Cleaning robot with human technician"
            className="w-full object-cover"
            style={{ maxHeight: "380px" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 to-transparent flex items-center">
            <div className="p-8 md:p-12 max-w-lg">
              <p className="section-label mb-3" style={{ color: "#2DD4BF" }}>The Shift</p>
              <h3 className="text-white text-3xl font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                From Cleaners to Robotic Technicians
              </h3>
              <p className="text-gray-200 text-base leading-relaxed">
                The BSC of 2030 will employ a hybrid workforce — human specialists who manage, program, 
                and maintain autonomous cleaning systems. Early adopters will gain a decisive competitive advantage.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ── SECTION 04: SUSTAINABILITY ── */}
      <Section id="sustainability" className="bg-gray-50">
        <div className="flex items-start gap-4 mb-12">
          <span className="section-label text-5xl font-bold opacity-10 leading-none" style={{ fontFamily: "'Playfair Display', serif", color: "#059669" }}>04</span>
          <div>
            <p className="section-label mb-2" style={{ color: "#059669" }}>Sustainability & ESG</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Green Cleaning as a<br />
              <span style={{ color: "#059669" }}>Growth Driver</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-12">
          <div>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Environmental consciousness has moved from a compliance checkbox to a core competitive advantage. 
              With growing restrictions on PFAS ("forever chemicals") and increasing corporate ESG mandates, 
              <strong> green cleaning programs are becoming a prerequisite</strong> for winning and retaining major contracts.
            </p>
            <div className="space-y-4">
              {[
                {
                  icon: "🏆",
                  title: "LEED Certification Support",
                  desc: "Green cleaning programs contribute valuable points toward LEED certification for client buildings, making BSCs strategic partners in sustainability goals.",
                  color: "#059669",
                },
                {
                  icon: "🧪",
                  title: "Chemical Safety & PFAS Compliance",
                  desc: "Biodegradable, PFAS-free cleaning products reduce liability, improve indoor air quality, and protect staff health — increasingly required by corporate procurement.",
                  color: "#0D9488",
                },
                {
                  icon: "📊",
                  title: "ESG Reporting Capability",
                  desc: "Clients are requesting sustainability reporting from service providers. BSCs who can provide carbon footprint data and green metrics gain a significant contract advantage.",
                  color: "#059669",
                },
                {
                  icon: "⚡",
                  title: "Energy-Efficient Operations",
                  desc: "IoT-powered demand-based cleaning reduces energy consumption and chemical usage, lowering costs while improving environmental credentials.",
                  color: "#0D9488",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                  <span className="text-2xl flex-shrink-0">{item.icon}</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1" style={{ color: item.color }}>{item.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm mb-6">
              <p className="section-label mb-4" style={{ color: "#059669" }}>Green Cleaning Business Case</p>
              <div className="space-y-4">
                {[
                  { label: "Client Demand for Green Credentials", value: 78, color: "#059669" },
                  { label: "Cost Reduction via Concentrated Products", value: 65, color: "#0D9488" },
                  { label: "Staff Health & Safety Improvement", value: 72, color: "#059669" },
                  { label: "Contract Win Rate with ESG Offering", value: 58, color: "#0D9488" },
                  { label: "Premium Pricing Opportunity", value: 45, color: "#059669" },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">{item.label}</span>
                      <span className="font-semibold" style={{ color: item.color }}>{item.value}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{ width: `${item.value}%`, backgroundColor: item.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-4">*Indicative industry data based on multiple research sources</p>
            </div>
            <div className="bg-green-50 rounded-xl p-6 border border-green-100">
              <p className="section-label text-xs mb-2" style={{ color: "#059669" }}>Strategic Implication</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                BSCs who invest in green certifications (Green Seal GS-42, LEED-aligned protocols) and can 
                provide ESG reporting to clients will command <strong>premium pricing</strong> and build 
                stickier, longer-term contracts with corporate and government clients.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ── SECTION 05: GROWTH STRATEGY ── */}
      <Section id="growth">
        <div className="flex items-start gap-4 mb-12">
          <span className="section-label text-5xl font-bold opacity-10 leading-none" style={{ fontFamily: "'Playfair Display', serif", color: "#0D9488" }}>05</span>
          <div>
            <p className="section-label mb-2">Growth Strategy</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Escaping the<br />
              <span style={{ color: "#0D9488" }}>Commodity Trap</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">
          <div>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              The path to sustainable profitability requires moving beyond competing on price alone. 
              BSCs achieving <strong>18–22% margins</strong> are not louder — they are more differentiated. 
              Strategic specialization, value-added services, and technology-enabled transparency are the 
              primary levers for escaping the commodity trap.
            </p>
            <p className="section-label mb-4">Top Growth Priorities for 2025</p>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={growthPriorityData} layout="vertical" margin={{ left: 0, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: "#6b7280" }} axisLine={false} tickLine={false} unit="%" domain={[0, 80]} />
                <YAxis dataKey="priority" type="category" tick={{ fontSize: 11, fill: "#374151" }} axisLine={false} tickLine={false} width={185} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="pct" name="BSCs Prioritizing" unit="%" fill="#0D9488" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div>
            <p className="section-label mb-4">Service Vertical Penetration</p>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={serviceVerticalData} layout="vertical" margin={{ left: 0, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: "#6b7280" }} axisLine={false} tickLine={false} unit="%" domain={[0, 100]} />
                <YAxis dataKey="sector" type="category" tick={{ fontSize: 11, fill: "#374151" }} axisLine={false} tickLine={false} width={150} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="pct" name="BSCs Serving" unit="%" fill="#14B8A6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="strategy-box mt-4">
              <p className="section-label text-xs mb-1">Opportunity</p>
              <p className="text-gray-700 text-sm">
                Healthcare (64%) and government (73%) verticals offer higher margins and longer contract terms. 
                Specialization in these sectors requires certifications but delivers superior pricing power.
              </p>
            </div>
          </div>
        </div>

        {/* BSC Growth Stages */}
        <div className="bg-gray-950 rounded-2xl p-8 md:p-12">
          <p className="section-label mb-3" style={{ color: "#5EEAD4" }}>BSCAI Framework</p>
          <h3 className="text-white text-3xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            The Six Plateaus of Growth
          </h3>
          <p className="text-gray-400 mb-8 max-w-2xl">
            Every BSC follows a predictable growth journey. Understanding which plateau you're on — and what 
            it takes to break through to the next — is the foundation of strategic planning.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {bscGrowthStages.map((stage, i) => (
              <div
                key={stage.stage}
                className="bg-gray-800 rounded-xl p-4 border border-gray-700 hover:border-teal-600 transition-colors"
                style={{ borderTopColor: i < 3 ? "#0D9488" : "#14B8A6", borderTopWidth: "3px" }}
              >
                <div className="section-label text-xs mb-1" style={{ color: "#5EEAD4" }}>{stage.stage}</div>
                <div className="font-bold text-white text-sm mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>{stage.label}</div>
                <div className="text-teal-400 text-xs font-medium mb-2">{stage.revenue}</div>
                <div className="text-gray-400 text-xs leading-snug">{stage.focus}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── PORTER'S FIVE FORCES ── */}
      <Section className="bg-gray-50">
        <div className="text-center mb-12">
          <p className="section-label mb-3">Competitive Analysis</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Porter's Five Forces: BSC Industry</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Understanding the competitive forces at work in the janitorial industry helps BSCs identify where to build defensible advantages.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {[
            {
              force: "Industry Rivalry",
              level: "HIGH",
              levelColor: "#DC2626",
              desc: "Thousands of independent operators compete on price. Low differentiation in basic janitorial services creates intense price competition and thin margins.",
              strategy: "Differentiate through technology, specialization, and service quality — not price.",
            },
            {
              force: "Buyer Power",
              level: "HIGH",
              levelColor: "#DC2626",
              desc: "Large corporate and government clients have significant leverage. Switching costs are low for commodity cleaning services, enabling aggressive price negotiation.",
              strategy: "Build switching costs through integrated technology, data reporting, and specialized expertise.",
            },
            {
              force: "Supplier Power",
              level: "MEDIUM",
              levelColor: "#D97706",
              desc: "Chemical and equipment suppliers have moderate power. Supply chain disruptions (post-COVID) and tariffs have increased input costs by 5–10%+.",
              strategy: "Diversify supplier relationships and explore bulk purchasing cooperatives through BSCAI.",
            },
            {
              force: "Threat of New Entrants",
              level: "HIGH",
              levelColor: "#DC2626",
              desc: "Low capital requirements make entry easy. However, scaling requires operational systems, workforce management, and client relationships that take years to build.",
              strategy: "Invest in systems and certifications that create barriers to replication.",
            },
            {
              force: "Threat of Substitutes",
              level: "LOW",
              levelColor: "#059669",
              desc: "In-house cleaning teams are the primary substitute, but outsourcing trend is accelerating. The 2025 consensus is clear: outsourcing is more cost-effective.",
              strategy: "Educate prospects on the true cost of in-house cleaning vs. professional BSC services.",
            },
            {
              force: "Strategic Opportunity",
              level: "KEY",
              levelColor: "#0D9488",
              desc: "BSCs who combine technology-enabled transparency, green credentials, and workforce stability will build defensible competitive positions in high-value verticals.",
              strategy: "Focus on healthcare, government, and Class A office buildings where quality and compliance matter more than price.",
            },
          ].map((item) => (
            <div key={item.force} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-gray-900 text-base" style={{ fontFamily: "'Playfair Display', serif" }}>{item.force}</h4>
                <span className="text-xs font-bold px-2 py-1 rounded-full text-white" style={{ backgroundColor: item.levelColor }}>
                  {item.level}
                </span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed mb-3">{item.desc}</p>
              <div className="bg-teal-50 rounded-lg p-3 border-l-2 border-teal-400">
                <p className="text-teal-800 text-xs font-medium">Strategy: {item.strategy}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── ACTION PLAN ── */}
      <Section id="action" className="bg-gray-950 text-white">
        <div className="text-center mb-12">
          <p className="section-label mb-3" style={{ color: "#5EEAD4" }}>Strategic Action Plan</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            90-Day Strategic Priorities
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Immediate, medium-term, and long-term actions to position your BSC for competitive advantage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            {
              timeframe: "Now — 30 Days",
              color: "#F59E0B",
              borderColor: "#D97706",
              actions: [
                "Audit current turnover rate and calculate true cost of workforce instability",
                "Assess technology stack — identify which of 5–7 disconnected apps can be consolidated",
                "Review top 10 client accounts for retention risk signals",
                "Benchmark your pricing against market rates in each vertical",
                "Identify one green cleaning certification to pursue (Green Seal GS-42)",
              ],
            },
            {
              timeframe: "30–60 Days",
              color: "#0D9488",
              borderColor: "#0F766E",
              actions: [
                "Implement proof-of-service technology for at least 3 key accounts",
                "Launch demand-based cleaning pilot at one high-traffic facility",
                "Develop a workforce retention program with clear career advancement paths",
                "Evaluate robotic cleaning equipment ROI for your highest-volume accounts",
                "Begin ESG reporting capability development for corporate clients",
              ],
            },
            {
              timeframe: "60–90 Days",
              color: "#10B981",
              borderColor: "#059669",
              actions: [
                "Deploy end-to-end business management software across operations",
                "Formalize specialization strategy for 1–2 high-value verticals",
                "Launch alternative hiring programs (vocational schools, second-chance)",
                "Present ESG and sustainability reporting to top 5 clients",
                "Develop M&A strategy: identify acquisition targets or partnership opportunities",
              ],
            },
          ].map((phase) => (
            <div key={phase.timeframe} className="bg-gray-800 rounded-xl p-6 border border-gray-700" style={{ borderTopColor: phase.borderColor, borderTopWidth: "3px" }}>
              <p className="font-bold mb-4 text-lg" style={{ color: phase.color, fontFamily: "'Playfair Display', serif" }}>
                {phase.timeframe}
              </p>
              <ul className="space-y-3">
                {phase.actions.map((action, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mt-0.5" style={{ backgroundColor: phase.color + "30", color: phase.color }}>
                      {i + 1}
                    </span>
                    {action}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Key Takeaways */}
        <div className="bg-gradient-to-br from-teal-900/40 to-gray-800 rounded-2xl p-8 md:p-12 border border-teal-700/30">
          <p className="section-label mb-4" style={{ color: "#5EEAD4" }}>Key Takeaways</p>
          <h3 className="text-white text-3xl font-bold mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
            The Winning BSC Formula for 2025
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: "👥",
                title: "Workforce is the Foundation",
                desc: "No strategy succeeds without a stable, skilled workforce. Invest in retention, alternative hiring, and demand-based deployment before anything else.",
              },
              {
                icon: "📱",
                title: "Technology Builds Trust",
                desc: "Proof-of-service technology and data analytics are no longer optional. They are the primary tools for building client confidence and securing long-term contracts.",
              },
              {
                icon: "🌿",
                title: "Green is the New Premium",
                desc: "ESG credentials and green cleaning programs unlock premium pricing and preferred vendor status with corporate and government clients.",
              },
              {
                icon: "🎯",
                title: "Specialization Over Scale",
                desc: "The most profitable BSCs focus on 1–2 high-value verticals where quality and compliance matter more than price. Depth beats breadth.",
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-4">
                <span className="text-3xl flex-shrink-0">{item.icon}</span>
                <div>
                  <h4 className="font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{item.title}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── FOOTER ── */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <p className="section-label text-xs mb-3" style={{ color: "#5EEAD4" }}>BSC Industry Strategy 2025</p>
              <p className="text-sm leading-relaxed">
                A comprehensive strategy session for Building Service Contractors, covering market dynamics, 
                workforce challenges, technology adoption, sustainability, and competitive growth strategy.
              </p>
            </div>
            <div>
              <p className="section-label text-xs mb-3" style={{ color: "#5EEAD4" }}>Key Sources</p>
              <ul className="space-y-1 text-sm">
                <li>BSCAI 2025 Market Study Report</li>
                <li>Aspire 2025 Commercial Cleaning Insights</li>
                <li>CMM 2025 BSC Benchmarking Survey</li>
                <li>Interclean Top 10 Trends 2025</li>
                <li>CleanLink Industry Leaders Survey</li>
                <li>Grand View Research Market Analysis</li>
              </ul>
            </div>
            <div>
              <p className="section-label text-xs mb-3" style={{ color: "#5EEAD4" }}>Session Structure</p>
              <ul className="space-y-1 text-sm">
                <li>01 · Market Dynamics (8 min)</li>
                <li>02 · Workforce Strategy (10 min)</li>
                <li>03 · Digital Transformation (8 min)</li>
                <li>04 · Sustainability & ESG (7 min)</li>
                <li>05 · Growth Strategy (7 min)</li>
                <li>Q&A · Open Discussion (5 min)</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs">© 2025 BSC Industry Strategy Session. Research compiled from publicly available industry sources.</p>
            <p className="text-xs" style={{ color: "#5EEAD4" }}>Building Service Contractors Association International (BSCAI)</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
