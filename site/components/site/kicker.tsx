import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** 页首小字(kicker):全站统一的排版,一处定义;要变色用 className 覆盖。 */
export function Kicker({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <p
      className={cn(
        "font-mono text-xs uppercase tracking-[0.12em] text-amber-700 dark:text-amber-400",
        className,
      )}
    >
      {children}
    </p>
  );
}
