import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agent Skills 中文课",
  description:
    "面向中文开发者的 agent skills 非官方社区课程:一条从想法到上线的完整工作流。课程持续更新中。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
