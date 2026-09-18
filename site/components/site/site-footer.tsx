import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t print:hidden">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-x-5 gap-y-2 px-6 py-6 text-sm text-muted-foreground">
        <span>内容以 CC BY-SA 4.0 提供</span>
        <Link prefetch={false} href="/about" className="underline underline-offset-4 hover:text-foreground">
          关于 / 致谢
        </Link>
        <span aria-hidden>·</span>
        <a
          href="https://github.com/mattpocock/skills"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 hover:text-foreground"
        >
          mattpocock/skills
        </a>
        <a
          href="https://www.aihero.dev/skills"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 hover:text-foreground"
        >
          aihero.dev/skills
        </a>
        <span className="ml-auto">课程持续更新中</span>
      </div>
    </footer>
  );
}
