/** Progress 存储基座:两态手动标记,存本浏览器;禁用时静默降级(页面可用、不记忆)。 */

export const PROGRESS_EVENT = "agentskills-cn:progress-changed";

const key = (num: string) => `agentskills-cn:progress:${num}`;

/** 返回 true(已学)/ false(未学)/ null(未标记或存储不可用)。 */
export function readProgress(num: string): boolean | null {
  try {
    const v = localStorage.getItem(key(num));
    if (v === "done") return true;
    if (v === "undone") return false;
    return null;
  } catch {
    return null;
  }
}

export function writeProgress(num: string, done: boolean): void {
  try {
    localStorage.setItem(key(num), done ? "done" : "undone");
  } catch {
    // 存储禁用:静默降级,不记忆
  }
  try {
    window.dispatchEvent(new CustomEvent(PROGRESS_EVENT, { detail: { num, done } }));
  } catch {
    // 非浏览器环境忽略
  }
}

/** 全量读取(续学按钮用):编号 → 是否已学。 */
export function readAllProgress(): Record<string, boolean> {
  const out: Record<string, boolean> = {};
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (!k?.startsWith("agentskills-cn:progress:")) continue;
      const num = k.slice("agentskills-cn:progress:".length);
      const v = localStorage.getItem(k);
      if (v === "done" || v === "undone") out[num] = v === "done";
    }
  } catch {
    // 存储禁用:视为无进度
  }
  return out;
}
