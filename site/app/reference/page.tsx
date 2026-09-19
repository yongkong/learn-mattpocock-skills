import type { Metadata } from "next";
import { AppLink } from "@/components/site/app-link";
import { Kicker } from "@/components/site/kicker";
import { PageShell } from "@/components/site/page-shell";
import { REFERENCES } from "@/content/reference/registry";
import { TOP_LEVELS } from "@/lib/structure";

export const metadata: Metadata = {
  title: "速查",
  description: "工具型参考文档:全局地图、交付物样例,随查随用,不用顺序读。",
};

export default function ReferencePage() {
  return (
    <PageShell width="3xl" className="py-16">
      <Kicker>Reference</Kicker>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">速查</h1>
      <p className="mt-3 text-lg text-muted-foreground">
        工具型文档,随查随用,不用顺序读。术语请去
        <AppLink href={`/${TOP_LEVELS[1].key}`} className="underline underline-offset-4">
          词典
        </AppLink>
        。
      </p>
      <ul className="mt-8 space-y-4">
        {REFERENCES.map((r) => (
          <li key={r.slug}>
            <AppLink
              href={`/reference/${r.slug}`}
              className="block rounded-xl border bg-card p-5 transition-colors hover:border-amber-600/60"
            >
              <p className="font-semibold group-hover:text-amber-700">{r.metaTitle ?? r.heading}</p>
              <p className="mt-1 text-sm text-muted-foreground">{r.indexDesc ?? r.metaDesc ?? r.lede}</p>
            </AppLink>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
