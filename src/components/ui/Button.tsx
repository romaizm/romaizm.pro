"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, disabled, asChild, ...props }, ref) => {
    const classes = cn(
      "inline-flex items-center justify-center font-medium transition-colors duration-200 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
      {
        // Variants
        "bg-neutral-900 text-white hover:bg-neutral-700 active:bg-neutral-600 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 dark:active:bg-neutral-300":
          variant === "primary",
        "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700":
          variant === "secondary",
        "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:text-neutral-100 dark:hover:bg-neutral-800":
          variant === "ghost",
        "border border-neutral-300 text-neutral-700 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800":
          variant === "outline",
        // Sizes
        "text-sm px-4 py-2": size === "sm",
        "text-sm px-5 py-2.5": size === "md",
        "text-base px-8 py-3": size === "lg",
      },
      className
    );

    if (asChild) {
      return (
        <span
          role="presentation"
          className={classes}
        >
          {children}
        </span>
      );
    }

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
