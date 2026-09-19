export const SITE_NAME = "Agent Skills 中文课";

/** Module(模块章):Course 目录的顶级分类单位,五枚。 */
export const MODULES = ["主流程", "参考层", "Shaping", "Upkeep", "协作"] as const;
export type ModuleName = (typeof MODULES)[number];

export interface LessonEntry {
  /** 课件编号,即路由参数(如 "0001")。 */
  num: string;
  /** 短名,用于 kicker 与导航。 */
  short: string;
  /** 完整标题。 */
  title: string;
  /** 导语,兼作页面 meta description。 */
  lede: string;
  module: ModuleName;
}

import { LESSONS } from "@/content/lessons/registry.generated";

/**
 * 全站唯一结构来源:课程目录由它派生(首页目录、章节树、上一课/下一课)。
 * 元数据不再是手写清单——各课件的 frontmatter 是唯一来源,注册表由
 * scripts/gen-lessons.mjs 在 predev/prebuild 时生成(见 content/lessons/registry.generated.ts)。
 * 新增课件 = 建 content/lessons/000N.mdx(frontmatter)+ content/quiz/000N.ts,零注册表改动。
 */
export { LESSONS };

/** 不入章的顶级类目(Reference 与 Dictionary)。 */
export const TOP_LEVELS = [
  { key: "reference", label: "速查" },
  { key: "dictionary", label: "词典" },
] as const;

/** 课件路由:全站链接课件统一走这里,编号改名只动一处。 */
export const lessonHref = (num: string) => `/lessons/${num}`;

export function getLesson(num: string): LessonEntry | undefined {
  return LESSONS.find((l) => l.num === num);
}

export function lessonOrder(num: string): number {
  return LESSONS.findIndex((l) => l.num === num);
}

export function adjacentLessons(num: string): { prev?: LessonEntry; next?: LessonEntry } {
  const i = lessonOrder(num);
  if (i === -1) return {};
  return { prev: LESSONS[i - 1], next: LESSONS[i + 1] };
}
