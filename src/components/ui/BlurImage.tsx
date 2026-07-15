"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils/cn";

type BlurImageProps = Omit<ImageProps, "onLoad">;

export function BlurImage({ className, alt, ...props }: BlurImageProps) {
  const [isLoading, setLoading] = useState(true);

  return (
    <>
      {isLoading && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-neutral-200 dark:bg-neutral-800 animate-pulse-slow"
        />
      )}
      <Image
        className={cn(
          "transition duration-300",
          isLoading ? "blur-sm" : "blur-0",
          className
        )}
        onLoad={() => setLoading(false)}
        alt={alt}
        {...props}
      />
    </>
  );
}
