"use client";

import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils/cn";

/**
 * Shared field surface: a filled control with a hairline border that warms
 * to the lime accent on focus. Kept identical between input and textarea so
 * the two read as one system.
 */
const surface =
  "peer w-full rounded-xl border bg-neutral-100/70 dark:bg-neutral-900/60 " +
  "px-4 text-neutral-900 dark:text-white outline-none transition duration-200 " +
  "placeholder:text-transparent focus:placeholder:text-neutral-400 dark:focus:placeholder:text-neutral-600 " +
  "focus:bg-neutral-50 dark:focus:bg-neutral-900 focus:ring-4 focus:ring-primary-500/10";

const surfaceIdle = "border-neutral-200 dark:border-neutral-800 focus:border-primary-500";
const surfaceError = "border-destructive dark:border-destructive focus:border-destructive";

/**
 * Floating label: rests over the field, then shrinks up to the top-left and
 * turns lime once the control is focused or holds a value. The
 * `:not(:placeholder-shown)` hook is why every field carries a placeholder.
 */
const labelBase =
  "pointer-events-none absolute left-4 text-neutral-500 dark:text-neutral-400 " +
  "transition-all duration-200 ease-out";
const labelFloat =
  "peer-focus:top-2.5 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:font-medium " +
  "peer-focus:text-primary-700 dark:peer-focus:text-primary-400 " +
  "peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:translate-y-0 " +
  "peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:font-medium";

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Field = forwardRef<HTMLInputElement, FieldProps>(
  ({ className, label, error, id: externalId, ...props }, ref) => {
    const generatedId = useId();
    const id = externalId || generatedId;
    const errorId = `${id}-error`;

    return (
      <div>
        <div className="relative">
          <input
            ref={ref}
            id={id}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId : undefined}
            className={cn(surface, "pt-6 pb-2", error ? surfaceError : surfaceIdle, className)}
            {...props}
          />
          <label
            htmlFor={id}
            className={cn(labelBase, "top-1/2 -translate-y-1/2 text-base", labelFloat)}
          >
            {label}
            {props.required && <span aria-hidden="true"> *</span>}
          </label>
        </div>
        {error && (
          <p id={errorId} role="alert" className="mt-1.5 text-sm text-destructive">
            {error}
          </p>
        )}
      </div>
    );
  }
);
Field.displayName = "Field";

interface FieldAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  /** Optional live character count rendered under the field. */
  count?: { current: number; max: number };
}

export const FieldArea = forwardRef<HTMLTextAreaElement, FieldAreaProps>(
  ({ className, label, error, id: externalId, count, ...props }, ref) => {
    const generatedId = useId();
    const id = externalId || generatedId;
    const errorId = `${id}-error`;
    const near = count ? count.current > count.max * 0.9 : false;

    return (
      <div>
        <div className="relative">
          <textarea
            ref={ref}
            id={id}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId : undefined}
            className={cn(
              surface,
              "resize-none pt-7 pb-3 leading-relaxed",
              error ? surfaceError : surfaceIdle,
              className
            )}
            {...props}
          />
          <label htmlFor={id} className={cn(labelBase, "top-4 text-base", labelFloat)}>
            {label}
            {props.required && <span aria-hidden="true"> *</span>}
          </label>
        </div>
        <div className="mt-1.5 flex min-h-5 items-start justify-between gap-4">
          <span className="text-sm text-destructive">
            {error && (
              <span id={errorId} role="alert">
                {error}
              </span>
            )}
          </span>
          {count && (
            <span
              aria-hidden="true"
              className={cn(
                "shrink-0 text-xs tabular-nums transition-colors",
                near
                  ? "text-primary-700 dark:text-primary-400"
                  : "text-neutral-400 dark:text-neutral-600"
              )}
            >
              {count.current} / {count.max}
            </span>
          )}
        </div>
      </div>
    );
  }
);
FieldArea.displayName = "FieldArea";
