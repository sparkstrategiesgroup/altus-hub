"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          company: data.get("company"),
          phone: data.get("phone"),
          message: data.get("message"),
        }),
      });

      if (res.ok) {
        setSubmitted(true);
        form.reset();
      }
    } catch {
      // Silently handle - in production, show error toast
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {/* Hero */}
      <section className="bg-altus-navy py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold text-white sm:text-5xl">
              Get in <span className="text-altus-gold">Touch</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/70">
              Interested in learning more about the Altus Forum? Have questions
              about membership? We&apos;d love to hear from you.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Contact Info */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-altus-navy">
                Contact Information
              </h2>
              <p className="mt-4 text-altus-slate">
                Reach out to the Altus Forum team. We typically respond within one
                business day.
              </p>

              <div className="mt-8 space-y-6">
                <div className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-altus-gold/10">
                    <Mail className="h-5 w-5 text-altus-gold" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-altus-navy">Email</p>
                    <p className="text-sm text-altus-slate">
                      info@altusforum.com
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-altus-gold/10">
                    <Phone className="h-5 w-5 text-altus-gold" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-altus-navy">Phone</p>
                    <p className="text-sm text-altus-slate">(555) 123-4567</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-altus-gold/10">
                    <MapPin className="h-5 w-5 text-altus-gold" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-altus-navy">
                      Location
                    </p>
                    <p className="text-sm text-altus-slate">
                      Serving BSC leaders nationwide
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="rounded-2xl border border-altus-success/20 bg-green-50 p-8 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-altus-success/10">
                    <Mail className="h-6 w-6 text-altus-success" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-altus-navy">
                    Message Sent
                  </h3>
                  <p className="mt-2 text-sm text-altus-slate">
                    Thank you for reaching out. We&apos;ll get back to you within
                    one business day.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-6"
                    onClick={() => setSubmitted(false)}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Input
                      id="name"
                      name="name"
                      label="Full Name"
                      placeholder="John Smith"
                      required
                    />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      label="Email"
                      placeholder="john@company.com"
                      required
                    />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Input
                      id="company"
                      name="company"
                      label="Company"
                      placeholder="Your BSC Company"
                    />
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      label="Phone"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <Textarea
                    id="message"
                    name="message"
                    label="Message"
                    placeholder="Tell us how we can help..."
                    required
                  />
                  <Button
                    type="submit"
                    variant="gold"
                    size="lg"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
