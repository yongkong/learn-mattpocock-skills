import type { Metadata } from "next";
import { Prose } from "@/components/site/prose";
import SkillFlowMap from "@/content/reference/skill-flow-map.mdx";

export const metadata: Metadata = {
  title: "全局地图(可打印)",
  description:
    "25 个技能的分模块清单 + 情境路由表:先定位你在主流程的哪一步,再决定进入哪个外围模块。",
};

export default function SkillFlowMapPage() {
  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-12">
      <p className="font-mono text-xs uppercase tracking-[0.12em] text-amber-700 dark:text-amber-400">
        Reference · mattpocock/skills
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">全局地图:25 个技能,一条流水线</h1>
      <p className="mt-3 text-lg text-muted-foreground">
        打印出来贴在手边。任何时刻,先定位你在主流程的哪一步,再决定进入哪个外围模块。
      </p>
      <Prose>
        <SkillFlowMap />
      </Prose>
    </main>
  );
}
