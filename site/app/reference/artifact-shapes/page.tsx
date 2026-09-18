import type { Metadata } from "next";
import { Prose } from "@/components/site/prose";
import ArtifactShapes from "@/content/reference/artifact-shapes.mdx";

export const metadata: Metadata = {
  title: "spec 与工单长什么样",
  description: "主流程交接物的真实格式:spec 骨架、工单模板、竖切规则。",
};

export default function ArtifactShapesPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-12">
      <p className="font-mono text-xs uppercase tracking-[0.12em] text-amber-700 dark:text-amber-400">
        Reference · 主流程交接物
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">spec 与工单长什么样</h1>
      <p className="mt-3 text-lg text-muted-foreground">
        主流程每一站吐出的交接物的真实形状。迷路时回来对照。
      </p>
      <Prose>
        <ArtifactShapes />
      </Prose>
    </main>
  );
}
