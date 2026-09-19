import { AppLink } from "@/components/site/app-link";
import { Badge } from "@/components/ui/badge";
import { SITE_NAME, TOP_LEVELS } from "@/lib/structure";

const NAV_ITEMS = [
  { href: "/", label: "课程" },
  ...TOP_LEVELS.map((t) => ({ href: `/${t.key}`, label: t.label })),
  { href: "/about", label: "关于" },
];

export function SiteHeader() {
  return (
    <header className="border-b print:hidden">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 px-6 py-3">
        <AppLink href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          {SITE_NAME}
          <Badge variant="outline" className="font-normal text-muted-foreground">
            非官方
          </Badge>
        </AppLink>
        <nav aria-label="站点导航" className="ml-auto flex flex-wrap items-center gap-x-5 gap-y-1 text-sm">
          {NAV_ITEMS.map((item) => (
            <AppLink
              key={item.href}
              href={item.href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </AppLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
