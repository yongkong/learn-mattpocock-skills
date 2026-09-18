"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PROGRESS_EVENT, readAllProgress } from "@/lib/progress";
import { LESSONS } from "@/lib/structure";

type Resume = { href: string; label: string };

function computeResume(): Resume {
  const progress = readAllProgress();
  const firstUndone = LESSONS.find((l) => progress[l.num] !== true);
  if (firstUndone) {
    const started = LESSONS.some((l) => progress[l.num] !== undefined);
    return {
      href: `/lessons/${firstUndone.num}`,
      label: started
        ? `继续学习:${firstUndone.num} · ${firstUndone.short}`
        : `从第一课开始:${firstUndone.num} · ${firstUndone.short}`,
    };
  }
  return { href: "/lessons/0001", label: `全部 ${LESSONS.length} 课已学完 · 随课程更新再来` };
}

/** 一行续学按钮:无进度→从第一课开始;有进度→下一门未学;全部已学→完成态。 */
export function ResumeButton() {
  // 首渲染用确定性默认值(SSR/客户端一致);localStorage 只在 effect 里读,避免 hydration 失配
  const [resume, setResume] = useState<Resume>({
    href: "/lessons/0001",
    label: `从第一课开始:0001 · ${LESSONS[0].short}`,
  });

  useEffect(() => {
    const sync = () => setResume(computeResume());
    sync();
    window.addEventListener(PROGRESS_EVENT, sync);
    return () => window.removeEventListener(PROGRESS_EVENT, sync);
  }, []);

  return (
    <Link prefetch={false}
      href={resume.href}
      className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
    >
      {resume.label}
    </Link>
  );
}
