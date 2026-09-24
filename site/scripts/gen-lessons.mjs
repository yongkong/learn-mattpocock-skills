#!/usr/bin/env node
/**
 * 内容注册表生成器:课件的元数据、正文挂载与测验数据均以 content/ 里的文件为唯一来源,
 * 本脚本在 predev/prebuild 时派生出六个生成物,手写注册表一律不存在:
 *
 *   content/lessons/registry.generated.ts   主课件编号 → 元数据(供 lib/structure.ts 再导出)
 *   content/lessons/bodies.generated.ts     主课件编号 → MDX 正文组件(仅供课件页使用)
 *   content/workshop/registry.generated.ts  实战系列编号 → 元数据(独立系列,编号自主从 0001 起)
 *   content/workshop/bodies.generated.ts    实战系列编号 → MDX 正文组件
 *   content/quiz/check.generated.ts         构建期跑 validateQuiz,坏测验数据让构建失败
 *   content/lessons/manifest.generated.json 供 scripts/site-check.mjs(.mjs 不能 import TS)
 *
 * 新增主课件 = 建 content/lessons/000N.mdx(frontmatter)+ content/quiz/000N.ts,零注册表改动;
 * 实战系列同理:目录 content/workshop/,测验 content/quiz/workshop/000N.ts(导出 workshopQuiz000N)。
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const lessonsDir = path.join(siteRoot, "content", "lessons");
const workshopDir = path.join(siteRoot, "content", "workshop");
const quizDir = path.join(siteRoot, "content", "quiz");
const workshopQuizDir = path.join(quizDir, "workshop");
const referenceDir = path.join(siteRoot, "content", "reference");
const structurePath = path.join(siteRoot, "lib", "structure.ts");

const GENERATED_HEADER = "// 本文件由 scripts/gen-lessons.mjs 生成(predev/prebuild),请勿手改。\n";
const REQUIRED_FIELDS = ["num", "short", "title", "lede", "module"];

function fail(msg) {
  console.error(`✗ ${msg}`);
  process.exit(1);
}

function readSeries(dir, label) {
  const files = fs.readdirSync(dir).filter((f) => /^\d{4}\.mdx$/.test(f)).sort();
  if (files.length === 0) fail(`${label}: ${dir} 下没有课件 MDX`);
  const lessons = [];
  for (const file of files) {
    const num = file.slice(0, 4);
    const { data } = matter(fs.readFileSync(path.join(dir, file), "utf-8"));
    const missing = REQUIRED_FIELDS.filter((k) => data[k] === undefined || data[k] === "");
    if (missing.length > 0) fail(`${label}/${file}: frontmatter 缺字段 ${missing.join("、")}`);
    if (typeof data.num !== "string" || typeof data.short !== "string" || typeof data.title !== "string" || typeof data.lede !== "string") {
      fail(`${label}/${file}: frontmatter 字段类型不对(num/short/title/lede 需为字符串)`);
    }
    if (data.num !== num) fail(`${label}/${file}: frontmatter num(${data.num}) 与文件名不一致`);
    lessons.push({ num, short: data.short, title: data.title, lede: data.lede, module: data.module });
  }
  return lessons;
}

function quizExportName(num, dir, pattern, label) {
  const file = path.join(dir, `${num}.ts`);
  if (!fs.existsSync(file)) return null;
  const m = fs.readFileSync(file, "utf-8").match(pattern);
  if (!m) fail(`${label}/${num}.ts: 未找到匹配 ${pattern} 的导出`);
  return m[1];
}

/** 一个系列的主课件 ↔ 测验数据必须一一对应(孤儿数据、缺测验都是构建期错误)。 */
function pairQuizzes(lessons, dir, pattern, label) {
  for (const f of fs.readdirSync(dir).filter((f) => /^\d{4}\.ts$/.test(f) && !f.endsWith(".generated.ts"))) {
    const num = f.slice(0, 4);
    if (!lessons.some((l) => l.num === num)) fail(`${label}/${f}: 没有对应的课件 ${num}.mdx(孤儿测验数据)`);
  }
  const names = new Map();
  for (const l of lessons) {
    const name = quizExportName(l.num, dir, pattern, label);
    if (name) names.set(l.num, name);
  }
  const missing = lessons.filter((l) => !names.has(l.num)).map((l) => l.num);
  if (missing.length > 0) fail(`${label}:每节课都需要一份测验(当前缺:${missing.join("、")})`);
  return names;
}

function write(rel, text) {
  fs.writeFileSync(path.join(siteRoot, rel), text, "utf-8");
  console.log(`  ✓ 生成 ${rel}`);
}

function registryFile(varName, lessons, typeImportFrom, label) {
  return (
    GENERATED_HEADER +
    `import type { LessonEntry } from "${typeImportFrom}";

/** ${label}课件元数据,来源:各 MDX 的 frontmatter。顺序即系列顺序。 */
export const ${varName}: LessonEntry[] = ${JSON.stringify(lessons, null, 2)};
`
  );
}

function bodiesFile(varName, lessons) {
  const bodyImports = lessons.map((l) => `import Lesson${l.num} from "./${l.num}.mdx";`).join("\n");
  const bodyEntries = lessons.map((l) => `  "${l.num}": { Body: Lesson${l.num} }`).join(",\n");
  return (
    GENERATED_HEADER +
    `import type { ComponentType } from "react";
${bodyImports}

export interface LessonBody {
  Body: ComponentType;
}

/** 正文注册表:编号 → MDX 正文。元数据见同目录 registry.generated.ts。 */
export const ${varName}: Record<string, LessonBody> = {
${bodyEntries},
};
`
  );
}

const lessons = readSeries(lessonsDir, "lessons");
const quizNames = pairQuizzes(lessons, quizDir, /export const (quiz\d{4})\b/, "content/quiz");

const workshop = readSeries(workshopDir, "workshop");
const workshopQuizNames = pairQuizzes(workshop, workshopQuizDir, /export const (workshopQuiz\d{4})\b/, "content/quiz/workshop");

// 1+2. 元数据与正文注册表(纯数据,可被安全引入)
write("content/lessons/registry.generated.ts", registryFile("LESSONS", lessons, "@/lib/structure", "全部主"));
write("content/lessons/bodies.generated.ts", bodiesFile("LESSON_BODIES", lessons));
write("content/workshop/registry.generated.ts", registryFile("WORKSHOP_LESSONS", workshop, "@/lib/structure", "实战系列"));
write("content/workshop/bodies.generated.ts", bodiesFile("WORKSHOP_BODIES", workshop));

// 3. 测验构建期校验:模块在页面被引入时执行,坏数据让 next build 直接失败
const quizImports = lessons.map((l) => `import { ${quizNames.get(l.num)} } from "./${l.num}";`).join("\n");
const quizPairs = lessons.map((l) => `  ["${l.num}", ${quizNames.get(l.num)}],`).join("\n");
const workshopQuizImports = workshop.map((l) => `import { ${workshopQuizNames.get(l.num)} } from "./workshop/${l.num}";`).join("\n");
const workshopQuizPairs = workshop.map((l) => `  ["workshop:${l.num}", ${workshopQuizNames.get(l.num)}],`).join("\n");
write(
  "content/quiz/check.generated.ts",
  GENERATED_HEADER +
    `import { validateQuiz, type QuizQuestion } from "@/lib/quiz";
${quizImports}
${workshopQuizImports}

const sets: Array<[string, QuizQuestion[]]> = [
${quizPairs}
${workshopQuizPairs}
];

for (const [num, questions] of sets) {
  const errors = validateQuiz(questions);
  if (errors.length > 0) {
    throw new Error(\`content/quiz/\${num} 数据无效:\\n- \${errors.join("\\n- ")}\`);
  }
}
`,
);

// 4. 给 site-check.mjs 的桥(它读不了 TS):站名 + 全部内容路由
const siteName = fs.readFileSync(structurePath, "utf-8").match(/export const SITE_NAME = "([^"]+)"/)?.[1];
if (!siteName) fail(`lib/structure.ts: 未找到 SITE_NAME 常量`);
const referenceSlugs = fs
  .readdirSync(referenceDir)
  .filter((f) => /\.mdx$/.test(f))
  .map((f) => f.replace(/\.mdx$/, ""))
  .sort();
write(
  "content/lessons/manifest.generated.json",
  `${JSON.stringify({ siteName, lessonNums: lessons.map((l) => l.num), workshopNums: workshop.map((l) => l.num), referenceSlugs }, null, 2)}\n`,
);

console.log(
  `内容注册表生成完毕:${lessons.length} 节主课件 / ${workshop.length} 节实战课件 / ${quizNames.size + workshopQuizNames.size} 套测验 / ${referenceSlugs.length} 篇速查`,
);
