import Link from "next/link";

export function MarketingFooter() {
  return (
    <footer className="border-t border-altus-border bg-altus-navy">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
                <span className="text-sm font-bold text-altus-gold">A</span>
              </div>
              <span className="text-xl font-bold text-white">
                Altus<span className="text-altus-gold">Forum</span>
              </span>
            </Link>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60">
              A leadership community for Building Service Contractor executives.
              Engage with Intention. Empower with Education. Elevate with
              Influence.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">Forum</h4>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-white/60 hover:text-altus-gold transition-colors"
                >
                  About Altus
                </Link>
              </li>
              <li>
                <Link
                  href="/how-it-works"
                  className="text-sm text-white/60 hover:text-altus-gold transition-colors"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="/principals"
                  className="text-sm text-white/60 hover:text-altus-gold transition-colors"
                >
                  Principals
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">Connect</h4>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-white/60 hover:text-altus-gold transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-sm text-white/60 hover:text-altus-gold transition-colors"
                >
                  Member Login
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="text-sm text-white/60 hover:text-altus-gold transition-colors"
                >
                  Join Altus
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} Altus Forum. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
