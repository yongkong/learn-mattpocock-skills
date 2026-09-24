import type { QuizQuestion } from "@/lib/quiz";

/** 实战 0004 随堂测验(6 题;覆盖清 bloat 的本质、/context 的报告范围、permissions.deny、subagent 探索、/teach 的工作区、client/server 边界)。 */
export const workshopQuiz0004: QuizQuestion[] = [
  {
    scenario: "你按流程把 MCP servers 和多余 skills 清掉后,/context 显示 session 起点从 23k 降到 6.6k。这笔节省的本质是什么?",
    options: [
      "省下了 API 账单,token 单价更便宜",
      "context window 的总容量变大了",
      "agent 的启动速度明显变快了",
      "smart zone 更宽敞,agent 推理的空间变大了",
    ],
    answer: 3,
    explain:
      "清 bloat 最大化的是质量:省出的空间全部留给 smart zone——agent 真正推理的区域。成本下降只是副作用;窗口上限和启动速度都不变,变的只是留给思考的空间。",
  },
  {
    scenario: "想在输入第一条正经 prompt 之前,看清 context window 里已经装了什么。该运行哪条命令?",
    options: ["/config", "/compact", "/context", "/clear"],
    answer: 2,
    explain:
      "/context 打印 system prompt、tools、MCP tools、skills、messages 的分类明细;/config 是打开设置而非报告占用,/compact 压缩已有工作的 session,/clear 清空且不会告诉你里面原本有什么。",
  },
  {
    scenario: "你在 settings.json 的 permissions.deny 里禁用了 CronCreate 这类用不上的工具。实际效果是什么?",
    options: [
      "运行时拦截调用,但定义仍留在 system prompt 里",
      "工具定义从 system prompt 里整个移除,每轮请求实打实省下这部分 token",
      "工具转入 deferred 列表,用到时再加载",
      "仅当前 session 生效,重启后自动恢复",
    ],
    answer: 1,
    explain:
      "deny 的实质是移除而非拦截:定义从 system prompt 里彻底消失,这是每一轮请求的节省。deferred 是另一回事——部分 MCP tools 被延后加载,定义仍占着账面。",
  },
  {
    scenario: "你让 agent 深度分析一座大仓库,又怕主 context 被原始文件塞爆,于是在 prompt 末尾加上一句 Use subagents。这样做的机制收益是什么?",
    options: [
      "subagent 的 token 按半价计费",
      "subagent 各自深读一个区域,只把带 key file paths 的高密度摘要交回父 agent",
      "父 agent 自动压缩成摘要后继续工作",
      "subagent 直接替你改文件,省去来回对话",
    ],
    answer: 1,
    explain:
      "分而治之:原始文件从不进入父 context,回报是高密度摘要——四路 subagent 深读合计约 200k,父 agent 只用约 65.1k。起点越小,每开一个 subagent 付的底价越低,smart zone 时间越长。",
  },
  {
    scenario: "用 /teach 学一座新仓库,学了两课后你 clear 了 context。为什么进度一点不丢?",
    options: [
      "课程 HTML 都存在 lessons/ 里,重开自己会重读",
      "它自动把每次对话 compact 成摘要",
      "学习记录存进 learning-records/,MISSION.md 锚定目标,新 session 靠这两样从断点接续",
      "它把进度写进 OS 临时目录,随时取回",
    ],
    answer: 2,
    explain:
      "/teach 是有状态的 skill:learning-records/ 记录你学到哪,NOTES.md 存你的水平画像,MISSION.md 锚定目标。它不靠 compaction,也不写临时目录。",
  },
  {
    scenario: "评分功能上线后,点击打星整页刷新,浏览器控制台报 promisify is not a function,出自 better-sqlite3。根因是什么?",
    options: [
      "数据库 migration 没跑,表结构缺失",
      "client 组件从依赖数据库的 service 导入 MAX_RATING,把 better-sqlite3 拖进了浏览器 bundle",
      "dev server 的模块转换缓存过期,重启即可",
      "295 个测试不够多,有分支漏测",
    ],
    answer: 1,
    explain:
      "client 组件不该 import 依赖 server-only 代码的模块;修复是把常量挪进零依赖的 app/lib/ratings.ts。注意:295 个测试全过、typecheck 干净,也防不住这类 client/server 边界的推理缺口。",
  },
];
