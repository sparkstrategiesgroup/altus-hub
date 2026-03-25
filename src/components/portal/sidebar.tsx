"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Calendar,
  Users,
  MessageSquare,
  BookOpen,
  CalendarDays,
  Mail,
  User,
  Building2,
  FileSpreadsheet,
  GraduationCap,
  LogOut,
  X,
} from "lucide-react";
import { signOut } from "next-auth/react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/accounts", label: "Accounts", icon: Building2 },
  { href: "/sessions", label: "Sessions", icon: Calendar },
  { href: "/peer-groups", label: "Peer Groups", icon: Users },
  { href: "/discussions", label: "Discussions", icon: MessageSquare },
  { href: "/resources", label: "Resources", icon: BookOpen },
  { href: "/events", label: "Events", icon: CalendarDays },
  { href: "/messages", label: "Messages", icon: Mail },
  { href: "/altus-digital", label: "Altus Digital", icon: FileSpreadsheet },
  { href: "/masterclass", label: "Masterclass", icon: GraduationCap },
  { href: "/profile", label: "Profile", icon: User },
];

interface PortalSidebarProps {
  open: boolean;
  onClose: () => void;
}

export function PortalSidebar({ open, onClose }: PortalSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-altus-border bg-white transition-transform lg:translate-x-0 lg:static lg:z-auto",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-altus-border px-4">
          <Link href="/dashboard" className="flex flex-col items-start gap-0">
            <span className="text-lg font-bold tracking-widest text-altus-charcoal uppercase">
              <span className="font-light">/</span>ALTUS
            </span>
            <span className="text-[9px] tracking-[0.2em] text-altus-slate uppercase -mt-1">
              Collective
            </span>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden p-1 text-altus-slate hover:text-altus-charcoal"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 p-3">
          {navItems.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-altus-blue/10 text-altus-charcoal"
                    : "text-altus-slate hover:bg-altus-light-gray hover:text-altus-charcoal"
                )}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-altus-border p-3">
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-altus-slate transition-colors hover:bg-red-50 hover:text-red-600"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}
