"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

const companySizes = [
  "1-25 employees",
  "26-100 employees",
  "101-500 employees",
  "501-1000 employees",
  "1000+ employees",
];

const salesVolumes = [
  "Under $1M",
  "$1M - $5M",
  "$5M - $15M",
  "$15M - $50M",
  "$50M+",
];

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const data = {
      name: form.get("name"),
      email: form.get("email"),
      password: form.get("password"),
      company: form.get("company"),
      companySize: form.get("companySize"),
      salesVolume: form.get("salesVolume"),
      title: form.get("title"),
    };

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const result = await res.json();
        setError(result.error || "Registration failed");
        setLoading(false);
        return;
      }

      // Auto sign in after registration
      await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Something went wrong");
      setLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Join the Altus Collective</CardTitle>
        <CardDescription>
          Create your account to connect with BSC leaders
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-altus-error">
              {error}
            </div>
          )}
          <div className="grid gap-4 sm:grid-cols-2">
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
          <Input
            id="password"
            name="password"
            type="password"
            label="Password"
            placeholder="Minimum 6 characters"
            required
            minLength={6}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              id="company"
              name="company"
              label="Company Name"
              placeholder="Your BSC Company"
            />
            <Input
              id="title"
              name="title"
              label="Your Title"
              placeholder="CEO, VP Operations, etc."
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label
                htmlFor="companySize"
                className="block text-sm font-medium text-altus-charcoal"
              >
                Company Size
              </label>
              <select
                id="companySize"
                name="companySize"
                className="w-full rounded-lg border border-altus-border bg-white px-3.5 py-2.5 text-sm text-altus-charcoal focus:border-altus-gold focus:outline-none focus:ring-2 focus:ring-altus-gold/20"
              >
                <option value="">Select size</option>
                {companySizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label
                htmlFor="salesVolume"
                className="block text-sm font-medium text-altus-charcoal"
              >
                Annual Sales Volume
              </label>
              <select
                id="salesVolume"
                name="salesVolume"
                className="w-full rounded-lg border border-altus-border bg-white px-3.5 py-2.5 text-sm text-altus-charcoal focus:border-altus-gold focus:outline-none focus:ring-2 focus:ring-altus-gold/20"
              >
                <option value="">Select volume</option>
                {salesVolumes.map((vol) => (
                  <option key={vol} value={vol}>
                    {vol}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <Button
            type="submit"
            variant="gold"
            size="lg"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-altus-slate">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-altus-gold hover:text-altus-gold-dark"
          >
            Sign In
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
