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
  {
    num: "0002",
    short: "参考层深挖",
    title: "参考层四技能:流程的四台发动机",
    lede: "主流程(grill → spec → tickets → implement → review)的每一步里,真正干活的是参考层这四个可复用技能:grilling、domain-modeling、codebase-design、tdd。这课四个全讲,最后混编出题。主流程全景见 0001。",
    module: "参考层",
  },
  {
    num: "0003",
    short: "实战",
    title: "实战:跑通主流程前三站",
    lede: "地图(0001)和四台发动机(0002)都认识了。这课没有新知识——它是一份飞行清单,带你在你自己的仓库把 /grill-with-docs → /to-spec → /to-tickets 真正跑一遍。跑完,前三站就从「知道」变成「做过」。",
    module: "主流程",
  },
  {
    num: "0004",
    short: "Shaping 模块",
    title: "把不确定变成决策:三条绕行道",
    lede: "主流程有一个隐含前提:路已经看清了。当路还没看清——想法大到一次会话装不下、一个设计问题在纸面上推不动、决策卡在仓库外的一个事实上——硬走主流程只会把模糊带进 spec。Shaping 模块的三个技能就是为这时准备的绕行道:/wayfinder、/prototype、/research。",
    module: "Shaping",
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
