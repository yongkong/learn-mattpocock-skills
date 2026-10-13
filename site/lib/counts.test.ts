import { readFileSync, readdirSync, statSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { FLOW_STEP_COUNT, REFERENCE_SKILL_COUNT, SKILL_COUNT } from "./structure";

/** 用 structure.ts 的计数常量对齐课件散文:出现「N 个技能 / N 步 / N 技能」时数字必须与常量一致。 */
const COUNTS: Array<[RegExp, number, string]> = [
  [new RegExp(`([0-9]+) 个技能`, "g"), SKILL_COUNT, "个技能"],
  [new RegExp(`主流程([0-9]+)步`, "g"), FLOW_STEP_COUNT, "主流程N步"],
  [new RegExp(`参考层([0-9]+)技能`, "g"), REFERENCE_SKILL_COUNT, "参考层N技能"],
  [new RegExp(`([0-9]+)台发动机`, "g"), REFERENCE_SKILL_COUNT, "N台发动机"],
];

/** 扫描范围:content/ 的 mdx/md(词典、课件、速查、实战)——与 site-check 旧词守卫同口径,排除生成物。 */
function collectMdx(dir: string): string[] {
  const acc: string[] = [];
  for (const entry of readdirSync(dir)) {
    const p = `${dir}/${entry}`;
    if (statSync(p).isDirectory()) acc.push(...collectMdx(p));
    else if (/\.(mdx|md)$/.test(entry) && !entry.endsWith(".generated.ts")) acc.push(p);
  }
  return acc;
}

describe("课件散文与结构计数一致", () => {
  const files = collectMdx("content");

  it("扫描到内容文件(防止目录挪走后测试空转)", () => {
    expect(files.length).toBeGreaterThan(20);
  });

  for (const [pattern, expected, label] of COUNTS) {
    it(`${label} 一律为 ${expected}`, () => {
      const wrong: string[] = [];
      for (const file of files) {
        const text = readFileSync(file, "utf-8");
        for (const m of text.matchAll(pattern)) {
          if (Number(m[1]) !== expected) wrong.push(`${file}: 「${m[0]}」≠ ${expected}`);
        }
      }
      expect(wrong).toEqual([]);
    });
  }
});
