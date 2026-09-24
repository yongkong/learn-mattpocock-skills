import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  WORKSHOP_LESSONS,
  getWorkshopLesson,
  workshopAdjacent,
  workshopHref,
} from "@/lib/structure";
import { workshopProgressId } from "@/lib/progress";
import { AppLink } from "@/components/site/app-link";
import { Kicker } from "@/components/site/kicker";
import { PageShell } from "@/components/site/page-shell";
import { ProgressToggle } from "@/components/lesson/progress-toggle";
import { Prose } from "@/components/site/prose";
import { WORKSHOP_BODIES } from "@/content/workshop/bodies.generated";
import "@/content/quiz/check.generated";

export function generateStaticParams() {
  return WORKSHOP_LESSONS.map((lesson) => ({ num: lesson.num }));
}

export async function generateMetadata(props: PageProps<"/workshop/[num]">): Promise<Metadata> {
  const { num } = await props.params;
  const lesson = getWorkshopLesson(num);
  if (!lesson) return {};
  return { title: `${lesson.title} · 实战`, description: lesson.lede };
}

/** 实战系列目录:7 节课件一条线,当前课高亮。 */
function WorkshopTree({ currentNum }: { currentNum: string }) {
  return (
    <nav aria-label="实战系列目录" className="text-sm">
      <Kicker className="mb-2 text-muted-foreground">实战·Crash Course</Kicker>
      <ul className="space-y-1 border-l pl-3">
        {WORKSHOP_LESSONS.map((l) => (
          <li key={l.num}>
            <AppLink
              href={workshopHref(l.num)}
              className={`block truncate hover:text-foreground ${
                l.num === currentNum ? "font-semibold text-foreground" : "text-muted-foreground"
              }`}
              title={l.title}
            >
              <span className="font-mono">{l.num}</span> {l.short}
            </AppLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default async function WorkshopLessonPage(props: PageProps<"/workshop/[num]">) {
  const { num } = await props.params;
  const lesson = getWorkshopLesson(num);
  const entry = WORKSHOP_BODIES[num];
  if (!lesson || !entry) notFound();

  const { Body } = entry;
  const { prev, next } = workshopAdjacent(num);
  const progressNum = workshopProgressId(num);

  const tree = <WorkshopTree currentNum={num} />;

  return (
    <PageShell width="6xl" className="py-10">
      <details className="mb-6 lg:hidden">
        <summary className="cursor-pointer select-none rounded-lg border px-4 py-2 text-sm font-medium text-muted-foreground">
          实战系列目录
        </summary>
        <div className="mt-3 rounded-lg border p-4">{tree}</div>
      </details>

      <div className="lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="hidden lg:block">
          <div className="sticky top-8">{tree}</div>
        </aside>

        <main className="min-w-0">
          <div className="flex items-start justify-between gap-4">
            <Kicker>
              Workshop {lesson.num} · {lesson.short}
            </Kicker>
            <ProgressToggle num={progressNum} />
          </div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">{lesson.title}</h1>
          <p className="mt-3 text-lg text-muted-foreground">{lesson.lede}</p>
          <Prose>
            <Body />
          </Prose>

          <nav
            aria-label="课件翻页"
            className="mt-14 flex flex-col gap-3 border-t pt-6 text-sm sm:flex-row sm:justify-between"
          >
            {prev ? (
              <AppLink
                href={workshopHref(prev.num)}
                className="group text-muted-foreground hover:text-foreground"
              >
                <span className="block text-xs">← 上一课</span>
                <span className="font-medium text-foreground group-hover:underline">
                  {prev.num} · {prev.title}
                </span>
              </AppLink>
            ) : (
              <span />
            )}
            {next ? (
              <AppLink
                href={workshopHref(next.num)}
                className="group text-right text-muted-foreground hover:text-foreground sm:text-right"
              >
                <span className="block text-xs">下一课 →</span>
                <span className="font-medium text-foreground group-hover:underline">
                  {next.num} · {next.title}
                </span>
              </AppLink>
            ) : (
              <span />
            )}
          </nav>
        </main>
      </div>
    </PageShell>
  );
}
