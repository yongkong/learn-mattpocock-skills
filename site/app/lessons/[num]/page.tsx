import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LESSONS, getLesson } from "@/lib/structure";
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
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-12">
      <p className="font-mono text-xs uppercase tracking-[0.12em] text-amber-700 dark:text-amber-400">
        Lesson {lesson.num} · {lesson.short}
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">{lesson.title}</h1>
      <p className="mt-3 text-lg text-muted-foreground">{lesson.lede}</p>
      <div className="mt-8 [&_h2]:mt-12 [&_h2]:border-t [&_h2]:pt-6 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight">
        <Body />
      </div>
    </main>
  );
}
