"use client";

import { useState } from "react";
import { SessionProvider } from "next-auth/react";
import { PortalSidebar } from "./sidebar";
import { PortalTopbar } from "./topbar";

export function PortalShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <SessionProvider>
      <div className="flex h-screen bg-altus-cream">
        <PortalSidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <div className="flex flex-1 flex-col overflow-hidden">
          <PortalTopbar onMenuClick={() => setSidebarOpen(true)} />
          <main className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</main>
        </div>
      </div>
    </SessionProvider>
  );
}
