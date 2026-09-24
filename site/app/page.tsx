import { Badge } from "@/components/ui/badge";
import { AppLink } from "@/components/site/app-link";
import { PageShell } from "@/components/site/page-shell";
import { ProgressToggle } from "@/components/lesson/progress-toggle";
import { ResumeButton } from "@/components/site/resume-button";
import { LESSONS, WORKSHOP_LESSONS, lessonHref, MODULE_LABELS, MODULES, workshopHref } from "@/lib/structure";
import { workshopProgressId } from "@/lib/progress";

const SCENARIOS = [
  { title: "想法模糊,边界没想清", hint: "先被访谈,把想法盘清楚", href: lessonHref("0001") },
  { title: "共识已达成,要落成文字", hint: "把共识写成 spec", href: lessonHref("0001") },
  { title: "工单就绪,开始写代码", hint: "实战:跑通主流程", href: lessonHref("0003") },
  { title: "设计问题悬而未决", hint: "Shaping:把不确定变成决策", href: lessonHref("0004") },
  { title: "不确定该用哪个技能", hint: "十秒路由:查速查图", href: "/reference/skill-flow-map" },
  { title: "名词看不懂", hint: "AI 编码词典:随查随用", href: "/dictionary" },
  { title: "提示词不知道怎么写", hint: "提示词库:Claude Code 官方 52 条,中英对照", href: "/prompts" },
];

const GLOSSARY = [
  { term: "Course(课程)", plain: "这套教学内容的整体" },
  { term: "Lesson(课件)", plain: "每节课,一页可独立读完" },
  { term: "Reference(速查)", plain: "工具型文档,随查随用,不用顺序读" },
  { term: "Progress(进度)", plain: "每节课的「已学/未学」标记,存在你自己的浏览器里" },
];

export default function Home() {
  return (
    <PageShell width="6xl" className="py-14">
      <section className="mx-auto max-w-3xl text-center">
        <Badge variant="outline" className="mb-4 font-normal text-muted-foreground">
          非官方社区课程 · 源出 Matt Pocock 的 skills 体系
        </Badge>
        <h1 className="text-4xl font-semibold tracking-tight">Agent Skills 中文课</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          教你系统使用 Matt Pocock 的{" "}
          <a
            href="https://github.com/mattpocock/skills"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-foreground"
          >
            agent skills
          </a>
          :一条从想法到上线的完整工作流。写给想系统上手 AI
          编码工作流的中文开发者——零背景也能读,不假设你用过任何技能。
        </p>
        <p className="mt-2 text-sm text-muted-foreground">课程持续更新中。</p>
        <div className="mt-6">
          <ResumeButton />
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-3xl rounded-xl border bg-muted/30 p-5">
        <p className="mb-2 text-sm font-semibold">先认识几个词</p>
        <dl className="grid gap-x-8 gap-y-2 text-sm sm:grid-cols-2">
          {GLOSSARY.map((g) => (
            <div key={g.term} className="flex gap-2">
              <dt className="shrink-0 font-medium">{g.term}</dt>
              <dd className="text-muted-foreground">{g.plain}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-semibold tracking-tight">跟着学</h2>
        <div className="mt-6 grid gap-8 md:grid-cols-2">
          {MODULES.map((mod) => {
            const items = LESSONS.filter((l) => l.module === mod);
            return (
              <div key={mod} className="rounded-xl border p-5">
                <h3 className="font-semibold">{MODULE_LABELS[mod]}</h3>
                {items.length > 0 ? (
                  <ul className="mt-3 divide-y">
                    {items.map((l) => (
                      <li key={l.num} className="flex items-center gap-3 py-2.5">
                        <span className="font-mono text-sm text-muted-foreground">{l.num}</span>
                        <AppLink href={lessonHref(l.num)} className="font-medium hover:underline">
                          {l.title}
                        </AppLink>
                        <span className="ml-auto">
                          <ProgressToggle num={l.num} />
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-sm text-muted-foreground">本章更新中</p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-semibold tracking-tight">独立系列</h2>
        <div className="mt-6 rounded-xl border p-5">
          <h3 className="font-semibold">
            实战·Crash Course
            <AppLink href="/workshop" className="ml-3 text-sm font-normal text-muted-foreground underline underline-offset-4 hover:text-foreground">
              系列总览 →
            </AppLink>
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Matt Pocock 付费课程《AI Coding Crash Course》的非官方中文笔记:7 节课件对应视频全 70 集,与上面五章相互独立。
          </p>
          <ul className="mt-3 divide-y">
            {WORKSHOP_LESSONS.map((l) => (
              <li key={l.num} className="flex items-center gap-3 py-2.5">
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
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-semibold tracking-tight">按情境进入</h2>
        <p className="mt-2 text-sm text-muted-foreground">不知道从哪开始?看你现在遇到什么,从那里进。</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SCENARIOS.map((s) => (
            <AppLink
              key={s.title}
              href={s.href}
              className="group rounded-xl border bg-card p-5 transition-colors hover:border-amber-600/60"
            >
              <p className="font-medium group-hover:text-amber-700 dark:group-hover:text-amber-400">
                {s.title}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{s.hint}</p>
            </AppLink>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
