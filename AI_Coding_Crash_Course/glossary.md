---
title: "术语表（Glossary）"
source: "aihero.dev AI Coding Crash Course · AI Coding Dictionary"
terms: 60
---

# 术语表（Glossary）

以下 60 个术语全部来自课程正文中链接到的 [AI Coding Dictionary](https://www.aihero.dev/ai-coding-dictionary)。按主题分组，解释为一句话中文意译；正文中这些词一律保留英文，卡住时来这里查。

## Model 与生成原理（第二章）

- **model（模型）**：发动机本身——接收文本、预测下一个 token 的「思考引擎」，如 Claude Opus、GPT 5.5、Grok。
- **training（训练）**：用海量文本调整模型参数的过程，决定了 model 会什么、不会什么；普通人改变不了它。
- **next-token prediction（下一 token 预测）**：model 的底层工作机制——根据已有文本逐个预测下一个 token，一切「智能」都由此涌现。
- **non-determinism（非确定性）**：同样的输入可能得到不同的输出；agent 行为无法逐位复现，只能用流程保证质量。
- **parameters（参数）**：训练中被调整的模型内部权重；parametric knowledge 就住在里面。
- **parametric knowledge（参数化知识）**：烧进 model 权重里的知识；不看你代码库、不知道你今天做了什么。
- **contextual knowledge（情境知识）**：只存在于 model 之外的知识——你的仓库、你的团队、你脑子里的上下文；每个 session 都得由你重新喂给它。
- **knowledge cutoff（知识截止日期）**：model 训练数据的时间终点，之后的东西它一概不知。
- **hallucination（幻觉）**：model 一本正经地编造不存在的事实或 API；靠 primary source 和 automated check 对冲。
- **sycophancy（谄媚）**：model 倾向于附和你而非纠正你；把它当 YES-man 用会被带偏。
- **effort（推理努力）**：控制 model 思考深度（如 Claude Code 的 `/effort`）的旋钮——越高越慢越贵但越强。
- **stateless（无状态）**：model 本身不记得任何东西，每次 model provider request 都要带上全部上下文重来一遍。
- **stateful（有状态）**：与之相对，harness / session 层面「看起来记得历史」的假象，真相是无状态的反复投喂。

## Token 与成本（第二章）

- **token（词元）**：model 处理文本的最小单位，一切计费与容量都按 token 数。
- **input tokens（输入 token）**：每次请求发给 model 的部分，context window 里所有东西都算。
- **output tokens（输出 token）**：model 生成的部分，通常比 input 贵数倍。
- **cache tokens（缓存 token）**：命中 prefix cache 的 input token，按大幅折扣计价——所以稳定的前缀能省钱提速。
- **prefix cache（前缀缓存）**：model provider 对相同请求前缀的复用机制；前缀一旦变化，缓存全部失效。
- **model provider（模型供应商）**：托管 model 收费提供推理服务的公司（Anthropic、OpenAI 等）。
- **model provider request（模型供应商请求）**：harness 每一轮实际发给 model provider 的完整 HTTP 请求——system prompt + 全部历史 + tools 定义都在里面，用 request logger 能看到它。

## Agent 架构（第二章、第三章）

- **agent（智能体）**：**model harnessed in an environment**——套上 harness、放进环境里的 model，别把它当成独立的第三种东西。
- **harness（挽具 / 承载工具）**：把 model 连接到环境的软件，如 Claude Code、Codex、ChatGPT 界面；负责拼请求、调工具、管 session。
- **environment（环境）**：agent 作用的外部世界，典型是 filesystem；chat 类产品的环境则是文档、网页搜索等虚拟空间。
- **tool（工具）**：harness 提供给 model 的能力（读文件、改文件、跑命令、搜网页）。
- **tool call（工具调用）**：model 输出的「我要用某工具 + 参数」请求，由 harness 代为执行。
- **tool result（工具结果）**：工具执行的返回值，会被追加进 context 供 model 继续推理。
- **MCP（Model Context Protocol）**：给 agent 挂载外部工具/数据源的标准协议；MCP tools 会吃掉大量 context。
- **filesystem（文件系统）**：coding agent 最重要的 environment——代码就在那里。
- **sandbox（沙箱）**：限制工具执行权限的隔离环境，防止 agent 乱来。
- **permission mode（权限模式）**：harness 里控制哪些操作自动放行、哪些要人工批准的档位（如 Claude Code 的 plan mode / auto-accept）。
- **permission request（权限请求）**：agent 想做危险操作时弹给人类的确认。
- **agent mode（智能体模式）**：某些 harness 里「自动执行、少问问题」的运行档位（如 Auto Mode）。
- **turn（轮次）**：一次「人类/工具输入 → model 响应」的完整往返；session 由一串 turn 组成。

## Context 管理（第二、四章）

- **context（上下文）**：model 单次请求能看到的全部内容；agent 质量的第一决定因素。
- **context window（上下文窗口）**：context 的容量上限（如 200k token）；塞得越满，推理越差。
- **session（会话）**：一段连续的 agent 工作过程及其积累的 context。
- **system prompt（系统提示词）**：每次请求都排在最前面的 harness 指令，占基线 token 的大头。
- **smart zone（聪明区）**：context window 中 agent 还能高质量推理的区域；工作的一切目标就是让自己待在这里。
- **dumb zone（愚蠢区）**：context 过满后推理明显劣化的区域；进了 dumb zone 就该 clear / compact / handoff。
- **attention budget（注意力预算）**：model 能分配给整段 context 的注意力总量，固定且有限。
- **attention degradation（注意力衰减）**：随着 context 变长，对早期内容的注意力持续下降的现象——bloat 之害的根源。
- **attention relationship（注意力关系）**：当前内容与 context 中各部分之间的注意力分配结构。
- **bloat（虚胖）**：context 里不该在的东西（多余 MCP tools、skills、历史垃圾），每一轮都白白烧预算。
- **compaction（压缩）**：把已有 session 历史摘要化以腾出空间（`/compact`）；中途中断任务做压缩有丢细节风险。
- **autocompact（自动压缩）**：harness 在接近窗口上限时自动触发的 compaction；时机不可控，关键任务别指望它。
- **clearing（清空）**：直接清掉 session 重开（`/clear`）——干净但全丢，适合换任务。
- **context pointer（上下文指针）**：跨 session 指向关键文件/记录的引用，让新 session 能快速「重新装弹」。
- **subagent（子智能体）**：主 session 派生出的、拥有独立干净 context 的子任务执行者，干完只带结论回来。

## 工作流与交付（第四、五、六章）

- **grilling（拷问）**：动手前让 agent 苏格拉底式地逐个决策点追问你，把模糊想法烤成清晰需求；对策是它的默认值猜癖。
- **design concept（设计共识）**：grilling 的产出——双方对「要造什么」达成的共享理解，先于任何 spec 文档。
- **spec（规格）**：一份写清目标、约束、验收标准的构建说明书（课程用 /to-spec 生成）；大任务的锚点。
- **ticket（工票）**：从 spec 拆出的、单个 session 尺寸的独立工作单元（课程用 /to-tickets），让大特性能跨多个 context window 交付。
- **handoff（交接）**：用一个自述文档结束当前 session、让下个 session 无损续命的收尾动作（如 /handoff）。
- **handoff artifact（交接产物）**：handoff 留下的那份文档本身——路径、决策、下一步、坑。
- **AFK（离开键盘）**：away from keyboard；把任务托付给 agent 自主跑、人不在场的运行方式。
- **skill（技能）**：按需加载给 agent 的可复用 Markdown 指令包（SKILL.md），课程的全部方法论都以 skills 形式交付。
- **progressive disclosure（渐进式披露）**：把指令文件组织成「入口短小、细节按需加载」的结构，避免一次性灌满 context。
- **AGENTS.md**：放在仓库里、agent 每次自动读取的项目说明书；写它该写的东西（命令、约定、边界）。
- **navigation pointer（导航指针）**：在文档里给 agent 留的「想深入去看 X」路标，是 progressive disclosure 的手工实现。
- **memory system（记忆系统）**：跨 session 保住关键知识的机制（如 Claude Code 的 automatic memory），防止每次从零开始。
- **primary source（一手来源）**：代码、文档、运行结果等事实本体；让 agent 直接读一手来源而不是凭 parametric knowledge 猜。
- **secondary source（二手来源）**：对事实的转述（博客、摘要、记忆）；有用但可能过时，重要决策要回到 primary source。
- **prototyping（原型）**：问题在对话里说不清时，直接让 agent 造个一次性原型来回答设计问题的手段。
- **human review（人工审查）**：合码前人眼的最终把关；AI 编码时代唯一不可外包的质量闸门。
- **automated check（自动化检查）**：typecheck、test、lint 等机器守门员，让 agent 的产出有客观对错信号。
- **automated review（自动化审查）**：用 agent/规则对代码改动做例行审查，把 human review 聚焦到真正需要人的地方。
