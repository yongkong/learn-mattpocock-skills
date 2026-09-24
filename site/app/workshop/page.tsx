import type { Metadata } from "next";
import { AppLink } from "@/components/site/app-link";
import { Kicker } from "@/components/site/kicker";
import { PageShell } from "@/components/site/page-shell";
import { ProgressToggle } from "@/components/lesson/progress-toggle";
import { WORKSHOP_LESSONS, workshopHref } from "@/lib/structure";
import { workshopProgressId } from "@/lib/progress";

export const metadata: Metadata = {
  title: "实战·AI Coding Crash Course",
  description:
    "Matt Pocock《AI Coding Crash Course》的非官方中文学习笔记:7 节课件对应视频全 70 集,从概念到大型任务交付,每节配随堂测。",
};

export default function WorkshopPage() {
  return (
    <PageShell width="3xl" className="py-16">
      <Kicker>Workshop</Kicker>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">实战·AI Coding Crash Course</h1>
      <p className="mt-3 text-lg text-muted-foreground">
        Matt Pocock 付费课程
        <a
          href="https://www.aihero.dev/workshops/ai-coding-crash-course"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-1 underline underline-offset-4 hover:text-foreground"
        >
          AI Coding Crash Course
        </a>
        的非官方中文学习笔记:{WORKSHOP_LESSONS.length} 节课件对应视频全 70 集(约 5 小时),核心是一套五步系统
        grilling → spec → tickets → implementation → review。它与讲 skills 的五章课程相互独立——先有这套全景,
        再逐个技能深入,两条线怎么接,见
        <AppLink href="/lessons/0001" className="mx-1 underline underline-offset-4">
          0001 全局地图
        </AppLink>
        ;术语随查随用去
        <AppLink href="/dictionary" className="mx-1 underline underline-offset-4">
          词典
        </AppLink>
        。
      </p>
      <ul className="mt-8 divide-y rounded-xl border bg-card px-5">
        {WORKSHOP_LESSONS.map((l) => (
          <li key={l.num} className="flex items-center gap-3 py-3">
            <span className="font-mono text-sm text-muted-foreground">{l.num}</span>
            <AppLink href={workshopHref(l.num)} className="font-medium hover:underline">
              {l.title}
            </AppLink>
            <span className="ml-auto">
              <ProgressToggle num={workshopProgressId(l.num)} />
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm text-muted-foreground">
        时间紧:先读 0002 立语言,再直奔 0005 的 Grill-Execute-Clear 循环与 0007 的五步法落地。
      </p>
    </PageShell>
  );
}
