interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

/** A layout wrapper kept for compatibility with existing section markup. */
export function Reveal({ children, className }: RevealProps) {
  return <div className={className}>{children}</div>;
}
