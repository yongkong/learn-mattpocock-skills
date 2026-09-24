"use client";

import { useState } from "react";
import { AppLink } from "@/components/site/app-link";
import { Kicker } from "@/components/site/kicker";

/** 原文 HTML 相对 public/crash-course-html/ 的路径与展示名;文件由 sync-course-html.mjs 同步,公开部署无此内容。 */
const FILES = [
  { file: "01-before-start.html", label: "01 · Before You Start", cn: "准备" },
  { file: "02-concepts.html", label: "02 · Concepts", cn: "核心概念" },
  { file: "03-getting-to-know-claude-code.html", label: "03 · Claude Code", cn: "认识 Claude Code" },
  { file: "04-fundamentals.html", label: "04 · Fundamentals", cn: "基础工作流" },
  { file: "05-steering.html", label: "05 · Steering", cn: "转向控制" },
  { file: "06-shipping.html", label: "06 · Shipping", cn: "大型交付" },
];

export function CourseHtmlReader() {
  const [current, setCurrent] = useState(FILES[0].file);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Kicker>原文 · Official Reader</Kicker>
        <AppLink href="/workshop" className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground">
          ← 返回实战系列
        </AppLink>
      </div>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight">AI Coding Crash Course · 官方原文</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        英文原稿,仅本地个人学习使用(此页内容不随公开站点分发)。中文笔记见
        <AppLink href="/workshop" className="mx-1 underline underline-offset-4">
          实战系列
        </AppLink>
        。
      </p>

      <nav aria-label="章节切换" className="mt-5 flex flex-wrap gap-2">
        {FILES.map((f) => (
          <button
            key={f.file}
            type="button"
            onClick={() => setCurrent(f.file)}
            aria-pressed={current === f.file}
            title={f.cn}
            className={`rounded-full border px-4 py-1.5 font-mono text-sm transition-colors ${
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
        key={current}
        src={`/crash-course-html/${current}`}
        title="AI Coding Crash Course 原文内容"
        className="mt-4 h-[calc(100vh-16rem)] min-h-[32rem] w-full rounded-xl border bg-[#0f1117]"
      />
    </div>
  );
}
