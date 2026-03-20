"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const categories = [
  { value: "general", label: "General" },
  { value: "sales", label: "Sales & Marketing" },
  { value: "operations", label: "Operations" },
  { value: "technology", label: "Technology" },
  { value: "hr", label: "Human Resources" },
  { value: "finance", label: "Finance" },
  { value: "strategy", label: "Strategy" },
];

export default function NewDiscussionPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/discussions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.get("title"),
          content: form.get("content"),
          category: form.get("category"),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to create discussion");
        setLoading(false);
        return;
      }

      const discussion = await res.json();
      router.push(`/discussions/${discussion.id}`);
    } catch {
      setError("Something went wrong");
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Start a New Discussion</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-lg bg-red-50 p-3 text-sm text-altus-error">
                {error}
              </div>
            )}
            <Input
              id="title"
              name="title"
              label="Title"
              placeholder="What would you like to discuss?"
              required
            />
            <div className="space-y-1.5">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-altus-navy"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                className="w-full rounded-lg border border-altus-border bg-white px-3.5 py-2.5 text-sm text-altus-navy focus:border-altus-gold focus:outline-none focus:ring-2 focus:ring-altus-gold/20"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
            <Textarea
              id="content"
              name="content"
              label="Content"
              placeholder="Share your thoughts, questions, or insights..."
              required
            />
            <div className="flex gap-3">
              <Button type="submit" variant="gold" disabled={loading}>
                {loading ? "Posting..." : "Post Discussion"}
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
