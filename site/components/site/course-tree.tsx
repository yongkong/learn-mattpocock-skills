import { AppLink } from "@/components/site/app-link";
import { Kicker } from "@/components/site/kicker";
import { LESSONS, lessonHref, MODULES, TOP_LEVELS } from "@/lib/structure";

/** 课程目录树:五章 + 各章课件 + 顶级类目,全部由结构注册表派生。 */
export function CourseTree({ currentNum }: { currentNum?: string }) {
  return (
    <nav aria-label="课程目录" className="text-sm">
      <Kicker className="mb-2 text-muted-foreground">课程目录</Kicker>
      <ul className="space-y-4">
        {MODULES.map((mod) => {
          const items = LESSONS.filter((l) => l.module === mod);
          return (
            <li key={mod}>
              <p className="font-semibold">{mod}</p>
              {items.length > 0 ? (
                <ul className="mt-1 space-y-1 border-l pl-3">
                  {items.map((l) => (
                    <li key={l.num}>
                      <AppLink
                        href={lessonHref(l.num)}
                        className={`block truncate hover:text-foreground ${
                          l.num === currentNum
                            ? "font-semibold text-foreground"
                            : "text-muted-foreground"
                        }`}
                        title={l.title}
                      >
                        <span className="font-mono">{l.num}</span> {l.short}
                      </AppLink>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-1 pl-3 text-xs text-muted-foreground">本章更新中</p>
              )}
            </li>
          );
        })}
        <li>
          <p className="font-semibold">顶级类目</p>
          <ul className="mt-1 space-y-1 border-l pl-3">
            {TOP_LEVELS.map((t) => (
              <li key={t.key}>
                <AppLink href={`/${t.key}`} className="block text-muted-foreground hover:text-foreground">
                  {t.label}
                </AppLink>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </nav>
  );
}
