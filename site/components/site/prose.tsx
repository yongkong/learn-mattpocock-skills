import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

/** 正文排版壳:标题/表格/代码块/列表的统一样式,课件页与速查页共用。 */
export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="[&_h2]:mt-12 [&_h2]:border-t [&_h2]:pt-6 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h3]:mt-6 [&_h3]:text-base [&_h3]:font-semibold [&_table]:mt-6 [&_table]:w-full [&_table]:text-sm [&_th]:border-b [&_th]:py-2 [&_th]:pr-4 [&_th]:text-left [&_th]:font-mono [&_th]:text-xs [&_th]:font-semibold [&_th]:uppercase [&_th]:tracking-wide [&_th]:text-muted-foreground [&_td]:border-b [&_td]:py-2 [&_td]:pr-4 [&_td]:align-top [&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.86em] [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:border [&_pre]:bg-muted [&_pre]:p-4 [&_pre]:text-sm [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_ul_li]:mt-1 [&_ol_li]:mt-1">
      {children}
    </div>
  );
}

/** marked 产出的 HTML 容器(词典弹层等非 MDX 管线的富文本):排版变体收在这里,不再散落调用方。 */
export function MarkedHtml({ html, className, ...rest }: HTMLAttributes<HTMLElement> & { html: string }) {
  return (
    <article
      {...rest}
      className={cn(
        "[&_a]:underline [&_a]:underline-offset-4 [&_em]:not-italic [&_em]:text-amber-700 dark:[&_em]:text-amber-400 [&_h1]:text-lg [&_h1]:font-semibold [&_li]:mt-1 [&_p]:my-3 [&_strong]:font-semibold",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
