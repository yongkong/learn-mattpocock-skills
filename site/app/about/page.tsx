import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "关于",
  description: "本课程是什么、非官方声明、致谢与许可。",
};

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">关于</h1>
      <p className="mt-4 text-muted-foreground">关于/致谢页施工中:非官方声明、致谢与许可将在这里完整交代。</p>
    </main>
  );
}
