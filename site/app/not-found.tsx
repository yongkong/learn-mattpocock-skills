import { AppLink } from "@/components/site/app-link";
import { PageShell } from "@/components/site/page-shell";

export default function NotFound() {
  return (
    <PageShell
      width="3xl"
      className="flex flex-col items-center justify-center gap-4 py-24 text-center"
    >
      <p className="font-mono text-5xl font-bold tracking-tight">404</p>
      <h1 className="text-xl font-semibold">页面不存在</h1>
      <p className="text-muted-foreground">地址可能输错了,或页面已经移动。</p>
      <AppLink
        href="/"
        className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
      >
        回首页
      </AppLink>
    </PageShell>
  );
}
