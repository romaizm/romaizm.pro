import { cn } from "@/lib/utils/cn";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "primary" | "secondary";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200",
        {
          "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700":
            variant === "default",
          "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900":
            variant === "primary",
          "bg-neutral-200/80 text-neutral-700 dark:bg-neutral-700/80 dark:text-neutral-300":
            variant === "secondary",
        },
        className
      )}
    >
      {children}
    </span>
  );
}
