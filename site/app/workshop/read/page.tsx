import type { Metadata } from "next";
import { PageShell } from "@/components/site/page-shell";
import { CourseHtmlReader } from "./reader";

export const metadata: Metadata = {
  title: "原文阅读·AI Coding Crash Course",
  description: "《AI Coding Crash Course》官方英文原文讲稿本地阅读页:01-06 章切换,仅限个人学习使用。",
};

export default function WorkshopReadPage() {
  return (
    <PageShell width="6xl" className="py-8">
      <CourseHtmlReader />
    </PageShell>
  );
}
