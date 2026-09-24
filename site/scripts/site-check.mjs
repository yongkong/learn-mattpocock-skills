#!/usr/bin/env node
/**
 * 站点检查:对构建产物 out/ 执行五类检查。
 * 禁语清单是数据(取自 docs/register.md 三类禁语与口语词表),清单更新即检查范围更新。
 * 站名与内容路由(课件/速查)读 content/lessons/manifest.generated.json——与站点同一来源,
 * 本脚本不再手抄任何事实。测验数据的有效性在构建期由 content/quiz/check.generated.ts 把关。
 * 用法:先 `npm run build`(会先自动跑 gen 生成 manifest),再 `npm run check:site`。
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(siteRoot, "out");

const manifestPath = path.join(siteRoot, "content", "lessons", "manifest.generated.json");
if (!fs.existsSync(manifestPath)) {
  console.error("✗ 未找到 manifest.generated.json,请先 npm run build(或 npm run gen)");
  process.exit(1);
}
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
const SITE_NAME = manifest.siteName;

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

/** 站点契约:必须存在的公开路由(静态导出为 <route>.html)。
 *  顶级路由近乎不变,列在这里;课件与速查来自 manifest.generated.json(与内容文件同源)。 */
const STATIC_ROUTES = [
  { route: "/", file: "index.html" },
  { route: "/about", file: "about.html" },
  { route: "/dictionary", file: "dictionary.html" },
  { route: "/reference", file: "reference.html" },
  { route: "/workshop", file: "workshop.html" },
];
const CONTENT_ROUTES = [
  ...manifest.referenceSlugs.map((s) => ({ route: `/reference/${s}`, file: `reference/${s}.html` })),
  ...manifest.lessonNums.map((n) => ({ route: `/lessons/${n}`, file: `lessons/${n}.html` })),
  ...(manifest.workshopNums ?? []).map((n) => ({ route: `/workshop/${n}`, file: `workshop/${n}.html` })),
];
const EXPECTED_ROUTES = [...STATIC_ROUTES, ...CONTENT_ROUTES];

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
    if (entry.isDirectory()) {
      if (entry.name.startsWith("__next")) continue; // RSC payload 目录,非页面
      acc.push(...collectHtml(p));
    } else if (entry.name.endsWith(".html")) acc.push(p);
  }
  return acc;
}

function routeOf(htmlPath) {
  const rel = path.relative(outDir, htmlPath).replaceAll("\\", "/");
  if (rel === "index.html") return "/";
  if (rel.endsWith("404.html") || rel.includes("_not-found")) return "/404";
  return "/" + rel.replace(/index\.html$/, "").replace(/\.html$/, "");
}

function resolveInternal(href) {
  if (!href.startsWith("/")) return null; // 外链与锚点不查文件系统
  const clean = href.split("#")[0].split("?")[0];
  if (clean === "" || clean === "/") return path.join(outDir, "index.html");
  const bare = path.join(outDir, clean);
  for (const candidate of [`${bare}.html`, path.join(bare, "index.html"), bare]) {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) return candidate;
  }
  return null;
}

console.log(`站点检查:对 ${outDir} 执行`);

if (!fs.existsSync(outDir)) {
  console.error("✗ 未找到构建产物 out/,请先 npm run build");
  process.exit(1);
}

const htmlFiles = collectHtml(outDir);

// 1. 路由契约(顶级手列 + 课件/速查来自 manifest,与内容文件同源)
{
  const missing = EXPECTED_ROUTES.filter((r) => !fs.existsSync(path.join(outDir, r.file)));
  if (missing.length === 0) {
    ok(`路由契约:${EXPECTED_ROUTES.length} 条公开路由全部存在(${CONTENT_ROUTES.length} 条内容路由来自 manifest)`);
  } else {
    fail("路由契约", missing.map((r) => `缺少 ${r.route}(${r.file})`));
  }
}

// 2. 链接完整性
{
  const dead = [];
  for (const file of htmlFiles) {
    const html = fs.readFileSync(file, "utf-8");
    for (const m of html.matchAll(/href="([^"]*)"/g)) {
      const href = m[1];
      if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("#")) continue;
      if (!resolveInternal(href)) dead.push(`${routeOf(file)} → ${href}`);
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
    const m = routeOf(file).match(/^\/lessons\/(\d{4})$/);
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

// (原第 6 类已删除:测验答案分布改由构建期 validateQuiz 把关(content/quiz/check.generated.ts),
//  内容文件↔路由一致由第 1 类的 manifest 路由契约覆盖——两者都不再依赖刮取 HTML。)

console.log("");
if (problems.length === 0) {
  console.log("全部通过 ✓");
  process.exit(0);
}
console.error(`未通过:${problems.join("、")}`);
process.exit(1);
