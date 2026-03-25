export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Building2,
  Globe,
  Mail,
  MapPin,
  User,
  ArrowLeft,
  Calendar,
  DollarSign,
  TrendingUp,
  Shield,
} from "lucide-react";
import Link from "next/link";

export default async function AccountDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const account = await prisma.memberAccount.findUnique({
    where: { id },
    include: { contacts: { orderBy: { contactOrder: "asc" } } },
  });

  if (!account) return notFound();

  const riskColors: Record<string, string> = {
    Low: "bg-green-50 text-green-700 border-green-200",
    Medium: "bg-yellow-50 text-yellow-700 border-yellow-200",
    High: "bg-red-50 text-red-700 border-red-200",
  };

  const icpColors: Record<string, string> = {
    "High Value": "bg-altus-gold/10 text-altus-gold-dark border-altus-gold/30",
    Growth: "bg-blue-50 text-blue-700 border-blue-200",
    Standard: "bg-gray-50 text-gray-600 border-gray-200",
    "At-Risk": "bg-red-50 text-red-700 border-red-200",
  };

  return (
    <div className="space-y-6">
      <Link
        href="/accounts"
        className="inline-flex items-center gap-1 text-sm text-altus-slate hover:text-altus-charcoal"
      >
        <ArrowLeft size={16} />
        Back to Accounts
      </Link>

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-altus-charcoal">
            {account.accountName}
          </h1>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-altus-slate">
            <span className="flex items-center gap-1">
              <MapPin size={14} />
              {account.city}, {account.state}
            </span>
            {account.website && (
              <a
                href={account.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-altus-gold hover:text-altus-gold-dark"
              >
                <Globe size={14} />
                Website
              </a>
            )}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {account.icpTier && (
            <span
              className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${
                icpColors[account.icpTier] || "bg-gray-50 text-gray-600"
              }`}
            >
              {account.icpTier}
            </span>
          )}
          {account.riskLevel && (
            <span
              className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${
                riskColors[account.riskLevel] || "bg-gray-50 text-gray-600"
              }`}
            >
              Risk: {account.riskLevel}
            </span>
          )}
          {account.bscCouncil && (
            <span className="inline-flex items-center rounded-full border border-altus-border bg-altus-charcoal/5 px-3 py-1 text-xs font-medium text-altus-charcoal">
              BSC Council
            </span>
          )}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <DollarSign className="h-5 w-5 text-altus-gold" />
            <div>
              <p className="text-xs text-altus-slate">Sales Volume</p>
              <p className="font-semibold text-altus-charcoal">
                {account.salesVolume || "-"}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <TrendingUp className="h-5 w-5 text-altus-gold" />
            <div>
              <p className="text-xs text-altus-slate">Engagement Score</p>
              <p className="font-semibold text-altus-charcoal">
                {account.engagementScore}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <Calendar className="h-5 w-5 text-altus-gold" />
            <div>
              <p className="text-xs text-altus-slate">Renewal Date</p>
              <p className="font-semibold text-altus-charcoal">
                {account.renewalDate
                  ? new Date(account.renewalDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "-"}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <DollarSign className="h-5 w-5 text-altus-gold" />
            <div>
              <p className="text-xs text-altus-slate">Balance Due</p>
              <p className="font-semibold text-altus-charcoal">
                {account.balanceDue || "Paid"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Account Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 size={18} />
              Account Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-altus-slate">Account Owner</dt>
                <dd className="font-medium text-altus-charcoal">
                  {account.accountOwner}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-altus-slate">Industry</dt>
                <dd className="font-medium text-altus-charcoal">
                  {account.industryVertical}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-altus-slate">Company Size</dt>
                <dd className="font-medium text-altus-charcoal">
                  {account.companySizeTier}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-altus-slate">Buying Signals</dt>
                <dd className="font-medium text-altus-charcoal">
                  {account.buyingSignals || "-"}
                </dd>
              </div>
              {account.bscMemberName && (
                <div className="flex justify-between">
                  <dt className="text-altus-slate">BSC Member</dt>
                  <dd className="font-medium text-altus-charcoal">
                    {account.bscMemberName}
                  </dd>
                </div>
              )}
              {account.duplicateGroup && (
                <div className="flex justify-between">
                  <dt className="text-altus-slate">Duplicate Group</dt>
                  <dd className="font-medium text-altus-charcoal">
                    {account.duplicateGroup} ({account.duplicateCount})
                  </dd>
                </div>
              )}
            </dl>
          </CardContent>
        </Card>

        {/* Tracking Flags */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield size={18} />
              Tracking Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-lg bg-altus-light-gray p-3">
                <span className="text-sm text-altus-slate">Renewal Tab</span>
                <span
                  className={`text-sm font-medium ${
                    account.inRenewalTab ? "text-green-600" : "text-altus-slate"
                  }`}
                >
                  {account.inRenewalTab ? "Yes" : "No"}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-altus-light-gray p-3">
                <span className="text-sm text-altus-slate">
                  Balance Due Tab
                </span>
                <span
                  className={`text-sm font-medium ${
                    account.inBalanceDueTab
                      ? "text-red-600"
                      : "text-altus-slate"
                  }`}
                >
                  {account.inBalanceDueTab ? "Yes" : "No"}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-altus-light-gray p-3">
                <span className="text-sm text-altus-slate">
                  Engagement Tab
                </span>
                <span
                  className={`text-sm font-medium ${
                    account.inEngagementTab
                      ? "text-blue-600"
                      : "text-altus-slate"
                  }`}
                >
                  {account.inEngagementTab ? "Yes" : "No"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Primary Contact */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User size={18} />
            Contacts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Primary contact */}
            <div className="rounded-lg border border-altus-border p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-semibold text-altus-charcoal">
                  {account.primaryContact}
                </span>
                <span className="rounded-full bg-altus-gold/10 px-2 py-0.5 text-[10px] font-medium text-altus-gold-dark">
                  Primary
                </span>
              </div>
              {account.email && (
                <a
                  href={`mailto:${account.email}`}
                  className="flex items-center gap-1 text-sm text-altus-gold hover:text-altus-gold-dark"
                >
                  <Mail size={14} />
                  {account.email}
                </a>
              )}
            </div>

            {/* Additional contacts */}
            {account.contacts.map((contact) => (
              <div
                key={contact.id}
                className="rounded-lg border border-altus-border p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-semibold text-altus-charcoal">
                    {contact.name}
                  </span>
                  {contact.title && (
                    <span className="text-xs text-altus-slate">
                      {contact.title}
                    </span>
                  )}
                  {contact.decisionRole && (
                    <span className="rounded-full bg-altus-charcoal/5 px-2 py-0.5 text-[10px] font-medium text-altus-slate">
                      {contact.decisionRole}
                    </span>
                  )}
                </div>
                <div className="space-y-1">
                  {contact.email && (
                    <a
                      href={`mailto:${contact.email}`}
                      className="flex items-center gap-1 text-sm text-altus-gold hover:text-altus-gold-dark"
                    >
                      <Mail size={14} />
                      {contact.email}
                    </a>
                  )}
                  {contact.notes && (
                    <p className="text-xs text-altus-slate">{contact.notes}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
