import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-altus-charcoal"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            "w-full rounded-lg border border-altus-border bg-white px-3.5 py-2.5 text-sm text-altus-charcoal placeholder:text-altus-slate/60 focus:border-altus-gold focus:outline-none focus:ring-2 focus:ring-altus-gold/20 disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-altus-error focus:border-altus-error focus:ring-altus-error/20",
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-altus-error">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-altus-charcoal"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          className={cn(
            "w-full rounded-lg border border-altus-border bg-white px-3.5 py-2.5 text-sm text-altus-charcoal placeholder:text-altus-slate/60 focus:border-altus-gold focus:outline-none focus:ring-2 focus:ring-altus-gold/20 disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]",
            error && "border-altus-error focus:border-altus-error focus:ring-altus-error/20",
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-altus-error">{error}</p>}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";
