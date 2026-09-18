#!/usr/bin/env node
/**
 * 站点检查:对构建产物 out/ 执行六类检查。
 * 禁语清单是数据(取自 docs/register.md 三类禁语与口语词表),清单更新即检查范围更新。
 * 用法:先 `npm run build`,再 `npm run check:site`。
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(siteRoot, "out");
const SITE_NAME = "Agent Skills 中文课";

/** 三类禁语(作者私指 / 会话耦合 / 时点与沙盒)+ 高频口语词。 */
const FORBIDDEN = [
  "使命",
  "问你的老师",
  "问老师",
  "对话里问",
  "今日首读",
  "本仓库",
  ".scratch",
  "彩蛋级",
  "白做",
  "挑毛病",
  "发车",
];

/** 站点契约:必须存在的公开路由。 */
const EXPECTED_ROUTES = [
  "/",
  "/about/",
  "/dictionary/",
  "/reference/",
  "/reference/skill-flow-map/",
  "/reference/artifact-shapes/",
];

const problems = [];
const ok = (name) => console.log(`  ✓ ${name}`);
const fail = (name, details) => {
  console.error(`  ✗ ${name}`);
  for (const d of details) console.error(`    - ${d}`);
  problems.push(name);
};

function collectHtml(dir) {
  const acc = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) acc.push(...collectHtml(p));
    else if (entry.name.endsWith(".html")) acc.push(p);
  }
  return acc;
}

function routeOf(htmlPath) {
  const rel = path.relative(outDir, htmlPath).replaceAll("\\", "/");
  if (rel === "index.html") return "/";
  return "/" + rel.replace(/index\.html$/, "").replace(/\.html$/, "");
}

function resolveInternal(href) {
  if (!href.startsWith("/")) return null; // 外链与锚点另行处理
  const clean = href.split("#")[0].split("?")[0];
  if (clean === "") return null;
  const target = path.join(outDir, clean);
  if (fs.existsSync(target) && fs.statSync(target).isFile()) return target;
  return path.join(target, "index.html");
}

console.log(`站点检查:对 ${outDir} 执行`);

if (!fs.existsSync(outDir)) {
  console.error("✗ 未找到构建产物 out/,请先 npm run build");
  process.exit(1);
}

const htmlFiles = collectHtml(outDir);

// 1. 路由契约
{
  const missing = EXPECTED_ROUTES.filter((r) => !fs.existsSync(path.join(outDir, r, "index.html")));
  if (missing.length === 0) ok(`路由契约:${EXPECTED_ROUTES.length} 条公开路由全部存在`);
  else fail("路由契约", missing.map((r) => `缺少 ${r}`));
}

// 2. 链接完整性(含 404 页自身)
{
  const dead = [];
  for (const file of htmlFiles) {
    const html = fs.readFileSync(file, "utf-8");
    for (const m of html.matchAll(/href="([^"]*)"/g)) {
      const href = m[1];
      if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("#")) continue;
      const target = resolveInternal(href);
      if (target && !fs.existsSync(target)) {
        dead.push(`${routeOf(file)} → ${href}`);
      }
    }
  }
  if (dead.length === 0) ok(`链接完整性:${htmlFiles.length} 页内部链接全部可达`);
  else fail("链接完整性", dead);
}

// 3. 站点壳(页头四入口 + 非官方徽章 + 页脚许可)与死胡同防护
{
  const noShell = [];
  const deadEnd = [];
  for (const file of htmlFiles) {
    const html = fs.readFileSync(file, "utf-8");
    if (!html.includes("非官方") || !html.includes('aria-label="站点导航"') || !html.includes("CC BY-SA 4.0")) {
      noShell.push(routeOf(file));
    }
    const m = routeOf(file).match(/^\/lessons\/(\d{4})\/$/);
    if (m && !html.includes("上一课") && !html.includes("下一课")) {
      deadEnd.push(routeOf(file));
    }
  }
  if (noShell.length === 0) ok("站点壳:全部页面含页头徽章/四入口与页脚许可");
  else fail("站点壳缺失", noShell);
  if (deadEnd.length === 0) ok("死胡同防护:每个课件页都有翻课链接");
  else fail("死胡同", deadEnd);
}

// 4. 标题模式:每页标题含站名
{
  const bad = [];
  for (const file of htmlFiles) {
    const m = fs.readFileSync(file, "utf-8").match(/<title>([^<]*)<\/title>/);
    if (!m || !m[1].includes(SITE_NAME)) bad.push(routeOf(file));
  }
  if (bad.length === 0) ok(`标题:全部页面标题含「${SITE_NAME}」`);
  else fail("标题模式", bad.map((r) => `${r} 缺站名`));
}

// 5. 语域禁语(数据驱动)
{
  const hits = [];
  for (const file of htmlFiles) {
    const html = fs.readFileSync(file, "utf-8");
    for (const word of FORBIDDEN) {
      if (html.includes(word)) hits.push(`${routeOf(file)} 命中「${word}」`);
    }
  }
  if (hits.length === 0) ok(`语域禁语:${FORBIDDEN.length} 个禁语模式全站零命中`);
  else fail("语域禁语", hits);
}

// 6. 测验答案分布 + 内容文件↔路由一致
{
  const constant = [];
  for (const file of htmlFiles) {
    const answers = [...fs.readFileSync(file, "utf-8").matchAll(/answer\\?":(\d+)/g)].map((m) => m[1]);
    if (answers.length >= 3 && new Set(answers).size === 1) {
      constant.push(`${routeOf(file)} 全部答案同在下标 ${answers[0]}(${answers.length} 题)`);
    }
  }
  if (constant.length === 0) ok("测验答案:各套正确项下标非恒定");
  else fail("测验答案分布", constant);

  const quizNums = fs
    .readdirSync(path.join(siteRoot, "content", "quiz"))
    .map((f) => f.match(/^(\d{4})\.ts$/)?.[1])
    .filter(Boolean)
    .sort();
  const builtLessons = fs
    .readdirSync(path.join(outDir, "lessons"), { withFileTypes: true })
    .filter((e) => e.isDirectory() && /^\d{4}$/.test(e.name))
    .map((e) => e.name)
    .sort();
  const a = quizNums.join(",");
  const b = builtLessons.join(",");
  if (a === b) ok(`结构一致:课件路由与内容文件一一对应(${builtLessons.join(" / ")})`);
  else fail("结构一致", [`quiz 数据文件: [${a}]`, `构建产物课件: [${b}]`]);
}

console.log("");
if (problems.length === 0) {
  console.log("全部通过 ✓");
  process.exit(0);
}
console.error(`未通过:${problems.join("、")}`);
process.exit(1);
