import type { Metadata } from "next";
import { PromptLibraryBrowser } from "@/components/prompts/browser";
import { AppLink } from "@/components/site/app-link";
import { Kicker } from "@/components/site/kicker";
import { PageShell } from "@/components/site/page-shell";

export const metadata: Metadata = {
  title: "提示词库·Claude Code",
  description:
    "Claude Code 官方提示词库 52 条完整收录:中英对照、按阶段 × 类别组织,槽位可填、一键复制,配背诵模式与随机抽背。",
};

/** 六大通用模式:背完 52 条后的迁移心法,数据同迁自官方整理。 */
const PATTERNS = [
  {
    h: "1 · 描述结果,而不是步骤",
    p: "说出你想要什么,让 Claude 自己找文件,无需指名路径。",
    en: "add rate limiting to the public API and make sure existing tests still pass",
    zh: "给公开 API 加上限流,并确保现有测试仍通过",
  },
  {
    h: "2 · 给它自查手段",
    p: "同一条提示词里要求运行、测试、对比或验证,让它迭代而非试一次就停。",
    en: "write the migration, run it against the dev database, and confirm the schema matches",
    zh: "写迁移脚本,在开发库上执行,确认 schema 一致",
  },
  {
    h: "3 · 指向参照物",
    p: "点名现有文件、测试或模式,新代码就和你已有的一致。",
    en: "add a settings page that follows the same layout as the profile page",
    zh: "加一个设置页,布局与个人资料页保持一致",
  },
  {
    h: "4 · 给出可测量的目标",
    p: "涉及性能或覆盖率时,给指标和阈值,「完成」才有定义。",
    en: "get the bundle size under 200KB and show me what you removed",
    zh: "把包体积降到 200KB 以内,并列出你删了什么",
  },
  {
    h: "5 · 直接给工件",
    p: "把报错、日志、截图、plan 输出粘进提示词,或用 @ 引用文件。",
    en: "why is the build failing? @build.log",
    zh: "构建为什么失败?@build.log",
  },
  {
    h: "6 · 说明答案的形式",
    p: "点名格式、长度或受众,解释才合你的用途。",
    en: "explain how the payment retry logic works as an HTML page with a diagram, then open it in my browser",
    zh: "用一页带图表的 HTML 解释支付重试逻辑,然后在我的浏览器里打开",
  },
];

const TIPS = [
  {
    h: "背诵路线",
    t: "先背 5 条 ★ 起点(约 10 分钟),再按「发现 → 构建 → 运营 → 设计 → 交付」每天 8~10 条,一周背完。",
  },
  {
    h: "记骨架不记全文",
    t: "每条只需记住「动词 + 槽位 + 约束 / 验证」,如 write tests for X, run them, and fix any failures。",
  },
  {
    h: "中英等效",
    t: "Claude Code 对中英文提示词效果等同;英文原句在团队协作、写技能、写文档时更通用。",
  },
  {
    h: "落地闭环",
    t: "背熟 → 用进日常开发 → 高频提示词沉淀为 /技能 或 CLAUDE.md 规则(见第 35、49、52 条)。",
  },
];

export default function PromptsPage() {
  return (
    <PageShell width="6xl" className="py-12">
      <Kicker>Prompt Library · 独立学习内容</Kicker>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">Claude Code 提示词库</h1>
      <p className="mt-3 max-w-3xl text-lg leading-relaxed text-muted-foreground">
        Anthropic 官方提示词库 52 条的完整收录与中文转述:按软件开发生命周期的阶段 ×
        类别组织,中英对照。橙色槽位可直接编辑、一键复制拼装好的提示词;配合背诵模式与随机抽背,一周即可背完。
      </p>

      <div className="mt-8">
        <PromptLibraryBrowser />
      </div>

      <section className="mt-16">
        <h2 className="text-xl font-semibold tracking-tight">✨ 六大通用模式</h2>
        <p className="mt-1 text-sm text-muted-foreground">背完 52 条后掌握这 6 个模式,就能自己写出同水平的提示词。</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PATTERNS.map((pat) => (
            <div key={pat.h} className="rounded-xl border bg-card p-4 shadow-sm">
              <h3 className="text-[14.5px] font-semibold">{pat.h}</h3>
              <p className="mb-2.5 mt-1.5 text-[13px] text-muted-foreground">{pat.p}</p>
              <code className="block break-words rounded-lg bg-neutral-900 px-3 py-2.5 font-mono text-[12.5px] leading-relaxed text-neutral-100">
                {pat.en}
                <i className="mt-1 block break-words font-sans not-italic text-[12px] text-neutral-400">{pat.zh}</i>
              </code>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-xl font-semibold tracking-tight">🎯 背诵建议</h2>
        <ul className="mt-4 list-disc space-y-2 rounded-xl border bg-card p-5 pl-9 text-sm leading-7 text-muted-foreground shadow-sm">
          {TIPS.map((tip) => (
            <li key={tip.h}>
              <b className="text-foreground">{tip.h}</b>:{tip.t}
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-14 border-t pt-6 text-sm text-muted-foreground">
        数据来源:
        <a
          href="https://code.claude.com/docs/zh-CN/prompt-library"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4"
        >
          code.claude.com/docs/zh-CN/prompt-library
        </a>
        (2026-09 完整收录,52 条 · 5 阶段 · 15 类别)。提示词原文版权归
        Anthropic;中文标题、「为什么有效」讲解与站点包装为本站转述。这个库与本课的五章内容相互独立——想系统学工作流,回
        <AppLink href="/" className="mx-1 underline underline-offset-4">
          课程主页
        </AppLink>
        ;术语随查随用去
        <AppLink href="/dictionary" className="mx-1 underline underline-offset-4">
          词典
        </AppLink>
        。
      </p>
    </PageShell>
  );
}
