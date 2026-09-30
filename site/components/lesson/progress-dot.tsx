"use client";

import { useCallback, useState } from "react";
import { readProgress } from "@/lib/progress";
import { useProgressSync } from "@/components/site/use-progress-sync";

/** 目录树进度点:实心 emerald = 已学(CI 绿语义),空心 = 未学。
 *  传研发方的进度键(主课件 l.num,实战 workshopProgressId(num))。
 *  首渲染画空心(SSR/客户端一致),effect 后与 localStorage 对齐。 */
export function ProgressDot({ num }: { num: string }) {
  const [done, setDone] = useState(false);
  const sync = useCallback(() => setDone(readProgress(num) ?? false), [num]);
  useProgressSync(sync);

  return (
    <span className="inline-flex items-center">
      <span className="sr-only">{done ? "已学" : "未学"}</span>
      <span
        aria-hidden="true"
        className={`inline-block size-1.5 shrink-0 translate-y-[-1px] rounded-full ${
          done ? "bg-emerald-500" : "border border-border"
        }`}
      />
    </span>
  );
}
