"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/input";
import { Reply } from "lucide-react";

interface CommentAuthor {
  id: string;
  name: string | null;
  image: string | null;
}

interface CommentData {
  id: string;
  content: string;
  createdAt: Date;
  author: CommentAuthor;
  replies?: CommentData[];
}

interface CommentSectionProps {
  discussionId: string;
  initialComments: CommentData[];
}

export function CommentSection({
  discussionId,
  initialComments,
}: CommentSectionProps) {
  const router = useRouter();
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(parentId?: string) {
    const content = parentId ? replyContent : newComment;
    if (!content.trim()) return;

    setLoading(true);
    try {
      await fetch(`/api/discussions/${discussionId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, parentId }),
      });

      if (parentId) {
        setReplyContent("");
        setReplyingTo(null);
      } else {
        setNewComment("");
      }
      router.refresh();
    } catch {
      // handle error
    } finally {
      setLoading(false);
    }
  }

  function renderComment(comment: CommentData, isReply = false) {
    return (
      <div
        key={comment.id}
        className={`${isReply ? "ml-10 border-l-2 border-altus-border pl-4" : ""}`}
      >
        <div className="flex gap-3 py-3">
          <Avatar
            name={comment.author.name || "User"}
            src={comment.author.image}
            size="sm"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium text-altus-charcoal">
                {comment.author.name}
              </span>
              <span className="text-xs text-altus-slate">
                {new Date(comment.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="mt-1 text-sm text-altus-charcoal/80 whitespace-pre-wrap">
              {comment.content}
            </p>
            {!isReply && (
              <button
                onClick={() =>
                  setReplyingTo(
                    replyingTo === comment.id ? null : comment.id
                  )
                }
                className="mt-1 flex items-center gap-1 text-xs text-altus-slate hover:text-altus-gold transition-colors"
              >
                <Reply size={12} />
                Reply
              </button>
            )}

            {replyingTo === comment.id && (
              <div className="mt-3 space-y-2">
                <Textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Write a reply..."
                  className="min-h-[60px]"
                />
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="gold"
                    onClick={() => handleSubmit(comment.id)}
                    disabled={loading}
                  >
                    Reply
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setReplyingTo(null)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {comment.replies?.map((reply) => renderComment(reply, true))}
      </div>
    );
  }

  return (
    <div>
      {initialComments.length === 0 && (
        <p className="text-sm text-altus-slate py-2">
          No comments yet. Be the first to respond.
        </p>
      )}

      <div className="divide-y divide-altus-border">
        {initialComments.map((comment) => renderComment(comment))}
      </div>

      {/* New Comment Form */}
      <div className="mt-6 space-y-3 border-t border-altus-border pt-4">
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
        />
        <Button
          variant="gold"
          onClick={() => handleSubmit()}
          disabled={loading || !newComment.trim()}
        >
          {loading ? "Posting..." : "Post Comment"}
        </Button>
      </div>
    </div>
  );
}
