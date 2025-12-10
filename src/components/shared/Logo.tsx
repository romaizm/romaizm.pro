import { Link } from "@/lib/i18n/navigation";
import { cn } from "@/lib/utils/cn";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "text-xl font-bold text-neutral-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors",
        className
      )}
    >
      Roman<span className="text-gradient">.</span>
    </Link>
  );
}
