"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

interface RsvpButtonProps {
  sessionId?: string;
  eventId?: string;
  hasRsvp: boolean;
  type: "session" | "event";
}

export function RsvpButton({
  sessionId,
  eventId,
  hasRsvp,
  type,
}: RsvpButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const id = type === "session" ? sessionId : eventId;
  const endpoint =
    type === "session"
      ? `/api/sessions/${id}/rsvp`
      : `/api/events/${id}/rsvp`;

  async function handleRsvp() {
    setLoading(true);
    try {
      await fetch(endpoint, {
        method: hasRsvp ? "DELETE" : "POST",
      });
      router.refresh();
    } catch {
      // handle error
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      onClick={handleRsvp}
      variant={hasRsvp ? "secondary" : "gold"}
      className="w-full"
      disabled={loading}
    >
      {hasRsvp ? (
        <>
          <X className="mr-2 h-4 w-4" />
          Cancel RSVP
        </>
      ) : (
        <>
          <Check className="mr-2 h-4 w-4" />
          RSVP to Attend
        </>
      )}
    </Button>
  );
}
