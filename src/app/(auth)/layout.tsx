import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-altus-cream p-4">
      <Link href="/" className="mb-8 flex flex-col items-center gap-1">
        <span className="text-xl font-bold tracking-widest text-altus-charcoal uppercase">
          <span className="font-light">/</span>ALTUS
        </span>
        <span className="text-[10px] tracking-[0.2em] text-altus-slate uppercase">
          Collective
        </span>
      </Link>
      {children}
    </div>
  );
}
