#!/usr/bin/env node
/**
 * 内容注册表生成器:课件的元数据、正文挂载与测验数据均以 content/ 里的文件为唯一来源,
 * 本脚本在 predev/prebuild 时派生出四个生成物,手写注册表一律不存在:
 *
 *   content/lessons/registry.generated.ts   编号 → 元数据(供 lib/structure.ts 再导出)
 *   content/lessons/bodies.generated.ts     编号 → MDX 正文组件(仅供课件页使用)
 *   content/quiz/check.generated.ts         构建期跑 validateQuiz,坏测验数据让构建失败
 *   content/lessons/manifest.generated.json 供 scripts/site-check.mjs(.mjs 不能 import TS)
 *
 * 新增一节课 = 建 content/lessons/000N.mdx(frontmatter)+ 可选 content/quiz/000N.ts,零注册表改动。
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const lessonsDir = path.join(siteRoot, "content", "lessons");
const quizDir = path.join(siteRoot, "content", "quiz");
const referenceDir = path.join(siteRoot, "content", "reference");
const structurePath = path.join(siteRoot, "lib", "structure.ts");

const GENERATED_HEADER = "// 本文件由 scripts/gen-lessons.mjs 生成(predev/prebuild),请勿手改。\n";
const REQUIRED_FIELDS = ["num", "short", "title", "lede", "module"];

function fail(msg) {
  console.error(`✗ ${msg}`);
  process.exit(1);
}

function readLessons() {
  const files = fs.readdirSync(lessonsDir).filter((f) => /^\d{4}\.mdx$/.test(f)).sort();
  if (files.length === 0) fail("content/lessons/ 下没有课件 MDX");
  const lessons = [];
  for (const file of files) {
    const num = file.slice(0, 4);
    const { data } = matter(fs.readFileSync(path.join(lessonsDir, file), "utf-8"));
    const missing = REQUIRED_FIELDS.filter((k) => data[k] === undefined || data[k] === "");
    if (missing.length > 0) fail(`${file}: frontmatter 缺字段 ${missing.join("、")}`);
    if (typeof data.num !== "string" || typeof data.short !== "string" || typeof data.title !== "string" || typeof data.lede !== "string") {
      fail(`${file}: frontmatter 字段类型不对(num/short/title/lede 需为字符串)`);
    }
    if (data.num !== num) fail(`${file}: frontmatter num(${data.num}) 与文件名不一致`);
    lessons.push({ num, short: data.short, title: data.title, lede: data.lede, module: data.module });
  }
  return lessons;
}

function quizExportName(num) {
  const file = path.join(quizDir, `${num}.ts`);
  if (!fs.existsSync(file)) return null;
  const m = fs.readFileSync(file, "utf-8").match(/export const (quiz\d{4})\b/);
  if (!m) fail(`content/quiz/${num}.ts: 未找到 export const quizNNNN`);
  return m[1];
}

function write(rel, text) {
  fs.writeFileSync(path.join(siteRoot, rel), text, "utf-8");
  console.log(`  ✓ 生成 ${rel}`);
}

const lessons = readLessons();

// quiz 数据文件 ↔ 课件 MDX 必须一一对应(有 quiz 无课 = 孤儿数据,有课无 quiz = 缺测验)
for (const f of fs.readdirSync(quizDir).filter((f) => /^\d{4}\.ts$/.test(f) && !f.endsWith(".generated.ts"))) {
  const num = f.slice(0, 4);
  if (!lessons.some((l) => l.num === num)) fail(`content/quiz/${f}: 没有对应的课件 ${num}.mdx(孤儿测验数据)`);
}
const quizNames = new Map();
for (const l of lessons) {
  const name = quizExportName(l.num);
  if (name) quizNames.set(l.num, name);
}
const quizLessons = lessons.filter((l) => quizNames.has(l.num));
if (quizLessons.length !== lessons.length) {
  fail("每节课都需要一份 content/quiz/000N.ts(当前缺:" + lessons.filter((l) => !quizNames.has(l.num)).map((l) => l.num).join("、") + ")");
}

// 1. 元数据注册表(纯数据,可被客户端组件安全引入)
write(
  "content/lessons/registry.generated.ts",
  GENERATED_HEADER +
    `import type { LessonEntry } from "@/lib/structure";

/** 全部课件元数据,来源:各 MDX 的 frontmatter。顺序即课程顺序。 */
export const LESSONS: LessonEntry[] = ${JSON.stringify(lessons, null, 2)};
`,
);

// 2. 正文挂载表(含 MDX 组件,仅供服务端课件页引入)
const bodyImports = lessons.map((l) => `import Lesson${l.num} from "./${l.num}.mdx";`).join("\n");
const bodyEntries = lessons.map((l) => `  "${l.num}": { Body: Lesson${l.num} }`).join(",\n");
write(
  "content/lessons/bodies.generated.ts",
  GENERATED_HEADER +
    `import type { ComponentType } from "react";
${bodyImports}

export interface LessonBody {
  Body: ComponentType;
}

/** 课件正文注册表:编号 → MDX 正文。元数据见 registry.generated.ts。 */
export const LESSON_BODIES: Record<string, LessonBody> = {
${bodyEntries},
};
`,
);

// 3. 测验构建期校验:模块在课件页被引入时执行,坏数据让 next build 直接失败
const quizImports = quizLessons.map((l) => `import { ${quizNames.get(l.num)} } from "./${l.num}";`).join("\n");
const quizPairs = quizLessons.map((l) => `  ["${l.num}", ${quizNames.get(l.num)}],`).join("\n");
write(
  "content/quiz/check.generated.ts",
  GENERATED_HEADER +
    `import { validateQuiz, type QuizQuestion } from "@/lib/quiz";
${quizImports}

const sets: Array<[string, QuizQuestion[]]> = [
${quizPairs}
];

for (const [num, questions] of sets) {
  const errors = validateQuiz(questions);
  if (errors.length > 0) {
    throw new Error(\`content/quiz/\${num}.ts 数据无效:\\n- \${errors.join("\\n- ")}\`);
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
  `${JSON.stringify({ siteName, lessonNums: lessons.map((l) => l.num), referenceSlugs }, null, 2)}\n`,
);

console.log(`内容注册表生成完毕:${lessons.length} 节课件 / ${quizLessons.length} 套测验 / ${referenceSlugs.length} 篇速查`);
