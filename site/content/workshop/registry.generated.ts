// 本文件由 scripts/gen-lessons.mjs 生成(predev/prebuild),请勿手改。
import type { LessonEntry } from "@/lib/structure";

/** 实战系列课件元数据,来源:各 MDX 的 frontmatter。顺序即系列顺序。 */
export const WORKSHOP_LESSONS: LessonEntry[] = [
  {
    "num": "0001",
    "short": "准备篇",
    "title": "准备篇:选订阅、搭项目,把 agent 开到起跑线",
    "lede": "AI Coding Crash Course 第一站:选对订阅与 model、跑通练习项目 Cadence、装好 Claude Code、重置干净配置,再用 request logger 打开 agent 的黑盒。对应视频 P1–P8。",
    "module": "实战"
  },
  {
    "num": "0002",
    "short": "核心概念",
    "title": "核心概念:model、harness 与 context window",
    "lede": "动手之前先立语言:model / harness / agent / environment 四要素,non-determinism、turn、context window、smart zone / dumb zone、成本构成、hallucination、effort、subagent——后面所有工作流都用这套词汇思考。对应视频 P10–P20。",
    "module": "实战"
  },
  {
    "num": "0003",
    "short": "认识 Claude Code",
    "title": "认识 Claude Code:够用就好的工具入门",
    "lede": "课程不绑定任何 agent,演示用 Claude Code。这一章只求够用:session 管理、终端 prompt 技巧、IDE 集成、时间旅行、bash mode 与 permissions。对应视频 P21–P27。",
    "module": "实战"
  },
  {
    "num": "0004",
    "short": "Context 实战",
    "title": "基础工作流(上):清 context,建直觉",
    "lede": "基础工作流上半场:把 session 起点的 bloat 清干净、在 status line 盯住 context 占用,再用 codebase exploration、/teach、Build a Feature 三个实战建立手感。对应视频 P28–P37。",
    "module": "实战"
  },
  {
    "num": "0005",
    "short": "循环与决策",
    "title": "基础工作流(下):Grill-Execute-Clear 循环",
    "lede": "基础工作流下半场:plan mode 为什么不够用、Grill-Execute-Clear 循环怎么跑,以及该 continue、clear、compact、handoff 还是 subagent 的阶段决策,auto-compaction 的取舍。对应视频 P38–P44。",
    "module": "实战"
  },
  {
    "num": "0006",
    "short": "转向控制",
    "title": "转向控制:skills、steering map 与 pruning",
    "lede": "让 agent 一直朝着目的地走:steering map 与 context pointer、Agent Skills(SKILL.md)的写法与 user / project 之分、navigation pointers、pruning 与 automatic memory。对应视频 P45–P56。",
    "module": "实战"
  },
  {
    "num": "0007",
    "short": "大型交付",
    "title": "大型任务交付:spec、tickets 与 review",
    "lede": "把五步法开到大项目上:issue tracker、/to-spec 写规格、/to-tickets 拆工票、跨 context window 逐票执行、rerouting 与 /goal、coding standards 的强制化。对应视频 P57–P70。",
    "module": "实战"
  }
];
