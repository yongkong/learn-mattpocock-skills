"use client";

import { useState } from "react";
import { AppLink } from "@/components/site/app-link";

/** 章节 → 两种语言各自的文件(同名不同目录,由 sync-course-html.mjs 注入 public);公开部署无此内容。 */
const CHAPTERS = [
  { file: "01-before-start.html", label: "01 · Before You Start", cn: "准备" },
  { file: "02-concepts.html", label: "02 · Concepts", cn: "核心概念" },
  { file: "03-getting-to-know-claude-code.html", label: "03 · Claude Code", cn: "认识 Claude Code" },
  { file: "04-fundamentals.html", label: "04 · Fundamentals", cn: "基础工作流" },
  { file: "05-steering.html", label: "05 · Steering", cn: "转向控制" },
  { file: "06-shipping.html", label: "06 · Shipping", cn: "大型交付" },
];

type Lang = "zh" | "en";

export function CourseHtmlReader() {
  const [current, setCurrent] = useState(CHAPTERS[0].file);
  const [lang, setLang] = useState<Lang>("zh");
  const src =
    lang === "zh" ? `/crash-course-html-zh/${current}` : `/crash-course-html/${current}`;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <AppLink href="/workshop" className="text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground">
          ← 返回
        </AppLink>
        <h1 className="text-sm font-semibold tracking-tight">AI Coding Crash Course · 课程讲稿</h1>
        <span className="text-xs text-muted-foreground">付费课程内容 · 仅私有部署可读(需登录),公开站点不含此内容</span>
        <nav aria-label="语言切换" className="ml-auto flex gap-1.5">
          {(
            [
              ["zh", "中文"],
              ["en", "English"],
            ] as Array<[Lang, string]>
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setLang(value)}
              aria-pressed={lang === value}
              className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                lang === value
                  ? "border-emerald-600 bg-emerald-50 font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                  : "border-border bg-background text-muted-foreground hover:border-amber-600 hover:text-amber-700"
              }`}
            >
              {label}
            </button>
          ))}
        </nav>
      </div>

      <nav aria-label="章节切换" className="mt-2 flex flex-wrap gap-1.5">
        {CHAPTERS.map((f) => (
          <button
            key={f.file}
            type="button"
            onClick={() => setCurrent(f.file)}
            aria-pressed={current === f.file}
            title={f.cn}
            className={`rounded-full border px-3 py-1 font-mono text-xs transition-colors ${
              current === f.file
                ? "border-amber-600 bg-amber-50 font-semibold text-amber-700 dark:bg-amber-950/40 dark:text-amber-400"
                : "border-border bg-background text-muted-foreground hover:border-amber-600 hover:text-amber-700"
            }`}
          >
            {f.label}
          </button>
        ))}
      </nav>

      <iframe
        key={`${lang}-${current}`}
        src={src}
        title="AI Coding Crash Course 讲稿内容"
        className="mt-3 h-[calc(100vh-8.5rem)] min-h-[28rem] w-full rounded-xl border bg-[#fafafa]"
      />
    </div>
  );
}
