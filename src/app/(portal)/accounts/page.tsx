export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, AlertTriangle, TrendingUp, DollarSign } from "lucide-react";
import Link from "next/link";

const riskColors: Record<string, string> = {
  Low: "bg-green-50 text-green-700",
  Medium: "bg-yellow-50 text-yellow-700",
  High: "bg-red-50 text-red-700",
};

const icpColors: Record<string, string> = {
  "High Value": "bg-altus-gold/10 text-altus-gold-dark",
  Growth: "bg-blue-50 text-blue-700",
  Standard: "bg-gray-50 text-gray-600",
  "At-Risk": "bg-red-50 text-red-700",
};

export default async function AccountsPage({
  searchParams,
}: {
  searchParams: Promise<{ owner?: string; tier?: string; risk?: string }>;
}) {
  const params = await searchParams;
  const where: Record<string, unknown> = {};
  if (params.owner) where.accountOwner = params.owner;
  if (params.tier) where.icpTier = params.tier;
  if (params.risk) where.riskLevel = params.risk;

  const [accounts, totalCount, atRiskCount, balanceDueCount, highValueCount] =
    await Promise.all([
      prisma.memberAccount.findMany({
        where,
        include: { contacts: true },
        orderBy: { accountName: "asc" },
      }),
      prisma.memberAccount.count(),
      prisma.memberAccount.count({ where: { icpTier: "At-Risk" } }),
      prisma.memberAccount.count({
        where: { balanceDue: { not: null } },
      }),
      prisma.memberAccount.count({ where: { icpTier: "High Value" } }),
    ]);

  const stats = [
    { label: "Total Accounts", value: totalCount, icon: Building2 },
    { label: "At-Risk", value: atRiskCount, icon: AlertTriangle },
    { label: "Balance Due", value: balanceDueCount, icon: DollarSign },
    { label: "High Value", value: highValueCount, icon: TrendingUp },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-altus-charcoal">
          Member Accounts
        </h1>
        <p className="text-sm text-altus-slate">
          ISSA membership account management
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-altus-gold/10">
                <stat.icon className="h-5 w-5 text-altus-gold" />
              </div>
              <div>
                <p className="text-2xl font-bold text-altus-charcoal">
                  {stat.value}
                </p>
                <p className="text-sm text-altus-slate">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <Link
          href="/accounts"
          className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
            !params.tier && !params.risk
              ? "bg-altus-charcoal text-white"
              : "bg-altus-light-gray text-altus-slate hover:bg-altus-border"
          }`}
        >
          All
        </Link>
        {["High Value", "Growth", "Standard", "At-Risk"].map((tier) => (
          <Link
            key={tier}
            href={`/accounts?tier=${encodeURIComponent(tier)}`}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              params.tier === tier
                ? "bg-altus-charcoal text-white"
                : "bg-altus-light-gray text-altus-slate hover:bg-altus-border"
            }`}
          >
            {tier}
          </Link>
        ))}
      </div>

      {/* Accounts Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-altus-border text-left">
                <th className="px-4 py-3 font-medium text-altus-slate">
                  Account
                </th>
                <th className="px-4 py-3 font-medium text-altus-slate">
                  Location
                </th>
                <th className="px-4 py-3 font-medium text-altus-slate">
                  Sales Volume
                </th>
                <th className="px-4 py-3 font-medium text-altus-slate">
                  ICP Tier
                </th>
                <th className="px-4 py-3 font-medium text-altus-slate">
                  Risk
                </th>
                <th className="px-4 py-3 font-medium text-altus-slate">
                  Engagement
                </th>
                <th className="px-4 py-3 font-medium text-altus-slate">
                  Balance Due
                </th>
                <th className="px-4 py-3 font-medium text-altus-slate">
                  Renewal
                </th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((acct) => (
                <tr
                  key={acct.id}
                  className="border-b border-altus-border last:border-0 hover:bg-altus-light-gray transition-colors"
                >
                  <td className="px-4 py-3">
                    <Link
                      href={`/accounts/${acct.id}`}
                      className="font-medium text-altus-charcoal hover:text-altus-gold"
                    >
                      {acct.accountName}
                    </Link>
                    <p className="text-xs text-altus-slate">
                      {acct.primaryContact}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-altus-slate">
                    {acct.city}, {acct.state}
                  </td>
                  <td className="px-4 py-3 text-altus-slate">
                    {acct.salesVolume}
                  </td>
                  <td className="px-4 py-3">
                    {acct.icpTier && (
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          icpColors[acct.icpTier] || "bg-gray-50 text-gray-600"
                        }`}
                      >
                        {acct.icpTier}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {acct.riskLevel && (
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          riskColors[acct.riskLevel] ||
                          "bg-gray-50 text-gray-600"
                        }`}
                      >
                        {acct.riskLevel}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-16 rounded-full bg-altus-light-gray">
                        <div
                          className="h-2 rounded-full bg-altus-gold"
                          style={{
                            width: `${Math.min(
                              (acct.engagementScore / 500) * 100,
                              100
                            )}%`,
                          }}
                        />
                      </div>
                      <span className="text-xs text-altus-slate">
                        {acct.engagementScore}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-altus-slate">
                    {acct.balanceDue || "-"}
                  </td>
                  <td className="px-4 py-3 text-altus-slate">
                    {acct.renewalDate
                      ? new Date(acct.renewalDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {accounts.length === 0 && (
          <div className="p-8 text-center text-sm text-altus-slate">
            No accounts found.
          </div>
        )}
      </Card>
    </div>
  );
}
