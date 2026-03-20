"use client";

import { Menu } from "lucide-react";
import { useSession } from "next-auth/react";
import { Avatar } from "@/components/ui/avatar";

interface PortalTopbarProps {
  onMenuClick: () => void;
}

export function PortalTopbar({ onMenuClick }: PortalTopbarProps) {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-altus-border bg-white/95 backdrop-blur px-4 lg:px-6">
      <button
        onClick={onMenuClick}
        className="p-2 text-altus-slate hover:text-altus-charcoal lg:hidden"
        aria-label="Open menu"
      >
        <Menu size={22} />
      </button>

      <div className="hidden lg:block">
        <h2 className="text-sm font-medium text-altus-slate">
          Welcome back,{" "}
          <span className="text-altus-charcoal">
            {session?.user?.name || "Member"}
          </span>
        </h2>
      </div>

      <div className="flex items-center gap-3">
        <Avatar
          name={session?.user?.name || "User"}
          src={session?.user?.image}
          size="sm"
        />
      </div>
    </header>
  );
}
