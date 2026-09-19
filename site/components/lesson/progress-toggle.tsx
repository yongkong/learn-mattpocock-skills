"use client";

import { useCallback, useState } from "react";
import { readProgress, writeProgress } from "@/lib/progress";
import { useProgressSync } from "@/components/site/use-progress-sync";

/** 页内进度标记:两态切换,与首页等其他读写方经 PROGRESS_EVENT 保持同步。 */
export function ProgressToggle({ num }: { num: string }) {
  const [done, setDone] = useState<boolean | null>(null);
  const sync = useCallback(() => setDone(readProgress(num)), [num]);
  useProgressSync(sync);

  const toggle = useCallback(() => {
    writeProgress(num, !(done ?? false));
  }, [num, done]);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={done ?? false}
      className={`shrink-0 rounded-full border px-4 py-1.5 font-mono text-sm transition-colors ${
        done
          ? "border-emerald-600 bg-emerald-50 font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
          : "border-border bg-background text-muted-foreground hover:border-amber-600 hover:text-amber-700"
      }`}
    >
      {done ? "已学 ✓" : "未学"}
    </button>
  );
}
