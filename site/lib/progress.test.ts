import { describe, expect, it } from "vitest";
import { computeResume, readAllProgress, readProgress, writeProgress } from "@/lib/progress";
import { LESSONS } from "@/lib/structure";

/** 内存版 Storage,模拟浏览器 localStorage。 */
function fakeStore(entries: Record<string, string> = {}) {
  const map = new Map(Object.entries(entries));
  return {
    getItem: (k: string) => map.get(k) ?? null,
    setItem: (k: string, v: string) => void map.set(k, v),
    get length() {
      return map.size;
    },
    key: (i: number) => [...map.keys()][i] ?? null,
  };
}

describe("progress 读写", () => {
  it("键名带前缀,写读往返", () => {
    const store = fakeStore();
    writeProgress("0002", true, store);
    expect(store.getItem("agentskills-cn:progress:0002")).toBe("done");
    expect(readProgress("0002", store)).toBe(true);
  });

  it("未标记与坏值都读作 null", () => {
    const store = fakeStore({ "agentskills-cn:progress:0003": " garbage " });
    expect(readProgress("0003", store)).toBeNull();
    expect(readProgress("9999", store)).toBeNull();
  });

  it("全量读取只认本站前缀", () => {
    const store = fakeStore({
      "agentskills-cn:progress:0001": "done",
      "agentskills-cn:progress:0002": "undone",
      "other-app:key": "done",
    });
    expect(readAllProgress(store)).toEqual({ "0001": true, "0002": false });
  });

  it("无存储时静默降级:读 null、写不抛", () => {
    expect(readProgress("0001", null)).toBeNull();
    expect(readAllProgress(null)).toEqual({});
    expect(() => writeProgress("0001", true, null)).not.toThrow();
  });
});

describe("computeResume 三态", () => {
  it("无进度 → 从第一课开始", () => {
    const r = computeResume({});
    expect(r.href).toBe("/lessons/0001");
    expect(r.label).toContain("从第一课开始");
  });

  it("部分进度 → 下一门未学,标签是「继续学习」", () => {
    const r = computeResume({ "0001": true });
    expect(r.href).toBe("/lessons/0002");
    expect(r.label).toContain("继续学习");
  });

  it("标记为未学也算已开始", () => {
    expect(computeResume({ "0001": false }).label).toContain("继续学习");
  });

  it("全部已学 → 完成态", () => {
    const all = Object.fromEntries(LESSONS.map((l) => [l.num, true]));
    const r = computeResume(all);
    expect(r.label).toContain(`全部 ${LESSONS.length} 课已学完`);
  });
});
