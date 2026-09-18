import Link from "next/link";
import { LESSONS, MODULES, TOP_LEVELS } from "@/lib/structure";

/** 课程目录树:五章 + 各章课件 + 顶级类目,全部由结构注册表派生。 */
export function CourseTree({ currentNum }: { currentNum?: string }) {
  return (
    <nav aria-label="课程目录" className="text-sm">
      <p className="mb-2 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
        课程目录
      </p>
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
                      <Link
                        href={`/lessons/${l.num}`}
                        className={`block truncate hover:text-foreground ${
                          l.num === currentNum
                            ? "font-semibold text-foreground"
                            : "text-muted-foreground"
                        }`}
                        title={l.title}
                      >
                        <span className="font-mono">{l.num}</span> {l.short}
                      </Link>
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
                <Link
                  href={`/${t.key}`}
                  className="block text-muted-foreground hover:text-foreground"
                >
                  {t.label}
                </Link>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </nav>
  );
}
