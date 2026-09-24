---
title: "第四章 · 基础工作流（Fundamentals）"
section: "Fundamentals"
lessons:
  - "P28 ｜ 028 Your Starting Context"
  - "P29–P30 ｜ 029/030 Killing Bloat"
  - "P31 ｜ 031 Showing Context in the Status Line"
  - "P32–P33 ｜ 032/033 Codebase Exploration"
  - "P34–P35 ｜ 034/035 The /teach Skill"
  - "P36–P37 ｜ 036/037 Build a Feature"
  - "P38 ｜ 038 Why Plan Mode Sucks"
  - "P39–P40 ｜ 039/040 The Grill-Execute-Clear Loop"
  - "P41 ｜ 041 Compaction"
  - "P42 ｜ 042 Handing Off"
  - "P43 ｜ 043 Clear, Compact, Handoff, Or Subagent"
  - "P44 ｜ 044 Auto-Compaction"
source: "aihero.dev AI Coding Crash Course"
---

# 第四章 · 基础工作流（Fundamentals）

本章是全课程的核心章节，一切围绕 context window 的管理展开。前半段教你把 session 起点清理干净——砍掉 bloat、在 status line 里随时盯住 token——再用 codebase exploration、/teach、Build a Feature 三个实战建立对 agent 行为的直觉。后半段从 plan mode 的失败引出全课程最重要的工作流 Grill-Execute-Clear loop，并给出阶段边界的五选一决策树：continue、clear、compact、handoff、subagent。

## P28 ｜ 028 Your Starting Context

**要点**

- 作者对 context window 里装了什么持有「偏执般的洁癖」：写 AI 应用时每个 token 都要精打细算，他把这种 context paranoia 带进了 agent 编码
- 开课前先重置配置：`.claude` 目录下的 `settings.json` 改名为 `settings-backup.json`，`skills` 目录改名为 `skills-backup`，一切回到默认
- 用 `/context` 查看 session 起点基线：默认配置约 23k token（含从 claude.ai 加载的 Figma、Gmail、Slack 等 MCP tools），换回精简配置只要 6.6k
- 目的是最大化质量、扩大 smart zone（agent 真正推理的那段空间），不是省 token 费用

**笔记**

课程正式开工前，作者要确保所有人站在同一条起跑线上：harness 里不能带着任何 bloat（无关的 token 负担）进场。context window 里塞着不该有的 token，后面用 coding agent 时就得不到预期结果。

操作只有两步：用 VS Code 打开 `.claude` 目录，把 `settings.json` 重命名为 `settings-backup.json`（这是开课前设置的备份），再把 `skills` 目录重命名为 `skills-backup`。这样你的 skills 和设置全部重置为默认。然后回到课程仓库，启动你的 agent（演示用 Claude Code，任何 agent 都能照做，只是需要按各自的指令达成同样目标），运行 `/context`——这条命令会在你还没发出任何正经消息之前，把 context window 里现有的一切可视化。

默认配置下的一次全新 session 大致如下：

| 类别 | Tokens |
|---|---|
| System prompt | 3k |
| System tools | 17.9k |
| MCP tools (deferred) | 24.5k |
| System tools (deferred) | 16.9k |
| Skills | 2k |
| Messages | 8 |
| **合计** | **~23k** |

你真正输入的只有 `/context` 这 8 个 token，账面上却已经有约 23k——其中大量 MCP tools 是从 claude.ai 自动加载的：Figma、Gmail、Google Calendar、Google Drive、Slack、Todoist、Zapier 等。

随后作者把自己原有的 `settings.json` 和 `skills` 目录恢复回去，重启 agent 再跑一次 `/context`：只剩 **6.6k token**，光靠设置就砍掉了 16k。这个差距至关重要，因为省出来的空间全部留给了 smart zone——context window 中 agent 真正思考和推理的区域，那里空间越大，每次交互的推理质量越高。

作者特意强调：我们不是在 min-max token 开销，也不是为了省钱（成本降低只是副作用），而是在最大化质量。这一课要交付给你两种能力：看清自己 context window 里到底有什么；以及看别人的配置时，能识别出哪些东西根本不该在那儿。把作者的 context paranoia 继承过来，你的输出质量就会更高。如果有些东西实在清不掉，去课程的 Discord 求助。

**动手**

1. 在 `.claude` 目录中完成两处重命名：`settings.json` → `settings-backup.json`，`skills/` → `skills-backup/`
2. 启动 agent 后查看基线：

```
/context
```

**自测**

**Q1**：把 MCP servers 和多余 skills 清掉后，session 起点从 23k 降到 6.6k，你真正获得的是什么？

> **A**：smart zone 里多了更多空间——那是 agent 推理的地方。成本会降一点但只是副作用；启动速度和窗口上限都不变，变的只是窗口里有多少空间留给 agent 思考。

**Q2**：想在输入第一条正经 prompt 之前看看 context window 里已经有什么，该运行哪条命令？

> **A**：`/context`。它打印 system prompt、tools、MCP tools、skills、messages 的分类明细。`/config` 是打开设置而非报告占用，`/compact` 是压缩已有工作的 session，`/clear` 是清空 session 且不会告诉你里面原本有什么。

## P29–P30 ｜ 029/030 Killing Bloat

**要点**

- 每次请求都背着一份隐形 payload：tool schema、system prompt、skills 目录、功能指令打包在一起，每一轮都按 token 计费
- `/context` 只给分类总数，看不出哪个工具最吃 token；要精确下刀，就得用 request-logger 看真实的请求内容
- 核心原则：通过 `permissions.deny` 拒绝某个 tool，它的定义会从 system prompt 里整个移除——不只是运行时拦截，而是每轮请求的实质节省
- 从基线 68.3k 一路砍到 19.9k，砍掉的全是你本来就不会用的东西

**笔记**

**问题：看不见的 payload。** 你发给 agent 的每个请求都携带一份隐形 payload——tool schema、system prompt、skills 目录和功能指令一起发货，每一轮都计费。你一个字还没打，账单已经不小。症结在可见性：`/context` 把窗口切成几类，却把所有 tools 归成一个数字，看得见总量，看不见哪个单一工具吃掉最多 token。

先搭好观察工具。在一个终端运行 `npm run request-logger`，它会问你用哪个 coding agent（以及 model provider，如果你的 agent 可选多家），然后打印一条让你在另一个终端启动 agent 的命令，照抄即可；如果还需要配置文件，它也会一并打印。删掉 `request-logger/logs/` 里的旧文件，在 agent 里发一句 `Hello!`，等回复到达后，logs 目录里就会出现新日志（一个 `.md` 渲染文件，外加 `.request.txt` 和 `.response.txt`）。

打开日志检查 payload 结构。搜 `<system-prompt>` 读 system prompt，重点看：Environment 段（OS、shell、工作目录）、Context management 段（如何处理长对话），以及最近的 git commits。搜 `<tools>` 看工具定义：通常有 70+ 个，很多你闻所未闻——`CronCreate`、`DesignSync`、`EnterPlanMode`、`Workflow`——而且定义里塞满冗余文本（commit message 格式、PR 模板、feature flag 说明）。搜 `mcp__` 看 MCP tools：`mcp__claude_ai_Figma__authenticate`、`mcp__claude_ai_Gmail__create_draft`、`mcp__claude_ai_Slack__authenticate`、`mcp__claude_ai_Google_Drive__search_files` 等，不管你用不用，每轮都全量附带。搜 "following skills are available" 看 skills 目录：15–20+ 个，留意哪些是项目特定的、哪些是 agent 默认内置的。一句 `Hello!` 的完整 markdown 渲染通常 4000+ 行、150–200 KB，每一轮都全量发送、全量计费。

**解决：逐项关掉。** 在 `~/.claude` 下新建 `settings.json`，初始化为空对象。每次改动的流程固定：改文件 → 退出 agent → 重启 → 发 `Hello!` → 跑 `/context` → 对比日志。全新起点的基线是 **68.3k**，确实不少。

1. `disableClaudeAiConnectors: true` 关掉 claude.ai 自动启用的 connectors → 降到 **47k**，一个设置省 21k
2. `disableWorkflows: true`（dynamic workflows 用于确定性地编排多个 sub-agent，不用就关）→ **39k**
3. `disableBundledSkills: true`（deep research、data visualization、artifact design、config updates、keybindings help 等内置 skills）→ **37.1k**，skills 体系整体停用
4. `disableArtifact: true`（Artifacts 这个较新的功能你可能完全不用）→ **33.1k**，又省 4k

接下来是大头：tool 定义本身。关键原则——凡是通过 `permissions.deny` 拒绝的工具，其定义从 system prompt 中彻底移除。逐个自问再下手：`NotebookEdit`（要改 Jupyter notebook 单元格吗？大概率不要）、`DesignSync`、`CronCreate`/`CronDelete`/`CronList`（要管 cron job 吗？不要）、`EnterPlanMode`/`ExitPlanMode`、`PushNotification`/`RemoteTrigger`、`ReportFindings`、`ScheduleWakeup`——全部 deny，降到约 **21.6k**。还有一个值得考虑：`AskUserQuestion`，定义很长（约 130 行），有人喜欢它的 UI，有人嫌它打断。deny 之后降到 **19.9k** 以下（约 19.9k），是个不错的收尾点。

演示是 agent 特定的，但态度是通用的：你必须知道自己每次往 system prompt 里发了什么。不需要逐字读，但要能察觉「不该在的东西在」——它影响之后的每一次请求。这里移除的一切都是你本来就不会用的，它们却一直在影响行为、吞噬宝贵的 token。现在去看你自己的 harness，在不损失好行为的前提下找出属于你的优化点，找到了就到 Discord 分享。你已经有了一个干净起点，开始建造吧。

**动手**

启动日志代理并发出测试消息：

```
npm run request-logger
```

```
Hello!
```

最终的 `~/.claude/settings.json`：

```
{
"permissions": {
"deny": [
"NotebookEdit",
"DesignSync",
"CronCreate",
"CronDelete",
"CronList",
"EnterPlanMode",
"ExitPlanMode",
"PushNotification",
"RemoteTrigger",
"ReportFindings",
"ScheduleWakeup",
"AskUserQuestion"
]
},
"disableClaudeAiConnectors": true,
"disableWorkflows": true,
"disableBundledSkills": true,
"disableArtifact": true
}
```

**自测**

**Q1**：在 Claude Code 里通过 `permissions.deny` 禁用一个工具，实际效果是什么？

> **A**：不只是运行时禁止调用——该工具的定义会从 system prompt 里整个消失，等于每一轮请求都实打实省下这部分 token。

**Q2**：一句 "Hello!" 的完整请求日志有多大？说明什么？

> **A**：通常 4000+ 行、150–200 KB。这意味着哪怕最简单的消息，这份 payload 也每一轮全量发送并计费。

**Q3**：为什么第一步先关 MCP connectors 收益最大？

> **A**：claude.ai 的 connectors（Figma、Gmail、Slack、Google Drive 等）会自动启用，而 `disableClaudeAiConnectors: true` 一条设置就省下 21k token（68.3k → 47k）。

## P31 ｜ 031 Showing Context in the Status Line

**要点**

- Claude Code 默认不显示 context 占用，想边写边盯就得自己配置 status line
- 用社区工具 ccstatusline：把 session 数据格式化成一条干净的状态栏，显示加粗黄色的 token 数加暗色百分比
- 在 `~/.claude/settings.json` 里把 statusLine 命令设为 `npx ccstatusline@latest`，Claude Code 会自动把 session 数据管道传给它

**笔记**

status line 上的数字一眼可见，你才能在编码过程中对 session 做出正确决策。Claude Code 默认不显示 context window 占用，需要自己动手。方案是社区工具 ccstatusline，它把 Claude Code 的 session 数据格式化成一条干净的状态栏。

配置分三步。第一步创建配置目录，写入 `~/.config/ccstatusline/settings.json`：一行排四个 widget——加粗黄色的 token 计数（`context-length`），后跟括号包住的暗色百分比（`context-percentage`）。括号与百分比上的 `"merge": "no-padding"` 让它们无空格紧贴，`"defaultSeparator": " "` 在 token 数与左括号之间留一个空格，`"rawValue": true` 去掉标签只留干净的数字。

第二步在 `~/.claude/settings.json` 里追加 statusLine 配置（保留文件里已有的其他设置）。Claude Code 会自动把 session 数据管道传给这条命令，ccstatusline 读取后输出格式化的状态栏。

第三步完全重启 Claude Code（彻底关闭再打开）验证。状态栏应显示类似 `186.2k (17.3%)` 的字样——加粗黄色的 token 总数加暗色百分比，并随 session 的 context 增长实时更新。

**动手**

```
mkdir -p ~/.config/ccstatusline
```

`~/.config/ccstatusline/settings.json`：

```
{
"version": 3,
"lines": [
[
{
"id": "1",
"type": "context-length",
"color": "yellow",
"bold": true,
"rawValue": true
},
{
"id": "2",
"type": "custom-text",
"customText": "(",
"color": "brightBlack",
"merge": "no-padding"
},
{
"id": "3",
"type": "context-percentage",
"color": "brightBlack",
"rawValue": true,
"merge": "no-padding"
},
{
"id": "4",
"type": "custom-text",
"customText": ")",
"color": "brightBlack",
"merge": "no-padding"
}
],
[],
[]
],
"flexMode": "full-minus-40",
"compactThreshold": 60,
"colorLevel": 2,
"defaultSeparator": " ",
"inheritSeparatorColors": false,
"globalBold": false,
"powerline": {
"enabled": false,
"separators": [" "],
"separatorInvertBackground": [false],
"startCaps": [],
"endCaps": [],
"autoAlign": false
}
}
```

`~/.claude/settings.json` 追加：

```
{
"statusLine": {
"type": "command",
"command": "npx ccstatusline@latest"
}
}
```

**自测**

**Q1**：status line 上的两个数字分别是什么？

> **A**：当前 context 的 token 总数和所占百分比，例如 `186.2k (17.3%)`，随 session 进行实时更新。

**Q2**：Claude Code 和 ccstatusline 是怎么协作的？

> **A**：Claude Code 把 session 数据自动管道传给 statusLine 配置里的命令（`npx ccstatusline@latest`），后者读取数据并输出格式化的状态栏，因此改完配置必须完全重启才生效。

## P32–P33 ｜ 032/033 Codebase Exploration

**要点**

- statelessness（无状态）是 agent 最难绕过的约束：新 session 对上一次一无所知，必须重新探索
- agent 启动时只知道平台、工作目录、git 状态、shell 和知识截止日期，对文件系统零认知——没有 ls、没有文件树
- 探索质量直接决定后续工作质量：找不到需要的信息，多半做不成你要的事
- 两种策略：把文件直接读进主 context（首查约 26.1k），或派 subagent 分头深读再交摘要（父 agent 仅约 65.1k）

**笔记**

**问题：agent 到底知道什么。** agent 每开一个新 session，都得探索你的 codebase 找到所需信息。它自动拿到的环境信息包括：平台（Linux/macOS/Windows）、工作目录（能从仓库名猜点什么）、git 仓库状态（分支、main 分支、git 用户、近期 commits）、shell 类型（bash/zsh 等）、助手的知识截止日期。这些其实挺有用，但有个致命缺口：它拿不到**任何文件系统信息**——没有当前目录的 `ls`，没有文件树，对目录里实际存在哪些文件零了解。它只知道目录名、大致环境、几条 commit 名。此刻初学这个仓库的你，处境和 agent 十分相似。

练习：跑 `npm run request-logger` 起 proxy（它监听 `http://localhost:8787` 并打印启动命令），问 agent 项目的 tech stack 和用途，观察它如何探索——派 subagent 了吗？自己通读文件了吗？怎么导航？然后追问各文件夹的用途、核心业务逻辑、技术选型原因，直到你获得足够细的理解。（可选）打开 `request-logger/logs/` 里最新的 `.md`，跳到 `# Environment` 段，看传给 agent 的到底有什么、缺什么。

**解决：两种探索路径。** 按 Ctrl+O 切到详细输出，看 agent 的工具序列：先读 README；再用 bash 命令 `find . -name package.json -not -path '*/node_modules/*'` 定位 `package.json`（Linux 命令，搜索时排除 node_modules）；读完它，又并行读了 request-logger 的 package.json 和 README，随后产出 tech stack 表。日志里搜 "tool_result"：8 个标签即 4 次工具结果——只读了 README、package.json 和 request-logger 的文件，纯粹表面扫读，仅花约 **26.1k** token。

接着追问深度分析（让它 read a ton of source code），agent 开始并行读 schema、database、routing、services 等源码。有趣的是这次它没开 subagent，把所有原始文件直接读进了主 context。由于模型是非确定性的，有时它直接读，有时用 subagent。在同一个 prompt 末尾加上 "Use subagents." 三个词，就会明确触发 subagent 探索。

分而治之：agent 先快速摸清结构，再分四路并行派 subagent 深读——data layer、service layer、routes/UI layer、request-logger proxy。这些 subagent 合计烧掉约 200k token 还在上涨（仅 routes/UI 一路就用了 159k），换来的是极详尽的信息，甚至发现了一个刻意设计的架构异常点。四路深读完成后，父 agent 的 context 只用了约 **65.1k**——分析完整座仓库并压缩成小摘要，效率惊人。

subagent 的回报形式：以 system notification（自动后台任务事件）送达父 agent，是高密度摘要而非原始文件。以 UI 层报告为例：完整 route map（Public、Auth、Purchase/redeem、Instructor、Admin、Team、API endpoints）、UI 组件清单、开发者体验特性，以及最关键的 key file paths——父 agent 需要细节时按图索骥即可。大仓库上的典型模式：subagent 读一堆文件 → 综合理解 → 带着关键文件路径的详尽摘要汇报；orchestrator 保持精瘦。另一种就是前面看到的：agent 自己读，全部进主 context。

策略选择上，很多人偏好让 subagent 去探索，orchestrator 的 context 保持紧凑。这正是前面「起点 context 要小」的回报：起点越大，每开一个 subagent 都要付一次那笔底价；起点小，更经济，smart zone 时间更长。探索之所以重要、subagent 探索之所以高效，就在于它让你在 token 成本可控的前提下扩展对大型 codebase 的理解。

**动手**

```
npm run request-logger
```

```
Tell me what the tech stack of this project is and what its intended purpose is.
```

agent 找 package.json 用的命令：

```
find . -name package.json -not -path '*/node_modules/*'
```

**自测**

**Q1**：新 session 开始时，agent 对你的项目知道什么、不知道什么？

> **A**：知道平台、工作目录、git 状态（分支、近期 commits）、shell 类型、知识截止日期；对文件系统一无所知——没有 ls、没有文件树，不知道实际存在哪些文件。

**Q2**：四个 subagent 深读全仓库花了约 200k token，为什么父 agent 只用约 65.1k？

> **A**：subagent 各自深读一个区域后，只把高密度摘要（含 key file paths）汇报回父 agent，原始文件从不进入父 context——orchestrator 保持精瘦。

## P34–P35 ｜ 034/035 The /teach Skill

**要点**

- 换工作、进新项目、读陌生代码是人人要面对的挑战；/teach 让 agent 深入探索 codebase，按你的水平定制讲解
- 关键输入是你对自身的诚实评估：会什么、不会什么，别客气也别吹
- 它搭一个带状态的教学工作区：MISSION.md、NOTES.md、RESOURCES.md、lessons/、learning-records/ 等，随时 clear context 都能续上
- 这是学习任何新仓库的推荐五步法，也能用来学任何东西；它同时是「好 skill 该怎么写」的范例

**笔记**

**问题：如何快速吃透陌生代码。** 新工作、新项目、陌生代码，你需要理解架构、库、模式，却不知从何下手。这正是 agent 的强项：/teach skill 让它深入探索 codebase，产出贴合你经验水平的个性化讲解。

步骤：在课程仓库旁新建目录 `mkdir ../ai-coding-learning`，在其中运行 `npx skills add mattpocock/skills`；交互菜单里用空格只勾选 `teach` 后回车，选择为你的 agent（Claude Code 等）安装、只装当前目录（不要全局）、安装方式选 symlink，确认后文件树里出现 `.claude/skills/teach`。清空终端、启动 agent，按「教我这个仓库 + 我的水平自述」的结构运行 /teach。范例自述：写过一点 vibe coding、懂 TypeScript 基础、没用过 React、分不清 client 和 server、更不了解数据库——把它换成你对自己真实水平的描述。

**解决：教学工作区长什么样。** agent 先翻目录、读 README 和 package.json，比表面扫描更深一层；全程不派 subagent，探索都发生在主 context。摸清后它搭教学工作区：MISSION.md（学习目标与成功标准）、NOTES.md（学习者画像：你会什么不会什么）、RESOURCES.md（官方文档等一手资料，例如 React Router v7 关于 data loading 和 actions 的文档）、assets/lesson.css 与 assets/quiz.js（后续每课复用的样式和测验组件）、lessons/（为你水平定制的 HTML 课程）、reference/glossary.html（会反复查阅的术语表）、learning-records/（学习进度的有状态记录）。

第一课是 The Round Trip：从输入 URL 到看见页面之间到底发生了什么，用你仓库里的真实文件来追踪。五步：Router 把 URL 匹配到一组字面模式（服务端）→ loader 函数运行（服务端）→ 组件渲染（服务端）→ 浏览器绘制 HTML（客户端）→ hydration（客户端）。`app/routes.ts` 里的 `route("courses", "routes/courses.tsx")` 告诉你 `/courses` 路径由哪个文件处理。课程点出真正的难点：步骤 3 和 5 里同一个组件函数跑了两遍——先服务端后浏览器，而 loader 只在服务端、每次都跑。这个不对称性是必须吃透的核心概念。展示真实文件时它只留重点：`loader`、`default`、`ErrorBoundary`、`meta` 这些导出名是一份契约，React Router 按确切名字查找，把 loader 改名成 fetchData 会全盘崩坏。

课后的交互式测验每题只考一个概念，且各选项等长——排版不泄露答案。更有价值的是「证明给自己看」环节：阅读不等于学会，课程让你在 loader 里加 `console.log("LOADER RAN")`、组件里加 `console.log("COMPONENT RAN")`，先预测各自会出现在终端、浏览器 devtools 还是两者都有，再运行验证。

这个 skill 是有状态的：学习记录存进 learning-records/，MISSION.md 锚定你的目标，两者加起来意味着你几乎可以在任何时刻 clear context，agent 都能从断点精准接续。在工作区里可以随便追问——组件为什么跑两遍？组件里调数据库会怎样？LoaderArgs 是什么？——学 codebase 的一半功夫就是早问，而不是自己猜一个星期。

作者建议暂停主线，把 teach 流程走透，成为这个仓库的导航专家——马上要实现 feature 时你会占尽先机。学习任意新仓库的通用五步：为该仓库新建教学工作区；告诉 agent 你在哪；告诉它你懂什么；告诉它你不懂什么；让它教你。/teach 也能用来学任何东西——解魔方、给孩子做健康餐、放心评审 AI 生成的 codebase——同时它本身就是「如何写一个好 skill」的优秀示例。

**动手**

```bash
mkdir ../ai-coding-learning
```

```bash
npx skills add mattpocock/skills
```

```
/teach Teach me about this repo: ../ai-coding-crash-course I've done a little bit of vibe coding before. I know the basics of TypeScript. I've never worked in React before, and I'm not very clear about client and server, and certainly not about the database.
```

**自测**

**Q1**：为什么 /teach 工作区可以随时 clear context 而不丢进度？

> **A**：它是有状态的：learning-records/ 记录你学到哪了，MISSION.md 锚定目标，新 session 靠这两样从断点接续。

**Q2**：The Round Trip 一课反复强调的核心概念是什么？

> **A**：不对称性——同一个 default 导出组件在服务端和浏览器各跑一次（共两次），而 loader 只在服务端、每次请求都跑。

## P36–P37 ｜ 036/037 Build a Feature

**要点**

- 实战任务：课程评分系统——学生打 1–5 星（不写文字评价），平均分展示在课程列表页和详情页
- 这是全课程的 baseline 练习：先看「直接 prompt」的效果，重点观察 context 消耗、探索方式、文件改动量，后续课程再教改进技巧
- agent 表现亮眼：探索充分、端到端交付（schema/service/17 个测试/两个组件/集成）、295 个测试全过、还用 curl 冒烟验证，整轮约 75k token
- 但它上线了一个致命 bug：client 组件从 service 导入常量，把 better-sqlite3 打进浏览器 bundle；把控制台报错贴回去后迅速修复

**笔记**

**问题：直接 prompt 一次。** 你已理解 codebase 和探索机制，该真刀真枪建功能了：课程评分系统。需求四条——学生可给课程打 1–5 星（暂不做文字评价）；评分以全局平均分展示给所有用户；平均分同时显示在课程列表页和课程详情页；课程页上学生要有选星入口。动笔前先想清楚：选星控件放哪、平均分怎么算怎么存、要动哪些数据库表和 API 路由、谁有资格评分（讲师能给自己的课打分吗）——别过度设计，把用户流程想通即可。prompt 保持聚焦：星级 1–5、平均分可见于列表页与详情页、只有星级没有文字评价。

发送后盯三件事：context 计数怎么涨、哪类改动最耗 context；agent 派 subagent 探索还是在主窗口自己探索；动了多少文件、新建还是修改。完成后 `npm run dev` 验证：以学生身份登录（可用 dev UI 切换用户）、进课程页、找到选星控件、打分、确认平均分出现在列表页和详情页、刷新后评分仍在。最后记录 baseline：改了/建了多少文件、实现质量如何、agent 有没有做出你没预料到的假设、这流程哪里该改进。

**解决：一次完整交付与一个致命 bug。** 拿到清晰请求后，agent 开始探索，头几轮交互就消耗约 20k token（配置、测试文件、整体结构）。随后它信心满满直接开写，没问任何澄清问题，顺序是：SQLite 建 `course_ratings` 表（userId、courseId、rating 1–5 整数）加 migration；service 层 `courseRatingService`（rateCourse 插入或更新、findRating、getCourseRatingSummary 算平均分）；为 service 写 17 个测试；React 组件 `StarRating`（展示平均分）和 `StarRatingInput`（交互打分）；把组件接进课程列表页和详情页。

验证也做得像样：全量测试 295 个全过、typecheck 通过、改进 seed 脚本让测试数据带上评分、起 dev server 用 curl 冒烟——请求页面并 grep "Rated" 确认评分真的渲染出来。这种自动化验证说明 agent 在乎的是「是否解决了问题」，而不只是「能否编译」。整个 feature 约 75k token，仍在 smart zone 内。浏览器里看，每门课都亮出了平均分。

但问题来了：交互测试时 dev UI 失去响应、用户切换器失灵，点击改评分导致整页刷新而非即时更新。控制台现出铁证：`Uncaught TypeError: promisify is not a function`，出自 `node_modules/better-sqlite3/lib/methods/backup.js`——数据库驱动被整个打进了浏览器 JavaScript，而浏览器没有 `util.promisify` 这类 Node 工具。

把控制台报错原样贴回 agent（附一句：这发生在浏览器控制台，把事情搞怪了）。它很快定位根因并认账：`star-rating.tsx`（client 组件）从 `courseRatingService` 导入了 `MAX_RATING`，而后者引入了数据库模块，于是把整个数据库驱动拖进浏览器 bundle。这是架构层面的问题：client 组件不该 import 依赖 server-only 代码的模块；React Router 通常会在 client 构建里剥离 loader 和 action，但防不住组件直接 import 用到数据库的 service。

修复干净利落：把评分常量挪到零服务端依赖的模块 `app/lib/ratings.ts`（`MIN_RATING = 1`、`MAX_RATING = 5`），`star-rating.tsx` 改从那里导入，组件拿到所需常量而不再触发庞大的依赖链。随后 agent 验证修复：检查 Vite dev server 的模块转换输出、在生产 bundle 里 grep `better-sqlite3`（零命中）、再实测交互功能恢复——点星即时更新平均分，不再整页刷新。

复盘：探索充分（没用 subagent）；实现端到端完整；测试全面（单元、类型、集成、冒烟）；token 约 75k 构建、约 90k 全程（smart zone 内）；但上线了破坏交互的致命 bundle bug，拿到反馈后修复很快。结论：agent 工程习惯扎实，但对现代框架 client/server 边界的推理存在缺口。作者的评价很直白：这次表现不算好，但有明确的改进空间——接下来就解决它。

**动手**

```bash
npm run dev
```

agent 用来验证评分已渲染的命令：

```
curl -s http://localhost:5173/courses | grep -o 'Rated [^"]*' | head -5
```

**自测**

**Q1**：这次运行暴露了 agent 的哪类短板？

> **A**：对 client/server 边界的推理缺口——client 组件从依赖数据库的 service 导入常量，把 better-sqlite3 打进浏览器 bundle，报 `promisify is not a function`。正确做法是把常量放进零依赖模块（app/lib/ratings.ts）。

**Q2**：agent 在无人介入时做了哪些验证？

> **A**：全量 295 个测试、typecheck、改进 seed 数据、起 dev server 用 curl 请求页面并 grep "Rated" 确认评分渲染——在乎实际效果而非仅编译通过。

## P38 ｜ 038 Why Plan Mode Sucks

**要点**

- 上一课真正的问题不是那个 bug，而是模式：prompt → 探索 → 立刻实现，全程不与你对齐
- plan mode 本意是在探索和实现之间加一层缓冲：先出计划文档，你审阅、修改、认可后再继续
- 实际跑起来发现：agent 只是换了个资产赶工——计划写到了实现级细节，计划本身成了被赶工的资产
- 根因是 agent 的 sycophancy（讨好性）：你说要什么它就生产什么，不会停下来确认双方理解一致

**笔记**

上一课结果不算好，而真正令人不安的是那个模式：agent 收到 prompt、探索 codebase、然后立即开始实现——没有停下来核实它要建的东西对不对，没有任何人机对齐的尝试。那次我们算走运，成品大体能用；但这种急于创造资产（asset）的冲劲在 AI 编码里非常危险，作者总是刻意让它慢下来。

大多数 agent 自带 plan mode，意图是在动工前先有一次规划 session：产出计划文档，你阅读、审阅、决定是否继续（也许带着修改），满意了才放行。演示：先 `npm run reset` 把仓库重置回 main 分支（清掉上一课的评分实现），打开 agent，用 `shift+tab` 循环切换 permission modes 直到输入框底部显示 "plan mode on"，再贴入原始的评分系统 prompt。agent 探索完 codebase 回来交计划——plan mode 就像探索与实现之间的小小缓冲，一个继续之前对齐的机会。用 `/plan` 查看计划：细节相当全面，还附关键决策——一人一课一票（合理）、平均分读取时计算（没问题）、零评分课程显示 "No ratings yet" 而非零星（合理）、仅注册学员可评分（合理）。

致命问题在于：它不再急于产出实现，而是急于产出一份读起来和实现一模一样的计划——数据库表结构、service 命名与函数、组件名、路由修改、测试策略全被定死。它仍在赶工创造资产，只不过资产从代码换成了计划。所有决策在你参与之前就已经做出并写下来了。

根因是 agent 的 sycophantic 特质：你告诉它要产出什么，它就直奔那个东西，不会先确认前期功课做没做够、双方是否就「该长什么样」达成一致。这导致一个高频失败模式：agent 造出了错误的东西。评分系统这种简单 feature 无伤大雅，复杂 feature 上就是大问题。

设想一个人类开发者也这样干——「好，我知道怎么做了」扭头就写，毫无对齐、毫无共识建立。Frederick P. Brooks Jr.（《人月神话》作者）在《The Design of Design》里有个概念叫 design concept：它不是资产，而是人们设计时漂浮在房间里的那个共同构想——每个人脑中的版本略有不同，随着对话推进、朝着理解「我们在造什么」努力，它逐渐变得锐利清晰。无论 plan mode 还是直接实现，都没有 design concept 的容身之处，没有那个互相确认「我们造的是同一个东西」的时刻。第一次直接实现我们靠运气拿到了还行的结果，但可以保证：换成更复杂的功能，这条路很快会翻车。

作者自设计的方案正是要绕开这种讨好性的资产冲刺，让你获得与 agent 真正同频的对齐感——下一课揭晓。

**动手**

```bash
npm run reset
```

```
I would like to create a course review system where students can review courses by leaving a star rating. We don't want to add written reviews, just star rating. These reviews will then be visible everywhere that courses are visible. We want to show the average rating on the courses in the list page and on the course page itself.
```

**自测**

**Q1**：plan mode 交回的计划精确到表结构、函数名、组件名和测试策略，问题出在哪？

> **A**：它又一次赶工出了资产——只是从代码换成了计划。计划并不含糊、也可修改，但所有决策在你建立共识之前就已经写下：缺的正是共享理解这一步。

**Q2**：「你说要什么就生产什么、从不停下来对齐」是 agent 的哪种特质？

> **A**：Sycophancy（讨好性）。不是 hallucination（没有捏造事实），不是 non-determinism（行为并非每次不同），也不是 session 退化（一开始就这样）。

**Q3**：你和同事把 feature 聊到彼此脑中画面一致、但什么都没写下来，你们拥有的是什么？

> **A**：A design concept——共享的理解，而非资产。spec 和 plan 都是资产，而这恰恰是 plan mode 直接跳到文档时跳过的那一步。

## P39–P40 ｜ 039/040 The Grill-Execute-Clear Loop

**要点**

- 动手之前先弄清要造什么：/grill-me skill 会像面试一样不停追问，直到达成共享理解（shared understanding）才实现
- 机制是 design tree：每轮提问覆盖「前置条件已定」的整个 frontier，你的回答解锁新问题；frontier 清空时 grilling 结束
- 过程中 agent 会抓你的矛盾、逼你决策，后台探索还会发现真 bug——本课实例：renderMarkdown 无过滤导致的 XSS 漏洞
- 循环三步：Grill 到共识 → Execute（context 还热着直接实现）→ Clear（提交后清空，进入下一个 feature）

**笔记**

**问题：先对齐，再写码。** 多数开发者跳过「弄清要造什么」直接写代码，结果浪费时间、解法跑偏。/grill-me 强迫你暂停：它无情地面试你，直到双方对要造的东西达成共享理解。grilling 的机制是构建一棵 design tree：每个决策下面挂着派生决策；每轮提问覆盖当前 frontier——所有前置条件已确定的决策，一次全问，等你回答；你的回答让 frontier 扩张、解锁新问题、解禁先前被阻塞的决策；当 frontier 清空——每个分支都走到、没有 silently assumed 的东西——才该进入实现。

任务是给课程平台的 lesson 页面加评论功能（刻意保持开放）：学生和讲师可在具体课程页提问、分享心得、讨论。skill 会问的问题诸如：谁能评论（仅注册学员？讲师呢）？能否编辑/删除自己的评论？评论扁平还是串成 threads？要不要审核？有人回复要不要通知？你可能没想过其中一些——这正是 grilling 的意义：写代码前把该做的决策浮出水面。操作：`npm run reset` 拉到含 grill-me skill 的 commit（位于 `.agents/skills/`）；输入 `/` 打开 skill picker 选 `grill-me`；写一个宽松、不求全面的 prompt 开场；逐轮回答，直到 agent 宣布达成共识再实现，并在浏览器里验证（学生发言、切换用户可见）。

**解决：一场真实的 grilling。** 开场 prompt 发出后，agent 立刻起一个后台任务去摸底 codebase，且不等探索完成就开始提问——non-blocking 设计。第一轮是战略层问题：问目的（「这个功能到底为了什么」）而不只是机制，探边界情况（「没人评论时呢」），挑战假设（「为什么限制成有权限的学员才能评论」）；每个问题都附建议，你可以不采纳，你的任务是思考后拍板。回答不必逐条，口述一大段覆盖全部即可（作者的答案要点：定位是 Q&A 加支持加社区；不介意空评论框，但要设计鼓励发言的 empty state；自己不是老师，这是给其他老师用的；用户会期待有回复；评论区只对能看到课程的人开放，属于付费权益；一个表、一个功能、讲师加 badge；采纳建议）。第二轮深入实现层：threading 模型、编辑权限、排序、通知策略（作者答案：先做扁平列表；v1 不要显式 resolved 状态；讲师 dashboard 要一个未回答问题的队列页；队列按「有未读/未回复新评论的 thread」定义）。

第三轮 agent 抓到矛盾：你选了扁平列表、又不要 resolved 状态、却要一个「未回答队列」——扁平列表里每条评论都是顶层、谁也不指向谁，怎么标记「已回答」？它给三个选项逼你决策：恢复一层回复（parent-child）、保持扁平但把「未回答」定义在 lesson 层级、保持扁平但加显式 seen 状态。作者选 1：一层回复符合讲师-学生互动。与此同时后台探索完成，爆出真 bug：`renderMarkdown` 没有任何 sanitization，原始 HTML 直接穿透——学生可以在评论里注入 script 标签，在讲师的 session 里执行（XSS）。对策：单写受限渲染器 `renderComment()`，只有学生评论需要过滤，讲师评论可用全量 markdown。你同意，它进了 spec。第四轮信息已够，agent 产出书面 spec——你其实不用细读：一路的回答已把所有决策编码进去，spec 只是「双方理解一致」的证明（若 grilling 过程绕得离谱才值得扫一眼）。最后 agent 还做了一次 push（质疑队列排序：你想要 newest-first 让标错的内容沉底，但队列里全是没人回复过的条目，只会往下漂不会漂走），你只需回一句 "Okay, let's start building."，它自行解决并进入执行。

**Execute 与收获。** 实现阶段不清空、不重启，带着 grilling 的全部上下文直接开干：agent 干了 14 分 28 秒，收工时 362 个测试全过、typecheck 干净，全程约 155k token 未超限。浏览器验收：学生 Olivia Martinez 发评论；切到讲师 Marcus Johnson 回复；可编辑自己的评论（显示 "(edited)"）；删除留下 tombstone（其下回复仍可见）；讲师有专门的 Questions 队列页（`/instructor/questions`），未回答问题尽数在列，可就地回复。最终交付：comments 表、`access.server.ts` 里的共享守卫 `getAccess`、`comment-markdown.server.ts` 里带 19 个测试的 `renderComment()`、带 48 个测试的 `commentService`、带 empty state 的评论 UI、讲师队列页，以及 9 个 thread 共 15 条评论（4 条未回答）的 seed 数据。全部有测试、有类型，working tree 留给你 review。

为什么比直接实现好？不 grilling 你很可能漏掉：empty state、讲师队列、XSS 过滤；也很可能做出更差的选择：扁平列表加 seen 状态（比一层回复更复杂）、给学生开放完整 HTML 渲染（危险）。Grilling 让你在写码之前想清这一切，实现因此变得机械——难的决定已经做完。agent 不是在耍聪明：它用压力（矛盾、边界情况、安全问题）把你的真实意图逼到光下，然后照你们同意的方案精确实现。这就是 grill-execute-clear loop 的一圈：Grill——问到共享心智模型；Execute——带着还热的 context 自信实现；Clear——feature 完成并 commit 后清空，下一个任务从零开始。session 历史没了，但 grilling 留下的东西正是你需要的。

**动手**

```bash
npm run reset
```

```
/grill-me
I want to add comments to lessons so students can ask questions and discuss.
```

**自测**

**Q1**：grilling 的 frontier 是什么？session 何时可以结束？

> **A**：frontier 是前置条件都已确定、当前可回答的全部决策；每轮整片提问，回答会扩张 frontier 并解锁新问题。frontier 清空、没有任何被静默假设的分支时，才进入实现。

**Q2**：grilling 过程中后台探索发现的那个安全 bug 是什么？

> **A**：renderMarkdown 没有 sanitization，原始 HTML 穿透，学生可注入 script 标签在讲师 session 中执行（XSS）。对策是受限渲染器 renderComment()，只对学生评论过滤。

**Q3**：为什么 Execute 阶段不清空 context？

> **A**：grilling 的 primary source 正是实现最好的输入——带着共识和全部决策直接干，难决定已做完，实现变得简单，且无需重新探索。

## P41 ｜ 041 Compaction

**要点**

- 在同一 session 里硬撑过 smart zone，结果会缓慢劣化：旧 token 因缓存而便宜，但延迟高、能力弱，而且大量 token 只是工作噪音
- 全清重启有隐藏成本：丢掉初始对话里的关键推理，重探索是有损的，当初的 why 回不来
- compaction 把当前 session 压缩成摘要去播种新 session：156k 压到约 28.3k，像一次你亲手控制的、反向的 subagent 交接
- 摘要由语言模型来写：/compact 后面带一句话说明下一步意图，往往一句话就够

**笔记**

用 agent 建 feature，迟早撞到 smart zone 的尽头——context window 中模型表现最好的那段。继续赖在同一个 session 里，每次请求都拖着之前全部 token：这些 token 因被缓存而便宜，但整体处于高延迟、低能力状态；更要紧的是，其中多少真的有用？大量只是工作本身的噪音——读过的文件、写过的文件、项目推进中的各种中间状态。

天真的解法是彻底 clear 重开，但有隐藏成本：agent 失去初始对话中的关键理解，必须重新探索、重新建立已知。你可以让它「we are going to do QA on the stuff that's literally just been worked on. Can you go and explore it so you understand the reasons behind its existence?」——它能重读代码，但重探索是有损的：当初构建背后的那个 why 丢了大半。

compaction 登场：不整段清空，而是把当前 session 的 context 挤压、摘要，用来播种一个可继续工作的新 session。可类比为一次由你控制的 session 间交接——类似 subagent 的反向操作。三条路对比：

| 方案 | Tokens | 质量 | 代价 |
|---|---|---|---|
| 继续当前 session | 156k+ | 全量上下文，噪音多 | 高延迟，dumb zone 效果 |
| 清空重来 | ~5k | 白纸一张 | 必须重新探索一切，理解有损 |
| Compaction | ~28k | 摘要上下文 | 有损压缩，二手来源 |

compaction 省下的是重新探索的开销——没有它，你得烧大量 token 重新发现自己早已确立的上下文。

实操：在 agent 里运行 /compact 并附一句摘要指引，如 `/compact Yeah, we're going to do some QA in this area.`。这句指引很重要——做摘要的是一个语言模型，它需要知道什么信息与下一步相关才能突出重点；不用写长，一句话往往就够。启动后 agent 会展示压缩进行中的 UI。实用技巧：可以在 compaction UI 里排队消息，压缩一结束排队的消息自动执行，不用干等。

压缩完成后输出的摘要包含：primary request and intent（你最初要什么）、full agreed spec（所有确认过的决策）、key technical concepts（关键领域知识）、file references（关键文件指针，部分文件原文保留）、errors and fixes（哪里出错怎么解决）、problem solving（思路与推理）、all user messages（你说过的一切）、pending tasks（待办）。压缩比非常可观：原 session 约 156,000 token 压到约 28,300——150k 变 30k，smart zone 空间大量回归。`/context` 显示 28.3k / 1m（3%），free space 971.7k。摘要把文件变更压得极密，例如一行概括一个新文件：`app/lib/comments.ts (new): MIN_COMMENT_LENGTH = 1, MAX_COMMENT_LENGTH = 5000 (client-safe, mirrors ratings.ts)`。

代价是信息损失。用史学术语理解：initial session 是 primary source（当事人在场的记录），摘要是 secondary source——史学家写的二手综述，对一手来源的有损压缩。这是你见到的第一个能跨 session 保留 context 的交接机制，而所有交接机制共享同一条定律：制造二手来源必然损失信息。换来的是效率：一手来源信息全但噪音多、腾挪空间小；二手来源有损但噪音少、空间富余。那 compaction 什么时候大放异彩？恰好是「对刚完工的东西做 QA」这类场景：你不重新实现、不做架构决策，只是验证一个已完成的东西——此时 compaction 是铁打的好选择。后续课程会把它与 clear 等机制做完整对比。

**动手**

```
/compact Yeah, we're going to do some QA in this area.
```

**自测**

**Q1**：把 156k 的 session 压到 28k 后继续工作，压缩前的细节处于什么状态？

> **A**：它已变成摘要，原始细节的细微之处回不来了。compaction 是挤压不是存储，事后无法完整取回；它也不写任何文件，而是在内存里播种新 session。

**Q2**：/compact 要不要带说明？带多少合适？

> **A**：要带。写摘要的是语言模型，一句话说明下一步（如转 QA）能让它突出相关内容；裸跑 /compact 它只能瞎猜重点，等你想起来再解释已经压完了，贴整份 spec 又属浪费。

## P42 ｜ 042 Handing Off

**要点**

- compaction 有两个硬约束：只能在同一目录、同一 agent 内进行——Claude 做完想让 Codex 来 review，compaction 无能为力
- /handoff skill 的思路：把对话总结写成一个 handoff markdown 文件，完全可移植——喂给别的 agent、别的目录、同事都行
- 文件写到 OS 的临时目录（不是当前工作区），设计上是一次性产物，机器重置或系统清理时消失
- 与 compaction 不是替代关系：同目录续作、要保留上下文用 compaction；跨 agent、跨仓库、发同事用 /handoff

**笔记**

上一课的 compaction 有约束：只能压缩同一目录里的同一 agent。比如用 Claude 做完实现、想交给 Codex 这类 agent 去 review，compaction 就没有办法了。

办法是有的，而且作者遇到这场景太频繁，干脆做了个 skill：/handoff。理论很直接——不在 agent 内存里压缩，而是创建 handoff.md 这个 markdown 文件，它完全可移植：喂给 Codex、传给另一个目录里的 agent、发给同事，或者交接你在 feature 中途发现的支线任务。特别好用的场景：做 feature 时撞见一个与当前无关的 bug，想以后另开 session 修——生成一个 handoff artifact 存着，回头再取。

先 `npm run reset` 选到 handoff skill 的 lesson。skill 定义极短：「Write a handoff document summarising the current conversation so a fresh agent can continue the work. Save to the temporary directory of the user's OS - not the current workspace.」亮点在保存位置：写进 OS 临时目录意味着这些 handoff 文档天生是临时性的——不落项目、不进 memory，机器重置或系统清临时目录时自动消失。

实操演示：resume 之前的星级评分 session（约 89k token，是个交接的好时机），运行 `/handoff pass to Codex to review`——和 compact 一样要给个理由，告诉它下一个 session 的目的。agent 请求写临时目录的权限，随后产出的 handoff 文档是一份相当详尽的二手来源，与 compact 摘要相似但更全面，包含：feature 是什么；待 review 的文件（附 git status / git diff 指引）；关键决策与中途修掉的 bug；已知的既有问题（不属本次改动）；已做过的验证；diff 应遵循的项目惯例；值得探查的 review 角度；下个 session 建议用的 skills。

播种新 session 的方式：另开窗口，/clear 清出全新 session，用 @ 引用文件——`@/tmp/handoff-course-star-ratings-review.md`——文件立即被读进 context，随时可以开始 review。

/handoff 与 compaction 的选型：

| 场景 | 用哪个 |
|---|---|
| 留在同一目录 | Compaction |
| 要保留上一段对话的上下文 | Compaction |
| 不在乎保留（还能在压缩后排队消息） | Compaction |
| 交给不同的 agent | /handoff |
| 交接给另一个仓库 | /handoff |
| 发给同事 | /handoff |

compaction 依然很好；/handoff 更灵活，但把文档接进下一个对话稍繁琐，只有当你确实从中获益时才值得用。

**动手**

```bash
npm run reset
```

```
/handoff pass to Codex to review
```

新 session 中引用交接文档：

```
@/tmp/handoff-course-star-ratings-review.md
```

**自测**

**Q1**：用 Claude 实现完 feature，想让 Codex 来 review，context 怎么带过去？

> **A**：写一份 handoff 文档，再从 Codex 里引用它。compaction 只在同一 agent 同一目录内有效，够不到 Codex；让 Codex 自己探索只拿到代码、拿不到决策和已发现的 bug；把摘要存进项目会一直滞留——handoff 特意写在 workspace 之外。

**Q2**：handoff 文档写到哪里、能活多久？

> **A**：OS 临时目录，到期会被清理。它被设计成一次性的：不进项目、不进 memory，机器重置或系统清临时目录即消失。

## P43 ｜ 043 Clear, Compact, Handoff, Or Subagent

**要点**

- 编码 session 自然分成离散阶段：grilling、implementation、QA；阶段边界是决策点——决定这个 session 的 context 何去何从
- 五个选项：Continue、Clear、Compact、Handoff、Subagent，配合一棵四问决策树使用
- 决策树：能继续吗 → context 与下个任务无关吗（无关就 clear）→ 需要跨 agent/目录/同事交接吗（handoff）→ 任务能 AFK 完成吗（能就派 subagent）→ 默认 compact
- 这些判断带主观性和品味，要在实践中形成自己的答案

**笔记**

到目前为止的编码 session 都自然裂解成离散的块：grilling 阶段、implementation 阶段、收尾的 QA 阶段（我们在 QA 前做了 compaction）。每个阶段由两部分组成：阶段本身（grilling/实现/QA 的执行）和阶段之间的边界。边界极其重要——那是你决定「这个 session 接下来怎么办」的决策点。课程实例：grilling 结束时才约 30k token，直接继续实现最合理——实现可以依赖 grilling 的一手来源，没有任何二手折损；而实现结束要 QA 时选择了 compact——smart zone 基本用完，滤掉杂渣、只留好料给 QA。

五个选项：**Continue**（留在当前 session，无需切换）；**Clear**（彻底清空 context window，从零开始）；**Compact**（压缩 context 并播种新 session）；**Handoff**（生成一份可带到任何地方的 markdown 总结）；**Subagent**（派 subagent 处理任务并汇报）。驾驭这五者不易，作者画了一棵决策树，从顶往下走：

第一问：**能继续吗？** 这本身就是个内容丰富的判断。grilling → implementation 显然该继续——那份 rich primary source 正是实现需要的，不想丢。或者 smart zone 预算还足：比如才 80k token，且知道任务很小、装得进 smart zone，那就直接继续。若判断必须做点什么，进入下一问。

第二问：**本 session 的信息对下个任务是否完全无关？** 也就是说，这段探索、这些决策，对接下来要做的事是不是完全可弃？若是，clear——这是最高效的路径：零耗时，只是删信息，还你最多的 smart zone、回到白纸。但若清掉的是相关信息，就会丢失将来有用的东西：设想 QA 前不 compact 而 clear——QA 对实现一无所知（也许能从 git commits 里悟出来），连 grilling 的决策推理也一并丢失，而这两个阶段都对 QA 至关重要，所以 clear 不可行。若 context 相关，进入下一问。

第三问：**需要 handoff 吗？** handoff skill 的适用面相对窄：把工作交给另一个 agent、另一个目录或同事；或把阶段中途发现的支线任务分叉出去而不打断当前 session（比如 grilling 时发现一件也得处理的事，顺手 handoff 给另一个 session）。需要就 /handoff，不需要进入下一问。

第四问：**任务能 AFK 完成吗？** AFK = away from keyboard：你不碰键盘、只旁观且无法介入——意味着任务 scope 足够好，agent 全程不需要你。典型例子：人类 review 之前先跑一轮 automated review，让 agent 检查改动有没有弄坏东西、有没有奇怪操作。此时（实现后约 150k token）本可以 compact 后在主 session 跑，但 automated review 不需要人，不如丢给 subagent 在它自己的 context window 里跑，完全不碰主 session——这是 automated review 的常见模式，课程后面还会讲到。能 AFK 就派 subagent，不能就到最后一站。

**默认答案：Compact。** context 相关、你要用它、不能继续、不需要 handoff、任务又需要你在场——那就 compact：压缩窗口、把好东西播种进新 session，留下要紧的，丢掉不要的。

最后强调：这些都不是客观题，带一点主观、一点品味，你会在与 agent 的持续合作中形成自己的答案。阶段边界的选择是 AI 编码中最模糊也最有意思的决策之一，值得大量讨论和积累智慧——去课程 Discord 用这套共同语言讨论具体场景。

**自测**

**Q1**：grilling 刚结束、才 30k token、下一步是实现，边界上怎么选？

> **A**：Continue——grilling 正是实现需要的一手来源。compact/handoff 会拿有损的二手来源换掉一手来源，还白白付摘要成本；clear 更糟，实现会丢掉每个决策背后的推理。

**Q2**：一个阶段结束，其中探索和决策对下个任务完全无关，怎么办？

> **A**：Clear——零耗时、还回最多 smart zone。compact 和 handoff 都在为已判定不需要的信息生产二手来源，摘要还占着窗口；subagent 只隔离新任务，旧 session 仍压在底下。

**Q3**：实现后 150k token，下一个活是不需要你在场的 automated review，怎么选？

> **A**：派 subagent，让 review 用自己的窗口。compact 也行，但要为一件你不经手的任务花一次摘要成本，结果还落回你的窗口；clear 丢掉实现上下文；continue 则在 150k 高位运行——正是你想逃离的 dumb zone。

## P44 ｜ 044 Auto-Compaction

**要点**

- 超过窗口上限会直接报错（Opus 4.8 是 1M token，发 1,000,001 就失败），所以每个 harness 都内置 auto-compaction 兜底
- /config 里搜 auto-compact 可见开关；`~/.claude/settings.json` 的 `"autoCompactWindow": 250000` 可自定义触发点（10 万–100 万 token）
- 它的承诺很美——从此不用想阶段边界——但实践极难做好：阶段中途被压缩的 agent 常常迷路、风格突变、忘掉功能
- 自动压缩还剥夺了你给摘要下指示的机会；作者的信条：宁可提升人的技能，也不把决策树交给 harness

**笔记**

如果硬把 context 推过窗口上限会怎样？课程用的 Opus 4.8 有 100 万 token 窗口，发一个含 1,000,001 token 的请求会直接收到错误——模型处理不了。为此 agent 内置了保护：到某个点会自动压缩 session。在 agent 里输入 /config 搜索 auto-compact 即可看到：`Auto-compact: true`，说明文字为 "Automatically compact conversation when context fills"。每个 agent harness 都有这机制，因为每个 harness 都有这个问题：撞线就暂停 session 并自动压缩。以前能在 /context 里看到 autocompact buffer，现在被各家做得更隐蔽了。

可定制的一点：在 `~/.claude/settings.json` 里调整触发时机，比如 `"autoCompactWindow": 250000`（用满 250,000 token 后自动压缩），取值范围 100,000 到 1,000,000。

auto-compaction 的承诺确实诱人：想象一个完全不用考虑阶段边界、不用考虑 smart zone、不用考虑 context 的世界——Continue/Clear/Handoff/Subagent/Compact 那棵决策树根本不需要，时机一到自动压缩。网上也确实有不少人宣称 auto-compaction 替他们搞定了一切。

但它其实是个极难解的问题，做错了代价惨痛。第一个原因：**在阶段中途压缩很危险**。回顾典型的「grilling + implementation」session，最安全的压缩点显然是两者之间的阶段边界。可如果压缩落在 grilling 中途，你就只能基于摘要工作——作者的体感是 agent 经常明显迷路，忘掉你们刚刚还在聊的东西。实现阶段中途被压缩往往更糟：agent 完全失去方向，后半段代码风格与前半段判若两人，丢失思路、忘掉本该实现的功能。第二个原因：**你失去了对交接的控制**。手动 /compact 或 /handoff 时那句摘要指引（告诉它压缩重点、下个 session 的意图）是压对内容的关键，auto-compaction 没有任何等价的钩子给你。

那阶段中途压缩永远都坏吗？未必，但无论模型多强，这看起来都会是个难题。作者的总态度是：**提升人的技能，而不是加重对 harness 和模型的要求**。宁可让人自己掌握那棵决策树——这是一次性的学习曲线，而且越熟练结果越好：更多 session 停在 smart zone 里，控制力更强。

于是有了这条真正的规则：如果你触发了 auto-compact buffer、session 被自动压缩了，多半是什么地方出了问题。你应该自己做主：continue、clear、handoff、subagent 还是 compact。当你 owns 这个决策，你会得到更好的代码。

**动手**

`~/.claude/settings.json` 中自定义自动压缩触发点：

```
{
"autoCompactWindow": 250000
}
```

**自测**

**Q1**：实现到一半 session 自己暂停并压缩了，该从中读出什么信号？

> **A**：你把边界决策拖得太晚——该自己掌舵。harness 确实救了场，但压在了最危险的阶段中途；模型能力不是问题，问题是没人认领阶段边界。

**Q2**：grilling 加 implementation 的 session 必须压一次，压在哪里伤害最小？

> **A**：阶段边界上（grilling 与实现之间）。切进实现常是最坏情形：后半段风格突变、忘记待实现的功能；切进 grilling 则忘掉刚才的讨论；而且摘要有损，落点当然重要。

**Q3**：想让 agent 改在 250k token 时自动压缩，改什么？

> **A**：在设置文件里设 `autoCompactWindow` 为 250000（合法范围 100,000–1,000,000）。没有 compactThreshold 这个键管这事；/compact 只按需压缩；关掉 auto-compact 是取消自动而非挪动触发点。
