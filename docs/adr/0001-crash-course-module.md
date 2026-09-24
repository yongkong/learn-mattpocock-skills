# 0001 — Crash Course 课件以顶级类目「实战」挂载,不入模块章

状态：已采纳（2026-09-23）

## 背景

《AI Coding Crash Course》的中文学习笔记（仓库 `AI_Coding_Crash_Course/`）要上新到 Site。站点既有结构：五枚 skills 模块章（主流程 / 参考层 / Shaping / Upkeep / 协作，key 取自 Matt Pocock 原著对 skills 的分类）+ 两个不入章的顶级类目（速查 / 词典）。Crash Course 是同一作者的另一件作品（付费视频课程），其 7 节课件是线性课程序列，与五章的 skills 分类语义不同。

曾考虑把「实战」做成第六枚模块章并已实施；上线后观察导航结构，判定不妥：五章同属「Agent Skills 中文课」这一门课，把另一门课的课件列为本课第六章，会暗示错误的归属关系（学习者在目录里会以为它从属于 skills 课程）。

## 决策

- 「实战」**不作为模块章**；`MODULES` 维持五枚不变。
- 新增顶级类目 `TOP_LEVELS`：`{ key: "workshop", label: "实战·Crash Course" }`，与速查 / 词典平级；页头导航与课件页目录树由其派生。
- 新增落地页 `/workshop`：系列定位（非官方中文笔记、对应视频全 70 集）、课件清单、学习路线提示。
- 首页在五章目录之后新增「独立系列」区块，列出该系列课件并链接 `/workshop`。
- 实战系列是**独立的编号空间**：课件为 `/workshop/0001`–`/workshop/0007`（初版曾沿用主课件续号 `/lessons/0007`–`0013`，独立系列不该从 0007 起数，已重编），内容存 `content/workshop/`，测验存 `content/quiz/workshop/`，由 `gen-lessons.mjs` 生成独立的 `WORKSHOP_LESSONS` / `WORKSHOP_BODIES` 注册表与 manifest `workshopNums`；翻页只在系列内相邻。
- 学习进度键带 `workshop:` 前缀（`workshopProgressId`），与主课件 0001–0006 共用 localStorage 而不撞号。
- 课件 frontmatter 仍记 `module: 实战`，类型上以 `CourseTag = ModuleName | "实战"` 表达，使其不出现在任何模块章的枚举与遍历中。
- `CONTEXT.md` 新增 Workshop(实战系列) 词条，Module(模块章) 词条明确「独立系列除外」。
- 笔记底稿保留在仓库 `AI_Coding_Crash_Course/`，课件 MDX 由底稿按语域标准（`docs/register.md`）改写而成。

## 后果

- 站点保持「一门课 + 三个顶级类目」的信息架构；Crash Course 以平行系列呈现，归属语义清晰。
- 目录树与页头导航零手写改动（TOP_LEVELS 派生）；`site-check.mjs` 的 STATIC_ROUTES 增加 `/workshop`。
- 课件翻页按系列隔离：实战系列内 0001→0007 自成一线，主课件 0001–0006 自成一线，互不跨越；两个系列经由 `/workshop` 落地页与首页「独立系列」区块互相导流。
- 未来若上新同作者的其它 workshop（如 AI SDK v6 Crash Course），复用「实战」系列位或另立顶级类目并补 ADR。
- Crash Course 内容源自付费课程，课件以学习笔记形态改写（浓缩 + 转述，非逐句翻译），每课注明出处；「关于/致谢」页承担非官方声明义务。
