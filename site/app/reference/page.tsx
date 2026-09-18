import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "速查",
  description: "工具型参考文档:全局地图、交付物样例,随查随用。",
};

export default function ReferencePage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-[0.12em] text-amber-700 dark:text-amber-400">
        Reference
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">速查</h1>
      <p className="mt-4 text-muted-foreground">
        速查页施工中:全局地图(可打印)与交付物样例将在这里随查随用。
      </p>
    </main>
  );
}
