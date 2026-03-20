"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setSaved(false);

    const form = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          company: form.get("company"),
          title: form.get("title"),
          phone: form.get("phone"),
          bio: form.get("bio"),
        }),
      });

      if (res.ok) {
        setSaved(true);
        await update();
        setTimeout(() => setSaved(false), 3000);
      }
    } catch {
      // handle error
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-altus-charcoal">Profile</h1>
        <p className="text-sm text-altus-slate">
          Manage your Altus Collective profile
        </p>
      </div>

      {/* Profile Header */}
      <Card>
        <CardContent className="flex items-center gap-4 p-6">
          <Avatar
            name={session?.user?.name || "User"}
            src={session?.user?.image}
            size="lg"
            className="h-16 w-16 text-xl"
          />
          <div>
            <h2 className="text-lg font-semibold text-altus-charcoal">
              {session?.user?.name}
            </h2>
            <p className="text-sm text-altus-slate">{session?.user?.email}</p>
            <Badge variant="gold" className="mt-1">
              Member
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Edit Form */}
      <Card>
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                id="name"
                name="name"
                label="Full Name"
                defaultValue={session?.user?.name || ""}
              />
              <Input
                id="email"
                label="Email"
                defaultValue={session?.user?.email || ""}
                disabled
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                id="company"
                name="company"
                label="Company"
                placeholder="Your BSC Company"
              />
              <Input
                id="title"
                name="title"
                label="Title"
                placeholder="CEO, VP Operations, etc."
              />
            </div>
            <Input
              id="phone"
              name="phone"
              type="tel"
              label="Phone"
              placeholder="(555) 123-4567"
            />
            <Textarea
              id="bio"
              name="bio"
              label="Bio"
              placeholder="Tell the community about yourself and your business..."
            />
            <div className="flex items-center gap-3">
              <Button type="submit" variant="gold" disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </Button>
              {saved && (
                <span className="text-sm text-altus-success">
                  Profile updated!
                </span>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
