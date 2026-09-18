import type { ReactNode } from "react";

/** 课件正文元素:与 shadcn 设计语言同源,供全部课件 MDX 复用。 */

export function Callout({ children }: { children: ReactNode }) {
  return (
    <div className="my-6 rounded-r-lg border-l-4 border-amber-600 bg-amber-50 px-5 py-4 dark:bg-amber-950/40 [&>p]:my-1">
      {children}
    </div>
  );
}

export function Cite({ children }: { children: ReactNode }) {
  return <span className="text-sm text-muted-foreground">{children}</span>;
}

export function Flow({ children }: { children: ReactNode }) {
  return <ol className="my-8 ml-3 list-none space-y-6 border-l-2 border-border p-0">{children}</ol>;
}

export function Step({ cmd, children }: { cmd: string; children: ReactNode }) {
  return (
    <li className="relative pl-8 before:absolute before:-left-[7px] before:top-1.5 before:size-3 before:rounded-full before:border-2 before:border-amber-600 before:bg-background">
      <code className="font-mono font-bold text-amber-700 dark:text-amber-400">{cmd}</code>
      <span className="mt-1 block text-sm text-muted-foreground">{children}</span>
    </li>
  );
}

export function Cards({ children }: { children: ReactNode }) {
  return <div className="my-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{children}</div>;
}

export function Card({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children?: ReactNode;
}) {
  return (
    <div className="rounded-xl border bg-card p-5 text-card-foreground">
      <h3 className="mb-1 text-base font-semibold">{title}</h3>
      {hint ? <p className="text-sm text-muted-foreground">{hint}</p> : null}
      {children ? <div className="mt-2 text-sm [&_li]:mt-0.5">{children}</div> : null}
    </div>
  );
}
