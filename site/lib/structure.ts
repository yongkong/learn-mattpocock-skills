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

/**
 * 全站唯一结构来源:课程目录由它派生(首页目录、章节树、上一课/下一课)。
 * 新增课件 = 在此加一条 + 在 content/lessons/ 建对应 MDX + bodies.ts 注册。
 */
export const LESSONS: LessonEntry[] = [
  {
    num: "0001",
    short: "全局地图",
    title: "全局地图:25 个技能,一条流水线",
    lede: "25 个技能,一张地图:一条从想法到上线的流水线,加每个技能在图上的位置。学完它的检验标准只有一个——任何情境,10 秒内说出该用哪个技能。",
    module: "主流程",
  },
];

/** 不入章的顶级类目(Reference 与 Dictionary)。 */
export const TOP_LEVELS = [
  { key: "reference", label: "速查" },
  { key: "dictionary", label: "词典" },
] as const;

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
