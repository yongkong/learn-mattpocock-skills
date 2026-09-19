import type { ReactNode } from "react";

const WIDTHS = {
  "3xl": "max-w-3xl",
  "4xl": "max-w-4xl",
  "6xl": "max-w-6xl",
} as const;

/** 页面壳:main 容器的宽度与留白,全站页面统一从这里开(纵向节奏用 className 传 py-*)。 */
export function PageShell({
  width,
  className,
  children,
}: {
  width: keyof typeof WIDTHS;
  className?: string;
  children: ReactNode;
}) {
  return (
    <main className={`mx-auto w-full ${WIDTHS[width]} flex-1 px-6 ${className ?? ""}`}>{children}</main>
  );
}
