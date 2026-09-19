"use client";

import { useCallback, useMemo, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { MarkedHtml } from "@/components/site/prose";
import type { DictionarySection } from "@/lib/dictionary";

/** 词典浏览器:过滤框 + 分类>词条两级结构 + 固定高弹层(内滚 + 卡内快速导航)。 */
export function DictionaryBrowser({ sections }: { sections: DictionarySection[] }) {
  const [filter, setFilter] = useState("");
  const [current, setCurrent] = useState<{ si: number; ei: number } | null>(null);

  const flat = useMemo(
    () => sections.flatMap((s, si) => s.entries.map((e, ei) => ({ si, ei, e }))),
    [sections],
  );

  const matches = useCallback(
    (term: string, zh: string) => {
      const q = filter.trim().toLowerCase();
      if (!q) return true;
      return term.toLowerCase().includes(q) || zh.includes(q);
    },
    [filter],
  );

  const filtered = useMemo(
    () =>
      sections.map((s) => ({ ...s, entries: s.entries.filter((e) => matches(e.term, e.zh)) })),
    [sections, matches],
  );
  const visibleCount = useMemo(
    () => filtered.reduce((acc, s) => acc + s.entries.length, 0),
    [filtered],
  );

  const move = useCallback(
    (delta: number) => {
      setCurrent((cur) => {
        if (!cur) return cur;
        const idx = flat.findIndex((f) => f.si === cur.si && f.ei === cur.ei);
        const next = flat[(idx + delta + flat.length) % flat.length];
        return { si: next.si, ei: next.ei };
      });
    },
    [flat],
  );

  const cur = current ? sections[current.si].entries[current.ei] : null;
  const curCat = current ? sections[current.si].zh : null;
  const pos = current ? flat.findIndex((f) => f.si === current.si && f.ei === current.ei) + 1 : 0;

  return (
    <div>
      <input
        type="search"
        value={filter}
        onChange={(ev) => setFilter(ev.target.value)}
        placeholder="过滤词条:中文名或英文术语……"
        aria-label="过滤词条"
        className="w-full max-w-md rounded-lg border bg-background px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-600/40"
      />

      {(() => {
        const rendered = filtered.map((s, si) => {
          if (s.entries.length === 0) return null;
          return (
            <section key={s.id} className="mt-8">
              <h2 className="text-lg font-semibold">
                {s.zh} <span className="text-sm font-normal text-muted-foreground">{s.en}</span>
                <span className="ml-2 font-mono text-xs text-muted-foreground">
                  {s.entries.length}
                </span>
              </h2>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
                {s.entries.map((e) => {
                  const ei = sections[si].entries.indexOf(e);
                  const active = current?.si === si && current?.ei === ei;
                  return (
                    <button
                      key={e.term}
                      type="button"
                      onClick={() => setCurrent({ si, ei })}
                      className={`rounded-lg border px-3 py-2 text-left text-sm transition-colors hover:border-amber-600/70 ${
                        active ? "border-amber-600 bg-amber-50 dark:bg-amber-950/40" : "bg-card"
                      }`}
                    >
                      <span className="block truncate font-medium">{e.term}</span>
                      <span className="block truncate text-xs text-muted-foreground">{e.zh}</span>
                    </button>
                  );
                })}
              </div>
            </section>
          );
        });
        return (
          <>
            {rendered}
            {visibleCount === 0 ? (
              <p className="mt-8 text-sm text-muted-foreground">没有匹配「{filter}」的词条。</p>
            ) : null}
          </>
        );
      })()}

      <Dialog open={current !== null} onOpenChange={(open) => !open && setCurrent(null)}>
        <DialogContent className="flex h-[92vh] max-h-[92vh] max-w-5xl flex-col gap-0 p-0">
          <div className="flex items-baseline gap-2 border-b px-6 py-4">
            <DialogTitle className="text-lg font-semibold">{cur?.term}</DialogTitle>
            <span className="text-sm text-muted-foreground">{cur?.zh}</span>
            <span className="ml-auto font-mono text-xs text-muted-foreground">{curCat}</span>
          </div>
          <div className="flex min-h-0 flex-1">
            <MarkedHtml
              html={cur?.html ?? ""}
              className="prose-sm min-w-0 flex-1 overflow-y-auto px-6 py-4"
              onKeyDown={(ev) => {
                if (ev.key === "ArrowLeft") move(-1);
                if (ev.key === "ArrowRight") move(1);
              }}
            />
            <nav
              aria-label="快速词条导航"
              className="hidden w-52 shrink-0 overflow-y-auto border-l px-4 py-4 text-xs lg:block"
            >
              {sections.map((s) => (
                <div key={s.id} className="mb-3">
                  <p className="mb-1 font-mono uppercase tracking-wide text-muted-foreground">
                    {s.zh}
                  </p>
                  {s.entries.map((e) => {
                    const ei = s.entries.indexOf(e);
                    const active = current?.si === sections.indexOf(s) && current?.ei === ei;
                    return (
                      <button
                        key={e.term}
                        type="button"
                        onClick={() => setCurrent({ si: sections.indexOf(s), ei })}
                        className={`block w-full truncate rounded px-1.5 py-0.5 text-left ${
                          active
                            ? "bg-amber-100 font-bold text-amber-800 dark:bg-amber-900/40 dark:text-amber-300"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                      >
                        {e.term}
                      </button>
                    );
                  })}
                </div>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3 border-t px-6 py-3 text-sm">
            <button
              type="button"
              onClick={() => move(-1)}
              className="rounded-lg border px-3 py-1.5 hover:border-amber-600/70"
            >
              ← 上一条
            </button>
            <button
              type="button"
              onClick={() => move(1)}
              className="rounded-lg border px-3 py-1.5 hover:border-amber-600/70"
            >
              下一条 →
            </button>
            <span className="ml-auto font-mono text-xs text-muted-foreground">
              {pos} / {flat.length}
            </span>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
