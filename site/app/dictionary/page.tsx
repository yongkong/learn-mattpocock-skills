import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "词典",
  description: "AI 编码核心术语的中文释义,一词一卡,随查随用。",
};

export default function DictionaryPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-[0.12em] text-amber-700 dark:text-amber-400">
        Dictionary
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">词典</h1>
      <p className="mt-4 text-muted-foreground">词典施工中:AI 编码核心术语的中文释义将在这里一词一卡、随查随用。</p>
    </main>
  );
}
