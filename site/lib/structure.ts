export const SITE_NAME = "Agent Skills 中文课";

/** Module(模块章):Course 目录的顶级分类单位,五枚。key 是数据身份(frontmatter/持久化),展示一律走 MODULE_LABELS。 */
export const MODULES = ["主流程", "参考层", "Shaping", "Upkeep", "协作"] as const;
export type ModuleName = (typeof MODULES)[number];

/**
 * 模块的展示名:中文·英文,英文取 Matt Pocock 原著分类(aihero.dev/skills)原词,不得意译改写。
 * Shaping / Upkeep 原著即英文,中文为讲授用译名(塑形 / 保养)。
 */
export const MODULE_LABELS: Record<ModuleName, string> = {
  主流程: "主流程·The Main Flow",
  参考层: "参考层·Reference Skills",
  Shaping: "塑形·Shaping",
  Upkeep: "保养·Upkeep",
  协作: "协作·Productivity Skills",
};

/** 课件的内容归属:五枚模块章之一,或独立系列「实战」(Workshop,不入章,见 TOP_LEVELS)。 */
export type CourseTag = ModuleName | "实战";

export interface LessonEntry {
  /** 课件编号,即路由参数(如 "0001")。 */
  num: string;
  /** 短名,用于 kicker 与导航。 */
  short: string;
  /** 完整标题。 */
  title: string;
  /** 导语,兼作页面 meta description。 */
  lede: string;
  module: CourseTag;
}

import { LESSONS } from "@/content/lessons/registry.generated";
import { WORKSHOP_LESSONS } from "@/content/workshop/registry.generated";

/**
 * 全站唯一结构来源:课程目录由它派生(首页目录、章节树、上一课/下一课)。
 * 元数据不再是手写清单——各课件的 frontmatter 是唯一来源,注册表由
 * scripts/gen-lessons.mjs 在 predev/prebuild 时生成(见 content/lessons/registry.generated.ts)。
 * 新增主课件 = 建 content/lessons/000N.mdx(frontmatter)+ content/quiz/000N.ts,零注册表改动。
 * 实战系列(Workshop)是独立序列,编号自主从 0001 起,见 WORKSHOP_LESSONS 与 /workshop。
 */
export { LESSONS, WORKSHOP_LESSONS };

/** 不入章的顶级类目:Reference(速查)、Dictionary(词典)、Workshop(实战)与 Prompt Library(提示词库)。展示名同走中文·英文。 */
export const TOP_LEVELS = [
  { key: "reference", label: "速查·Reference" },
  { key: "dictionary", label: "词典·Dictionary" },
  { key: "workshop", label: "实战·Crash Course" },
  { key: "prompts", label: "提示词库·Prompt Library" },
] as const;

/** 课件路由:全站链接课件统一走这里,编号改名只动一处。 */
export const lessonHref = (num: string) => `/lessons/${num}`;
/** 实战系列路由:与主课件编号空间独立。 */
export const workshopHref = (num: string) => `/workshop/${num}`;

export function getLesson(num: string): LessonEntry | undefined {
  return LESSONS.find((l) => l.num === num);
}

export function getWorkshopLesson(num: string): LessonEntry | undefined {
  return WORKSHOP_LESSONS.find((l) => l.num === num);
}

export function lessonOrder(num: string): number {
  return LESSONS.findIndex((l) => l.num === num);
}

export function adjacentLessons(num: string): { prev?: LessonEntry; next?: LessonEntry } {
  const i = lessonOrder(num);
  if (i === -1) return {};
  return { prev: LESSONS[i - 1], next: LESSONS[i + 1] };
}

/** 实战系列内的翻页:只在系列内相邻,不跨进主课件。 */
export function workshopAdjacent(num: string): { prev?: LessonEntry; next?: LessonEntry } {
  const i = WORKSHOP_LESSONS.findIndex((l) => l.num === num);
  if (i === -1) return {};
  return { prev: WORKSHOP_LESSONS[i - 1], next: WORKSHOP_LESSONS[i + 1] };
}

