"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/input";
import { Input } from "@/components/ui/input";
import { Mail, Send } from "lucide-react";

interface MessageUser {
  id: string;
  name: string | null;
  image: string | null;
}

interface Message {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  isRead: boolean;
  createdAt: string;
  sender: MessageUser;
  receiver: MessageUser;
}

export default function MessagesPage() {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedUser, setSelectedUser] = useState<MessageUser | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  async function fetchMessages() {
    try {
      const res = await fetch("/api/messages");
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch {
      // handle error
    } finally {
      setLoading(false);
    }
  }

  // Get unique conversations
  const conversations = messages.reduce(
    (acc: Record<string, { user: MessageUser; lastMessage: Message; unread: number }>, msg) => {
      const otherUser =
        msg.senderId === session?.user?.id ? msg.receiver : msg.sender;
      if (!acc[otherUser.id]) {
        acc[otherUser.id] = { user: otherUser, lastMessage: msg, unread: 0 };
      }
      if (!msg.isRead && msg.receiverId === session?.user?.id) {
        acc[otherUser.id].unread++;
      }
      // Keep latest message
      if (
        new Date(msg.createdAt) >
        new Date(acc[otherUser.id].lastMessage.createdAt)
      ) {
        acc[otherUser.id].lastMessage = msg;
      }
      return acc;
    },
    {}
  );

  const conversationMessages = selectedUser
    ? messages
        .filter(
          (m) =>
            (m.senderId === selectedUser.id &&
              m.receiverId === session?.user?.id) ||
            (m.senderId === session?.user?.id &&
              m.receiverId === selectedUser.id)
        )
        .sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        )
    : [];

  async function handleSend() {
    if (!newMessage.trim() || !selectedUser) return;

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: newMessage,
          receiverId: selectedUser.id,
        }),
      });

      if (res.ok) {
        setNewMessage("");
        fetchMessages();
      }
    } catch {
      // handle error
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-altus-navy">Messages</h1>
        <p className="text-sm text-altus-slate">
          Direct messages with fellow Altus members
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3" style={{ height: "calc(100vh - 220px)" }}>
        {/* Conversation List */}
        <Card className="lg:col-span-1 flex flex-col overflow-hidden">
          <CardHeader className="shrink-0">
            <CardTitle className="text-base">Conversations</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-0">
            {loading ? (
              <p className="p-4 text-sm text-altus-slate">Loading...</p>
            ) : Object.keys(conversations).length === 0 ? (
              <div className="p-6 text-center">
                <Mail className="mx-auto h-8 w-8 text-altus-slate/50" />
                <p className="mt-2 text-sm text-altus-slate">
                  No conversations yet.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-altus-border">
                {Object.values(conversations).map(
                  ({ user, lastMessage, unread }) => (
                    <button
                      key={user.id}
                      onClick={() => setSelectedUser(user)}
                      className={`w-full flex items-center gap-3 p-4 text-left transition-colors hover:bg-altus-light-gray ${
                        selectedUser?.id === user.id ? "bg-altus-light-gray" : ""
                      }`}
                    >
                      <Avatar
                        name={user.name || "User"}
                        src={user.image}
                        size="sm"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-altus-navy truncate">
                            {user.name}
                          </span>
                          {unread > 0 && (
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-altus-gold text-[10px] text-white">
                              {unread}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-altus-slate truncate">
                          {lastMessage.content}
                        </p>
                      </div>
                    </button>
                  )
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Message Thread */}
        <Card className="lg:col-span-2 flex flex-col overflow-hidden">
          {selectedUser ? (
            <>
              <CardHeader className="shrink-0 border-b border-altus-border">
                <div className="flex items-center gap-3">
                  <Avatar
                    name={selectedUser.name || "User"}
                    src={selectedUser.image}
                    size="sm"
                  />
                  <CardTitle className="text-base">
                    {selectedUser.name}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto p-4">
                <div className="space-y-3">
                  {conversationMessages.map((msg) => {
                    const isMe = msg.senderId === session?.user?.id;
                    return (
                      <div
                        key={msg.id}
                        className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[70%] rounded-xl px-4 py-2.5 text-sm ${
                            isMe
                              ? "bg-altus-navy text-white"
                              : "bg-altus-light-gray text-altus-navy"
                          }`}
                        >
                          {msg.content}
                          <div
                            className={`mt-1 text-[10px] ${
                              isMe ? "text-white/50" : "text-altus-slate"
                            }`}
                          >
                            {new Date(msg.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
              <div className="shrink-0 border-t border-altus-border p-4">
                <div className="flex gap-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                  />
                  <Button
                    variant="gold"
                    onClick={handleSend}
                    disabled={!newMessage.trim()}
                  >
                    <Send size={16} />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <CardContent className="flex flex-1 items-center justify-center">
              <div className="text-center">
                <Mail className="mx-auto h-12 w-12 text-altus-slate/30" />
                <p className="mt-3 text-sm text-altus-slate">
                  Select a conversation to start messaging
                </p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}
