/** Progress(学习进度)模块:两态手动标记,存本浏览器;禁用时静默降级(页面可用、不记忆)。 */
import { LESSONS, lessonHref } from "@/lib/structure";

export const PROGRESS_EVENT = "agentskills-cn:progress-changed";

/** 存储键前缀:一处定义,读写共用。 */
const PREFIX = "agentskills-cn:progress:";
const key = (num: string) => `${PREFIX}${num}`;

/**
 * 独立系列的进度标识:实战系列(Workshop)编号自主从 0001 起,与主课件共用一个键空间,
 * 故读写都带上系列前缀(如 "workshop:0001"),避免与主课 0001–0006 撞号。
 */
export const workshopProgressId = (num: string) => `workshop:${num}`;

type ProgressStore = Pick<Storage, "getItem" | "setItem" | "key" | "length">;

/** 注入点:单测传入内存实现,不必碰 window。 */
const defaultStore = (): ProgressStore | null => (typeof window === "undefined" ? null : window.localStorage);

/** 返回 true(已学)/ false(未学)/ null(未标记或存储不可用)。 */
export function readProgress(num: string, store: ProgressStore | null = defaultStore()): boolean | null {
  if (!store) return null;
  try {
    const v = store.getItem(key(num));
    if (v === "done") return true;
    if (v === "undone") return false;
    return null;
  } catch {
    return null;
  }
}

export function writeProgress(num: string, done: boolean, store: ProgressStore | null = defaultStore()): void {
  if (store) {
    try {
      store.setItem(key(num), done ? "done" : "undone");
    } catch {
      // 存储禁用:静默降级,不记忆
    }
  }
  try {
    window.dispatchEvent(new CustomEvent(PROGRESS_EVENT));
  } catch {
    // 非浏览器环境忽略
  }
}

/** 全量读取(续学按钮用):编号 → 是否已学。 */
export function readAllProgress(store: ProgressStore | null = defaultStore()): Record<string, boolean> {
  const out: Record<string, boolean> = {};
  if (!store) return out;
  try {
    for (let i = 0; i < store.length; i++) {
      const k = store.key(i);
      if (!k?.startsWith(PREFIX)) continue;
      const num = k.slice(PREFIX.length);
      const v = store.getItem(k);
      if (v === "done" || v === "undone") out[num] = v === "done";
    }
  } catch {
    // 存储禁用:视为无进度
  }
  return out;
}

export interface Resume {
  href: string;
  label: string;
}

/** 续学按钮的三态决策:无进度→从第一课开始;有进度→下一门未学;全部已学→完成态。纯函数,单测直测。 */
export function computeResume(progress: Record<string, boolean>): Resume {
  const firstUndone = LESSONS.find((l) => progress[l.num] !== true);
  if (firstUndone) {
    const started = LESSONS.some((l) => progress[l.num] !== undefined);
    return {
      href: lessonHref(firstUndone.num),
      label: started
        ? `继续学习:${firstUndone.num} · ${firstUndone.short}`
        : `从第一课开始:${firstUndone.num} · ${firstUndone.short}`,
    };
  }
  return { href: lessonHref(LESSONS[0].num), label: `全部 ${LESSONS.length} 课已学完 · 随课程更新再来` };
}
