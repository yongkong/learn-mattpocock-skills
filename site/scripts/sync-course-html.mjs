#!/usr/bin/env node
/**
 * 把本地《AI Coding Crash Course》原文 HTML 同步进 public/crash-course-html/,
 * 供 /workshop/read 原文阅读页 iframe 加载。源目录不入库(.gitignore),
 * 公开部署天然没有这份内容——源不存在时静默跳过,构建不受影响。
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = path.resolve(siteRoot, "..", "AI_Coding_Crash_Course", "AI Coding Crash Course HTML");
const destDir = path.join(siteRoot, "public", "crash-course-html");

if (!fs.existsSync(srcDir)) {
  console.log("  · 未找到课程原文 HTML(公开仓库不含此内容),跳过原文同步");
  process.exit(0);
}

fs.mkdirSync(destDir, { recursive: true });
const sources = fs.readdirSync(srcDir).filter((f) => f.endsWith(".html"));
for (const f of sources) {
  fs.copyFileSync(path.join(srcDir, f), path.join(destDir, f));
}
// 源里已删除的旧文件同步清掉,避免目标目录积陈货
for (const f of fs.readdirSync(destDir)) {
  if (f.endsWith(".html") && !sources.includes(f)) fs.unlinkSync(path.join(destDir, f));
}
console.log(`  ✓ 同步课程原文 ${sources.length} 个 HTML → public/crash-course-html/`);
