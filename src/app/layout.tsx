import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Altus Forum | BSC Leadership Community",
    template: "%s | Altus Forum",
  },
  description:
    "A leadership community for Building Service Contractor executives. Engage with Intention. Empower with Education. Elevate with Influence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
