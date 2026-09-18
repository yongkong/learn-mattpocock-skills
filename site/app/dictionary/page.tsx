import type { Metadata } from "next";
import { DictionaryBrowser } from "@/components/dictionary/browser";
import { loadDictionary } from "@/lib/dictionary";

export const metadata: Metadata = {
  title: "词典",
  description: "AI 编码核心术语的中文释义:一词一卡,随查随用。",
};

export default function DictionaryPage() {
  const sections = loadDictionary();
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-12">
      <p className="font-mono text-xs uppercase tracking-[0.12em] text-amber-700 dark:text-amber-400">
        Dictionary · 概念课程
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">AI 编码词典</h1>
      <p className="mt-3 text-lg text-muted-foreground">
        一门相对独立的概念课程:AI 编码的核心术语,以自写中文转述、术语与例句保留英文。概念在这里查透,流程在课件里练。
      </p>

      <div className="mt-8">
        <DictionaryBrowser sections={sections} />
      </div>

      <p className="mt-14 border-t pt-6 text-sm text-muted-foreground">
        来源:
        <a
          href="https://github.com/mattpocock/dictionary-of-ai-coding"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4"
        >
          mattpocock/dictionary-of-ai-coding
        </a>{" "}
        ·{" "}
        <a
          href="https://aicodingdictionary.com"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4"
        >
          aicodingdictionary.com
        </a>
        。中文释义为本课程原创转述,随站点以 CC BY-SA 4.0 提供;术语与 Usage
        英文原文版权归原作者(上游仓库未附开源许可),每条保留「原文」链接供对照。
      </p>
    </main>
  );
}
