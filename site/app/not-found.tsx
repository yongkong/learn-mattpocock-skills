import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center gap-4 px-6 py-24 text-center">
      <p className="font-mono text-5xl font-bold tracking-tight">404</p>
      <h1 className="text-xl font-semibold">页面不存在</h1>
      <p className="text-muted-foreground">地址可能输错了,或页面已经移动。</p>
      <Link prefetch={false}
        href="/"
        className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
      >
        回首页
      </Link>
    </main>
  );
}
