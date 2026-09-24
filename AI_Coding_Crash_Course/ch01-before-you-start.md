---
title: "第一章 · 准备篇（Before You Start）"
section: "Before You Start"
lessons:
  - "P1 ｜ 001 Where We're Going"
  - "P2 ｜ 002 Choosing Your Plan and Model"
  - "P3 ｜ 003 Setting Up the Project"
  - "P4 ｜ 004 Installing Claude Code"
  - "P5 ｜ 005 How To Run the Exercises"
  - "P6 ｜ 006 Database Migrations"
  - "P7 ｜ 007 Resetting to a Clean Slate"
  - "P8 ｜ 008 Installing The Request Logger"
source: "aihero.dev AI Coding Crash Course"
---

# 第一章 · 准备篇（Before You Start）

本章是整个课程的地基：先讲清课程目标与教学方式，再带你完成环境搭建——选订阅与 model、克隆并跑通练习项目 Cadence、安装 agent（Claude Code）、学会用课程自带的 reset / cherry-pick / pull 工具对齐进度。最后两课教你把 agent 配置清回干净状态，并装上 request logger 打开 agent 的黑盒。

## P1 ｜ 001 Where We're Going

**要点**

- 课程核心是一套久经考验的五步系统：grilling → spec → tickets → implementation → review
- 实战平台是 Cadence，一个 TypeScript + Node 的在线课程应用
- 课程 agent 无关：任何能在终端运行、支持 skills 的 agent 都行，内容全部通过 skills 交付
- 前提只有两个：能读代码、会用终端

**笔记**

这门课是 Matt Pocock 两年 AI 编程实践、以及「把软件工程基本功带回 AI 编程」的浓缩（其 skills 仓库录制时刚突破 200,000 stars，位居 GitHub 历史星标前 20，下载量超 1300 万）。课程核心是那套五步系统：grilling（拷问需求）→ spec → tickets → implementation → review。无论他平时再怎么折腾别的东西，这五步始终没变过，是高质量交付的刚需。

课程会深入 context management：attention 会随 context window 变长而衰减，你要知道什么时候 compact、什么时候 clear、什么时候 hand off，以及怎么把大块工作拆成 agent 消化得了的小任务。

所有内容都在名为 Cadence 的 playground 上实操——一个 TypeScript + Node 应用，功能相当成熟：用户买课、学课、做测验。这是一门实操课，你会和 agent 一起交付功能，走一遍作者十年间打磨出来、与 agent 配合极好的软件生命周期。

选哪个 agent？答案是：任何能在终端运行、支持 skills 的 agent 都可以——Claude Code、Codex、OpenCode、GitHub Copilot 之类都算。这门课不教某一家 agent 的怪癖，而是教你能迁移到任何 harness 的基本功。演示用 Claude Code（作者的日常工具，也是录制时最流行的 coding agent），零基础学员会有一节入门，之后正文基本不再围绕它展开。

结课后你能以高质量交付大量工作——靠的不是把 model 变强，而是把你变强，让你更会驱动 agent。这套方法对 context 的占用极轻，只要求你多一点点理解。

**自测**

1. 课程的五步系统分别是哪五步？
> **A**：grilling → spec → tickets → implementation → review。
2. 挑选 agent 的标准是什么？为什么课程内容不绑定具体某一家？
> **A**：只要能在终端运行、支持 skills 即可；课程内容通过 skills 交付，学的是可迁移到任何 harness 的基本功。
3. 这门课的两个前提条件是什么？
> **A**：能读懂代码（不必会写，看懂大致形状即可）、会用终端执行 `cd`、`ls` 这类基本命令。

## P2 ｜ 002 Choosing Your Plan and Model

**要点**

- 必须付费订阅；Anthropic 从 Pro 起步，职业向选 Max（课程最多用到 5X）
- 订阅比按 token 计费的 API key 便宜 20–50 倍，且没有预算心理负担
- model 用订阅档自带的默认款；Pro 档避开 Opus，额度烧得太快

**笔记**

开始之前要先搞定 AI 访问方式：选对订阅档位。免费额度撑不起这种 agentic 工作量，第一个正式 session 就会撞墙。

Anthropic 侧：Free 不够用；Pro 刚好够完成课程，是推荐起点，附带一个中档 model；如果职业化使用，直接上 Max——分 5X 和 20X 两档。OpenAI 侧结构类似，中间多一档 Go：Plus 相当于 Anthropic 的 Pro，从这里开始，撞到用量上限再升 Pro。录制时作者用的是 20X Max，但你最多只需要 5X，约 £89/月（合 $100 左右）。

订阅和按 token 计费的 API key 怎么选？订阅划算得多——按你的档位和用量，通常便宜 20 到 50 倍。例子：Theo 单月烧掉近 $50,000 的 token，同样的量用订阅只要三个 $200 的 Claude 订阅加一个 $200 的 Codex 订阅，$800 搞定。

按 token 计费还有心理成本：像家里装了电表，你会变得不敢用电，开始为省 token 而不是为效率优化，甚至为了压低数字换更差的 model——盯着成本看就会做出牺牲质量的非理性决策。订阅则是一口价，先知道花多少、能得到什么，没有预算焦虑。

结论：没有偏好就用 Claude Code + Pro；认真走职业路线就上 Max。model 直接用订阅档默认款，Pro 档避免用 Opus——额度会烧得飞快。model 选择后续会再讲，先锁定订阅再开始；拿不准去课程 Discord 问。

**自测**

1. 为什么不推荐按 token 计费的 API key？
> **A**：通常比订阅贵 20–50 倍，而且有心理负担——像装了电表，会为省 token 做出牺牲质量的非理性决策。
2. 用 Anthropic Pro 档，model 该怎么选？为什么？
> **A**：用订阅自带的 default model；Pro 档用 Opus 会极快耗尽用量上限。
3. 想把 AI 编程当职业，选什么档位？实际需要多高？
> **A**：Anthropic Max；课程实际最多只用到 5X（约 £89/月）。

## P3 ｜ 003 Setting Up the Project

**要点**

- 推荐 VS Code：免费、跨平台、够亲民，且有内置终端（Ctrl+` 打开）
- 环境链路：git clone → Node LTS + npm → npm install → 建库 + 灌种子数据 → npm run dev
- 数据库是本地文件 data.db，新克隆不含它，需要 db:migrate + db:seed 两步生成
- 应用 Cadence 底部有 dev UI，可切换登录用户查看不同数据

**笔记**

课程大部分时间在终端里度过，agent 本身就是个终端程序。推荐 IDE 是 Visual Studio Code——作者 2017 年用到现在的理由：完全免费、跨平台、够亲民、内置终端。已有顺手的 IDE 就直接用，只要带终端、能看代码即可。装好后按 Ctrl+` 打开集成终端，它会定位到 VS Code 当前打开的文件夹，面板可拖动、可拆分。Mac 和 Windows 自带终端，Windows 还可以用 WSL（Windows Subsystem for Linux）获得 Linux 终端。终端命令不在行的话，去 Discord 找学习资源。

项目在 GitHub 上，克隆需要 git（用 `git --version` 检查）：仓库页点 Code、选 HTTPS、复制 URL，clone 下来后用 `code` 命令在 VS Code 里打开，左侧就能看到文件树。

项目靠 Node.js 在本机跑 JavaScript，`node --version` 检查（录制时为 `22.21.1`）。要装 LTS（Long-Term Support）版本——最稳定；Current 是最新最花哨的版本，EOL 是已停止支持的版本。目标版本 22 或 24。装完看不到 node，就把终端关掉重开刷新 PATH。Node 自带 npm（Node Package Manager），一并确认。

依赖安装：`npm install` 从 npm registry 拉全部包，出警告和漏洞提示是 npm 的常态，完成后文件树里会出现 `node_modules`（比如本项目依赖的 `ai-hero-sandcastle` 就在里面）。

数据库是本地文件，新克隆没有，要两条命令：先 `npm run db:migrate` 在项目根目录生成 `data.db`，再 `npm run db:seed` 灌入种子数据。这些脚本都定义在 `package.json` 的 `scripts` 里。

最后 `npm run dev` 启动 dev server，Ctrl+点击打印出的 `localhost:5173` 之类地址，直接在 IDE 内打开应用。这个应用就是 Cadence：底部有个 dev UI，可以切换当前登录用户——比如切到 Emma Wilson，能看到她有 TypeScript 和 Node.js 两门课；种子数据（课程、课时、用户）由 Marcus Johnson 创建。在 VS Code 里能看到这些假数据，本课就完成了。

**动手**

```bash
# 1. 确认 git 已安装
git --version

# 2. 克隆课程仓库
git clone https://github.com/ai-hero-dev/ai-coding-crash-course.git

# 3. 在 VS Code 中打开项目
code ai-coding-crash-course

# 4. 确认 Node 与 npm（需要 LTS 版本，22 或 24）
node --version
npm --version

# 5. 安装依赖
npm install

# 6. 建库并灌入种子数据
npm run db:migrate
npm run db:seed

# 7. 启动 dev server，Ctrl+点击 localhost 地址验证
npm run dev
```

**自测**

1. 新克隆的仓库直接 `npm run dev`，为什么缺数据？
> **A**：数据库是本地文件 `data.db`，克隆不包含；要先 `npm run db:migrate` 建库，再 `npm run db:seed` 灌种子数据。
2. 安装 Node 应该选哪类版本？目标版本是多少？
> **A**：LTS（Long-Term Support）版本，最稳定；Current 是最新版，EOL 已停止支持。目标 22 或 24。
3. 装完 Node 后终端里仍找不到 `node` 命令，怎么办？
> **A**：关掉终端重新打开，刷新 PATH。

## P4 ｜ 004 Installing Claude Code

**要点**

- 安装后从项目目录启动 `claude`：信任 workspace 选 Yes，登录走 subscription + 浏览器授权
- `/model` 选订阅档的 default，effort 从默认 xhigh 调到 medium
- 更高 effort 只会更耗 token、更慢，对本课的工作没有更好答案
- 发一句 `hello` 收到回复，即完成验证

**笔记**

项目就绪后，只差 agent 本身。本课用 Claude Code 演示；用其他 coding agent 的，按各自文档安装并登录即可。

安装：在项目文件夹里新开一个终端，去 Claude Code setup 页面复制对应平台的安装命令并运行。Linux / WSL / macOS 是 `npm install -g @anthropic-ai/claude-code`，Windows PowerShell 和 CMD 的命令见 setup 页。

然后在项目目录里启动 `claude`。问到 do you trust this workspace? 时回答 Yes；登录时选 subscription 选项，让它打开浏览器、在浏览器里完成授权、再回到终端。

接着运行 `/model` 打开 model 选择器，选你订阅档对应的 default（比如 Opus 5，带 100 万 token 的 context window），并用左右方向键把 effort 从默认的 `xhigh` 调到 medium——注意它默认就是 xhigh，一定要手动调低。课程录制用的是 Opus 5 + medium effort：更高的 effort 烧 token 更快、跑得更慢，而对本课的工作量，它买不来更好的答案。

最后发一句 `hello` 做冒烟测试，收到 `hello` 回复，配置就完成了。

**动手**

```bash
# 1. 安装 Claude Code（Linux / WSL / macOS；Windows 见 setup 页）
npm install -g @anthropic-ai/claude-code

# 2. 在项目文件夹内启动；trust workspace 选 Yes，
#    登录选 subscription，浏览器授权后回到终端
claude
```

```text
# 3. 打开 model 选择器：选订阅档 default，effort 调到 medium
/model

# 4. 冒烟测试：发送 hello，收到 hello 回复即完成
hello
```

**自测**

1. effort 的默认值是什么？应该调成多少，为什么？
> **A**：默认 `xhigh`，应调成 medium；更高 effort 耗 token 更快、跑得更慢，对本课的工作不会给出更好的答案。
2. 登录 Claude Code 时应该选哪个选项？
> **A**：subscription 选项，让它在浏览器打开授权页完成认证。
3. 用什么命令打开 model 选择器？
> **A**：`/model`。

## P5 ｜ 005 How To Run the Exercises

**要点**

- 三个对齐进度的工具：`npm run reset`（替换）、`npm run cherry-pick`（叠加）、`npm run pull`（拉更新）
- 一切操作在 `dev` 分支上进行，main 保持干净；不建分支工具会拒绝运行
- reset 是破坏性的：回退整个分支，未提交的工作会丢，reset 前先 commit 或 stash
- 不熟 Git 和 merge conflict 就全程只用 reset

**笔记**

这门课靠练习驱动——规划这个功能、加上这个改动、修掉这个 bug。代码课最大的敌人是 drift：你做了视频里没做的改动，三课之后你的代码库就和屏幕上的对不上了。为此项目内置三个 CLI 工具，让你随时跳到任意练习的起始状态。

`npm run reset` 把你的分支重置到某个 checkpoint，你自己的提交会被替换掉；`npm run cherry-pick` 不回退分支，而是把 checkpoint 的提交叠加在你现有工作之上，你的提交保留在下面；`npm run pull` 从上游仓库拉取课程更新合进你的分支，不重置、也不碰你的提交——主要在 Discord 公布修复时用得上。

用之前必须先建 dev 分支：`git checkout -b dev`。这是你的一次性学习分支，三个工具都只在它上面工作，同时让 main 保持干净。跳过这步工具会直接拒绝运行，报 `Cannot reset to main while on the main branch.` 之类的错误。

reset 会打开交互式 picker，按顺序列出全部 checkpoint，可输入关键词过滤（比如输入 `try the cli` 就能筛到 `try-the-cli`）；也可以直接传参跳过选择器。要再强调一次：reset 回退的是整个工作分支，不只是练习涉及的文件，未提交的工作会消失。

验证方法：reset 到 `try-the-cli`，确认 `package.json` 的 `description` 从 `"An awesome horse platform"` 变成 `"An awesome course platform"`；再 reset 回 `main`，确认它变回去。两个字符串能来回切换，工具就正常。

**动手**

```bash
# 1. 建一次性学习分支（必须，否则工具拒绝运行）
git checkout -b dev

# 2. 交互式选择 checkpoint 并重置；选 Reset current branch
npm run reset

# 2b. 或者直接传 checkpoint 名跳过 picker
npm run reset try-the-cli

# 3. 保留自己工作的玩法：在 package.json 加个实验脚本
#    "foobar": "echo 'foobar'"
#    用 VS Code Source Control 面板（Ctrl+Shift+G）或终端提交后：
npm run cherry-pick

# 4. 拉取课程上游更新（不重置、不动你的提交）
npm run pull

# 5. 验证：reset 到 try-the-cli 再 reset 回 main，
#    观察 package.json 的 description 在两个字符串间切换
```

**自测**

1. `reset` 和 `cherry-pick` 对你已有工作的处理有什么区别？
> **A**：reset 把整个分支回退到 checkpoint，你的提交被替换掉；cherry-pick 把 checkpoint 的提交叠加在你现有工作之上，你的提交保留。
2. 为什么必须先建 `dev` 分支？
> **A**：三个工具只在 dev 分支上工作，以保护 main 干净；在 main 上运行会被拒绝，如 `Cannot reset to main while on the main branch.`。
3. 什么时候用 `npm run pull`？它会不会影响你的提交？
> **A**：需要拉取上游课程更新（如 Discord 公布修复）时；它只 fetch 并合并上游改动，不重置、不碰你的提交。

## P6 ｜ 006 Database Migrations

**要点**

- source code 与 database 是两个单元：`schema.ts` 定义形状，`data.db` 存实际数据
- schema 改了之后必须手动跑 migration 才能同步；代码与数据库要一起版本化
- `npm run reset` 只还原代码，不会替你跑 `db:migrate`——reset 后报「列不存在」就补一次
- `db:seed` 随便跑：删表、重建、灌假数据，这不是生产环境

**笔记**

这课补的是很多学员栽过跟头的基础概念：source code 和 database 是两个独立的单元。source code 是你编辑来改变应用行为的文件（如 `app/db/schema.ts`、`app/components/dev-ui.tsx`）；database 是独立存放真实数据的地方——本项目用 SQLite，就是一个叫 `data.db` 的磁盘文件。`schema.ts` 里其实定义着数据库的形状：声明表和列。

关键洞察：source code 定义数据库「应该」长什么样，但在数据库真正跟上之前，你要手动做一步——这就是 database migration（数据库迁移）：手动把数据库更新到与 schema 一致。之所以是手动，是因为数据库里存着用户数据这类神圣不可丢的东西，真实应用里都需要手动迁移来同步。所以代码和数据库必须一起版本化：代码变了、数据库没跟上，大概率报错。

动手环节：`npm run reset` 选 `make-a-schema-change`，它给 `schema.ts` 的 `courses` 表加一个 `notes` 列，并在 `drizzle/` 文件夹生成迁移文件 `0003_lean_hex.sql`。`drizzle/` 就是已应用迁移的历史，从新到旧：加 `notes` 列、加 coupons、给 lessons 加 `github_repo_url`、初始迁移。以后这些由 agent 负责管理，你不用太操心。

哪怕这么小的改动，不迁移就跑 dev server 也会挂：首页正常，课程详情页报 `SqliteError: no such column: notes`（来自 `getCourseBySlug`）——因为 `data.db` 还没同步。要记住：`npm run reset` 只动 source code，不会替你跑 `db:migrate`。修复就是另开终端跑一次迁移，刷新页面即恢复。

另外，这个库随时可以弄坏，不是生产数据。seed 脚本做三件事：删掉所有表、重建、灌入 dummy data（admin Alex Rivera，instructor Sarah Chen 和 Marcus Johnson）。测试特定场景需要特定种子数据时，agent 可能会改它。

**动手**

```bash
# 1. 重置到练习 checkpoint（picker 里选 make-a-schema-change，Reset current branch）
npm run reset

# 2. 查看两处改动：schema.ts 里 courses 表新增的 notes 列，
#    以及 drizzle/0003_lean_hex.sql
```

```sql
ALTER TABLE `courses` ADD `notes` text;
```

```bash
# 3. 启动 dev server 打开课程详情页，复现 SqliteError: no such column: notes

# 4. 另开一个终端执行迁移，让 data.db 追上 schema
npm run db:migrate

# 5. 刷新页面，恢复正常
```

**自测**

1. reset 之后页面报 `no such column: notes`，原因和修法分别是什么？
> **A**：reset 只还原了 source code（`schema.ts` 加了 `notes` 列），`data.db` 没同步；跑一次 `npm run db:migrate` 即修复。
2. `db:generate`、`db:migrate`、`db:seed` 各做什么？
> **A**：`db:generate` 从改动后的 `schema.ts` 生成迁移文件写入 `drizzle/`；`db:migrate` 把待处理迁移应用到 `data.db`；`db:seed` 删表重建并重灌 dummy data。
3. 为什么 migration 是手动的一步，而不是改完 schema 自动生效？
> **A**：数据库保存着重要的真实用户数据，传统上需要谨慎的手动迁移来同步；因此 source code 与 database 必须一起版本化。

## P7 ｜ 007 Resetting to a Clean Slate

**要点**

- 大多数学员带着过度配置进来（MCP servers、skills、plugins、hooks……），建议清空重来
- 推荐让 agent 自己执行清理——它才是自己配置的专家
- 提示词四步：Inventory → Backup（镜像原路径）→ RESTORE.md → Verify
- 凭据、session 与项目源码不动；之后一句命令即可整体恢复

**笔记**

来上课的人多半早就折腾过 agentic 配置：装过 MCP servers、改过 settings、堆了一堆 skills 和 plugins。这大概率意味着你已经 over-configured 了，而大部分人入学时的配置都太多了。

建议是把它们全删掉，从小配置起步；舍不得就先备份。推荐做法是让 agent 自己来。把课程给的提示词整段粘给 agent，让它把一切恢复到全新安装的空白状态，同时完整保留现状。提示词要求它分四步走：

1. **Inventory（盘点）**：查自己的文档确定配置都在哪，找出适用于你的每一项——全局（用户级）和本地（项目级）都要，覆盖 settings 文件、instruction/memory 文件、MCP servers、skills、plugins/extensions、subagents、custom commands、hooks、output styles，逐条报告路径和用途，查过但为空的位置也要报告。
2. **Backup（备份）**：创建 `~/agent-config-backup-<日期>/`，把每一项 move 进去，并镜像原路径让目录自解释。备份是唯一幸存副本，每一步移动都要验证成功。
3. **写 RESTORE.md**：列每个条目、原始绝对路径和恢复命令，要好到让一个没有本次对话记忆的未来 agent 只靠这个文件就能还原一切。
4. **Verify（验证）**：重新跑一遍盘点，报告还剩什么，并确认剩下的都是真正的默认项。

两条红线：登录凭据、credential 和 session 文件原地不动；项目源码不动，只动配置。完成后 agent 会给你一句恢复提示词：`Restore my config from ~/agent-config-backup-<date>/RESTORE.md`。想验证就先清空 session（后面会讲，现在不懂没关系）再粘贴它，agent 会照着文件全部还原。

这么做的意义：先体验没有重配置的状态，学完课程后再精确挑出真正想恢复的东西——免得课程内容和你的「精心策展的奥运火炬」（作者原话是 dumpster fire，随即改口）互相干扰。

**动手**

```text
# 1. 把课程提供的英文提示词整段复制给 agent 执行
#    （四步：Inventory → Backup → RESTORE.md → Verify；
#      备份到 ~/agent-config-backup-<日期>/，凭据与源码不动）

# 2. 以后想恢复时，发给 agent：
Restore my config from ~/agent-config-backup-<date>/RESTORE.md
```

**自测**

1. 清理提示词让 agent 做哪四步？
> **A**：Inventory（盘点全部配置位置，含为空的）→ Backup（move 到带日期的备份目录并镜像原路径）→ 写 RESTORE.md（含原始绝对路径与恢复命令）→ Verify（重新盘点，确认只剩默认项）。
2. 提示词里明确不能动的东西有哪些？
> **A**：auth、credential、session 文件保持原位；项目源码不动——只移动配置。
3. 之后想把配置整体恢复，怎么做？
> **A**：把 `Restore my config from ~/agent-config-backup-<date>/RESTORE.md` 发给 agent，它照文件还原。

## P8 ｜ 008 Installing The Request Logger

**要点**

- request logger 是 agent 与 model provider 之间的 proxy：原样转发，并把每个请求的可读副本写进磁盘
- agent 必须用它打印的命令启动——配置在启动时注入，不要自己手写
- 每个请求三份文件：`.md` 可读渲染、`.request.txt` 原始请求体、`.response.txt` 原始响应流
- 两个关键发现：tools 定义占请求大头；完整 system prompt 每一轮都重发

**笔记**

agent 用起来像黑盒：你发消息，harness 向 model provider 发请求，但里面的内容——system prompt、tool 定义——你全都看不到。课程仓库自带 request logger 来揭开盖子：一个小 proxy，夹在 agent 和 model provider 之间，原样转发一切，同时把每个请求的易读副本写到磁盘。

用法：在仓库根目录跑 `npm run request-logger`。首次运行会依次问你用哪个 coding agent、（若支持多家）用哪个 model provider、要不要记住答案；然后监听 `localhost:8787`，并打印针对你 agent 的启动命令。在第二个终端原样粘贴运行即可——不要自己手写，它构建的命令对你的 agent 是正确的（有的 agent 还需要一个小配置文件，它也会打印出来）。配置都在启动时注入，所以 agent 必须由这条命令启动。发条消息确认 agent 表现如常——proxy 不改变任何行为。

然后打开 `request-logger/logs/`：文件按 UTC 时间戳命名，每个请求三种格式。一条消息可能对应不止一条记录：Claude Code 启动时会发一次 quota probe——一个 one-token 请求探测订阅余量，常以 429 错误出现，它单独成条，不是重试，一条消息两条记录属正常。

`.md` 文件用 XML 标签而非 Markdown 标题分节，因为捕获的内容本身就满是 Markdown 标题。结构：`<meta>`（时间戳、model、endpoint、status）、`<headers>`（authorization 已脱敏）、`<request>`（内含 `<params>`、`<system-prompt>`、`<tools>`、`<messages>`）、`<response>`（stop reason 和 token usage）。

值得注意的三件事：其一，`<tools>` 块是 JSON，占文件大头——一句 `Hello!` 就能超过 1000 行（全文约 1300 行）；其二，`<system-prompt>` 是 agent 在你输入任何内容之前就附加到每次请求里的常设指令，含工作目录、平台、session 指引等；其三，`<messages>` 里你的消息之前还注入了一条 system-reminder（比如当前日期）——它是一条 message，不属于 system prompt，只有靠 logger 才看得见。最后看 `<response>` 的 token 用量：一句 `Hello!` 也可能读入几万 cached tokens——完整的 system prompt 和 tool 定义每一轮都会原样重发。

现在可以把 logger 关掉，课程后面需要时会再专门提醒。

**动手**

```bash
# 1. 终端 1：从仓库根目录启动 request logger
npm run request-logger
#    首次运行回答：用哪个 agent / 哪个 model provider / 是否记住；
#    它监听 localhost:8787 并打印你 agent 的启动命令

# 2. 终端 2：原样粘贴运行它打印的命令来启动 agent（不要自己写）

# 3. 给 agent 发一条短消息，确认响应正常

# 4. 打开 request-logger/logs/，看最新的 .md 文件：
#    .md          可读渲染，从这里看起
#    .request.txt 逐字请求体
#    .response.txt 原始响应流
```

**自测**

1. 一条消息为什么可能出现两条日志？
> **A**：Claude Code 启动时会发一次 quota probe——一个 one-token 请求探测订阅余量，常以 429 出现；它单独成条，不是重试。
2. `.md` 日志为什么用 XML 标签而不是 Markdown 标题来分节？
> **A**：因为捕获的请求内容本身就充满 Markdown 标题，用 XML 标签才能清晰界定各节。
3. 为什么一句 `Hello!` 也会读入上万 cached tokens？
> **A**：完整的 system prompt 和 tool 定义会在每一轮请求中原样重发，tools 的 JSON schema 一句问候就能占 1000+ 行。
