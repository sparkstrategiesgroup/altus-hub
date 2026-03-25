"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Upload, Send, AlertCircle, CheckCircle, Loader } from "lucide-react";

// Color constants
const ACCENT_COLOR = "#caeaf7";
const CHARCOAL = "#3a3a3a";
const CHARCOAL_DARK = "#1a1a1a";

interface EmailState {
  subject: string;
  heroImageUrl: string;
  heroHeadline: string;
  heroSubline: string;
  bodyGreeting: string;
  bodyParagraph1: string;
  bodyParagraph2: string;
  eventDate: string;
  eventTime: string;
  eventFormat: string;
  eventPresenter: string;
  ctaText: string;
  ctaUrl: string;
  signOff: string;
}

const defaultState: EmailState = {
  subject: "Tomorrow: BSC Industry Strategy Altus Forum — 10:30am EST",
  heroImageUrl: "/uploads/mike-fitts.png",
  heroHeadline: "DON'T MISS\nTOMORROW'S\nALTUS FORUM",
  heroSubline: "BSC Industry Strategy 2025  ·  with Mike Fitts",
  bodyGreeting: "Dear (Name),",
  bodyParagraph1:
    "Tomorrow morning we're hosting a live strategy session built specifically for BSC leaders — led by <strong style=\"color: #1a1a1a;\">Mike Fitts</strong>, Chief Commercial Officer at 4M Building Solutions.",
  bodyParagraph2:
    "Mike is a decorated Marine veteran and industry strategist who's been turning market headwinds into momentum at one of the industry's most forward-thinking facility services companies. This is a session you don't want to miss.",
  eventDate: "Thursday, March 26, 2026",
  eventTime: "10:30 AM – 12:30 PM EST",
  eventFormat: "Live via Zoom",
  eventPresenter: "Mike Fitts, CCO — 4M Building Solutions",
  ctaText: "Register Now",
  ctaUrl: "https://www.altuscollective.us/masterclass",
  signOff: "See you tomorrow,\nThe Altus Collective Team",
};

function generateEmailHTML(state: EmailState, baseUrl: string): string {
  const heroImagePath = state.heroImageUrl.startsWith("http")
    ? state.heroImageUrl
    : `${baseUrl}${state.heroImageUrl}`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${state.subject}</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background-color: #f5f5f5;
    }
    .email-wrapper {
      background-color: #ffffff;
      max-width: 600px;
      margin: 0 auto;
    }
    .header {
      background-color: ${CHARCOAL};
      padding: 20px;
      text-align: center;
      border-bottom: 4px solid ${ACCENT_COLOR};
    }
    .header-logo {
      color: ${ACCENT_COLOR};
      font-weight: 700;
      font-size: 18px;
      letter-spacing: 2px;
    }
    .hero-section {
      background: linear-gradient(135deg, ${CHARCOAL} 0%, ${CHARCOAL_DARK} 100%);
      color: white;
      padding: 40px 20px;
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    .hero-image {
      width: 100%;
      max-height: 250px;
      object-fit: cover;
      margin-bottom: 20px;
      border-radius: 4px;
    }
    .hero-headline {
      font-size: 32px;
      font-weight: 900;
      line-height: 1.2;
      margin: 20px 0;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: ${ACCENT_COLOR};
    }
    .hero-subline {
      font-size: 16px;
      line-height: 1.5;
      color: #e5e5e5;
      margin-bottom: 20px;
    }
    .dark-hero-text {
      background-color: rgba(0, 0, 0, 0.3);
      padding: 30px;
      margin: 20px 0;
      border-left: 4px solid ${ACCENT_COLOR};
    }
    .body-section {
      padding: 40px;
      color: ${CHARCOAL};
      line-height: 1.6;
    }
    .body-greeting {
      font-size: 16px;
      margin-bottom: 15px;
      color: ${CHARCOAL};
    }
    .body-paragraph {
      font-size: 15px;
      margin-bottom: 15px;
      line-height: 1.7;
      color: ${CHARCOAL};
    }
    .event-details {
      background-color: #fafafa;
      border-left: 4px solid ${ACCENT_COLOR};
      padding: 20px;
      margin: 30px 0;
      border-radius: 4px;
    }
    .event-detail-row {
      margin-bottom: 12px;
      font-size: 14px;
    }
    .event-label {
      font-weight: 600;
      color: ${ACCENT_COLOR};
      display: block;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 4px;
    }
    .event-value {
      color: ${CHARCOAL};
      font-size: 15px;
    }
    .cta-button {
      display: inline-block;
      background-color: ${ACCENT_COLOR};
      color: ${CHARCOAL_DARK};
      padding: 15px 40px;
      text-decoration: none;
      font-weight: 700;
      border-radius: 4px;
      font-size: 16px;
      margin: 30px 0;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .cta-section {
      text-align: center;
    }
    .pillars-section {
      background-color: #f9f9f9;
      padding: 40px;
      margin: 30px 0 0 0;
      text-align: center;
      border-top: 1px solid #e5e5e5;
    }
    .pillar {
      display: inline-block;
      margin: 0 15px;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: ${ACCENT_COLOR};
      font-weight: 700;
    }
    .did-you-know {
      background-color: #fafafa;
      padding: 30px;
      margin: 30px 0;
      border-left: 4px solid ${ACCENT_COLOR};
      border-radius: 4px;
    }
    .did-you-know-title {
      font-weight: 700;
      color: ${CHARCOAL};
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 10px;
    }
    .did-you-know-text {
      font-size: 14px;
      color: ${CHARCOAL};
      line-height: 1.6;
    }
    .signoff {
      padding: 30px 40px;
      color: ${CHARCOAL};
      font-size: 15px;
      line-height: 1.7;
      white-space: pre-line;
    }
    .footer {
      background-color: ${CHARCOAL};
      color: #999999;
      padding: 30px;
      text-align: center;
      font-size: 12px;
      border-top: 4px solid ${ACCENT_COLOR};
    }
    .footer-link {
      color: ${ACCENT_COLOR};
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="email-wrapper">
    <!-- Header -->
    <div class="header">
      <div class="header-logo">ISSA | ///ALTUS</div>
    </div>

    <!-- Hero Section -->
    <div class="hero-section">
      <img src="${heroImagePath}" alt="Hero" class="hero-image">
      <div class="hero-headline">${state.heroHeadline.replace(/\n/g, "<br>")}</div>
      <div class="hero-subline">${state.heroSubline}</div>
      <div class="dark-hero-text">
        <p style="margin: 0; font-size: 16px; line-height: 1.6;">
          Join us for an exclusive strategy session designed for facility services leaders navigating today's complex market landscape.
        </p>
      </div>
    </div>

    <!-- Body Section -->
    <div class="body-section">
      <div class="body-greeting">${state.bodyGreeting}</div>
      <p class="body-paragraph">${state.bodyParagraph1}</p>
      <p class="body-paragraph">${state.bodyParagraph2}</p>

      <!-- Event Details -->
      <div class="event-details">
        <div class="event-detail-row">
          <span class="event-label">Date</span>
          <span class="event-value">${state.eventDate}</span>
        </div>
        <div class="event-detail-row">
          <span class="event-label">Time</span>
          <span class="event-value">${state.eventTime}</span>
        </div>
        <div class="event-detail-row">
          <span class="event-label">Format</span>
          <span class="event-value">${state.eventFormat}</span>
        </div>
        <div class="event-detail-row">
          <span class="event-label">Presenter</span>
          <span class="event-value">${state.eventPresenter}</span>
        </div>
      </div>

      <!-- CTA Button -->
      <div class="cta-section">
        <a href="${state.ctaUrl}" class="cta-button">${state.ctaText}</a>
      </div>

      <p style="font-size:12px; color:#bbb; text-align:center; margin:0 0 8px;">
        Already registered? Check your inbox for the Zoom link — you're all set.
      </p>

      <!-- What We'll Cover -->
      <div style="margin-top:28px;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:16px;">
          <div>
            <p style="font-size:10px; letter-spacing:0.15em; text-transform:uppercase; color:${ACCENT_COLOR}; font-weight:700; margin:0 0 12px;">What We'll Cover</p>
            <p style="font-size:14px; color:#555; line-height:1.7; margin:0;">
              Five strategic pillars that separate high-performing BSCs from the pack — with a 90-day action plan you can start executing immediately.
            </p>
          </div>
        </div>
      </div>

      <!-- Pillar list -->
      <div style="margin-top:8px;">
        ${[
          { num: "01", title: "Market Dynamics", desc: "A $450B industry at a crossroads" },
          { num: "02", title: "Workforce Strategy", desc: "Solving the #1 challenge" },
          { num: "03", title: "Digital Transformation", desc: "Technology as a competitive moat" },
          { num: "04", title: "Sustainability & ESG", desc: "Green cleaning as a growth driver" },
          { num: "05", title: "Growth Strategy", desc: "Escaping the commodity trap" },
        ].map(p => `
          <div style="padding:12px 0; border-bottom:1px solid #f0f0f0;">
            <span style="font-size:12px; font-weight:700; color:${ACCENT_COLOR}; display:inline-block; width:28px; vertical-align:top;">${p.num}</span>
            <span style="font-size:14px; font-weight:700; color:#1a1a1a;">${p.title}</span>
            <span style="font-size:13px; color:#999;"> — ${p.desc}</span>
          </div>
        `).join("")}
      </div>

      <!-- Did You Know -->
      <div style="background:#fafafa; padding:24px; border-top:1px solid #eee; margin-top:24px; border-radius:4px;">
        <p style="font-size:10px; letter-spacing:0.15em; text-transform:uppercase; color:${ACCENT_COLOR}; font-weight:700; margin:0 0 10px;">Did You Know?</p>
        <p style="font-size:14px; color:#555; line-height:1.7; margin:0;">
          As an Altus Collective member, you have access to all Altus Forum recordings, the Altus Academy course library, and the <strong style="color:#1a1a1a;">Official Cleaning Times</strong> digital booklet. Log in to your <strong style="color:#1a1a1a;">ISSA | Altus Account</strong> to explore.
        </p>
      </div>
    </div>

    <!-- Sign-Off -->
    <div class="signoff">${state.signOff}</div>

    <!-- Footer -->
    <div class="footer">
      <p style="font-size:11px; color:#999; margin:0 0 8px;">For any inquiries or more information, please don't hesitate to reach out.</p>
      <p style="font-size:11px; color:#999; margin:0;">
        <a href="mailto:k.hernandez@altuscollective.us" class="footer-link">k.hernandez@altuscollective.us</a>
        &nbsp;·&nbsp;
        <a href="https://www.altuscollective.us" class="footer-link">altuscollective.us</a>
        &nbsp;·&nbsp;
        <a href="https://www.issa.com" class="footer-link">issa.com</a>
      </p>
    </div>
  </div>
</body>
</html>`;
}

export default function EmailEditorPage() {
  const [state, setState] = useState<EmailState>(defaultState);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");
  const [sendSuccess, setSendSuccess] = useState("");
  const [sendResult, setSendResult] = useState<{
    total: number;
    sent: number;
    failed: number;
  } | null>(null);
  const baseUrl =
    typeof window !== "undefined" ? window.location.origin : "http://localhost:3000";

  const handleInputChange = (
    field: keyof EmailState,
    value: string
  ) => {
    setState((prev) => ({ ...prev, [field]: value }));
    setUploadSuccess("");
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError("");
    setUploadSuccess("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        setUploadError(data.error || "Failed to upload image");
        setUploading(false);
        return;
      }

      const data = await res.json();
      setState((prev) => ({ ...prev, heroImageUrl: data.url }));
      setUploadSuccess("Image uploaded successfully!");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSendTest = async () => {
    setSending(true);
    setSendError("");
    setSendSuccess("");
    setSendResult(null);

    // For now, just show the alert as per requirements
    alert("Test send coming soon");
    setSending(false);
  };

  const handleSendAll = async () => {
    if (!confirm("Send this email to all 335 members? This action cannot be undone.")) {
      return;
    }

    setSending(true);
    setSendError("");
    setSendSuccess("");
    setSendResult(null);

    try {
      const htmlContent = generateEmailHTML(state, baseUrl);

      const res = await fetch("/api/bulk-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: state.subject,
          htmlContent,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setSendError(data.error || "Failed to send emails");
        setSending(false);
        return;
      }

      const data = await res.json();
      setSendSuccess(`Email campaign sent successfully!`);
      setSendResult({
        total: data.total,
        sent: data.sent,
        failed: data.failed,
      });
    } catch (err) {
      setSendError(err instanceof Error ? err.message : "Send failed");
    } finally {
      setSending(false);
    }
  };

  const emailHTML = generateEmailHTML(state, baseUrl);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-altus-charcoal">Email Editor</h1>
        <p className="text-sm text-altus-slate">
          Compose and preview your Altus Forum email
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Side: Form Fields */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Email Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Subject */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-altus-charcoal">
                  Subject Line
                </label>
                <Input
                  value={state.subject}
                  onChange={(e) => handleInputChange("subject", e.target.value)}
                  placeholder="Email subject"
                  className="w-full"
                />
              </div>

              {/* Hero Image */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-altus-charcoal">
                  Hero Image
                </label>
                {state.heroImageUrl && (
                  <div className="rounded border border-altus-border p-2">
                    <img
                      src={state.heroImageUrl}
                      alt="Hero"
                      className="w-full h-32 object-cover rounded"
                    />
                  </div>
                )}
                <div className="flex gap-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    variant="outline"
                    className="flex items-center gap-2 flex-1"
                  >
                    <Upload className="h-4 w-4" />
                    {uploading ? "Uploading..." : "Upload Image"}
                  </Button>
                </div>
                {uploadError && (
                  <p className="text-xs text-altus-error">{uploadError}</p>
                )}
                {uploadSuccess && (
                  <p className="text-xs text-altus-success">{uploadSuccess}</p>
                )}
              </div>

              {/* Hero Headline */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-altus-charcoal">
                  Hero Headline
                </label>
                <Textarea
                  value={state.heroHeadline}
                  onChange={(e) =>
                    handleInputChange("heroHeadline", e.target.value)
                  }
                  placeholder="Hero headline"
                  rows={3}
                  className="w-full"
                />
              </div>

              {/* Hero Subline */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-altus-charcoal">
                  Hero Subline
                </label>
                <Input
                  value={state.heroSubline}
                  onChange={(e) =>
                    handleInputChange("heroSubline", e.target.value)
                  }
                  placeholder="Hero subline"
                  className="w-full"
                />
              </div>

              {/* Body Greeting */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-altus-charcoal">
                  Body Greeting
                </label>
                <Input
                  value={state.bodyGreeting}
                  onChange={(e) =>
                    handleInputChange("bodyGreeting", e.target.value)
                  }
                  placeholder="Greeting"
                  className="w-full"
                />
              </div>

              {/* Body Paragraph 1 */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-altus-charcoal">
                  Body Paragraph 1
                </label>
                <Textarea
                  value={state.bodyParagraph1}
                  onChange={(e) =>
                    handleInputChange("bodyParagraph1", e.target.value)
                  }
                  placeholder="First paragraph"
                  rows={3}
                  className="w-full text-xs"
                />
              </div>

              {/* Body Paragraph 2 */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-altus-charcoal">
                  Body Paragraph 2
                </label>
                <Textarea
                  value={state.bodyParagraph2}
                  onChange={(e) =>
                    handleInputChange("bodyParagraph2", e.target.value)
                  }
                  placeholder="Second paragraph"
                  rows={3}
                  className="w-full text-xs"
                />
              </div>

              {/* Event Details */}
              <div className="border-t border-altus-border pt-4 mt-4">
                <h3 className="font-medium text-altus-charcoal mb-3 text-sm">
                  Event Details
                </h3>

                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-altus-charcoal">
                    Event Date
                  </label>
                  <Input
                    value={state.eventDate}
                    onChange={(e) =>
                      handleInputChange("eventDate", e.target.value)
                    }
                    placeholder="Date"
                    className="w-full"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-altus-charcoal">
                    Event Time
                  </label>
                  <Input
                    value={state.eventTime}
                    onChange={(e) =>
                      handleInputChange("eventTime", e.target.value)
                    }
                    placeholder="Time"
                    className="w-full"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-altus-charcoal">
                    Event Format
                  </label>
                  <Input
                    value={state.eventFormat}
                    onChange={(e) =>
                      handleInputChange("eventFormat", e.target.value)
                    }
                    placeholder="Format"
                    className="w-full"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-altus-charcoal">
                    Event Presenter
                  </label>
                  <Input
                    value={state.eventPresenter}
                    onChange={(e) =>
                      handleInputChange("eventPresenter", e.target.value)
                    }
                    placeholder="Presenter"
                    className="w-full"
                  />
                </div>
              </div>

              {/* CTA */}
              <div className="border-t border-altus-border pt-4 mt-4">
                <h3 className="font-medium text-altus-charcoal mb-3 text-sm">
                  Call to Action
                </h3>

                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-altus-charcoal">
                    Button Text
                  </label>
                  <Input
                    value={state.ctaText}
                    onChange={(e) => handleInputChange("ctaText", e.target.value)}
                    placeholder="Button text"
                    className="w-full"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-altus-charcoal">
                    Button URL
                  </label>
                  <Input
                    value={state.ctaUrl}
                    onChange={(e) => handleInputChange("ctaUrl", e.target.value)}
                    placeholder="https://..."
                    className="w-full"
                  />
                </div>
              </div>

              {/* Sign-Off */}
              <div className="border-t border-altus-border pt-4 mt-4">
                <label className="block text-sm font-medium text-altus-charcoal mb-2">
                  Sign-Off
                </label>
                <Textarea
                  value={state.signOff}
                  onChange={(e) =>
                    handleInputChange("signOff", e.target.value)
                  }
                  placeholder="Sign-off"
                  rows={3}
                  className="w-full text-xs"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Side: Live Preview */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Live Preview</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <iframe
                srcDoc={emailHTML}
                className="w-full border-0 rounded-b-lg"
                style={{ height: "900px", display: "block" }}
                title="Email Preview"
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Send Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Send Campaign</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {sendError && (
            <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-altus-error">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span>{sendError}</span>
            </div>
          )}

          {sendSuccess && (
            <div className="flex items-center gap-2 rounded-lg bg-green-50 p-3 text-sm text-altus-success">
              <CheckCircle className="h-4 w-4 flex-shrink-0" />
              <span>{sendSuccess}</span>
            </div>
          )}

          {sendResult && (
            <div className="rounded-lg border border-altus-border bg-altus-cream p-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-altus-charcoal">
                    {sendResult.sent}
                  </p>
                  <p className="text-xs text-altus-slate">Sent</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-altus-charcoal">
                    {sendResult.total}
                  </p>
                  <p className="text-xs text-altus-slate">Total</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-altus-error">
                    {sendResult.failed}
                  </p>
                  <p className="text-xs text-altus-slate">Failed</p>
                </div>
              </div>
            </div>
          )}

          {sending && (
            <div className="flex items-center gap-2 text-sm text-altus-slate">
              <Loader className="h-4 w-4 animate-spin" />
              Sending emails...
            </div>
          )}

          <div className="flex gap-3">
            <Button
              onClick={handleSendTest}
              disabled={sending}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Send className="h-4 w-4" />
              Send Test Email
            </Button>
            <Button
              onClick={handleSendAll}
              disabled={sending}
              className="flex items-center gap-2 bg-altus-gold hover:bg-altus-gold-dark text-altus-charcoal"
            >
              <Send className="h-4 w-4" />
              Send to All Members (335)
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
