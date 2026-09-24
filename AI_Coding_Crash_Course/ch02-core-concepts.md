---
title: 第二章 · 核心概念（Core Concepts）
section: Core Concepts
lessons: P10–P20
source: aihero.dev AI Coding Crash Course
---

# 第二章 · 核心概念（Core Concepts）

本章是整门课程的地基：先把 agent 拆解成 model、harness、environment 三个部件，再逐一讲清 model 的底层特性——non-determinism、stateless、attention degradation、hallucination——以及 turn、model provider request、session、context、effort、subagent 这些贯穿全课程的工作词汇。掌握了它们，后面所有关于 prompt、权限、成本和 workflow 的技巧才有落脚点。

## P10 ｜ 010 Models, Harnesses, Agents, Environments

**要点**

- agent = model harnessed in an environment，它不是独立实体，只是 harness + model 的合称
- model 只是"汽车引擎"：text in、text out，单独存在几乎做不了什么
- 想让 agent 表现更好，主战场是改进 harness 和 environment，而不是换 model

**笔记**

理解 agent 需要四个部件：**environment** 是 agent 交互的外部世界；**model** 是思考引擎；**agent** 是"被 harness 置于 environment 中的 model"；**harness** 则是把 model 连接到 environment 的那一层。

model 是整套系统里的引擎和大脑。Claude Opus、Claude Sonnet、GPT 5.5、Grok 都是 model，它们跑在远端服务器上，按请求收费。单独的 model 只做一件事：给它文本，它还你文本。要真正有用，必须包一层 harness。harness 与所处的 environment 绑定、为其设计：代码编辑器 / IDE 的 environment 是 file system，通过 tool call 读写文件、搜索网页；ChatGPT、Claude.ai 这类聊天界面是另一套虚拟 environment（存文档、搜网页）。

所以 agent 不是一个额外的东西，只是 harness + model 的合称。具体例子：Opus 跑在 IDE 里操作 file system，是一个 agent；Grok（model）跑在 Pi（harness）上操作 file system（environment），也是；GPT 5.5 在 ChatGPT 里能建文档、搜网页、连 MCP server，同样是 agent。

类比总有模糊地带：一个 NPM script 算 harness 的一部分还是 environment 的一部分？作者倾向归入 environment，但两者边界确实互相渗透。

本课的实用结论：所有人都痴迷换最新的 model，但 model 只是生态中的一环。训练新 model 贵得离谱，普通人和公司都够不着；你的发力点在改进 harness 和改进 agent 所处的 environment。

**自测**

Q1：什么是 agent？
> **A**：一个被 harness 置于 environment 中的 model。它不是独立实体，只是 harness 和 model 合在一起的名字；单独的 model 只做文本进出，不构成 agent。tool call 是 harness 触达 environment 的方式，也不是 agent 本身。

Q2：agent 在你的项目上持续表现不佳，最大的改进杠杆在哪里？
> **A**：改进 harness 和它工作的 environment。model 只是引擎，换 model 是所有人的第一反应，却动不到另外两环；训练新 model 成本高到多数公司无法承受，harness 和 environment 才是你真正能动手的地方。

## P11 ｜ 011 Non-Determinism

**要点**

- model 的本质是 next token prediction，sampler 以加权随机方式采样，天然 non-deterministic
- temperature 调到 0 反而掉进 likelihood trap，输出质量下降；且即使 temperature 0，输出也不可复现
- non-determinism 是 feature 不是 bug，无法移除，permissions 设计必须始终考虑它

**笔记**

model 在做 next token prediction：输入一串 token（比如 "my favorite color is"），它从训练权重里已有的候选中挑下一个，并给每个候选分配概率——red 32%、blue 28%、orange 14%。随后交给 sampler 采样。有意思的是，sampler 并不总挑概率最高的：有时选最可能的，有时选次优的，甚至偶尔选相当冷门的。因为它通常被调成随机或"加权随机"，采样算法大多 non-deterministic，只有少数是确定性的，而多数 agent 选择了非确定性。

多数 sampler 还接受 temperature 参数：temperature 高，选择更随机；temperature 低则总是挑最可能的候选。那为什么不干脆设为 0？这正是语言建模领域著名的坑——**likelihood trap**（出自论文 "Trading Off diversity and Quality in Natural Language Generation"）：随着 temperature 降低、多样性被移除、模型永远选同一个答案，质量反而下降。论文数据显示质量在中等 temperature 处达到峰值，继续压低又开始变差——而且这套评价来自人类判断：人就是觉得高度确定性的回答更差。

更奇怪的是，由于 model 采用大规模并行计算、计算顺序会影响结果，即使同一块 GPU、同一个 model、temperature 0，每次返回的内容也不相同。所以 non-determinism 是"烤进蛋糕里的"，无法根除。

对 AI coding 的意义：同一段任务，agent 每次的做法都可能不同，这种方差需要习惯并学会应对；它还会向下传导到 permissions——再聪明的 agent 也始终存在非零概率做出非常离谱的坏事。你可以让系统更可靠，但底座永远是一台非确定性引擎。

**自测**

Q1：你把 temperature 设为 0，期待每次都得到同样的优质答案，实际会怎样？
> **A**：两个期待都落空。质量反而下降——likelihood trap 表明质量峰值在中等 temperature，0 不是人们以为的"质量档"；输出也不可复现——模型大规模并行计算、顺序影响结果，同 GPU 同模型在 temperature 0 仍返回不同响应。

Q2：agent 用的是很强的 model，且整周表现良好。这该如何影响你对它 permissions 的判断？
> **A**：完全不该因此放松。non-determinism 会传导到权限层：再聪明的 agent 也有非零概率做出很糟糕的事，一周的好表现只是抽样不是保证；temperature 0 也补不上这个缺口。

## P12 ｜ 012 Turns And Model Provider Requests

**要点**

- model provider request = 一次请求加一次响应的完整往返
- tool call 只是 model 给出的"使用工具的指令"，真正执行的是 harness；执行结果作为 tool result 随下一次请求发回
- turn = 从用户消息到 agent 最终回复的整个循环，一个 turn 可包含数百个 model provider request
- 每次请求都会携带完整的 conversation history

**动手**

1. 运行 `npm run request-logger`，它会询问你使用的 coding agent 和 model provider（可记住答案，只问一次），并打印一条启动命令。
2. 把打印的命令粘贴到新终端运行。此后 agent 指向的是本地 request logger，而不是 model provider 的服务器。
3. 打开 side panel，进入 `./request-logger/logs` 目录（初始只有一个 `.gitkeep`）。
4. 对 agent 说 hello，刷新目录，会出现一个新文件，记录发往 Anthropic API `v1/messages` 的请求。
5. 发送：

```
tell me my hair looks nice
```

6. 再让它做一件要动工具的事：

```
I would like you to write a file containing a list of compliments to me in a markdown file in the repository root.
```

**笔记**

日志文件里用 XML 标签记录了发往和收自 model 的一切：顶部是 meta 信息和 headers，约第 50 行处是 system prompt，再往下是你的消息和 agent 的响应。这份"巨大请求 + 小小响应"就是一个 **model provider request**（model provider 指处理请求的服务，如 Anthropic、Ollama）。

两个重要发现。其一，你说一句话往往产生不止一个请求：agent 在幕后做了额外工作，比如以 `SuggestionMode` 运行的请求，用来生成"你接下来可能输入什么"的建议。界面上所有看起来像 AI 生成的元素，背后都是一次 model provider request。其二，每次请求都携带全部 conversation history——你的历史消息、agent 的历史响应、累积的所有 context，这个文件随对话不断变长。

写文件那次，请求里出现了 tool use 部分：model 没有直接回文本，而是给出 `file_path` 和 `content` 两个参数。**tool** 是 harness 提供给 model、用于操作 environment 的能力——这里是 `write` tool，在请求更靠前的位置以 JSON schema 声明调用方式。分工要分清：同一个请求里，harness 发送了"如何调用工具的说明"和"你的写文件请求"两样东西；model 回答"好，用这个工具"，这个 tool use 随后由 harness 解释并执行（tool call 是指令，不是执行）；执行结果作为 tool result 出现在下一个请求里发回 model，model 才回复：

```
Done, I created compliments.md in the repo root.
```

这整个流程叫一个 **turn**：写文件包含两个 model provider request（消息 → tool call 指令；tool result → 最终回复），都在同一个 turn 内。一个 turn 可以持续数小时、容纳数百个请求。request / turn / tool call / tool result 这套语言，就是驱动一切的引擎。

**自测**

Q1：让 agent 写一个文件，它调用 write tool、拿到结果、告诉你完成了。这个流程如何分解？
> **A**：一个 turn 内的两次 model provider request。request 是一次往返（请求出去、响应回来）：第一次模型发出 tool call，第二次携带 tool result。turn 是从你的消息到 agent 最终答复的整个循环，可以持续数小时、装下数百个请求，所以"每个请求算一个 turn"是数反了。

Q2：model 的响应里包含带 `file_path` 和 `content` 的 tool use 块，谁真正把文件写到磁盘？
> **A**：harness。tool call 是指令不是执行；model 只产生文本，碰不到 file system；model provider 只是处理请求的服务。本地运行、能触达 environment 的是 harness，它执行 tool 后把结果随下一个请求发回。

Q3：对话中的每个新 model provider request，harness 都发送什么？
> **A**：迄今完整的 conversation history——你的历史消息、agent 的历史响应、累积的全部 context，每次都全量发送，不做摘要，也不假设 model 记得上文。

## P13 ｜ 013 Sessions And The Context

**要点**

- context = agent 能访问的全部信息，被切成 token 供 model 做 next token prediction
- context window 是单次请求的硬上限，超限请求直接失败、没有任何输出 token
- harness 的 system prompt 让 context 从一开始就不是零
- session = 跨多个 turn 不断累积的 context

**动手**

继续翻看上一课的 request logger 日志，这次专门去看 system prompt 里到底写了什么。注意不同 harness 的内容差别很大，即便是 Claude Code，这些文本也经常改版，你看到的会和视频里的不同。

**笔记**

上一课日志里的所有文本——Git 使用说明、参数、scope、各种 tool call——统称为 agent 的 **context**：agent 可用信息的总和。这些文本被转成 token 供 model 做 next token prediction；model 基于这一大坨 context，产出的只是短短一段文本。

每个 model 能接收的 context 有上限，即 **context window**。榜单上可见的规格：GPT 5.6 Sol 1.1 million tokens、Gemini 3 Pro 1 million tokens、GPT 5.2 Chat Latest 128k tokens。这个数字有相当大的任意性，由开发者根据 model 和基础设施能承受的量来定。单次请求超过上限，请求会失败，产不出任何输出 token。

管理 context 至关重要，原因有二：每次请求都要按文本计费，发出去的内容必须值得发、与手头任务相关；而且喂进太多文本，model 会像人一样困惑、分心。

使用 harness（agentic framework 或 wrapper）时，context 从来不从零开始：harness 一上来就注入自定义指令——有哪些 tool 可用、高层任务是什么、agent 该扮演什么角色——这就是 **system prompt**。例如 Claude Code 的开场：

```
You are Claude Code, Anthropic's official CLI for Claude.

<!-- cache_control breakpoint -->

You are an interactive agent that helps users with software engineering tasks.

IMPORTANT: Assist with authorized security testing, defensive security, CTF challenges, and educational contexts. Refuse requests for destructive techniques, DoS attacks, mass targeting, supply chain compromise, or detection evasion for malicious purposes. Dual-use security tools (C2 frameworks, credential testing, exploit development) require clear authorization context: pentesting engagements, CTF competitions, security research, or defensive use cases.
```

跨多个 turn 累积 context 的过程需要一个名字：**session**。比如 turn 1 产生五个请求、turn 2 三个、turn 3 四个，最后一个请求带着全部历史拿到新响应——这一整个就是 session。有了这个词，你才能清楚地思考和操作：清空 context 开新 session、compact 当前 session、切到另一个 session 稍后回来。

**自测**

Q1：发给 model provider 的 token 超过了 context window，会发生什么？
> **A**：请求直接失败，不产生任何输出 token。context window 是单次请求的硬上限，没有机制悄悄替你裁掉最旧的消息，也不存在"超限加价"——加钱买不过去。

Q2：在 harness 里刚开一个全新 session、还没输入任何内容，里面已经有多少 context？
> **A**：已经有一些了。harness 预先发送了 system prompt——告诉 model 有哪些工具、该做什么、扮演什么角色。不同 harness 注入的文本量差异很大；tool call 是之后才往 context 里加东西的，不是第一枚 token 的来源。

Q3：为什么要把无关文本挡在 context 之外？
> **A**：两条成本并行：这些文本每次请求都随全量历史重复计费；同时 model 面对大量文本会像人一样困惑分心——损害远在逼近 window 上限之前就开始了。和 harness 保存 session 的速度无关。

## P14 ｜ 014 Smart Zone / Dumb Zone

**要点**

- attention relationships 随 token 数二次方增长：1,000 tokens 约 100 万段关系，100,000 tokens 约 100 亿
- 文本越多，attention degradation 越重，agent 表现越差——context window 因此分成 smart zone 和 dumb zone
- 录制时一线 model 的 dumb zone 约从 150,000 tokens 开始；它是缓坡不是悬崖
- 150k 是"准备撤离"的信号：考虑交接工作、换打法，回到 smart zone

**笔记**

典型的一次 agent 交互约 18k tokens，而现代 model 的 context window 高达百万级——发 950,000 回 50,000 也行。但有个自然的怀疑：model 真能同时推理这么多文本吗？

看 attention 机制的工作量。单个 token（比如 "the"）无关系可追踪；加一个 "frog"，就要记住两个 token 外加它们的关系，共 3 件事；三个 token 则是 3 个 token 加 3 段两两关系。规律按二次方增长：2 个 token 1 段关系、3 个 3 段、4 个 6 段、5 个 10 段——就像联赛里新增一支球队，赛程瞬间爆炸。放大到规模：1,000 tokens 约 100 万段关系，10,000 tokens 约 1 亿，100,000 tokens 约 100 亿。这些 attention relationships 是 model 在文本中建立连接、来回跳转、达成理解的方式；要追踪的关系越多，表现越差，像满屋子人抢着喊"注意我"。

这就是 **attention degradation**：发给 model 的文本越多，它越难关注真正重要的东西，实际表现是 agent 逐步做出越来越蠢的事。于是 context window 分成两段：**Smart Zone**（前段），胜任 planning、构建复杂软件、战略决策；**Dumb Zone**（后段），只剩简单文件写入、关闭 issue、写基础 spec 这类活。dumb zone 里仍能出结果，但拿不到 agent 的最佳水平，而且每次请求都要重发海量 token，成本也高。

dumb zone 从哪开始众说纷纭、随 model 移动：录制时一线 model 的共识约 150,000 tokens（上一版课程还是 100k–120k，随模型进步还会继续后移）。厂商宣传百万 token 窗口，一是因为标题好看，二是并非所有场景都需要 smart zone——在长文本上做检索不需要峰值智能。但写软件必须待在 smart zone：在 dumb zone 干活只会产出低质量代码，之后再花 token 返工。

注意这是缓坡不是悬崖：把 150k 当作信号，到了就开始筹划如何交接工作、如何换一种打法回到 smart zone。这种"偏执"能让你以最低的 token 价格拿到高质量产出。等你看这篇笔记时数字可能已变、不同 model 阈值不同，但底层的 attention degradation 不会消失——它是当下所有 LLM 共同的约束。

**自测**

Q1：当下的 state-of-the-art model，dumb zone 大约从多少 token 开始？
> **A**：约 150,000 tokens。100k–120k 是旧阈值，它随 model 进步在上移，还会继续动；一百万是宣传的 context window，与质量拐点是两个刻意拉开差距的数字。

Q2：让 model 随文本增多而变差的机制是什么？
> **A**：attention relationships 随 token 二次方增长——1,000 tokens 百万关系、100,000 tokens 约百亿——追踪负担越重注意力越差，即 attention degradation。没有任何截断或偷偷调参在背后发生。

Q3：session 刚过 150,000 tokens 而编码工作还没做完，怎么办？
> **A**：把它当作撤离信号：着手交接工作或改变打法，回到 smart zone。质量下滑是缓坡，撑着不做只会持续掉质量；换用宣传百万窗口的 model 也买不来 smart zone，那是为长文本检索设计的。

## P15 ｜ 015 Statelessness

**要点**

- model 完全 stateless；session 状态保存在 harness 里，且只在单个 session 内有效
- environment（file system）永远 stateful，是跨 session 记忆的正解
- 想让 agent 记住东西，优先写进 codebase，对给 agent 外挂 memory system 保持怀疑

**笔记**

session 由多个 turn 组成，turn 里是一次次 model provider request，context 由此逐步累积，每个请求都携带着此前对话的状态。但关键在于：这些状态全部保存在 harness 里，model 本身完全 stateless。

三者分工：**model**——完全 stateless，只根据给定的 context 处理单个请求，什么都不保留；**harness**——在一个 session 内 stateful，记住该 session 里到目前为止的所有消息，并整块打包发给 model，一旦清空就全部忘掉；**environment**——永远 stateful，把文件、改动、数据持久化在磁盘上。

很多人把 agent 的 stateless 视为缺陷，希望它记住自己、随时间进化，于是各种 memory system 层出不穷——本质都是想给无状态系统注入状态。真正的解法是把东西存进 environment：存一个文件，清空 session，文件还在原地。memory system 可以理解为对 environment 的增强，帮它记住更多东西，从而让 agent 跨 session 记忆；有些 harness 自己也会尝试跨 session 保留少量状态。

Pi 的作者 Mario Zechner 说得好：

> i get asked what memory system i use often. my answer has always been: my codebase is my memory system.

默认拥抱 statelessness，把需要记忆的重要内容写进 codebase。理由很纯粹：简单，而且被证明更有效。想给 agent 本体外挂 memory system 时先保持怀疑——改改 codebase 往往就足够了。

**自测**

Q1：清空 session 之后，哪一部分还保留着之前发生过什么？
> **A**：environment——磁盘上的文件原地不动。harness 只在单个 session 内 stateful，清空即遗忘；model 则彻底 stateless，对给定的 context 处理完就什么也不留。

Q2：想让 agent 在 session 结束后仍记住一个决策，第一选择是什么？
> **A**：把它写进 codebase，让 agent 之后读回来。给无状态系统记忆的办法就是存进 environment，而 codebase 是你现成的 environment——"my codebase is my memory system"。外挂 memory system 要保持怀疑，改 codebase 通常就够且更简单；保持 session 不关只是把问题往后拖。

## P16 ｜ 016 How Much Did It Cost?

**要点**

- input tokens 是你发出去的（随 session 累积），output tokens 是 agent 产出的，后者单价高得多——Claude Haiku 4：input $10/M vs output $50/M
- prefix cache 让重复的前缀按 cached input tokens 计费，比普通 input 便宜 10 倍，但缓存会超时失效
- session 按追加方式增长：第一个请求里混入的 token 之后每次请求都要重复计费——context 小而相关既利好 model 也利好钱包

**动手**

1. 启动 `npm run request-logger`，把它打印的命令粘贴到新终端启动 agent。
2. 发一条简单消息，进入日志找到第一个请求，翻到底部的 response 标签，查看 usage 里的 input / output / cache token 数字。

**笔记**

agent 干活的账单分散在 session、turn、model provider request 三层，体感通常是账单一路上涨却不知该优化什么。其实数字每次都由 provider 返回：每次请求你发出 **input tokens**（repo 的当前状态、agent 已知的环境信息），收回 **output tokens**（agent 的产出），后者单价高得多——Claude Haiku 4 的 API 价是 input $10 / 百万 token，output $50 / 百万 token，整整五倍。

input 通常是更大的数：输出往往只有几百 token（一次 tool call 或一句回复），输入却是迄今整个 session。用 request logger 看 hello 那次请求的 usage：只有 2 个 input tokens、14 个 output——为什么这么少？因为还有 `cache_creation_input_tokens` 和 `cache_read_input_tokens`。provider 维护 **prefix cache**：当请求的开头与近期请求相同，就复用之前那段计算，按 cached input tokens 计费，价格为普通 input 的十分之一（cache hits 和 refreshes 同价）。第一条请求其实是一次缓存写入——`cache_creation_input_tokens: 22214`，先把前缀建进缓存。

再发一条消息，第二条日志显示：504 个 input tokens、新建缓存 59、读取约 22,000——缓存已热，实际只按约 500–600 个 input token 计费，外加 46 个 output。另外 thinking tokens 与 output tokens 同价计费，本质上是一回事。session 恰好按追加方式增长——每个请求都是上一个请求加一点尾巴——所以请求的结构也刻意如此设计：少变的内容放前面，多变的内容放后面，后者常常装在 user message 里送达。

session 计费难算也在这里：第一条请求写缓存、第二条读缓存，第三条也许产出大量昂贵的 output；若在 turn 2 和 turn 3 之间休息一小时，缓存超时彻底耗尽，前缀就要全价重算。组织 context、让缓存收益最大化，主要是 harness 的职责；但有一点要自己记住：你注入的每个 input token 都会在之后每次请求里重复计入——第一个请求里沉积的"泥沙"会被反复计费。保持 context 小而相关，既对 agent 好，也对钱包好。

**自测**

Q1：provider 从 prefix cache 复用了你请求的一段前缀，这段怎么计费？
> **A**：按低于普通 input tokens 十倍的价格计。不是免费——cache read 仍会以 `cache_read_input_tokens` 出现在账单上；也不是原价，更不会更贵。

Q2：发一条消息，休息一小时再发第二条，第二条的 input 计费远高于休息前，发生了什么？
> **A**：间隔太久，prefix cache 已超时耗尽，整段前缀按普通 input 全价重算。session 并没有重启（追加式增长正是前缀此前能匹配上的原因）；dumb zone 只关乎输出质量，与账单无关；thinking tokens 按 output 价计，不会变成 input。

Q3：为什么缩小 context 能省钱，而不只是提升 agent 的产出质量？
> **A**：session 按追加增长，第一个请求里加入的 token 会在之后每次请求里重发重付——那里的泥沙要付很多次。output tokens 单价不随 session 长短变化；prefix cache 是你要争取的优惠而不是要避开的成本；turn 数量由工作量决定，不由 context 大小决定。

## P17 ｜ 017 Hallucination

**要点**

- hallucination = 自信而错误的模型输出，分 factuality（事实错误）与 faithfulness（背离上下文）两类
- factuality 源于 parametric knowledge 的压缩损耗与 knowledge cutoff；解法是绝不信任无来源的输出，把有出处的信息装进 context
- faithfulness 是 context 过多引发 attention degradation 的结果；解法是清 context、退出 dumb zone
- 诊断树：先问"该信息在不在 context window 里"

**笔记**

dumb zone 里那些"蠢事"中最大的名字是 **hallucination**：自信满满的错误输出。在编码场景它可能产出坏代码、把产品带向错误方向、推荐已不再安全的 API，危害极大。我们力所能及的，是搭建一个让幻觉概率降低的 environment。

幻觉有两种口味。**factuality hallucination** 是编造或错误的世界事实：不存在的函数、错误的 API 签名、指向不存在文章的引用。根源是 **parametric knowledge** 的局限——训练时信息被压进参数（parameters / weights，动辄数十亿个数字），训练结束后参数冻结，这正是 model stateless 的原因。把 TB 级训练数据压缩成几十亿个数字，细节必然丢失，像高清图压成小尺寸后看不清细节；而且存在 **knowledge cutoff**：训练之后的新事件、新库、新 API 模型一概不知，也不能打补丁更新，只能从头 retrain。所以 parametric knowledge 不是事实数据库，只是一团"fuzzy vibes"。真实案例：直接问 Claude Opus "X API 多贵？别搜索，凭你所知说说"，它答出 Free 很有限、Basic $100/month、Pro $5,000/month、Enterprise 定制——实际定价近期已大幅下调，而那次改动发生在该模型的 cutoff 之前，属于典型的 factuality hallucination。解法是装填 **contextual knowledge**（context window 里的信息）：研究表明基于 context 工作时幻觉少得多——答案就在眼前，而不是从模糊记忆里硬捞。

但 context 不是万能药，因为还有 **faithfulness hallucination**：信息明明就在 context 里，model 却忽略它、偏离它、把它用得走样。dumb zone 把这类错误放大到极点——attention relationships 太多，model 分不清哪些信息重要。你可以把所有相关信息都摆好，但 context 一旦过载，它就无法好好遵循指令，幻觉更多，代码更差，安全风险更大。

诊断决策树：看到幻觉先问"该信息是否在 model 的 context window 里？"——不在，是 factuality 问题，把信息装进 context（记住：never trust an unsourced LLM）；在，是 faithfulness 问题，清空 context window、降低 attention degradation（这类问题偶尔也会因 non-determinism 出现在 smart zone，但多数时候退出 dumb zone 即可）。课程后半段请持续留意这两类错误——现在你知道怎么处理了。

**自测**

Q1：你把 agent 需要的文件原样贴进 context，它仍然用了别处的函数。第一步做什么？
> **A**：这是 faithfulness 问题（信息在 context 里却被带偏），先清空 context window 再重新给它文件。再贴更多周边文件会加重退化；web search 治的是 factuality，而事实已摆在它面前；重发同样的 prompt 只是在赌 non-determinism，不去除病因。

Q2：agent 说出一个从未被提供、事后证明错误的 API 定价。问题和解法是什么？
> **A**：factuality hallucination——信息从未进过 context，model 从 parametric knowledge 里硬捞。解法是绝不信任无来源的输出，把有来源的信息装进 context；等模型重训不是你能控制的解，答案现在就能放进 context。

Q3：某库晚于 model 的 knowledge cutoff 出现，新信息怎样才能进入它的 parametric knowledge？
> **A**：只能从头 retrain。参数在训练结束时冻结，这正是 model stateless 的原因；context 和 web search 提供的都是 contextual knowledge，随窗口消失，不会写回参数。

## P18 ｜ 018 Effort

**要点**

- effort 是几乎所有 provider 都提供的旋钮（Claude Code 里是 `/effort`），本质是让 model 产出更多 reasoning tokens
- 提高 effort：质量略升，但成本与延迟大增，还会更快烧穿 token 预算、提前进入 dumb zone
- max / extra high 是给 benchmark 刷分用的；日常选 medium 并保持一致，胜过逐任务反复调参

**动手**

在 Claude Code 中运行 `/effort`，从 faster（左）到 smarter（右）的档位中选择一个 effort level。

**笔记**

同一句"探索这个 codebase 并讲给我听"，实测对比：low effort 用时 1 分 11 秒、11,000 tokens，只摸清基本事实——request logger 子项目和技术栈；max effort 用时 2 分 15 秒、41,000 tokens，挖到了实际功能、认证实现细节、文件结构，甚至发现了 low 版本漏掉的 documentation drift。效果确实好一点，但 token 花了四倍——这就是核心取舍：更多的思考换更多的成本。

机制上，model 的输出有三类：text、tool calls、reasoning。reasoning tokens 是 model 自己的思路、一种意识流。有些界面会把它们展示出来，Claude Code 只显示 text 和 tool calls，reasoning 在幕后进行。理论源头是老技术 **Chain of Thought Prompting**：让 model 展示解题步骤，答案更准。经典例子，标准提问直接作答：

```
The cafeteria had 23 apples. If they used 20 to make lunch
and bought 6 more, how many apples do they have?

Answer: 27
```

这个答案是错的；让它分步推理：

```
They had 23 apples originally
They used 20 to make lunch: 23 - 20 = 3
They bought 6 more apples: 3 + 6 = 9

Answer: 9
```

调高 effort，本质上就是告诉 model：多产 reasoning tokens，多展示思考。DeepSWE benchmark 印证收益随档位上升：Claude 从 low 60%、medium 65%、high 69% 到 extra high / max 70%；GPT 5.6 从 45%、61% 到 69%。但每个任务的成本也随之上升——例如 Claude Sonnet 5 在 low effort 只有 31% 质量、每任务 $26，而 GPT 5.6 花 $1.86 就能超过这条基线。

关键洞察：effort 不只是质量旋钮，还是延迟（latency）旋钮——token 用得越多，越早撞进 dumb zone，留给真正干活的空间越少。建议：避开 max（extra high 同样极其浪费）——那是厂商为 benchmark 榜单多挤两个百分点准备的，你关心的是日常成本、延迟和质量；GPT 5.6 的 low / medium / high 差异确实大到像换了模型，但不要按任务反复调，选一档固定下来——作者用 Claude Opus 4.8 + medium，从不逐任务更换。改 model 和 effort 只动了系统的一角，改 harness 和 environment 才是整体提升；保持 model agnostic、effort 一致，灵活性才在。速查表：medium 在成本、速度、质量间最均衡，是大多数工作的甜点位；max 仅适合 benchmark。

动笔之前再看三条建议：查 benchmark（如 DeepSWE 的性能-成本图）；记住 benchmark 有缺陷——你的日常工作大概率不同于它测的任务，唯一可靠的验证是在自己的工作流里试；避免持续 min-maxing，调参的时间就是没在 ship 的时间。目标是做出知情的选择然后前进，而不是找到完美档位。

**自测**

Q1：普通的一天 feature 开发，effort 该怎么选？
> **A**：选 medium，并且下一个任务也不改。一致性胜过优化——调参的时间就是没在 ship 的时间；max 是 benchmark 档不是工作档；逐任务调节、或"看到输出不对才从 low 升档"，都是得不偿失的 min-maxing。

Q2：调高 effort 除了花钱，还付出什么？
> **A**：token 预算——更多 reasoning tokens 烧预算更快，让你更早到达 dumb zone。额外推理是提升而非降低质量（这正是 chain of thought 的意义）；reasoning 也不取代 tool calls，text、tool calls、reasoning 是三类独立输出；账单更不是唯一成本，否则这个选择就太容易了。

Q3：model provider 为什么要提供 max effort？
> **A**：为了在 benchmark 上多挤几个百分点、排名压过对手。日常工作中 max 相比 high 的质量提升微乎其微、token 成本却实打实；更高 effort 只会更慢，而且更多推理 token 只会让你更快滑向 dumb zone，而不是更久地留在 smart zone。

## P19 ｜ 019 Choosing A Model

**要点**

- model 与 harness + environment 的影响力大约 50-50；用上第一梯队的 model，然后把精力投给 harness 和 environment
- 选 model 的同时在选计费结构：看 cost per task 而非 token 单价，订阅比 API 价便宜得多
- 用自己的真实任务 A/B 两个 setup，比看 benchmark 图可靠；选定一个 model + effort 长期深耕

**笔记**

被问最多的问题就是"该用哪个 model"。作者对"快试这个新 model，碾压一切"的轰炸已经叹气叹到被合伙人 Joel 记录在案。他的心智模型：model 只是生态的一角，外面套着 harness，harness + model 又运行在 environment 里；model 与 harness + environment 的影响力大约 50-50。换一个烂 model 当然寸步难行，但只要用的是第一梯队 model，大概率就没问题。作者目前用 Claude Opus 4.8 medium，宁可先优化 harness 和 environment：那里遍地是低垂的果实，而且环境一旦过硬，将来换任何 model 都能平滑衔接。把 model 想成公司员工：员工来来去去，投资公司基础设施、让任何一位新员工都能成功，才是稳妥的位置。

真要比较 model，看 **cost per task**（DeepSWE benchmark 底部就有这一栏）。切换到 output tokens 视角会发现另一番景象：Gemini 3.5 Flash 烧掉大量 token 却没干成多少事，但它的单 token 价格便宜，换回成本视角又不吃亏——不同 provider 的单价不同。此外 benchmark 数字按 API 价计，订阅制便宜得多，所以选 model 的同时也在选计费结构。效率才是关键：不是 token 的原始花费，而是这些 token 换回了什么。当然，benchmark 再好也是抽象的，未必对应你的实际工作。

其次，不同任务需要不同质量档位：像 GPT 5.6 SOL，探索、research、summarization 用 low effort 就够；详细 planning 或 code review 才值得跳上 high effort——为任务挑合适的工具，甚至可以 planning 用一个 model、implementation 用另一个。

最重要的评估方式是拿自己的数据：盯紧自己的用量和账单（watch the bill like a hawk），像了解员工一样了解 model，逐步形成自己的 model + effort 偏好排序。课程后面会给出更实证的方法：相同输入，两个 setup（不同 model、同 model 不同 effort、甚至不同 harness）做同一任务，评判哪个更好、记录下来、重复几次——这就是相当好的数据，比 benchmark 图靠谱，因为图上的任务不是你的 agent 每天在公司做的事。总结：model 只占约一半；选择时看 cost per task；选定一个 model 和一个 effort，深耕到能把它 prompt 得越来越好。

**自测**

Q1：已经用着第一梯队的 model，产出仍不满意，接下来一小时投在哪里？
> **A**：harness 和 environment——任何 model 都能受益，且这些投入在换 model 后依然有效，如同公司基础设施让任何员工成功。榜首新 model 在顶级梯队内部的边际提升很小；调 effort、重写 prompt 都只优化当前这一套，换 model 即归零。

Q2：队友坚称另一个 model 更适合你们的 codebase，怎么裁决？
> **A**：相同输入、两个 setup、同一任务，评判产出并重复几次——这才是关于你们自己工作的真实数据。benchmark 图抽象，未必对应你们 agent 的实际任务；每周轮换 model 是 min-maxing，还会让你无法精通任何一个。

Q3：比较两个 model 的成本时，单 token 价格漏掉了什么？
> **A**：cost per task（一个任务的真实花费），以及走 API 价还是订阅价——烧便宜 token 的 model 也可能最终更贵或更便宜，订阅能让同一个 model 便宜得多。context window 大小和 effort 是另外两个独立选项，都不藏在 token 单价里。

## P20 ｜ 020 Subagents

**要点**

- subagent 让探索阶段的重活在一个独立 context 里烧 token，主 agent 只收总结
- 收益：省钱，同时主 agent 的 context 更小、attention degradation 更轻、smart zone 更耐用
- subagent 可配置不同的 system prompt、model、effort，可并行 spawn，部分 harness 还支持递归嵌套

**笔记**

理解了 smart zone / dumb zone 和 context 填满后逐步退化的约束，来看 harness 普遍采用的缓解技术。

把主 agent 一个 session 的 context 画成色块：灰色是始终存在于 system prompt 里的内容（request logger），黄色是 exploration，绿色是 implementation。任何 harness 的梦想都是把每块变小：花更少的 token，一则省钱，二则腾出更多 context 空间——更少的 attention degradation、更大的 smart zone。但这里有取舍：exploration 阶段少干粗活，探索质量就差，implementation 又会被错误信息拖累——看起来探索的 token 开销像是锁死的。怎么打破这个僵局？

答案是委派给另一个 agent。主 agent spawn 出一个 subagent，让它在自己的 context 里深挖 codebase、烧掉大量 token，最后只把总结交回主 agent——就像资深开发者对初级开发者说："Just research something for me and then report your findings." 主 agent 拿到的是结论，而不是过程中的 token 消耗。

更进一步：主 agent（orchestrator）可以同时 spawn 多个 subagent 并行干活，比如两路调研同时进行，两个"初级开发"各自汇报。每个 subagent 可以带不同配置：不同的 system prompt、不同的 model、不同的 effort level。有些 harness 还允许 subagent 再 spawn 自己的 subagent——有的只允许一层深——这意味着 subagent 可以和上层的 agent 一样强大。本课先停在理论层面，fundamentals 部分会大量用到 subagents。

**自测**

Q1：主 agent 把深度 codebase 探索交给 subagent，主 agent 得到了什么？
> **A**：得到总结，而不是探索过程烧掉的 token——更省钱，smart zone 空间也更大。subagent 的 token 照样花，只是没花在 orchestrator 的窗口里；速度提升来自并行 subagent，委派本身不提速；spawn subagent 也不会清空主 agent 已有的 context。

Q2：subagent 可以带哪些与父 agent 不同的配置？
> **A**：system prompt、model、effort level 三者都可独立配置——所以可以用便宜快速的 subagent 干机械检索，用更强的啃硬骨头。部分 harness 还支持 subagent 再 spawn 自己的 subagent。
