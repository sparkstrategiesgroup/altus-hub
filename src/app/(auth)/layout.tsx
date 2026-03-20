import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-altus-cream p-4">
      <Link href="/" className="mb-8 flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-altus-navy">
          <span className="text-sm font-bold text-altus-gold">A</span>
        </div>
        <span className="text-xl font-bold text-altus-navy">
          Altus<span className="text-altus-gold">Forum</span>
        </span>
      </Link>
      {children}
    </div>
  );
}
