import Link from "next/link";

export function MarketingFooter() {
  return (
    <footer className="border-t border-altus-border bg-altus-charcoal">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3">
              <span className="text-xl font-bold tracking-widest text-white uppercase">
                <span className="font-light">/</span>ALTUS
              </span>
              <span className="text-[10px] tracking-[0.2em] text-white/50 uppercase">
                Collective
              </span>
            </Link>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60">
              A community for Building Service Contractors, built by BSCs, for
              BSCs. Transforming expertise into shared understanding, and
              understanding into better decisions — at scale.
            </p>
            <p className="mt-3 text-xs text-white/40">
              An ISSA initiative
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold tracking-wide text-white uppercase">
              Programs
            </h4>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="/how-it-works"
                  className="text-sm text-white/60 hover:text-altus-blue transition-colors"
                >
                  Altus Academy
                </Link>
              </li>
              <li>
                <Link
                  href="/how-it-works#summit"
                  className="text-sm text-white/60 hover:text-altus-blue transition-colors"
                >
                  Altus Summit
                </Link>
              </li>
              <li>
                <Link
                  href="/principals"
                  className="text-sm text-white/60 hover:text-altus-blue transition-colors"
                >
                  Principals
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold tracking-wide text-white uppercase">
              Connect
            </h4>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-white/60 hover:text-altus-blue transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-sm text-white/60 hover:text-altus-blue transition-colors"
                >
                  Member Login
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="text-sm text-white/60 hover:text-altus-blue transition-colors"
                >
                  Join Altus
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} ISSA | Altus Collective. All
            rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold tracking-widest text-white/30 uppercase">
              ISSA
            </span>
            <span className="text-white/20">|</span>
            <span className="text-xs tracking-widest text-white/30 uppercase">
              ALTUS
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
