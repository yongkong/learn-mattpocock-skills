---
title: 第六章 · 大型任务交付（Shipping）
section: Shipping
lessons: P57–P70
source: aihero.dev AI Coding Crash Course
---

# 第六章 · 大型任务交付（Shipping）

本章把前几章的五步法（grilling → spec → tickets → implementation → review）推向真正的大工程。核心思路是用 spec 记录目的地、用 ticket 描述旅程，把每张 ticket 压进一个智能区（smart zone），再借助问题追踪器（issue tracker，本课用 GitHub Issues）、/implement、/tdd、/code-review 完成"接票—实现—审查—关单"的循环。章末还回答了几个高频问题：spec 做完要不要留、中途方向错了如何重定向（rerouting）、能不能用 /goal 一把梭，以及如何用 coding standards 约束 agent。

## P57 ｜ 057 How to Tackle Massive Tasks

**要点**

- 小功能或 bug 修复可以一个会话从头做到尾，全程待在上下文窗口（context window）前段的 smart zone；跨层 refactor 或明显超窗的大任务则会跌进迟钝区（dumb zone），甚至整个窗口装不下。
- 解法是开发者用了几十年的老办法：把大任务拆成小块，每块都放进一个 smart zone。
- 拆分需要两份文档：spec 描述目的地（destination），ticket 描述旅程（journey），一张 ticket 对应一个 smart zone 的工作量。

**笔记**

作者开头重申他的 context window 偏执：当前这代模型，他主张所有工作都留在窗口前段的 smart zone。小任务一个会话从始至终没问题；但一旦任务变大——比如触及应用每一层的 refactor，或者一开始就能看出连一个 context window 都装不下——就会滑入 dumb zone 甚至溢出。怎么一次性交付这么大的量？和几十年来一样：拆。把大任务拆成若干小块，每块都装得进 agent 的 smart zone。

真正的问题是：这需要什么样的前置规划？此前的 plan 都只为单个 context window 的生命周期服务，从没考虑过让 agent 跨多个会话工作。作者实验大量做法后落到两份文档上。第一份是 spec：一份交接物（handoff artifact），描述多会话工作的最终目的地——不知道终点在哪，既没法完成任务，也没法验收。spec 会传给每一个会话，让每个会话明白自己的工作如何贡献于总目标；收尾时还要拿它做 review，确认真的到了声称要去的地方。第二份是 ticket：如果 spec 只写了目的地，agent 无从知晓怎么拆，所以还要描述旅程。每个想放进一个 smart zone 的工作块写一张 ticket，内容是该会话要做什么，相当于 spec 的实现计划。有了这套结构，30 张 ticket 撑起一份巨型 spec 的项目也能顺利落地。本章整体就是在讲如何用 spec + ticket 交付比以往更大、更有野心的项目。

**自测**

1. 一个触及所有层的 refactor 明显装不进一个 context window，应该如何组织这项工作？
> **A**：先写 spec 描述目的地，再按"每块装进一个 smart zone"拆出 ticket。单开一个超长会话只会长居 dumb zone 甚至溢出；只写 spec 不拆 ticket 则没人知道怎么分程；边做边定则没有验收基准。
2. spec 和 ticket 的区别是什么？
> **A**：spec 是目的地，交给每个会话并作为最终 review 的依据；ticket 是旅程中的一段，每张对应一个 smart zone 的工作量。spec 在先，且你和 agent 都要读。

## P58 ｜ 058 Set Up Your Issue Tracker

**要点**

- spec 和 ticket 推荐存在仓库之外的 issue tracker 里，agent 能与你读写同一个 tracker。
- 课程选 GitHub Issues：免费、好配、大概率已有账号；方法论对 Jira、Linear、Todoist 同样适用。
- 三步走：安装并认证 GitHub CLI（gh）、fork 课程仓库拿到私有 issues、用 /setup-matt-pocock-skills 写入 tracker 约定并验证。

**笔记**

知道了 spec 和 ticket 的作用，下一个问题是存哪。作者推荐放在仓库之外的 issue tracker——开发者的老朋友，原本用于跨团队协作。用 agent 的妙处在于：它能读你参与维护的同一个 tracker。最著名的就是 GitHub：创建的 issues 可以被 coding agent 通过 GitHub CLI 直接访问。选 GitHub 只是因为配置简单、免费、你大概率已有账号；本课概念对任何 tracker 都适用。

操作步骤见"动手"。先装 GitHub CLI 并 `gh auth login` 认证，它是 agent 从本地通往 GitHub 取 issues 的通道。再 fork 课程仓库：直接在主仓库提 issue 会让大家互相看到彼此的 issues，一片混乱，所以用 `npx ai-hero-cli fork` 建私有副本——它会把本目录的 git 历史替换成一个全新的初始 commit，并创建新的私有 GitHub 仓库；原有的 `pull`、`reset`、`cherry-pick` 照常可用，关键差别是你有了自己的一套 issues。接着 `npm run reset` 找到 "setup skills skill" 这一步，把 /setup-matt-pocock-skills 加进仓库，在 Claude Code 里运行；确认使用 GitHub 后，skill 会写两个文件：AGENTS.md 里新增 `## Agent skills` 一节指向 issue tracker 文档；docs/agents/issue-tracker.md 里写全 GitHub 约定（创建、读取、列表、评论、打标签、关闭 issues 的命令）。最后 `/clear` 清空上下文，让 agent 建一个测试 issue 验证链路：它应自己读到 docs/agents/issue-tracker.md，发现 issues 在 GitHub，然后执行 `gh issue create`。走通这一步，GitHub 就正式成为存放 spec 和 ticket 的 issue tracker。

**动手**

```
gh auth login
```

```
gh auth status
```

```
npx ai-hero-cli fork
```

```
npm run reset
```

运行 /setup-matt-pocock-skills 后写入 AGENTS.md 的内容：

```
## Agent skills

### Issue tracker

Issues and PRDs live as GitHub issues on <your-username>/<your-repo>, managed with the `gh` CLI. See `docs/agents/issue-tracker.md`.
```

验证（先 `/clear`，再对 agent 说）：

```
Add an issue to the issue tracker just as a test, just for a dummy.
```

agent 应执行：

```
gh issue create --title "Test issue (dummy)" --body "Dummy issue created as a test of the issue tracker. Safe to close."
```

**自测**

1. /setup-matt-pocock-skills 确认使用 GitHub 后写了哪些文件、各起什么作用？
> **A**：在 AGENTS.md 写入 `## Agent skills` 一节，指向 issue tracker 文档；并生成 docs/agents/issue-tracker.md，写明 agent 操作 GitHub Issues 的全部约定（增删查、评论、标签、关闭）。
2. 为什么要把课程仓库 fork 成私有副本再开始提 issue？
> **A**：否则 issue 会提到公共主仓库上，所有学员互相看到彼此的 issues。fork 后 `npx ai-hero-cli fork` 会重置 git 历史并创建私有仓库，你拥有独立的一套 issues，pull/reset/cherry-pick 等命令仍可用。

## P59–P60 ｜ 059/060 Write Great Specs With This Skill

**要点**

- /to-spec 不负责拷问需求，它假定对话里已经跑过一轮 grilling，然后把当前对话与代码库理解合成为结构化 spec，发布到 issue tracker。
- spec 模板含 Problem Statement、Solution、User Stories、Implementation Decisions、Testing Decisions、Out of Scope、Further Notes；明确禁止写入具体文件路径和代码片段，因为它们很快过时。
- grilling 的关键价值：探索阶段先告诉你数据模型撑不起哪些需求；听不懂行话就说 "zoom out"；测试缝（test seam）在发布前单独确认。

**笔记**

spec 是目的地文档，能跨会话管理上下文、给团队一个瞄准点。怎么生成？用 /to-spec。它接收的是"已经 grill 过"的对话，把对话与代码库理解合成为 spec——所以流程永远是：grilling session → /to-spec 生成 spec → /to-tickets 拆 ticket → 逐个实现 → 对照最初的 spec 做 review。本课只做前两步，不实现。skill 位于 .agents/skills/to-spec/SKILL.md，配置了 disable-model-invocation: true，即纯 slash command，Claude 不会自动调用。

示例功能是 instructor dashboard：登录讲师后台后除了未答问题的 UI 几乎什么都没有，看不到收入、完课率、测验成绩。analytics 页面天然容易 scope creep，且明显超出一个 smart zone，是 grilling + spec 的标准候选。示范的 grilling 值得细看：开场白用口述给出粗略需求（收入、完课率、lesson drop-off，并欢迎建议），skill 随即深度探索——它发现数据库里根本没有 earnings 概念（没有 fee、payout、refund、currency、price history），"收入"目前只能通过 courses.instructor_id 关联 purchase 求和，即平台总销售额；drop-off 更是几乎没有数据。这相当于工程师对产品经理说"现有数据模型做不到，比你以为的工作量大"。之后分轮作答：同意新增 Instructor Analytics 路由；既看跨课程汇总也看单课程下钻；admin 可看所有讲师并配讲师选择器；平台抽成 20% 用硬编码常量；完课率取每学生平均进度（lesson progress 比 video watch events 干净、少失真）；时间筛选 30/90/all time。遇到听不懂的行话（duration-weight、monotonic funnel）就说 "zoom out"，让它用大白话重述再答。性能问题先尽力做再测量；图表用 recharts 和 shadcn 的 `chart.tsx`；课程选择器放进 URL search params 而非 client state；附加功能先全上、V2 再收敛——第一版先铺开再回撤是合理的。支持 grilling 的 harness 还能把探索型 agent 放到后台跑，你继续聊天。作者提醒：这一大轮规划只花了约 40K context，因为全程用短回答跟进。第三轮里 agent 派 subagent 核查 seed 数据与测试是否耦合；第四轮它主动揪出"全新讲师无数据需要显式空状态"这一经典边界情况，并基于已有的 testing-services skill 询问测试覆盖率——先前的 steering 开始反哺 grilling。问题问完（frontier 清空），双方达成共享理解。

发布前有一个 test seam checkpoint：概念出自 Michael Feathers 的《Working Effectively with Legacy Code》，即你在哪个公共边界写测试。本例只有一个 seam（直接测 services 本身），且前提是 root loader 是真正的 thin pass-through，确认后进入写作。成品结构：Problem Statement 和 Solution 交代 why——有了 why，agent 在 spec 未覆盖的场合能做出符合目的的 tie-breaking 决策；49 条编号的 user stories（as an \<actor\>, I want..., so that...，角色含 instructor/admin/student/developer），编号很重要，ticket 可以引用"本 ticket 解决 user story 35"；Implementation Decisions 记录模块、接口、架构、schema 与 API contract 等决策（含 `analytics_range` 这类类型），刻意不引用具体文件——作者建议把 spec 想象成会在批准前搁置一阵、要递给团队看的东西；Testing Decisions 明确好测试的标准与唯一被测模块 analytics service；Further Notes 甚至写明两处"预期要被批评的设计"（tabs 拆分与最终视觉），先做到最好、预期迭代、别当定案。最后是反直觉的一点：作者几乎不读自己生成的 spec——对话没漂移的话，读它只能检验 agent 的总结能力，这件事可以直接信任。

**动手**

```
npm run reset
```

选择 to-spec-skill 步骤重置分支，skill 出现在 .agents/skills/to-spec/SKILL.md。然后：

1. 就 Instructor Analytics dashboard 跑一轮 /grill-me，让对话把功能收敛成合理且定义清晰的形态。
2. 在同一对话里执行 /to-spec，spec 会发布到 GitHub issue tracker 并打上 ready-for-agent 标签。
3. 读一遍生成的 spec，不满意就改 .agents/skills/to-spec/SKILL.md（结构、章节、详略、user story 格式均可调）。
4. 到此为止，不要实现——下一步要先拆 ticket。

spec 模板正文：

```
## Problem Statement

The problem that the user is facing, from the user's perspective.

## Solution

The solution to the problem, from the user's perspective.

## User Stories

A LONG, numbered list of user stories. Each user story should be in the format of:

1. As an <actor>, I want a <feature>, so that <benefit>

## Implementation Decisions

A list of implementation decisions that were made. This can include:

- The modules that will be built/modified
- The interfaces of those modules that will be modified
- Technical clarifications from the developer
- Architectural decisions
- Schema changes
- API contracts
- Specific interactions

Do NOT include specific file paths or code snippets. They may end up being outdated very quickly.

## Testing Decisions

A list of testing decisions that were made.

## Out of Scope

A description of the things that are out of scope for this spec.

## Further Notes

Any further notes about the feature.
```

探索阶段点破现状的关键发现：

```
// Current reality: earnings = SUM of purchase amounts
SUM(purchases.amount_paid)
JOIN courses ON purchases.course_id = courses.id
WHERE courses.instructor_id = ?
```

**自测**

1. /to-spec 为什么要求先跑过 grilling？它自己不做什么？
> **A**：它不从零拷问需求，而是假定对话历史里已有 grilling 达成的共识，只负责把对话与代码库理解合成为结构化 spec 并发布到 tracker；需求澄清是 /grill-me 的职责。
2. spec 的 Implementation Decisions 为什么禁止写具体文件路径和代码片段？
> **A**：因为它们很快过时。spec 应能在批准前搁置一段时间并交给团队阅读，记录的是决策层面（模块、接口、架构、schema、API contract），而非易腐的实现细节。
3. grilling 中 agent 的问题满是行话听不懂怎么办？
> **A**：直接说 "zoom out"，让它退一步、补足背景、用更简单的说法重述问题，然后再回答。

## P61–P62 ｜ 061/062 Split Features Across Context Windows With Tickets

**要点**

- 有 spec 只知道目的地，还要 /to-tickets 把它切成 ticket，每张对应一个会话（一个 smart zone）。
- 横切（horizontal slices）是陷阱：按数据库→服务→前端分层推进，对整个系统的反馈来得太晚；纵切（vertical slices）从第一张 ticket 就贯穿所有层，尽早验证设计与可行性。
- 每张 ticket 必须小到一个 fresh context window 装得下；审查拆分方案是人的关键职责，agent 会顽强地倾向横切。

**笔记**

spec 解决了目的地，旅程仍缺：要为每个 smart zone 造一张 ticket，逐张领取实现。但切分有好坏之分。应用天然分层——数据库、API、前端，前端里还有 services 和组件。agent 面对跨层工作时的默认做法是横切：Phase 1 做数据库，Phase 2 接服务，Phase 3 接前端。看起来井井有条，实为陷阱，开发者几十年前就懂：Phase 1 的代码设计得好不好，要等 Phase 3 跨层贯通时才知道，横切让你对整个系统的反馈严重滞后。解法是纵切：从第一阶段就同时触碰数据库、API 和前端，先搭最小实现再逐步加厚，之后每个阶段都建立在自己已知集成良好的工作之上。"vertical slices" 这个词本身就好用，agent 对它有既有认知——这个概念与 tracer bullets 源远流长，可追溯到《The Pragmatic Programmer》。

/to-tickets skill 通过 npm run reset 获取（to-tickets-skill 步骤），它把 plan、spec 或对话拆成一组 tracer-bullet 式纵切 ticket，并声明彼此的阻塞关系。调用时机看决策树：阶段结束先问还能不能继续——smart zone 有剩余且当前上下文与下一块工作相关，就留在同一会话；上下文与新任务无关则重新开局；是否需要 handoff？不换 agent 不换目录就不需要；能否 AFK？需要人审查就不行。这个场景若超出 smart zone，是 compact 的好候选；没超就继续。

实测很说明问题：/to-tickets 先给了 10 张 ticket。按 smart zone 约 150K tokens 估算，等于给这个功能预算 1.5M tokens，而作者的直觉上限是 450K（甚至两个会话就够），于是要求"最多三张"。三张的纵切质量不错，但 agent 明确警告第 2、3 张超过单个 fresh context window，且把 indexes、seed 重写、死参数 prefactor（动手前的重构）都塞进了第一张——seed 输出量大、烧输出 token，放在最前尚可理解，但整体过大。改成五张后恰到好处：groundwork、page shell（教科书式纵切）、overview 面板扩充、course detail 选择器、进度与 drop-off funnel 及附加项；agent 自己总结 "Every ticket lands as something you can look at"。它还标了阻塞关系：3、4 都被 2 阻塞，意味着做完 1、2 后可以分头在独立 context window 里并行 3 和 4——可选，但更快，也说明这套流程能扩展到 fan-out（多路开工再合并）。发布到 tracker 后，spec 是父 issue，五张 sub-issue 挂在下面，每张含父链接、what to build 和 acceptance criteria；细节都在父 spec 里，所以 ticket 本身很轻，只声明"这次做 spec 的哪一块"，而明确的验收标准给了 agent 一个干净的停止点。审查建议：粗读即可，它们只是已做决策的摘要。

**动手**

```
npm run reset
```

回到跑过 /to-spec 的同一对话（必要时先 compact），然后：

```
/to-tickets
```

审查拆分方案盯三点：是否纵切（警惕单独的 "implement the database schema" / "build the API endpoints" 阶段）；单张是否装得进一个 fresh context window（太大就让 agent 再拆）；与 agent 迭代直至批准再发布。

**自测**

1. 什么是横切陷阱？为什么 agent 常犯？
> **A**：横切指按层切分工作（先全部数据库、再全部服务、再全部前端），每层代码的质量要等最后跨层贯通时才得到验证，反馈严重滞后。agent 默认这样切，因为它看似组织良好，所以人必须审查拆分方案、坚持纵切。
2. /to-tickets 提案 10 张 ticket 时，作者凭什么判断太多？
> **A**：按一个 smart zone 约 150K tokens 估算，10 张意味着 150 万 token 预算，远超直觉上限（约 45 万，甚至两个会话可完成）；最终五张是甜点区。
3. ticket 之间的 blocking relationship 有什么用？
> **A**：它标明依赖（如 3、4 均被 2 阻塞），使无依赖的 ticket 可以在独立 context window 中并行实现，也让流程能扩展到 fan-out 多路开工再合并。

## P63–P64 ｜ 063/064 Executing Your Tickets

**要点**

- 执行靠三个 skill 协作：/implement 是编排者，/tdd 提供质量，/code-review 收尾审查并提交。
- 测试只在预先约定的 seam（公共边界）上写；警惕 tautological test——断言用代码自己的算法重算期望值，永远通过。
- /code-review 沿两条轴并行跑 subagent：Standards 轴查编码规范，Spec 轴查是否忠实实现 spec；分开报告防止一轴掩盖另一轴。
- 规划结束后的上下文决策：spec 和 ticket 在文档里，对话史已是一次性消费品；clear 比 compact 更快更省，五五开时选 clear。

**笔记**

三个 skill 的分工：/implement 只做编排——实现 spec/ticket 描述的工作、在预定 seam 上尽量用 /tdd、常态化跑 typecheck 和单个测试文件（完整测试套件最后跑一次）、完成后调用 /code-review、提交到当前分支。真正的质量来自 /tdd：agent 在反馈最多时表现最好，先写单元测试再实现，测试给 agent 即时的对错反馈。它规定好测试通过公共接口验证行为而非实现细节、解释 seam（测试所在的公共边界）与坏测试（与实现耦合、同义反复、横切），并给出循环规则：red before green、一次一片、重构留给 review。关键约束：写任何测试前先列出受测 seam 并与用户确认，绝不在未确认的 seam 上写测试，把测试精力留给关键路径和复杂逻辑。tautological test 值得单独记住：`expect(add(a, b)).toBe(a + b)` 这类断言按构造必然通过，期望值必须来自独立事实来源——已知正确的字面量、手工算例或 spec。

/code-review 对 HEAD 与指定基点之间的 diff 做双轴审查，两个 subagent 并行：Standards subagent 拿 diff 命令、commit 列表、仓库内的 standards 来源文件清单，以及《Refactoring》的坏味道基线（Mysterious Name、Duplicated Code、Feature Envy、Data Clumps 等），报告每处违反成文规范的地方（硬违规）与基线坏味道（判断题）；Spec subagent 拿 diff 与 spec，报告缺失或不完整的需求、未被要求的行为（scope creep）、看似实现实则不对的需求。第二轴大幅提升产出质量，还常常自己顺手修掉最糟的问题。审查时机可以每张 ticket 审一次（本课做法），也可以最后统一审。

上下文管理是执行期的日常决策。规划阶段结束后（本例约 90K tokens），问自己 clear 还是 compact：spec 和 ticket 都在文档里，对话史只是它们的冗长版本，随时可弃。compact 的好处是下个会话可能少做些探索；但 clear 更便宜更快，让新会话从满格 smart zone 起步。实测的五个 run 印证了节奏：复制 issue 链接 → `/implement <issue-url>` → agent 读 issue、探索代码库、声明 seam、进入 red-green 循环（单个测试文件一秒内跑完，反馈极快）→ 跑 /code-review（它是 model-invokable，会自动串联，两个 subagent 各自拥有干净的 smart zone，不受主窗口已 113K 的影响）→ 自动修复发现的问题 → 提交。Run 1（groundwork：indexes、seed 重写、prefactor）在 Auto Mode 下基本无人值守——权限请求由分类器把关，这是 Claude Code 特性，其他 harness 也会跟进；seed 脚本报错也自愈了。验证循环很烧 token，这正是任务要切得大小合适的原因。Run 2 体现仓库可探索性的回报：导航指针让 agent 花更少 token 找信息，clear 因此成为可行选项、节奏更快；review 连测试一起审，抓出经典的 tautological test（断言 `PLATFORM_FEE_RATE` 常量等于 0.2——那是配置不是逻辑）；agent 还尝试启动真实页面在 UI 里找元素，作者由此点出反馈回路的重要性：typecheck 验证正确性、测试验证运行时行为，但验证运行中的应用还缺工具，可以上 Chrome DevTools MCP server 或 agent-browser。Run 3 特意试了 compact：更慢，要花输出 token 生成摘要，且摘要与后续工作的相关性存疑；这次 review 的两条轴独立标记了同一个硬违规——question count 在 route 里过滤行，即把数据全拉到客户端再过滤，大量物料白白过网络；spec 轴还抓到真实缺口（team buyers 的 never enrolled 被错误抑制）。结论：compact 没带来什么，回到 clear；五五开时永远选 clear。Run 4 的 ticket 估算再次精准（102.5K）；作者坦言并非每次都这么顺——有时一张 ticket 冲到 300K，只能当学费，回头改进 skill 让它提前识别（常见元凶是波及面超预期的大范围 rename）。大 context window 的好处此刻显现：搞砸了也不会在奇怪的时刻被 compact，虽然贵但能继续；而在怪时点 compact 会以奇怪的方式丢上下文。作者把自动 review 视为流程的固有部分：实现工作在被另一个 agent review 之前不算完成。Run 5 收官（132K）后做 QA：`npm run dev` 起服务，逐一核对 tab、时间筛选、drop-off、quiz、按国家收入、admin 视角与全新讲师的空状态。总体"好得离谱"，但有视觉瑕疵——规律很清楚：agent 拥有反馈回路的部分（功能、数据）做得好，没有反馈回路的部分（UI 观感）就粗糙。该方法可扩展性极强：作者跑过 30 张 ticket 的 spec，且每个 commit 落地前都有 reviewer 把关。

**动手**

```
npm run reset
```

重置到 implement-skill 提交，得到 /implement、/tdd、/code-review 三个 skill；逐个阅读 .agents/skills/ 下三个 SKILL.md，重点看 /tdd 的 "What a good test is"、"Seams - where tests go"、反模式与循环规则，以及 /code-review 的双轴 subagent。然后对第一张 sub-issue（在 GitHub 上复制链接）：

```
/implement <issue-url>
```

观察它：提议并确认 seam → 写失败测试（red）→ 实现（green）→ /code-review → 修复 → 提交。审查输出确认四点：无成文规范违规、无基线坏味道、spec 需求全部实现、无 scope creep。然后在 GitHub 关闭该 sub-issue（解锁下一张），决定 clear / compact / continue（约 90K 以上建议 clear）。对其余 ticket 重复该循环。全部完成后 QA：`npm run dev`，核对 spec 中每个功能、浏览器 console 无报错、UI 正常、数据与 seed 对得上。

**自测**

1. 什么是 seam？/tdd 对它有什么硬性规定？
> **A**：seam 是测试所在的公共边界。/tdd 规定写任何测试前先列出受测 seam 并与用户确认，绝不在未确认的 seam 上写测试，从而把测试精力集中在关键路径和复杂逻辑上。
2. 什么是 tautological test？为什么无效？
> **A**：断言用与被测代码相同的算法重算期望值（如 `expect(add(a,b)).toBe(a+b)`），测试按构造必然通过，永远无法与实现相左。期望值必须来自独立事实来源：已知正确的字面量、手工算例或 spec。
3. /code-review 为什么要分 Standards 和 Spec 两条轴并行审查？
> **A**：一个改动可能通过一轴而挂掉另一轴——完全符合规范却做错了事，或精确实现了需求却违反项目约定。分开报告防止一轴的问题被另一轴的通过所掩盖。

## P65 ｜ 065 Should You Keep Your Specs?

**要点**

- 答案反直觉：工作完成就把 spec 关掉（archive），不要当文档提交进仓库，更不要当 source of truth 持续维护。
- spec 是 codebase 的 secondary source（投影/摘要），codebase 才是不会说谎的 primary source；不持续同步，两者必然漂移。
- GitHub Issues 的关闭即归档是理想归宿：移出主视图、团队可见、跨机器持久、agent 随时可回溯。

**笔记**

每完成一个多会话工程，spec 怎么办？它看起来是一份很好的代码说明文档，留着当文档或历史记录似乎都有价值。作者的反转答案：代码一旦落地，立刻关掉 spec。理解框架是 primary source 与 secondary source：spec 是 codebase（或其中一部分）运作方式的浓缩版本，是投影和摘要；secondary source 的问题在于它只是投影。更糟的是漂移：不持续把 spec 与 codebase 同步，两者必然越走越远。这正是流行的 spec-driven development（把 spec 存进仓库当 source of truth）让作者恐惧的地方——agent 在仓库里探索时翻到一份陈旧 spec，很可能相信这个 secondary source 而不去读 primary source，因为 spec 更小、更密、更易探索，而 codebase 冗长难查。可 codebase 不会对自己撒谎：可执行部分——函数本身——基本不会骗你关于代码实际做什么。前提是仓库里没有陈旧部分：不再被调用的函数、纯为遗留保留的系统部分、丢在仓库里的一次性原型。所以结论是：spec 进入代码之日就是它的废弃之时。GitHub Issues 的妙处在于 close 即归档——移出主视图、明确标记已完成，但 agent 或队友想回溯"当时为什么这么做"时它还在那里可查。而且 tracker 里的 spec 是团队的：可 review、可评论、可被不在场的人搜到；本地 markdown 则只属于你一台笔记本。把 ticket 放在本地之外，还能在切换 worktree、更换电脑时保持状态持久。一句话：spec 是定义一段工作的临时 artifact，不是代码如何运作的 source of truth。作者欢迎在 Discord 反驳——很多框架主张持久化 spec，他的实测是那样行不通。

**自测**

1. spec 下最后一张 ticket 合并且功能上线后，spec 应该怎么处理？
> **A**：在 tracker 里关闭它——归档但可查。提交进仓库会让 agent 相信一份会老化的摘要而非代码；直接删除则丢掉免费的历史记录；手工保持同步正是你想避免的维护负担。
2. 为什么仓库里一份过时的 spec 很危险？
> **A**：spec 是 codebase 的 secondary source，且比代码更小更密更易探索，agent 找到它就会止步于此，不再去读不会说谎的 primary source。
3. primary/secondary source 的比喻里，什么情况下 primary source 也会"说谎"？
> **A**：当仓库存在陈旧部分时——不再被调用的函数、纯为遗留目的保留的部分、一次性原型——这些都会误导对代码实际行为的判断。

## P66 ｜ 066 Rerouting: When The Destination Changes

**要点**

- 中途发现方向错了不用推倒重来：ticket 是一次性的（disposable），spec 是可编辑的（editable）。
- rerouting 五步：确认要改 → 删掉未实现的 ticket（保留 spec）→ 用 /grill-me 修改 spec → 用 /to-tickets 从当前位置重新生成 ticket → 用 /implement 继续。
- 双文档设计的意义正在于此：目的地可改，旅程可弃；合在一份文档里就会剪不清。

**笔记**

想象执行到一半——比如做完两张 ticket、审着审着发现整个 approach 不对——该怎么办。核心认知：ticket 是一次性的。已实现的部分通常保留而非回滚（除非真的烂到家），把尚未实现的 ticket 直接删掉；然后回到 spec——spec 是可编辑的，就当前进度再开一轮 grilling session，把想改的地方描述清楚，编辑 spec。spec 是目的地，rerouting 改的就是目的地。对修改后的 spec 满意后，用 /to-tickets 基于当前位置重新生成一组 ticket——新方案可能让范围略增或略减，但重要的是它给出了"从现在的位置通往新目的地的旅程"。最后用 /implement 继续实现新 ticket。完整流程五步：1）意识到 "this needs to change"；2）关闭未实现 ticket、保留 spec；3）在新会话里用 /grill-me 调整 spec；4）用 /to-tickets 重新生成；5）用 /implement 继续。特意加这一课，是因为总有人问，而且它正好解释了双文档设计：spec 与 ticket 生命周期不同——一个承载目的地、可编辑，一个承载旅程、可整批丢弃；如果全塞进同一份文档，"删一半留一半"会非常混乱。

**自测**

1. 做完两张 ticket 后发现方向全错，第一步做什么？
> **A**：删除尚未实现的 ticket，保留 spec。已实现的工作通常保留而非回滚；在旧 ticket 旁边另写新 spec 会让旧 ticket 仍指向被放弃的目的地；把明知不对的剩余 ticket 做完只是积累更多要撤销的代码。
2. 为什么目的地和计划要放在两份文档而不是一份？
> **A**：两者生命周期不同——目的地（spec）可编辑、旅程（ticket）可整批丢弃；一份文档同时装两者，会让"丢弃一半"变得混乱。

## P67 ｜ 067 The Goal Command

**要点**

- /goal 类功能的诱人之处：spec 本就是定义充分的目的地，让 agent 在单个 context window 里追到完成为止。
- 现实问题：现有实现全靠 auto-compaction 管理上下文，结果是开头一小段 smart zone，剩下全是 dumb zone。
- 作者的当前建议仍是 spec + ticket：多个 smart zone、通常更便宜、可控性强；除非 auto-compaction 强到 dumb zone 不再是问题。

**笔记**

高频问题：为什么不用 /goal 来实现 spec？理论确实诱人：/goal 是许多 harness 都有的功能，让 agent 在单个 context window 里朝一个目标推进直到完成，而 spec 恰恰是定义得非常充分的目的地，看似天作之合。但作者见过的所有 /goal 实现都没利用 smart zone——全部在单一窗口里跑，依赖 auto-compaction 兜底，于是每次都得到同样的形态：开头一小截 smart zone，后面一长段 dumb zone。所以 spec-and-tickets 仍优于 spec-and-/goal。有一个保留意见：如果 auto-compaction 进化到 dumb zone 不再构成问题，/goal 会成为很漂亮的方案——你依然要做全部的 spec 思考，只是把后续交给一个自己负责上下文管理、ticket 管理、任务理解的 agent，最后照旧做一次大 review 核对 spec 符合度。在那之前，ticket 给你的控制力大得多：大部分工作发生在多个 smart zone 里，通常更便宜；而且从 spec 生成 ticket 只花几分钟（作者某些课程未展开的 workflow 甚至 AFK 生成 ticket、完全不人工审查）。

| 方案 | 上下文管理 | 成本 | 区域质量 |
|---|---|---|---|
| Spec-and-Tickets | 多个 smart zone | 通常更便宜 | 绝大部分 smart |
| Spec-and-/goal | 单个 context window | 可能更贵 | 小段 smart + 大片 dumb |

当然，如果你对 auto-compaction 的信任超过作者、实测效果更好，/goal 依然值得尝试。

**自测**

1. spec 已经写得很充分了，为什么还要拆成 ticket 而不是直接丢给 /goal？
> **A**：单窗口依赖 auto-compaction，运行开头聪明、余生都在 dumb zone；ticket 让你始终工作在多个 smart zone 里且通常更便宜。"spec 太含糊、无法 review、拆票太慢"都不成立——spec 恰恰定义充分、结尾照样可以大 review、拆票只要几分钟。
2. 什么条件满足后，单窗口 /goal 才会成为好方案？
> **A**：auto-compaction 要好到 dumb zone 不再构成问题。更大的窗口帮不上忙（问题在窗口后段的质量而非装不下），价格是症状不是病因，review 也已经可以在事后一次性完成。

## P68 ｜ 068 Enforcing Your Coding Standards

**要点**

- /implement 里那句 "Once done, use /code-review to review the work." 正是你向 agent 施加 coding standards 的入口。
- 三层检查：automated checks（lint、typecheck、测试）确定性且免费；automated review 出具定性判断、以 token 计价；human review 兜底——自动审查不取代人，只是让人审更轻松。
- coding standards 写进 CODING_STANDARDS.md 供 review 轴读取，而不是塞进 CLAUDE.md：实现要背探索+写码+调试三重负担，review 一重都没有，上下文余量大得多。
- 没有 standards 文件也不空手：review 内置《Refactoring》坏味道基线（Feature Envy、Shotgun Surgery 等），你的文件叠加其上并可覆盖它。

**笔记**

/implement 里最容易被略过的一行是 "Once done, use /code-review to review the work."——值得停下来讲清楚，因为 code review 正是你把自己的 coding standards 强加给 agent 的地方。发布前理想状态有三层检查。automated checks 指 linting、typecheck、unit tests：价值在确定性（每次跑结果一致）与零 token 成本，但测试套件只能证明你断言过的性质，机械检查抓不住所有 bug。human review 是 AI 之前的审查层：有人看 PR 并给出定性反馈（"这个测试好像不是你以为的那个意思"），也一直是开发者最痛苦的环节。automated review 则由 agent 替你完成 diff 的第一遍走读并给出定性意见——它不取代 human review，而是让人审更轻松，因为第一遍已经看过；多数工作仍值得人在上面做最后的 sanity check。落地方式：在一个 context window 里实现，在一个全新窗口里审查。

Standards 这条轴为什么存在？你不希望 agent 把同一个错误反复犯，这些 steering 指令必须有地方安放。塞进 CLAUDE.md 很痛且有实际副作用；而 code review skill 允许定制——你创建自己的 CODING_STANDARDS.md。文件就静静躺在那里记录本仓库的规范：发现 agent 干了蠢事，写进去，下次 review 就会抓住。全新文件一行就够："Don't do stupid stuff." skill 在第三步定位它："Anything in the repo that documents how code should be written, such as `CODING_STANDARDS.md` or `CONTRIBUTING.md`."——这一步就是你写入的接缝（seam）。为什么 standards 放 review 而不是让实现者一次做对？因为 review 所受约束远少于实现：实现要在同一个窗口里完成探索代码库、写出全部文件、调试验证三件事；review 三件都不需要——探索已完成、只需读不需写、测试已写好跑过。上下文空间充裕、负担极轻，加载 standards 顺理成章。真实的 standards 文件松散没关系，每一条的来历都一样：你注意到 agent 干了蠢事，记了下来。例如"上下文菜单项必须带 lucide-react 图标且与周围风格一致"（因为 agent 死活不加图标）、"./app/routes 下所有文件会暴露为公开路由，不得放测试或工具文件"。可以按域拆分、用 context pointer 指过去（只关前端的规则放前端），但 standards 文件只在 review 时加载，体积远不如常驻 steering 文件敏感，大一点无妨。即使一行都没写，Standards 轴也有免费基线：来自 Martin Fowler《Refactoring》的 code smells——Feature Envy（方法惦记别的对象的数据胜过自己的，就把方法搬到它惦记的数据上）、Shotgun Surgery、Divergent Change、Mysterious Name……都是经典术语，agent 本来就懂，零文档也能审出东西；你的文件叠加在基线之上，仓库明确认可的做法会压掉基线告警。最后是习惯：下次实现完发现不满意的地方，别冲 agent 喊话，写进 CODING_STANDARDS.md，让 reviewer 下次替你抓。

**动手**

在仓库根目录创建 CODING_STANDARDS.md，从一行开始：

```
Don't do stupid stuff.
```

真实的条目示例：

```
Context menu items should always include a leading icon (from `lucide-react`), matching the style of the surrounding items. When adding a new menu item, pick an icon that conveys the action.
```

```
All files in `./app/routes` will be exposed publicly as routes. Do not include test files or utility files there.
```

基线自带的坏味道之一：

```
- **Feature Envy** — a method that reaches into another object's data more than its own. → move the method onto the data it envies.
```

**自测**

1. 发现 agent 反复违反仓库约定，规则应该写在哪？
> **A**：写进 CODING_STANDARDS.md，让 code review 抓住它。CLAUDE.md 让每个窗口都为这条规则付费（无论是否相关）；每次任务重述进 prompt 则依赖你的记性；linter 能管的约定本来就不需要写下来。
2. automated check 与 automated review 的本质区别？
> **A**：check（lint、typecheck、测试）是确定性的、免费的，因此只能交付机械判定；review 是判断层，以 token 计价。两者可以跑在同一阶段，review 也可以由 agent 或人来跑。
3. 仓库里没有任何 standards 文件时，Standards 轴靠什么审查？
> **A**：靠 skill 内置的《Refactoring》坏味道基线（Feature Envy、Shotgun Surgery、Divergent Change、Mysterious Name 等）；你的 CODING_STANDARDS.md 叠加其上并覆盖基线，而不是替换它。

## P69 ｜ 069 Ask Matt

**要点**

- 学完课程带着问题很正常；Discord 之外，/ask-matt skill 是"作者不在房间时"问他的路由器。
- 它接收场景（situation）而非关键词，返回该走哪条 flow、下一步敲什么命令——它是 router 不是 oracle，答案要用你自己的判断校准。
- skill 内置 phase boundary checklist：在 Continue / Clear / Handoff / Subagent / Compact 五个选项间自上而下逐项过，第一个 yes 胜出。

**笔记**

带着问题结课很正常，问题在于提问与回答之间的空档。Discord 随时可问，但等待回复时有个工具可以试：/ask-matt，一个"我不在场时问我建议"的 skill。先 `npm run reset add-ask-matt-skill` 把它装进仓库。它吃的是场景描述而不是关键词。作者的真实提问是："/ask-matt What's the best flow for fixing a bug once I've finished doing an implementation on a spec and all the tickets are closed?"——这是个真实困境：spec 建完、ticket 全关，结果发现东西坏了，手头流程已经走完，没有显而易见的下一条命令。它的回答开门见山："Short answer: `/clear`, then `/diagnosing-bugs`."——两个动作：清空上下文，因为 spec 这条线已经耗尽，bug 是新的起点而非 build 的延续；然后伸手拿处理 bug 的 skill。它还多给了几层：先试试能不能用一条命令让 bug 变红（red）——能且原因显然，就直接写失败测试修掉；不能才是 diagnosing-bugs 登场的时刻；外加两条禁令：不要对 bug 做 triage（triage 只用于不是你创建的 issue），不要重开已关闭的 spec（被证伪的 spec 是新想法，不是补丁）。它推荐的 skill 甚至包括课程没讲的——但确实存在于作者的真实技能集里。这正是要点：课程覆盖主流程和一批关键 skill，但不是全部，/ask-matt 就是你学其余部分的入口（列在 Getting Started 下）。这里的 flow 指穿过多个 skill 的路径而非单个 skill：大多数工作沿一条主 flow 走，几个 on-ramp 汇入，其余是独立 skill 或垫在底层的 vocabulary layer；你描述处境后，路由器把你放到 flow 上正确的那一步——答案常常不是那个名字听起来最像的 skill。skill 内还有一个特别好用的 phase boundary checklist：phase 是会话内的一段工作（grilling、实现、QA），边界是两段之间的缝隙，正是你决定 context window 命运的时刻；五个选项——Continue（原地不动）、Clear（清空重来）、Handoff（写一份可携带的 markdown，在任何地方播种新会话）、Subagent（丢进独立窗口拿回报告）、Compact（压缩本上下文并以摘要播种新会话）——自上而下逐项过，第一个 yes 胜出，把模糊的感觉变成有序的提问。但答案要打折扣：作者复盘那次回答，认为更好的选择是 compact 而不是 clear（部分实现上下文值得带进排错），而且简单 bug 可能根本用不上 /diagnosing-bugs（那是留给非常棘手的 bug 的）。所以把它当普通 agent 对待：router，不是 oracle；发现奇怪答案就去 skills 仓库提 issue，路由器就是这样变好的。

**动手**

```
npm run reset add-ask-matt-skill
```

按场景提问，例如：

```
/ask-matt What's the best flow for fixing a bug once I've finished doing an implementation on a spec and all the tickets are closed?
```

它给出的回答开头是：

```
**Short answer: `/clear`, then `/diagnosing-bugs`.**
```

**自测**

1. /ask-matt 返回给你的是什么？
> **A**：一条 flow 与下一步该用哪个 skill 的推荐。它是路由器：你说出处境，它给出合适的路径和下一条命令；它不替你实现、不写 spec，也不是 skill 清单。
2. 路由器让你 /clear 后跑 /diagnosing-bugs，应该照单全收吗？
> **A**：先掂量自己的判断再行动。它有用也会错——该场景下 compact 可能优于 clear，简单 bug 可能根本不需要诊断 skill。盲目照做和直接无视都不可取，反复问它只是把一个猜测变成两个。

## P70 ｜ 070 Where You Go From Here

**要点**

- 全课程浓缩为五步：Grill the idea → Create a spec → Create tickets → Implement → Review；工具会变，这五步的骨架会留下。
- 毕业后的深化方向：AFK loops、prototyping 与 research、The AI Coding Dictionary、Sandcastle。
- 持续学习看 Wayfinder、Prototype 等在研 skill 与 AI Hero 的 cohorts；遇到实际问题去 Discord。

**笔记**

希望这门课给了你能立刻带回工作岗位的东西。五步流程是构建软件的核心方法：1）Grill the idea——开工前先与 AI 对齐；2）Create a spec——决定要去哪里；3）Create tickets——把工作拆开以便并行，或确保待在 smart zone 里；4）Implement——逐张消化 ticket；5）Review——检查实现阶段没法完成的方面。工具与模型会随时间变化，但这个流程依然成立，这五步骨架会留存下去。课程结束后的任务是把这些步骤继续加深，可探索的方向有：AFK loops——与其守着实现跑，不如把盯梢工作交给 away from keyboard 的 agent 循环；prototyping 与 research——在接触 spec 之前的初始构想阶段它们能帮上什么；The AI Coding Dictionary——夯实心智模型：model provider request、turn 与 context window、tools 等；Sandcastle——一个在隔离沙箱里跑 AFK agent 的开源尝试。保持学习：关注 Wayfinder、Prototype 等开发中的 skill；AI coding 仍会演变，流程的形态会被迭代、变得更复杂、继续进化；AI Hero 的 cohorts 是深入这一切的机会，个人或公司有兴趣可以留意。最后是社区：Discord 和其中的社区不会消失，现实世界遇到困惑、不知道如何让 agent 适应、或课程留下了未解的问题，都可以去 Discord，大家一起把它弄明白。

**自测**

1. 课程的五步流程分别是什么？
> **A**：Grill the idea（先与 AI 对齐想法）、Create a spec（确定目的地）、Create tickets（拆分以并行或守住 smart zone）、Implement（逐张完成 ticket）、Review（检查实现期间无法完成的方面）。
2. 课程建议毕业后从哪些方向继续深化？
> **A**：AFK loops（把看管实现的工作交给离开键盘的 agent 循环）、prototyping 与 research（服务 spec 之前的构想期）、The AI Coding Dictionary（夯实模型请求、turn、context window、tools 等心智模型）、Sandcastle（隔离沙箱中的 AFK agent 开源项目），以及 Wayfinder、Prototype 等在研 skill 和 AI Hero cohorts。
