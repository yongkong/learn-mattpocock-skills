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

/** 构建期加载全部词条:一词一 MD 文件,marked 解析为 HTML。 */
export function loadDictionary(): DictionarySection[] {
  const dir = path.join(process.cwd(), "content", "dictionary");
  return (DICTIONARY_MANIFEST as DictionaryCategory[]).map((cat) => ({
    id: cat.id,
    zh: cat.zh,
    en: cat.en,
    entries: cat.terms.map((t) => {
      const raw = fs.readFileSync(path.join(dir, `${t.term}.md`), "utf-8");
      const html = marked.parse(raw, { async: false });
      return { term: t.term, zh: t.zh, html };
    }),
  }));
}
