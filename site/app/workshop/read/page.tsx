import type { Metadata } from "next";
import { PageShell } from "@/components/site/page-shell";
import { CourseHtmlReader } from "./reader";

export const metadata: Metadata = {
  title: "讲稿阅读·AI Coding Crash Course",
  description: "《AI Coding Crash Course》课程讲稿本地阅读页:中/EN 切换、01-06 章导航,仅限个人学习使用。",
};

export default function WorkshopReadPage() {
  return (
    <PageShell width="6xl" className="py-5">
      <CourseHtmlReader />
    </PageShell>
  );
}
