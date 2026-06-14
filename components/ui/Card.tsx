"use client";

import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-card border border-primary/10 p-6 transition-all duration-300 card-lift",
        hover && "hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardIcon({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
      {children}
    </div>
  );
}
