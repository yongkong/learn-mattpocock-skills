import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-24 text-center">
      <Badge variant="outline">非官方社区课程</Badge>
      <h1 className="text-4xl font-semibold tracking-tight">Agent Skills 中文课</h1>
      <p className="max-w-xl text-lg leading-relaxed text-balance text-muted-foreground">
        用{" "}
        <a
          className="underline underline-offset-4 hover:text-foreground"
          href="https://github.com/mattpocock/skills"
          target="_blank"
          rel="noopener noreferrer"
        >
          Matt Pocock 的 agent skills
        </a>
        ,教你系统使用 agent skills:一条从想法到上线的完整工作流。写给零背景的中文开发者。
      </p>
      <p className="text-sm text-muted-foreground">课程持续更新中。</p>
      <Button disabled>从第一课开始(施工中)</Button>
    </main>
  );
}
