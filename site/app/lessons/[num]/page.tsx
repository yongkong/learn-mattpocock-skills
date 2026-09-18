import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { adjacentLessons, getLesson, LESSONS } from "@/lib/structure";
import { CourseTree } from "@/components/site/course-tree";
import { ProgressToggle } from "@/components/lesson/progress-toggle";
import { Prose } from "@/components/site/prose";
import { LESSON_BODIES } from "@/content/lessons/bodies";

export function generateStaticParams() {
  return LESSONS.map((lesson) => ({ num: lesson.num }));
}

export async function generateMetadata(props: PageProps<"/lessons/[num]">): Promise<Metadata> {
  const { num } = await props.params;
  const lesson = getLesson(num);
  if (!lesson) return {};
  return { title: lesson.title, description: lesson.lede };
}

export default async function LessonPage(props: PageProps<"/lessons/[num]">) {
  const { num } = await props.params;
  const lesson = getLesson(num);
  const entry = LESSON_BODIES[num];
  if (!lesson || !entry) notFound();

  const { Body } = entry;
  const { prev, next } = adjacentLessons(num);

  const tree = (
    <CourseTree currentNum={num} />
  );

  return (
    <div className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">
      <details className="mb-6 lg:hidden">
        <summary className="cursor-pointer select-none rounded-lg border px-4 py-2 text-sm font-medium text-muted-foreground">
          课程目录
        </summary>
        <div className="mt-3 rounded-lg border p-4">{tree}</div>
      </details>

      <div className="lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="hidden lg:block">
          <div className="sticky top-8">{tree}</div>
        </aside>

        <main className="min-w-0">
          <div className="flex items-start justify-between gap-4">
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-amber-700 dark:text-amber-400">
              Lesson {lesson.num} · {lesson.short}
            </p>
            <ProgressToggle num={lesson.num} />
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
              <Link href={`/lessons/${prev.num}`} className="group text-muted-foreground hover:text-foreground">
                <span className="block text-xs">← 上一课</span>
                <span className="font-medium text-foreground group-hover:underline">
                  {prev.num} · {prev.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`/lessons/${next.num}`}
                className="group text-right text-muted-foreground hover:text-foreground sm:text-right"
              >
                <span className="block text-xs">下一课 →</span>
                <span className="font-medium text-foreground group-hover:underline">
                  {next.num} · {next.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </main>
      </div>
    </div>
  );
}
