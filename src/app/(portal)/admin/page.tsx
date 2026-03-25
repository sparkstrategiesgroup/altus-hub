"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  AlertCircle,
  CheckCircle,
  Edit2,
  Trash2,
  Plus,
  Loader,
  ChevronRight,
  Mail,
} from "lucide-react";

// Color constants
const CHARCOAL = "#3a3a3a";
const GOLD = "#c4a265";
const BLUE = "#b8d4e3";

// Types
interface NavItem {
  id: string;
  label: string;
  href: string;
  icon?: string;
  position: number;
  visible: boolean;
  adminOnly: boolean;
}

interface PageContent {
  slug: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface EmailCampaign {
  id: string;
  subject: string;
  sentAt: string;
  totalSent: number;
  totalFailed: number;
  status: "sent" | "pending" | "failed";
}

interface SiteConfig {
  siteName: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  footerEmail: string;
  footerWebsite: string;
  logoText: string;
}

type TabType = "nav" | "content" | "campaigns" | "settings";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState<TabType>("nav");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Navigation Editor State
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const [editingNavId, setEditingNavId] = useState<string | null>(null);
  const [navForm, setNavForm] = useState({
    label: "",
    href: "",
    icon: "",
    position: 0,
    visible: true,
    adminOnly: false,
  });

  // Page Content State
  const [selectedPage, setSelectedPage] = useState("");
  const [pages, setPages] = useState<PageContent[]>([]);
  const [pageForm, setPageForm] = useState({
    title: "",
    content: "",
  });

  // Email Campaigns State
  const [campaigns, setCampaigns] = useState<EmailCampaign[]>([]);

  // Site Settings State
  const [siteConfig, setSiteConfig] = useState<SiteConfig>({
    siteName: "Altus Collective",
    primaryColor: CHARCOAL,
    secondaryColor: GOLD,
    accentColor: BLUE,
    footerEmail: "contact@altuscollective.us",
    footerWebsite: "www.altuscollective.us",
    logoText: "ALTUS",
  });
  const [loadingSave, setLoadingSave] = useState(false);

  // Check authorization
  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated" || (session?.user as any)?.role !== "admin") {
      return;
    }

    // Load initial data
    loadNavItems();
    loadPages();
    loadCampaigns();
    loadSiteConfig();
  }, [status, session]);

  const loadNavItems = async () => {
    try {
      const response = await fetch("/api/admin/nav-items");
      if (response.ok) {
        const data = await response.json();
        setNavItems(data);
      }
    } catch (err) {
      showMessage("error", "Failed to load navigation items");
    }
  };

  const loadPages = async () => {
    try {
      const response = await fetch("/api/admin/pages");
      if (response.ok) {
        const data = await response.json();
        setPages(data);
      }
    } catch (err) {
      showMessage("error", "Failed to load pages");
    } finally {
      setLoading(false);
    }
  };

  const loadCampaigns = async () => {
    try {
      const response = await fetch("/api/admin/email-campaigns");
      if (response.ok) {
        const data = await response.json();
        setCampaigns(data);
      }
    } catch (err) {
      showMessage("error", "Failed to load campaigns");
    }
  };

  const loadSiteConfig = async () => {
    try {
      const response = await fetch("/api/admin/site-config");
      if (response.ok) {
        const data = await response.json();
        setSiteConfig(data);
      }
    } catch (err) {
      showMessage("error", "Failed to load site config");
    }
  };

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  };

  // Navigation Editor Handlers
  const handleAddNavItem = () => {
    setEditingNavId(null);
    setNavForm({
      label: "",
      href: "",
      icon: "",
      position: navItems.length,
      visible: true,
      adminOnly: false,
    });
  };

  const handleEditNavItem = (item: NavItem) => {
    setEditingNavId(item.id);
    setNavForm({
      label: item.label,
      href: item.href,
      icon: item.icon || "",
      position: item.position,
      visible: item.visible,
      adminOnly: item.adminOnly,
    });
  };

  const handleSaveNavItem = async () => {
    if (!navForm.label || !navForm.href) {
      showMessage("error", "Label and href are required");
      return;
    }

    setLoadingSave(true);
    try {
      const method = editingNavId ? "PUT" : "POST";
      const url = editingNavId
        ? `/api/admin/nav-items/${editingNavId}`
        : "/api/admin/nav-items";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(navForm),
      });

      if (response.ok) {
        showMessage("success", "Nav item saved successfully");
        await loadNavItems();
        setEditingNavId(null);
        setNavForm({
          label: "",
          href: "",
          icon: "",
          position: 0,
          visible: true,
          adminOnly: false,
        });
      } else {
        showMessage("error", "Failed to save nav item");
      }
    } catch (err) {
      showMessage("error", "Error saving nav item");
    } finally {
      setLoadingSave(false);
    }
  };

  const handleDeleteNavItem = async (id: string) => {
    if (!confirm("Delete this nav item?")) return;

    try {
      const response = await fetch(`/api/admin/nav-items/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        showMessage("success", "Nav item deleted");
        await loadNavItems();
      } else {
        showMessage("error", "Failed to delete nav item");
      }
    } catch (err) {
      showMessage("error", "Error deleting nav item");
    }
  };

  // Page Content Handlers
  const handleSelectPage = (slug: string) => {
    setSelectedPage(slug);
    const page = pages.find((p) => p.slug === slug);
    if (page) {
      setPageForm({
        title: page.title,
        content: page.content,
      });
    } else {
      setPageForm({
        title: "",
        content: "",
      });
    }
  };

  const handleSavePageContent = async () => {
    if (!selectedPage) {
      showMessage("error", "Please select a page");
      return;
    }

    setLoadingSave(true);
    try {
      const response = await fetch("/api/admin/page-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: selectedPage,
          title: pageForm.title,
          content: pageForm.content,
        }),
      });

      if (response.ok) {
        showMessage("success", "Page content saved");
        await loadPages();
      } else {
        showMessage("error", "Failed to save page content");
      }
    } catch (err) {
      showMessage("error", "Error saving page content");
    } finally {
      setLoadingSave(false);
    }
  };

  // Site Settings Handlers
  const handleSaveSiteConfig = async () => {
    setLoadingSave(true);
    try {
      const response = await fetch("/api/admin/site-config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(siteConfig),
      });

      if (response.ok) {
        showMessage("success", "Site settings saved");
      } else {
        showMessage("error", "Failed to save site settings");
      }
    } catch (err) {
      showMessage("error", "Error saving site settings");
    } finally {
      setLoadingSave(false);
    }
  };

  // Authorization check
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader className="h-6 w-6 animate-spin text-altus-gold" />
      </div>
    );
  }

  if (status === "unauthenticated" || (session?.user as any)?.role !== "admin") {
    return (
      <div className="rounded-lg border-2 border-altus-error bg-red-50 p-6 text-center">
        <AlertCircle className="mx-auto h-8 w-8 text-altus-error mb-3" />
        <h2 className="text-lg font-bold text-altus-charcoal mb-2">
          Access Denied
        </h2>
        <p className="text-sm text-altus-slate">
          You do not have permission to access this page. Admin access required.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-altus-charcoal">Admin Dashboard</h1>
        <p className="text-sm text-altus-slate">
          Manage navigation, content, campaigns, and site settings
        </p>
      </div>

      {/* Messages */}
      {message && (
        <div
          className={`flex items-center gap-2 rounded-lg p-3 text-sm ${
            message.type === "success"
              ? "bg-green-50 text-altus-success"
              : "bg-red-50 text-altus-error"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle className="h-4 w-4 flex-shrink-0" />
          ) : (
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-altus-border">
        {[
          { id: "nav", label: "Navigation Editor", icon: null },
          { id: "content", label: "Page Content", icon: null },
          { id: "campaigns", label: "Email Campaigns", icon: null },
          { id: "settings", label: "Site Settings", icon: null },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabType)}
            className={`px-4 py-3 font-medium transition-colors ${
              activeTab === tab.id
                ? "border-b-2 text-altus-gold"
                : "text-altus-slate hover:text-altus-charcoal"
            }`}
            style={
              activeTab === tab.id
                ? { borderBottomColor: GOLD }
                : undefined
            }
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {/* Tab 1: Navigation Editor */}
        {activeTab === "nav" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Current Navigation Items</CardTitle>
                  <Button
                    onClick={handleAddNavItem}
                    className="flex items-center gap-2 bg-altus-gold hover:bg-altus-gold-dark text-altus-charcoal"
                  >
                    <Plus className="h-4 w-4" />
                    Add Item
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {navItems.length === 0 ? (
                  <p className="text-sm text-altus-slate py-8 text-center">
                    No navigation items yet
                  </p>
                ) : (
                  <div className="space-y-2">
                    {navItems
                      .sort((a, b) => a.position - b.position)
                      .map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between rounded-lg border border-altus-border p-4 hover:bg-altus-light-gray/50 transition-colors"
                        >
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center gap-3">
                              <span className="font-medium text-altus-charcoal">
                                {item.label}
                              </span>
                              {item.visible && (
                                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                                  Visible
                                </span>
                              )}
                              {item.adminOnly && (
                                <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                                  Admin Only
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-altus-slate">
                              {item.href}
                              {item.icon && ` • Icon: ${item.icon}`}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              onClick={() => handleEditNavItem(item)}
                              variant="outline"
                              size="sm"
                              className="flex items-center gap-1"
                            >
                              <Edit2 className="h-3 w-3" />
                              Edit
                            </Button>
                            <Button
                              onClick={() => handleDeleteNavItem(item.id)}
                              variant="outline"
                              size="sm"
                              className="flex items-center gap-1 text-altus-error hover:bg-red-50"
                            >
                              <Trash2 className="h-3 w-3" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Nav Item Editor */}
            {editingNavId !== undefined && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    {editingNavId ? "Edit" : "Add"} Navigation Item
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-altus-charcoal mb-1.5">
                      Label
                    </label>
                    <Input
                      value={navForm.label}
                      onChange={(e) =>
                        setNavForm({ ...navForm, label: e.target.value })
                      }
                      placeholder="e.g., Admin"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-altus-charcoal mb-1.5">
                      URL Path
                    </label>
                    <Input
                      value={navForm.href}
                      onChange={(e) =>
                        setNavForm({ ...navForm, href: e.target.value })
                      }
                      placeholder="e.g., /admin"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-altus-charcoal mb-1.5">
                      Icon Name (lucide-react)
                    </label>
                    <Input
                      value={navForm.icon}
                      onChange={(e) =>
                        setNavForm({ ...navForm, icon: e.target.value })
                      }
                      placeholder="e.g., Settings"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-altus-charcoal mb-1.5">
                      Position
                    </label>
                    <Input
                      type="number"
                      value={navForm.position}
                      onChange={(e) =>
                        setNavForm({
                          ...navForm,
                          position: parseInt(e.target.value),
                        })
                      }
                      className="w-full"
                    />
                  </div>

                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={navForm.visible}
                        onChange={(e) =>
                          setNavForm({
                            ...navForm,
                            visible: e.target.checked,
                          })
                        }
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-altus-charcoal font-medium">
                        Visible
                      </span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={navForm.adminOnly}
                        onChange={(e) =>
                          setNavForm({
                            ...navForm,
                            adminOnly: e.target.checked,
                          })
                        }
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-altus-charcoal font-medium">
                        Admin Only
                      </span>
                    </label>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={handleSaveNavItem}
                      disabled={loadingSave}
                      className="flex items-center gap-2 bg-altus-gold hover:bg-altus-gold-dark text-altus-charcoal"
                    >
                      {loadingSave && (
                        <Loader className="h-4 w-4 animate-spin" />
                      )}
                      Save Item
                    </Button>
                    <Button
                      onClick={() => {
                        setEditingNavId(null);
                        setNavForm({
                          label: "",
                          href: "",
                          icon: "",
                          position: 0,
                          visible: true,
                          adminOnly: false,
                        });
                      }}
                      variant="outline"
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Tab 2: Page Content */}
        {activeTab === "content" && (
          <Card>
            <CardHeader>
              <CardTitle>Edit Page Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-altus-charcoal mb-2">
                  Select Page
                </label>
                <select
                  value={selectedPage}
                  onChange={(e) => handleSelectPage(e.target.value)}
                  className="w-full rounded-lg border border-altus-border bg-white px-3.5 py-2.5 text-sm text-altus-charcoal focus:border-altus-gold focus:outline-none focus:ring-2 focus:ring-altus-gold/20"
                >
                  <option value="">Choose a page...</option>
                  {pages.map((page) => (
                    <option key={page.slug} value={page.slug}>
                      {page.slug} {page.title && `- ${page.title}`}
                    </option>
                  ))}
                </select>
              </div>

              {selectedPage && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-altus-charcoal mb-1.5">
                      Page Title
                    </label>
                    <Input
                      value={pageForm.title}
                      onChange={(e) =>
                        setPageForm({ ...pageForm, title: e.target.value })
                      }
                      placeholder="Page title"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-altus-charcoal mb-1.5">
                      Content
                    </label>
                    <Textarea
                      value={pageForm.content}
                      onChange={(e) =>
                        setPageForm({ ...pageForm, content: e.target.value })
                      }
                      placeholder="Page content (HTML supported)"
                      className="w-full min-h-[300px]"
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={handleSavePageContent}
                      disabled={loadingSave}
                      className="flex items-center gap-2 bg-altus-gold hover:bg-altus-gold-dark text-altus-charcoal"
                    >
                      {loadingSave && (
                        <Loader className="h-4 w-4 animate-spin" />
                      )}
                      Save Content
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        )}

        {/* Tab 3: Email Campaigns */}
        {activeTab === "campaigns" && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Email Campaign History</CardTitle>
                <Button
                  onClick={() =>
                    window.location.href = "/email-editor"
                  }
                  className="flex items-center gap-2 bg-altus-gold hover:bg-altus-gold-dark text-altus-charcoal"
                >
                  <Mail className="h-4 w-4" />
                  Create New Campaign
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {campaigns.length === 0 ? (
                <p className="text-sm text-altus-slate py-8 text-center">
                  No campaigns sent yet
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="border-b border-altus-border">
                      <tr className="text-altus-slate font-medium">
                        <th className="text-left py-3 px-4">Subject</th>
                        <th className="text-left py-3 px-4">Sent Date</th>
                        <th className="text-center py-3 px-4">Total Sent</th>
                        <th className="text-center py-3 px-4">Failed</th>
                        <th className="text-center py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {campaigns.map((campaign) => (
                        <tr
                          key={campaign.id}
                          className="border-b border-altus-border hover:bg-altus-light-gray/50"
                        >
                          <td className="py-3 px-4 font-medium text-altus-charcoal max-w-xs truncate">
                            {campaign.subject}
                          </td>
                          <td className="py-3 px-4 text-altus-slate">
                            {new Date(campaign.sentAt).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4 text-center font-medium">
                            {campaign.totalSent}
                          </td>
                          <td className="py-3 px-4 text-center text-altus-error font-medium">
                            {campaign.totalFailed}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span
                              className={`text-xs font-medium px-2.5 py-1 rounded ${
                                campaign.status === "sent"
                                  ? "bg-green-100 text-green-700"
                                  : campaign.status === "pending"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {campaign.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Tab 4: Site Settings */}
        {activeTab === "settings" && (
          <Card>
            <CardHeader>
              <CardTitle>Site Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-altus-charcoal mb-1.5">
                  Site Name
                </label>
                <Input
                  value={siteConfig.siteName}
                  onChange={(e) =>
                    setSiteConfig({
                      ...siteConfig,
                      siteName: e.target.value,
                    })
                  }
                  placeholder="Site name"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-altus-charcoal mb-1.5">
                  Logo Text
                </label>
                <Input
                  value={siteConfig.logoText}
                  onChange={(e) =>
                    setSiteConfig({
                      ...siteConfig,
                      logoText: e.target.value,
                    })
                  }
                  placeholder="Logo text"
                  className="w-full"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Primary Color */}
                <div>
                  <label className="block text-sm font-medium text-altus-charcoal mb-1.5">
                    Primary Color
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={siteConfig.primaryColor}
                      onChange={(e) =>
                        setSiteConfig({
                          ...siteConfig,
                          primaryColor: e.target.value,
                        })
                      }
                      className="w-12 h-10 rounded-lg border border-altus-border cursor-pointer"
                    />
                    <Input
                      value={siteConfig.primaryColor}
                      onChange={(e) =>
                        setSiteConfig({
                          ...siteConfig,
                          primaryColor: e.target.value,
                        })
                      }
                      placeholder="#000000"
                      className="flex-1"
                    />
                  </div>
                </div>

                {/* Secondary Color */}
                <div>
                  <label className="block text-sm font-medium text-altus-charcoal mb-1.5">
                    Secondary Color
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={siteConfig.secondaryColor}
                      onChange={(e) =>
                        setSiteConfig({
                          ...siteConfig,
                          secondaryColor: e.target.value,
                        })
                      }
                      className="w-12 h-10 rounded-lg border border-altus-border cursor-pointer"
                    />
                    <Input
                      value={siteConfig.secondaryColor}
                      onChange={(e) =>
                        setSiteConfig({
                          ...siteConfig,
                          secondaryColor: e.target.value,
                        })
                      }
                      placeholder="#000000"
                      className="flex-1"
                    />
                  </div>
                </div>

                {/* Accent Color */}
                <div>
                  <label className="block text-sm font-medium text-altus-charcoal mb-1.5">
                    Accent Color
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={siteConfig.accentColor}
                      onChange={(e) =>
                        setSiteConfig({
                          ...siteConfig,
                          accentColor: e.target.value,
                        })
                      }
                      className="w-12 h-10 rounded-lg border border-altus-border cursor-pointer"
                    />
                    <Input
                      value={siteConfig.accentColor}
                      onChange={(e) =>
                        setSiteConfig({
                          ...siteConfig,
                          accentColor: e.target.value,
                        })
                      }
                      placeholder="#000000"
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-altus-border pt-4">
                <h3 className="font-medium text-altus-charcoal mb-4">
                  Footer Contact Info
                </h3>

                <div>
                  <label className="block text-sm font-medium text-altus-charcoal mb-1.5">
                    Footer Email
                  </label>
                  <Input
                    type="email"
                    value={siteConfig.footerEmail}
                    onChange={(e) =>
                      setSiteConfig({
                        ...siteConfig,
                        footerEmail: e.target.value,
                      })
                    }
                    placeholder="contact@example.com"
                    className="w-full"
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-altus-charcoal mb-1.5">
                    Footer Website
                  </label>
                  <Input
                    value={siteConfig.footerWebsite}
                    onChange={(e) =>
                      setSiteConfig({
                        ...siteConfig,
                        footerWebsite: e.target.value,
                      })
                    }
                    placeholder="www.example.com"
                    className="w-full"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-altus-border">
                <Button
                  onClick={handleSaveSiteConfig}
                  disabled={loadingSave}
                  className="flex items-center gap-2 bg-altus-gold hover:bg-altus-gold-dark text-altus-charcoal"
                >
                  {loadingSave && (
                    <Loader className="h-4 w-4 animate-spin" />
                  )}
                  Save Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
