import type { ComponentType } from "react";
import SkillFlowMap from "./skill-flow-map.mdx";
import ArtifactShapes from "./artifact-shapes.mdx";

/**
 * Reference(速查)注册表:目录页与正文页共用这一个来源,
 * 标题/描述不再在 ITEMS 手写列表和各页 metadata 里各写一遍。
 * 新增一篇速查 = 在本目录建 MDX + 在这里加一条,路由(/reference/[slug])自动生成。
 */
export interface ReferenceEntry {
  /** 路由段,即 /reference/<slug>。 */
  slug: string;
  /** 页首小字。 */
  kicker: string;
  /** 页面 H1。 */
  heading: string;
  /** 页面导语。 */
  lede: string;
  /** <title>(缺省用 heading)。 */
  metaTitle?: string;
  /** meta description(缺省用 lede)。 */
  metaDesc?: string;
  /** 目录卡片描述(缺省用 metaDesc ?? lede)。 */
  indexDesc?: string;
  width?: "3xl" | "4xl";
  Body: ComponentType;
}

export const REFERENCES: ReferenceEntry[] = [
  {
    slug: "skill-flow-map",
    kicker: "Reference · mattpocock/skills",
    heading: "全局地图:25 个技能,一条流水线",
    lede: "打印出来贴在手边。任何时刻,先定位你在主流程的哪一步,再决定进入哪个外围模块。",
    metaTitle: "全局地图(可打印)",
    metaDesc: "25 个技能的分模块清单 + 情境路由表:先定位你在主流程的哪一步,再决定进入哪个外围模块。",
    indexDesc: "25 个技能的分模块清单 + 情境路由表。打印出来贴在手边。",
    width: "4xl",
    Body: SkillFlowMap,
  },
  {
    slug: "artifact-shapes",
    kicker: "Reference · 主流程交接物",
    heading: "spec 与工单长什么样",
    lede: "主流程每一站吐出的交接物的真实形状。迷路时回来对照。",
    metaTitle: "spec 与工单长什么样",
    metaDesc: "主流程交接物的真实格式:spec 骨架、工单模板、竖切规则。",
    width: "3xl",
    Body: ArtifactShapes,
  },
];

export function getReference(slug: string): ReferenceEntry | undefined {
  return REFERENCES.find((r) => r.slug === slug);
}
