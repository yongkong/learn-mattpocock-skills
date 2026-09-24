"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CATS,
  NEEDS,
  PASTES,
  PHASES,
  PROMPTS,
  ROLES,
  SRCS,
  fillPrompt,
  promptIndex,
  type CatKey,
  type PhaseKey,
  type PromptEntry,
  type RoleKey,
} from "@/content/prompts/data";

/** 单选筛选:★起点 / 阶段 / 类别 / 角色;选搜索时自动清空。 */
type Filter = { type: "start" } | { type: "ph" | "cat" | "role"; key: string } | null;

type FilterType = "ph" | "cat" | "role";

const PHASE_KEYS = Object.keys(PHASES) as PhaseKey[];
const CAT_KEYS = Object.keys(CATS) as CatKey[];
const ROLE_KEYS = Object.keys(ROLES) as RoleKey[];

function countBy(type: FilterType, key: string): number {
  return PROMPTS.filter((p) =>
    type === "ph" ? p.phase === key : type === "cat" ? p.cat === key : (p.roles ?? []).includes(key as RoleKey),
  ).length;
}

/** 筛选行定义:阶段 / 类别 / 角色,meta 统一收窄为 {zh, en} 便于循环索引。 */
const FILTER_ROWS: {
  label: string;
  keys: readonly string[];
  type: FilterType;
  meta: Record<string, { zh: string; en: string }>;
}[] = [
  { label: "阶段 Phase", keys: PHASE_KEYS, type: "ph", meta: PHASES },
  { label: "类别 Category", keys: CAT_KEYS, type: "cat", meta: CATS },
  { label: "角色 Role", keys: ROLE_KEYS, type: "role", meta: ROLES },
];

/** 搜索命中片段:截取命中点前后文本并高亮关键词。 */
function Snippet({ idx, q }: { idx: string; q: string }) {
  const at = idx.indexOf(q);
  if (at < 0) return null;
  const lo = Math.max(0, at - 36);
  const hi = Math.min(idx.length, at + q.length + 60);
  return (
    <p className="truncate font-mono text-xs text-muted-foreground">
      {lo > 0 ? "…" : ""}
      {idx.slice(lo, at)}
      <mark className="rounded bg-amber-200 px-0.5 dark:bg-amber-800/70 dark:text-amber-100">{q}</mark>
      {idx.slice(at + q.length, hi)}
      {hi < idx.length ? "…" : ""}
    </p>
  );
}

/** 提示词区:深色终端风,槽位为可编辑输入,复制时按当前值拼装。 */
function PromptZone({
  entry,
  lang,
  slotValues,
  onSlot,
  memorize,
  revealed,
  onReveal,
  copied,
  onCopy,
}: {
  entry: PromptEntry;
  lang: "en" | "zh";
  slotValues: Record<string, string>;
  onSlot: (key: string, value: string) => void;
  memorize: boolean;
  revealed: boolean;
  onReveal: () => void;
  copied: boolean;
  onCopy: () => void;
}) {
  const tpl = lang === "en" ? entry.pe : entry.pz;
  const parts = tpl.split(/\{(\w+)\}/g);
  const hidden = memorize && !revealed;
  return (
    <div
      className={`relative flex items-start gap-2.5 rounded-lg bg-neutral-900 px-4 py-3 dark:bg-black/60 ${
        hidden ? "cursor-pointer select-none blur-[7px] transition-[filter] duration-200" : ""
      }`}
      onClick={() => {
        if (hidden) onReveal();
      }}
    >
      <span className="absolute -top-2 right-3 rounded bg-amber-700 px-2 py-px text-[10px] font-bold tracking-wider text-white">
        {lang === "en" ? "EN 原句" : "中文翻译"}
      </span>
      <span aria-hidden className="shrink-0 pt-0.5 font-mono text-sm font-bold text-amber-500">
        ❯
      </span>
      <p
        className={`min-w-0 flex-1 break-words font-mono text-[13.5px] leading-8 text-neutral-100 ${
          lang === "zh" ? "font-sans" : ""
        }`}
      >
        {parts.map((part, i) => {
          if (i % 2 === 0) return <span key={i}>{part}</span>;
          const key = part;
          const value = slotValues[key] ?? (entry.s?.[key] ? entry.s[key][lang === "en" ? 0 : 1] : key);
          return (
            <input
              key={i}
              aria-label={`槽位 ${key}`}
              spellCheck={false}
              className="mx-0.5 min-w-[5ch] max-w-full rounded-t border-0 border-b-[1.5px] border-dashed border-amber-400 bg-amber-600/20 px-1.5 py-px text-[0.95em] text-amber-100 outline-none placeholder:italic placeholder:text-neutral-100/40 focus:border-solid focus:bg-amber-600/30"
              value={value}
              size={Math.max(5, value.length + 1)}
              placeholder={key}
              onChange={(e) => onSlot(key, e.target.value)}
            />
          );
        })}
      </p>
      <button
        type="button"
        data-copy
        onClick={(e) => {
          e.stopPropagation();
          onCopy();
        }}
        className={`shrink-0 self-center rounded-md px-3 py-1.5 text-xs text-white transition-colors ${
          copied ? "bg-emerald-600" : "bg-amber-700 hover:brightness-110"
        }`}
      >
        {copied ? "已复制 ✓" : "复制"}
      </button>
    </div>
  );
}

function PromptCard({
  entry,
  n,
  searchIndex,
  snippetQ,
  open,
  memorize,
  revealed,
  onToggle,
  onReveal,
  slotValues,
  onSlot,
  onCopy,
  copied,
  flash,
}: {
  entry: PromptEntry;
  n: number;
  searchIndex: string;
  snippetQ: string;
  open: boolean;
  memorize: boolean;
  revealed: Set<string>;
  onToggle: () => void;
  onReveal: (zone: string) => void;
  slotValues: Record<string, string>;
  onSlot: (key: string, value: string) => void;
  onCopy: (lang: "en" | "zh") => void;
  copied: string | null;
  flash: boolean;
}) {
  const phase = PHASES[entry.phase];
  return (
    <div
      id={`c-${entry.id}`}
      className={`relative overflow-hidden rounded-xl border bg-card shadow-sm transition-shadow ${
        flash ? "ring-2 ring-amber-500 ring-offset-2" : ""
      }`}
    >
      <span aria-hidden className="absolute bottom-0 left-0 top-0 w-[3px]" style={{ background: phase.color }} />
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full flex-wrap items-baseline gap-x-2.5 gap-y-1 py-3.5 pl-5 pr-4 text-left"
      >
        <span aria-hidden className="text-[11px] text-muted-foreground">
          {open ? "▼" : "▶"}
        </span>
        <span className="font-mono text-xs text-muted-foreground">{String(n).padStart(2, "0")}</span>
        <span className="text-[15.5px] font-semibold">{entry.tz}</span>
        <span className="hidden min-w-0 flex-1 truncate text-xs text-muted-foreground sm:inline">{entry.te}</span>
        <span className="flex flex-wrap items-center gap-1.5">
          {entry.start ? (
            <span className="whitespace-nowrap rounded-full bg-amber-100 px-2 py-0.5 text-[10.5px] font-bold text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
              ★ 从这里开始 {entry.start}
            </span>
          ) : null}
          <span
            className="whitespace-nowrap rounded-full border px-2 py-0.5 text-[10.5px]"
            style={{ color: phase.color, borderColor: `${phase.color}59` }}
          >
            {CATS[entry.cat].zh} {CATS[entry.cat].en}
          </span>
          {(entry.roles ?? []).map((r) => (
            <span key={r} className="whitespace-nowrap rounded-full border bg-muted px-2 py-0.5 text-[10.5px] text-muted-foreground">
              {ROLES[r].zh} {ROLES[r].en}
            </span>
          ))}
        </span>
      </button>
      {snippetQ && !open ? (
        <div className="px-5 pb-3">
          <Snippet idx={searchIndex} q={snippetQ} />
        </div>
      ) : null}
      {!snippetQ && !open ? (
        <p className="truncate px-5 pb-3 font-mono text-xs text-muted-foreground">{fillPrompt(entry, "en")}</p>
      ) : null}
      {open ? (
        <div className="border-t border-dashed px-5 pb-4 pt-3">
          {entry.paste && PASTES[entry.paste] ? (
            <p className="mt-2 flex gap-2 text-[13px] text-muted-foreground">
              <span className="shrink-0 rounded bg-amber-100 px-2 py-0.5 text-[10.5px] font-bold tracking-wide text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
                用法
              </span>
              {PASTES[entry.paste]}
            </p>
          ) : null}
          {entry.needs && NEEDS[entry.needs] ? (
            <p className="mt-2 flex gap-2 text-[13px] text-muted-foreground">
              <span className="shrink-0 rounded bg-amber-100 px-2 py-0.5 text-[10.5px] font-bold tracking-wide text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
                前提
              </span>
              {NEEDS[entry.needs]}
            </p>
          ) : null}
          <p className="mb-1.5 mt-3 text-[10.5px] font-semibold uppercase tracking-widest text-muted-foreground">
            {entry.s ? "填写并复制 —— 橙色槽位可直接编辑,复制时自动拼装" : "复制此提示词"}
          </p>
          <div className="space-y-2">
            <PromptZone
              entry={entry}
              lang="en"
              slotValues={slotValues}
              onSlot={onSlot}
              memorize={memorize}
              revealed={revealed.has(`${entry.id}:en`)}
              onReveal={() => onReveal(`${entry.id}:en`)}
              copied={copied === `${entry.id}:en`}
              onCopy={() => onCopy("en")}
            />
            <PromptZone
              entry={entry}
              lang="zh"
              slotValues={slotValues}
              onSlot={onSlot}
              memorize={memorize}
              revealed={revealed.has(`${entry.id}:zh`)}
              onReveal={() => onReveal(`${entry.id}:zh`)}
              copied={copied === `${entry.id}:zh`}
              onCopy={() => onCopy("zh")}
            />
          </div>
          {entry.s ? (
            <div className="mt-2 rounded-lg bg-muted px-3.5 py-2.5 text-[13px] leading-7 text-muted-foreground">
              <b className="mr-1.5 text-[11px] tracking-wide">示例填充</b>
              {fillPrompt(entry, "en")}
              <br />
              <b className="mr-1.5 text-[11px] tracking-wide">中文即景</b>
              {fillPrompt(entry, "zh")}
            </div>
          ) : null}
          <p className="mb-1.5 mt-4 text-[10.5px] font-semibold uppercase tracking-widest text-muted-foreground">
            💡 为什么有效
          </p>
          <p className="text-sm leading-7 text-muted-foreground">{entry.why}</p>
          {entry.next ? (
            <p className="mt-3 flex gap-2.5 rounded-lg bg-amber-50 px-3.5 py-2 text-[13.5px] dark:bg-amber-950/30">
              <span className="shrink-0 text-[10.5px] font-bold uppercase tracking-wide text-amber-700 dark:text-amber-400">
                进阶
              </span>
              <span>{entry.next}</span>
            </p>
          ) : null}
          <p className="mt-3 text-xs text-muted-foreground">
            所属:{phase.zh} {phase.en} · {CATS[entry.cat].zh} {CATS[entry.cat].en}　|　来源:{SRCS[entry.src]}
          </p>
        </div>
      ) : null}
    </div>
  );
}

/** 提示词库浏览器:搜索 + 阶段/类别/角色/起点筛选 + 卡片展开 + 背诵模式 + 随机抽背。 */
export function PromptLibraryBrowser() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>(null);
  const [memorize, setMemorize] = useState(false);
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const [slots, setSlots] = useState<Record<string, Record<string, string>>>({});
  const [copied, setCopied] = useState<string | null>(null);
  const [flash, setFlash] = useState<string | null>(null);

  const indexed = useMemo(() => PROMPTS.map((p) => ({ entry: p, idx: promptIndex(p) })), []);
  const q = query.trim().toLowerCase();

  const results = useMemo(() => {
    let list = indexed;
    if (q) list = list.filter(({ idx }) => idx.includes(q));
    else if (filter?.type === "start") {
      return indexed.filter(({ entry }) => entry.start).sort((a, b) => (a.entry.start ?? 0) - (b.entry.start ?? 0));
    } else if (filter) {
      const { type, key } = filter;
      list = list.filter(({ entry }) =>
        type === "ph" ? entry.phase === key : type === "cat" ? entry.cat === key : (entry.roles ?? []).includes(key as RoleKey),
      );
    }
    return list;
  }, [indexed, q, filter]);

  const groups = useMemo(() => {
    const out: { phase: PhaseKey; cat: CatKey; items: typeof indexed }[] = [];
    for (const item of results) {
      const last = out[out.length - 1];
      if (last && last.phase === item.entry.phase && last.cat === item.entry.cat) last.items.push(item);
      else out.push({ phase: item.entry.phase, cat: item.entry.cat, items: [item] });
    }
    return out;
  }, [results]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (document.activeElement as HTMLElement | null)?.tagName;
      if (e.key === "/" && tag !== "INPUT" && tag !== "TEXTAREA") {
        e.preventDefault();
        document.getElementById("prompt-search")?.focus();
      }
      if (e.key === "Escape" && document.activeElement?.id === "prompt-search") {
        setQuery("");
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const applyFilter = (f: Filter) => {
    setFilter(f);
    setQuery("");
  };

  const toggleOpen = (id: string) =>
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const setSlot = (id: string, key: string, value: string) =>
    setSlots((prev) => ({ ...prev, [id]: { ...prev[id], [key]: value } }));

  const toggleReveal = (zone: string) =>
    setRevealed((prev) => {
      const next = new Set(prev);
      if (next.has(zone)) next.delete(zone);
      else next.add(zone);
      return next;
    });

  const copyPrompt = async (entry: PromptEntry, lang: "en" | "zh") => {
    let text = lang === "en" ? entry.pe : entry.pz;
    for (const key of Object.keys(entry.s ?? {})) {
      const custom = slots[entry.id]?.[key]?.trim();
      const fallback = entry.s ? entry.s[key][lang === "en" ? 0 : 1] : key;
      text = text.replaceAll(`{${key}}`, custom || fallback);
    }
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.cssText = "position:fixed;opacity:0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    const zone = `${entry.id}:${lang}`;
    setCopied(zone);
    setTimeout(() => setCopied((cur) => (cur === zone ? null : cur)), 1500);
  };

  const randomPick = () => {
    if (results.length === 0) return;
    const pick = results[Math.floor(Math.random() * results.length)].entry;
    setOpenIds((prev) => new Set(prev).add(pick.id));
    requestAnimationFrame(() => {
      document.getElementById(`c-${pick.id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
    setFlash(pick.id);
    setTimeout(() => setFlash((cur) => (cur === pick.id ? null : cur)), 1400);
  };

  const pill = (on: boolean) =>
    `rounded-full border px-3 py-1 text-[13px] transition-colors ${
      on
        ? "border-foreground bg-foreground text-background"
        : "border-border bg-card text-muted-foreground hover:border-amber-600 hover:text-amber-700 dark:hover:text-amber-400"
    }`;

  return (
    <div>
      {/* 搜索与工具行 */}
      <div className="flex flex-wrap items-stretch gap-2">
        <div className="flex min-w-[240px] flex-1 items-center gap-2.5 rounded-xl border bg-card px-4 py-2.5 shadow-sm focus-within:border-amber-600">
          <input
            id="prompt-search"
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setFilter(null);
            }}
            placeholder="搜索:中文标题 / 英文原句 / 中文翻译 / 类别,如「测试」「merge」「删除」…"
            aria-label="搜索提示词"
            className="w-full flex-1 bg-transparent text-[15px] outline-none placeholder:text-muted-foreground/70"
          />
          <kbd className="rounded border bg-muted px-2 py-0.5 font-mono text-[11px] text-muted-foreground">/</kbd>
        </div>
        <button
          type="button"
          onClick={randomPick}
          title="从当前结果中随机抽一条,配合背诵模式自测"
          className="rounded-xl border bg-card px-4 py-2.5 text-[13px] text-muted-foreground transition-colors hover:border-amber-600 hover:text-amber-700 dark:hover:text-amber-400"
        >
          🎲 随机抽背
        </button>
        <button
          type="button"
          onClick={() => {
            setMemorize((on) => !on);
            setRevealed(new Set());
          }}
          aria-pressed={memorize}
          className={`rounded-xl border px-4 py-2.5 text-[13px] font-semibold transition-colors ${
            memorize
              ? "border-amber-700 bg-amber-700 text-white"
              : "border-border bg-card text-amber-700 hover:border-amber-600 dark:text-amber-400"
          }`}
        >
          🧠 {memorize ? "背诵模式 · 开" : "背诵模式"}
        </button>
      </div>

      {/* 筛选 */}
      <div className="mt-4 flex flex-col gap-2">
        <div className="flex flex-wrap items-baseline gap-2">
          <span className="w-20 shrink-0 text-[11.5px] tracking-wider text-muted-foreground">推荐</span>
          <button
            type="button"
            className={`${pill(filter?.type === "start")} font-semibold text-amber-700 dark:text-amber-400 ${
              filter?.type === "start" ? "!text-white" : ""
            }`}
            onClick={() => applyFilter(filter?.type === "start" ? null : { type: "start" })}
          >
            ★ 从这里开始<span className="ml-1 text-[11.5px] opacity-60">{PROMPTS.filter((p) => p.start).length}</span>
          </button>
        </div>
        {FILTER_ROWS.map((row) => (
          <div key={row.label} className="flex flex-wrap items-baseline gap-2">
            <span className="w-20 shrink-0 text-[11.5px] tracking-wider text-muted-foreground">{row.label}</span>
            {row.keys.map((k) => {
              const on = filter?.type === row.type && filter.key === k;
              return (
                <button
                  key={k}
                  type="button"
                  className={pill(on)}
                  onClick={() => applyFilter(on ? null : { type: row.type, key: k })}
                >
                  {row.meta[k].zh} {row.meta[k].en}
                  <span className="ml-1 text-[11.5px] opacity-60">{countBy(row.type, k)}</span>
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* 计数与背诵提示 */}
      <div className="mt-4 flex items-center justify-between text-[13px] text-muted-foreground">
        <span>
          {q || filter
            ? `匹配 ${results.length} / ${PROMPTS.length} 条`
            : `共 ${PROMPTS.length} 条 · ${PHASE_KEYS.length} 阶段 · ${CAT_KEYS.length} 类别`}
        </span>
        {q || filter ? (
          <button
            type="button"
            className="underline underline-offset-2 hover:text-amber-700 dark:hover:text-amber-400"
            onClick={() => {
              setQuery("");
              setFilter(null);
            }}
          >
            清除筛选
          </button>
        ) : null}
      </div>
      {memorize ? (
        <p className="mt-3 rounded-lg border border-dashed border-amber-600/60 bg-amber-50 px-3.5 py-2 text-[13px] text-amber-800 dark:bg-amber-950/30 dark:text-amber-300">
          🧠 背诵模式已开启:提示词内容已隐藏,先看标题回忆英文原句,再点击模糊区域对答案。
        </p>
      ) : null}

      {/* 列表:搜索时平铺 + 命中片段;否则按 阶段×类别 分组 */}
      {results.length === 0 ? (
        <p className="mt-6 rounded-xl border-[1.5px] border-dashed p-11 text-center text-muted-foreground">
          没有匹配的提示词,换个关键词试试
        </p>
      ) : q ? (
        <div className="mt-3 space-y-2.5">
          {results.map(({ entry, idx }) => {
            const n = PROMPTS.indexOf(entry) + 1;
            return (
              <PromptCard
                key={entry.id}
                entry={entry}
                n={n}
                searchIndex={idx}
                snippetQ={q}
                open={openIds.has(entry.id) || memorize}
                memorize={memorize}
                revealed={revealed}
                onToggle={() => toggleOpen(entry.id)}
                onReveal={toggleReveal}
                slotValues={slots[entry.id] ?? {}}
                onSlot={(key, value) => setSlot(entry.id, key, value)}
                onCopy={(lang) => copyPrompt(entry, lang)}
                copied={copied}
                flash={flash === entry.id}
              />
            );
          })}
        </div>
      ) : (
        <div className="mt-3">
          {groups.map((g, gi) => (
            <section key={`${g.phase}-${g.cat}-${gi}`}>
              <h3 className="mb-3 mt-7 flex items-center gap-2.5 text-xs uppercase tracking-widest text-muted-foreground first:mt-3">
                <span aria-hidden className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: PHASES[g.phase].color }} />
                <b className="font-semibold text-muted-foreground">
                  {PHASES[g.phase].zh} {PHASES[g.phase].en}
                </b>
                · {CATS[g.cat].zh} {CATS[g.cat].en}
                <span className="ml-auto tracking-normal">{g.items.length} 条</span>
              </h3>
              <div className="space-y-2.5">
                {g.items.map(({ entry, idx }) => {
                  const n = PROMPTS.indexOf(entry) + 1;
                  return (
                    <PromptCard
                      key={entry.id}
                      entry={entry}
                      n={n}
                      searchIndex={idx}
                      snippetQ=""
                      open={openIds.has(entry.id) || memorize}
                      memorize={memorize}
                      revealed={revealed}
                      onToggle={() => toggleOpen(entry.id)}
                      onReveal={toggleReveal}
                      slotValues={slots[entry.id] ?? {}}
                      onSlot={(key, value) => setSlot(entry.id, key, value)}
                      onCopy={(lang) => copyPrompt(entry, lang)}
                      copied={copied}
                      flash={flash === entry.id}
                    />
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
