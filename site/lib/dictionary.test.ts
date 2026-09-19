import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { loadDictionary } from "@/lib/dictionary";
import type { DictionaryCategory } from "@/content/dictionary/manifest";

/** 译名唯一来源是 MD 的 H1(「# Term · 中文」);manifest 只给分类与排序。 */
const manifest: DictionaryCategory[] = [
  { id: "cat", zh: "分类", en: "Category", terms: ["Token", "Model"] },
];

function makeFixture(files: Record<string, string>): string {
  const dir = mkdtempSync(path.join(tmpdir(), "dict-fixture-"));
  for (const [name, content] of Object.entries(files)) {
    writeFileSync(path.join(dir, name), content, "utf-8");
  }
  return dir;
}

const TOKEN = "# Token · 词元\n\nA token is a chunk of text.\n";
const MODEL = "# Model · 模型\n\nA model does things.\n";

describe("loadDictionary(fixture 注入)", () => {
  it("从 H1 解析译名,manifest 决定分组与排序", () => {
    const dir = makeFixture({ "Token.md": TOKEN, "Model.md": MODEL });
    const sections = loadDictionary({ dir, manifest });
    expect(sections).toHaveLength(1);
    expect(sections[0].id).toBe("cat");
    expect(sections[0].entries.map((e) => [e.term, e.zh])).toEqual([
      ["Token", "词元"],
      ["Model", "模型"],
    ]);
    expect(sections[0].entries[0].html).toContain("<h1");
  });

  it("H1 没有「· 中文」时退化为术语本身", () => {
    const dir = makeFixture({ "Token.md": "# Token\n\nbody\n", "Model.md": MODEL });
    const sections = loadDictionary({ dir, manifest });
    expect(sections[0].entries[0].zh).toBe("Token");
  });

  it("manifest 有而文件缺 → 构建期报错(不再静默)", () => {
    const dir = makeFixture({ "Token.md": TOKEN });
    expect(() => loadDictionary({ dir, manifest })).toThrow(/词条缺失/);
  });

  it("文件有而 manifest 未收 → 报孤儿词条", () => {
    const dir = makeFixture({ "Token.md": TOKEN, "Model.md": MODEL, "Orphan.md": "# Orphan · 孤儿\n" });
    expect(() => loadDictionary({ dir, manifest })).toThrow(/未入 manifest/);
  });

  it("H1 术语与文件名不一致 → 报错", () => {
    const dir = makeFixture({ "Token.md": "# Tocken · 词元\n", "Model.md": MODEL });
    expect(() => loadDictionary({ dir, manifest })).toThrow(/不一致/);
  });
});
