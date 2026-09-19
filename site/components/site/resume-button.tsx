"use client";

import { useCallback, useState } from "react";
import { computeResume, readAllProgress, type Resume } from "@/lib/progress";
import { AppLink } from "@/components/site/app-link";
import { useProgressSync } from "@/components/site/use-progress-sync";
import { LESSONS } from "@/lib/structure";

// 首渲染用确定性默认值(SSR/客户端一致);localStorage 只在 effect 里读,避免 hydration 失配
const INITIAL_RESUME: Resume = {
  href: `/lessons/${LESSONS[0].num}`,
  label: `从第一课开始:${LESSONS[0].num} · ${LESSONS[0].short}`,
};

/** 一行续学按钮:三态决策在 computeResume(纯函数),这里只负责读进度与渲染。 */
export function ResumeButton() {
  const [resume, setResume] = useState<Resume>(INITIAL_RESUME);
  const sync = useCallback(() => setResume(computeResume(readAllProgress())), []);
  useProgressSync(sync);

  return (
    <AppLink
      href={resume.href}
      className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
    >
      {resume.label}
    </AppLink>
  );
}
