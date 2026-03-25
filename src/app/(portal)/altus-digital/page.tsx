"use client";

import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Upload,
  FileSpreadsheet,
  Send,
  CheckCircle,
  AlertCircle,
  X,
  Loader2,
} from "lucide-react";

interface CsvData {
  fileName: string;
  fileSize: number;
  rowCount: number;
  columns: string[];
  preview: Record<string, string>[];
  csvContent: string;
}

export default function AltusDigitalPage() {
  const [csvData, setCsvData] = useState<CsvData | null>(null);
  const [uploading, setUploading] = useState(false);
  const [sending, setSending] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  // Email form state
  const [toEmail, setToEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleFile = useCallback(async (file: File) => {
    setUploadError(null);
    setEmailSent(false);
    setEmailError(null);

    if (!file.name.endsWith(".csv")) {
      setUploadError("Please upload a CSV file.");
      return;
    }

    setUploading(true);
    const rawContent = await file.text();

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/csv-upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        setUploadError(data.error ?? "Upload failed");
        return;
      }
      setCsvData({ ...data, csvContent: rawContent });
      setSubject(`CSV File: ${data.fileName}`);
    } catch {
      setUploadError("Failed to upload file. Please try again.");
    } finally {
      setUploading(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!csvData) return;

    setSending(true);
    setEmailError(null);
    setEmailSent(false);

    try {
      const res = await fetch("/api/csv-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: toEmail,
          subject,
          message,
          fileName: csvData.fileName,
          csvContent: csvData.csvContent,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setEmailError(data.error ?? "Failed to send email");
        return;
      }
      setEmailSent(true);
    } catch {
      setEmailError("Failed to send email. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const clearFile = () => {
    setCsvData(null);
    setUploadError(null);
    setEmailSent(false);
    setEmailError(null);
    setToEmail("");
    setSubject("");
    setMessage("");
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-altus-charcoal">
          Altus Digital
        </h1>
        <p className="text-sm text-altus-slate">
          Upload CSV files and share them via email
        </p>
      </div>

      {/* Upload Area */}
      {!csvData && (
        <Card>
          <CardContent className="p-6">
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 transition-colors ${
                dragOver
                  ? "border-altus-gold bg-altus-gold/5"
                  : "border-altus-border hover:border-altus-gold/50"
              }`}
            >
              {uploading ? (
                <Loader2 className="h-10 w-10 animate-spin text-altus-gold" />
              ) : (
                <Upload className="h-10 w-10 text-altus-slate/50" />
              )}
              <p className="mt-4 text-sm font-medium text-altus-charcoal">
                {uploading
                  ? "Processing file..."
                  : "Drag & drop your CSV file here"}
              </p>
              <p className="mt-1 text-xs text-altus-slate">or</p>
              <label className="mt-3 cursor-pointer rounded-lg bg-altus-charcoal px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-altus-charcoal/90">
                Browse Files
                <input
                  type="file"
                  accept=".csv"
                  className="hidden"
                  onChange={handleInputChange}
                  disabled={uploading}
                />
              </label>
              <p className="mt-3 text-xs text-altus-slate">
                CSV files only, up to 10MB
              </p>
            </div>

            {uploadError && (
              <div className="mt-4 flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {uploadError}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* File Preview */}
      {csvData && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-altus-gold/10">
                  <FileSpreadsheet className="h-5 w-5 text-altus-gold" />
                </div>
                <div>
                  <p className="font-semibold text-altus-charcoal">
                    {csvData.fileName}
                  </p>
                  <p className="text-xs text-altus-slate">
                    {formatSize(csvData.fileSize)} &middot; {csvData.rowCount}{" "}
                    rows &middot; {csvData.columns.length} columns
                  </p>
                </div>
              </div>
              <button
                onClick={clearFile}
                className="rounded-lg p-2 text-altus-slate transition-colors hover:bg-altus-light-gray hover:text-altus-charcoal"
                title="Remove file"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Data Preview Table */}
            {csvData.preview.length > 0 && (
              <div className="mt-4 overflow-x-auto rounded-lg border border-altus-border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-altus-border bg-altus-light-gray">
                      {csvData.columns.map((col) => (
                        <th
                          key={col}
                          className="whitespace-nowrap px-3 py-2 text-left font-medium text-altus-charcoal"
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {csvData.preview.map((row, i) => (
                      <tr
                        key={i}
                        className="border-b border-altus-border last:border-0"
                      >
                        {csvData.columns.map((col) => (
                          <td
                            key={col}
                            className="whitespace-nowrap px-3 py-2 text-altus-slate"
                          >
                            {row[col] ?? ""}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {csvData.rowCount > 5 && (
              <p className="mt-2 text-xs text-altus-slate">
                Showing first 5 of {csvData.rowCount} rows
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Email Form */}
      {csvData && (
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-altus-charcoal">
              Email this CSV
            </h2>
            <p className="mb-4 text-sm text-altus-slate">
              Send the uploaded file as an email attachment
            </p>

            <form onSubmit={handleSendEmail} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-altus-charcoal">
                  Recipient Email
                </label>
                <input
                  type="email"
                  required
                  value={toEmail}
                  onChange={(e) => setToEmail(e.target.value)}
                  placeholder="recipient@example.com"
                  className="w-full rounded-lg border border-altus-border bg-white px-3 py-2 text-sm text-altus-charcoal placeholder:text-altus-slate/50 focus:border-altus-gold focus:outline-none focus:ring-1 focus:ring-altus-gold"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-altus-charcoal">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Email subject"
                  className="w-full rounded-lg border border-altus-border bg-white px-3 py-2 text-sm text-altus-charcoal placeholder:text-altus-slate/50 focus:border-altus-gold focus:outline-none focus:ring-1 focus:ring-altus-gold"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-altus-charcoal">
                  Message (optional)
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  placeholder="Add a message..."
                  className="w-full rounded-lg border border-altus-border bg-white px-3 py-2 text-sm text-altus-charcoal placeholder:text-altus-slate/50 focus:border-altus-gold focus:outline-none focus:ring-1 focus:ring-altus-gold resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="inline-flex items-center gap-2 rounded-lg bg-altus-gold px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-altus-gold/90 disabled:opacity-50"
              >
                {sending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                {sending ? "Sending..." : "Send Email"}
              </button>
            </form>

            {emailSent && (
              <div className="mt-4 flex items-center gap-2 rounded-lg bg-green-50 p-3 text-sm text-green-700">
                <CheckCircle className="h-4 w-4 shrink-0" />
                Email sent successfully to {toEmail}
              </div>
            )}

            {emailError && (
              <div className="mt-4 flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {emailError}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
