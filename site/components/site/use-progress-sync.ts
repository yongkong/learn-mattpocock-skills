"use client";

import { useEffect } from "react";
import { PROGRESS_EVENT } from "@/lib/progress";

/**
 * 订阅 Progress 变更:挂载时与每次 PROGRESS_EVENT 时重跑 sync。
 * 读取方各自决定读什么(单课读一格,续学读全量),同步惯用法不再各写一遍。
 */
export function useProgressSync(sync: () => void) {
  useEffect(() => {
    sync();
    window.addEventListener(PROGRESS_EVENT, sync);
    return () => window.removeEventListener(PROGRESS_EVENT, sync);
  }, [sync]);
}
