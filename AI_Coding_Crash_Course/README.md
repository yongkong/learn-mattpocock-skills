---
title: "AI Coding Crash Course 中文学习笔记"
source: "aihero.dev AI Coding Crash Course"
instructor: "Matt Pocock"
lessons: "P1–P70"
---

# AI Coding Crash Course 中文学习笔记

> **Ship faster than ever before by taking control of your code, with software engineering fundamentals.**
> 用软件工程基本功接管你的代码，比以往任何时候都更快地交付。

本笔记基于 Matt Pocock（Total TypeScript / aihero.dev 作者）的付费课程 [AI Coding Crash Course](https://www.aihero.dev/workshops/ai-coding-crash-course)，配合 B 站搬运的全 70 集视频整理而成。所有章节标题与分 P 编号一一对应，可边看视频边对照笔记；命令与提示词保留英文原文，关键术语保留英文关键词。

## 课程在讲什么

AI 编程的典型困境：上手很容易，越用越糟——错误的代码决策不断复利，大任务失控，review agent 的产出比亲自写还累。课程给出的解法不是「换个更强的 model」，而是从上到下理解工具链：

1. **model**（大语言模型）是怎么工作的；
2. **harness**（Claude Code、Codex 这类承载模型的工具）是怎么工作的；
3. 把两者组合成一套**有效、可重复的软件工程循环（software engineering loop）**。

课程明确不教 vibe coding，教的是 real engineering principles。核心是一套五步系统：

```
grilling → spec → tickets → implementation → review
（拷问需求）  （规格）  （工票）    （实现）      （审查）
```

## 章节目录

| 章节 | 文件 | 分 P | 视频时长 | 内容 |
|---|---|---|---|---|
| 第一章 · 准备篇 | [ch01-before-you-start.md](./ch01-before-you-start.md) | P1–P8 | 35 min | 课程导览、订阅与 model 选择、搭建练习项目 Cadence、安装 Claude Code、装上 request logger |
| 第二章 · 核心概念 | [ch02-core-concepts.md](./ch02-core-concepts.md) | P10–P20 | 58 min | model / harness / agent / environment 四要素、non-determinism、turn 与 model provider request、context window、smart zone / dumb zone、成本、hallucination、effort、subagent |
| 第三章 · 认识 Claude Code | [ch03-getting-to-know-claude-code.md](./ch03-getting-to-know-claude-code.md) | P21–P27 | 23 min | session 管理、终端 prompt 技巧、IDE 集成、时间旅行（回退/恢复）、bash mode、permissions |
| 第四章 · 基础工作流 | [ch04-fundamentals.md](./ch04-fundamentals.md) | P28–P44 | 78 min | **全课程核心**：清理 context bloat、codebase exploration、/teach skill、Grill-Execute-Clear loop、compaction / handoff / subagent 决策树、auto-compaction |
| 第五章 · 转向控制 | [ch05-steering.md](./ch05-steering.md) | P45–P56 | 56 min | steering map、context pointer、Agent Skills（SKILL.md）、user vs project skills、navigation pointers、pruning、automatic memory |
| 第六章 · 大型任务交付 | [ch06-shipping.md](./ch06-shipping.md) | P57–P70 | 69 min | 五步法落地大项目：issue tracker、/to-spec 写规格、/to-tickets 拆工票跨 context window 执行、rerouting、/goal、coding standards 强制化 |

全 70 集合计约 **5 小时 18 分钟**。

> P9（029 Navigating The Discord）是课程社区 Discord 的导览，无技术内容，官方讲稿未收录，笔记未覆盖。

## 建议学习方式

1. **看一集视频，读一节笔记**：每个小节标题就是 `P 号 ｜ 分 P 原标题`，直接对齐。
2. **跟着「动手」做**：课程是实操课，练习项目 Cadence 的每条命令都原样保留在各节的「动手」里。
3. **合上资料做「自测」**：每节末尾 2–3 题，答案在题下折叠行（`> **A**：`），先想再看。
4. 概念卡住时查 [glossary.md](./glossary.md)——课程链接到官方 AI Coding Dictionary 的全部术语都在里面，另补 bloat、dumb zone 等课程高频词，共 66 条，附中文一句话解释。

时间紧的话，最低限度的主线是：**第二章（概念）→ 第四章 P38–P44（Grill-Execute-Clear loop 与 context 决策树）→ 第六章（五步法）**。

## 术语约定

- 关键术语保留英文原文（context window、harness、compaction、handoff、grilling、spec、ticket、subagent、skill 等），首次出现时以「中文释义（english term）」标注；
- 命令、slash command、提示词、代码块内容一律不翻译；
- 各章文件开头有 YAML front-matter（title / section / lessons / source），方便后续迁移到学习站点时直接解析。

## 资料来源

- 官方课程页：<https://www.aihero.dev/workshops/ai-coding-crash-course>（约 60 节课 / 6 大模块，含 written guides 与 quiz）
- 官方英文讲稿本地副本：[`AI Coding Crash Course HTML/`](./AI%20Coding%20Crash%20Course%20HTML/)（6 个 HTML 文件，本笔记的直接底稿）
- B 站搬运：《AI Coding Crash Course: Build Production-Grade Software with AI》（lmt831 投稿，全 70 P，BV1MGbZ6HEYT / BV1pm8Y65EQi 等搬运版本，分 P 标题与本笔记编号一致）

> 本笔记为个人学习用途整理，非官方译本；内容以原课程为准。
