import type { Metadata } from "next";
import Link from "next/link";
import { TOP_LEVELS } from "@/lib/structure";

export const metadata: Metadata = {
  title: "速查",
  description: "工具型参考文档:全局地图、交付物样例,随查随用,不用顺序读。",
};

const ITEMS = [
  {
    href: "/reference/skill-flow-map",
    title: "全局地图(可打印)",
    desc: "25 个技能的分模块清单 + 情境路由表。打印出来贴在手边。",
  },
  {
    href: "/reference/artifact-shapes",
    title: "spec 与工单长什么样",
    desc: "主流程交接物的真实格式:spec 骨架、工单模板、竖切规则。",
  },
];

export default function ReferencePage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-[0.12em] text-amber-700 dark:text-amber-400">
        Reference
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">速查</h1>
      <p className="mt-3 text-lg text-muted-foreground">
        工具型文档,随查随用,不用顺序读。术语请去
        <Link prefetch={false} href={`/${TOP_LEVELS[1].key}`} className="underline underline-offset-4">
          词典
        </Link>
        。
      </p>
      <ul className="mt-8 space-y-4">
        {ITEMS.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="block rounded-xl border bg-card p-5 transition-colors hover:border-amber-600/60"
            >
              <p className="font-semibold group-hover:text-amber-700">{item.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
