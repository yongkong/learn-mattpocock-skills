import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";
import {
  DICTIONARY_MANIFEST,
  type DictionaryCategory,
} from "@/content/dictionary/manifest";

export interface DictionaryEntry {
  term: string;
  zh: string;
  html: string;
}

export interface DictionarySection {
  id: string;
  zh: string;
  en: string;
  entries: DictionaryEntry[];
}

/** 译名的唯一来源是各 MD 首行 H1:「# Term · 中文」。 */
const H1_RE = /^#\s+(.+?)(?:\s+·\s+(.+))?$/;

function parseH1(raw: string, file: string): { term: string; zh: string } {
  const line = raw.split("\n").find((l) => l.startsWith("# "));
  if (!line) throw new Error(`${file}: 缺少 H1 标题(格式:# Term · 中文)`);
  const m = line.match(H1_RE);
  if (!m) throw new Error(`${file}: H1 不符合「# Term · 中文」格式:${line}`);
  return { term: m[1].trim(), zh: (m[2] ?? m[1]).trim() };
}

/**
 * 构建期加载全部词条:manifest 只管分类与排序,译名从 MD 的 H1 解析(不再双写)。
 * dir/manifest 可注入:单测指向 fixture,不必碰真实内容。
 * 两类漂移都会在构建期报错,不再静默:manifest 有而文件缺、文件有而 manifest 未收。
 */
export function loadDictionary(opts?: { dir?: string; manifest?: DictionaryCategory[] }): DictionarySection[] {
  const manifest = opts?.manifest ?? DICTIONARY_MANIFEST;
  const dir = opts?.dir ?? path.join(process.cwd(), "content", "dictionary");

  const claimed = new Set<string>();
  const sections = manifest.map((cat) => ({
    id: cat.id,
    zh: cat.zh,
    en: cat.en,
    entries: cat.terms.map((term) => {
      claimed.add(term);
      const file = path.join(dir, `${term}.md`);
      let raw: string;
      try {
        raw = fs.readFileSync(file, "utf-8");
      } catch {
        throw new Error(`词典词条缺失:content/dictionary/${term}.md 在 manifest(${cat.id})中但没有对应文件`);
      }
      const { term: h1Term, zh } = parseH1(raw, file);
      if (h1Term !== term) {
        throw new Error(`词典词条 ${file}: H1 术语「${h1Term}」与文件名/manifest「${term}」不一致`);
      }
      const html = marked.parse(raw, { async: false });
      return { term, zh, html };
    }),
  }));

  const orphans = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""))
    .filter((t) => !claimed.has(t));
  if (orphans.length > 0) {
    throw new Error(`词典词条未入 manifest(不会出现在站点上):${orphans.join("、")}`);
  }
  return sections;
}
