# mattpocock-skills 学习工作区

一个用 Matt Pocock 的 agent skills 教「如何使用 Matt Pocock 的 agent skills」的教学工作区:课件、速查和测验都是纯静态 HTML。

## Language

**Course(课程)**:
这套教学内容的整体,即本工作区里的全部 Lesson 与 Reference。
_Avoid_: 教程、training、课件集

**Lesson(课件)**:
一份可独立阅读的教学 HTML 文件,存放在 `lessons/`,按编号排序(如 0001)。课程的主线单元。
_Avoid_: 课程、页面、chapter

**Reference(速查)**:
存放于 `reference/` 的工具型文档,供随时查阅而非顺序阅读;不承载学习进度。
_Avoid_: 文档、 cheatsheet 之外的说法、notes

**Dictionary(AI 编码词典)**:
收录 AI 编码核心术语的 Reference,本身构成一门相对独立的概念课程:释义以中文撰写、术语保留英文,一词一个 MD 文件,卡片弹层阅读。源出 mattpocock/dictionary-of-ai-coding。
_Avoid_: 字典、词汇表(「词汇表」特指本文件 CONTEXT.md)、单词表

**Site(站点)**:
面向公众的 Course 网站,名为「Agent Skills 中文课」,以「非官方社区课程」自居并注明源出 Matt Pocock 的 skills 体系;部署于本仓库,与教学工作区同体。
_Avoid_: 官网、平台

**Course Home(课程主页)**:
Site 的首页,同时是 Course 的总览入口(仓库根 `index.html`):按 Module 分章列出全部 Lesson 与 Reference,辅以情境入口与续学入口。
_Avoid_: 首页、主页(单独使用时)、index 页

**Module(模块章)**:
Course 目录的顶级分类单位,共五章:主流程 / 参考层 / Shaping / Upkeep / 协作。每份 Lesson 恰属一章(独立系列的 Workshop 课件除外);Reference 与 Dictionary 不入章,是导航中的顶级类目。五章的 key 取 Matt Pocock 原著分类原词(aihero.dev/skills):The Main Flow / Reference Skills / Shaping / Upkeep / Productivity Skills,不得意译改写。展示名一律「中文·英文」,映射收在 `site/lib/structure.ts` 的 `MODULE_LABELS`。
_Avoid_: 分类、部分、chapter

**Workshop(实战系列)**:
独立于五枚模块章的课件系列,挂顶级类目「实战·Crash Course」(`/workshop`):Matt Pocock 付费课程《AI Coding Crash Course》(aihero.dev)的非官方中文学习笔记。编号独立于主课件、从 0001 起(课件 0001–0007,路由 `/workshop/000N`,内容存 `content/workshop/`,frontmatter 记 `module: 实战`);学习进度键带 `workshop:` 前缀,与主课件不撞号;翻页只在系列内相邻。`/workshop/read` 是英文原文阅读页,内容由同步脚本从本地原文 HTML 注入 `public/`,公开部署不含此内容。它是另一门课的伴随笔记,不是本课的章节——与 skills 五章是平行关系,不是归属关系(决策见 `docs/adr/0001-crash-course-module.md`)。
_Avoid_: 实战课、第六章、专栏

**Prompt Library(提示词库)**:
收录 Claude Code 官方提示词 52 条的独立学习内容,挂顶级类目「提示词库·Prompt Library」(`/prompts`):按阶段 × 类别组织、中英对照,橙色槽位可编辑、复制时自动拼装,配搜索、筛选、背诵模式与随机抽背;不设学习进度(工具型内容,同 Reference / Dictionary)。数据源为 `site/content/prompts/data.ts`(单点迁移,后续更新只改这一处),中文讲解为本站转述,原文版权归 Anthropic,源出 code.claude.com/docs/zh-CN/prompt-library(决策见 `docs/adr/0002-prompt-library-top-level.md`)。
_Avoid_: 提示词大全、指令库、prompt 库

**Register(语域)**:
Site 全部内容(含未来 Lesson)的写作标准:写给只读网页的零背景读者,课件自成一体;人称定「你」;引用必有出处。可执行细则在 `docs/register.md`。
_Avoid_: 文风指南、语气规范、style guide

**Progress(学习进度)**:
学习者对某个 Lesson 的完成判定,只有「未学 / 已学」两态,由学习者手动标记。
_Avoid_: 完成度、得分、percent

**Quiz(随堂测)**:
Lesson 正文里内嵌的检索练习:选择题、即时反馈、正确项打散。一套测验一个 TS 模块,存 `content/quiz/`;类型、校验与评分收在 `lib/quiz.ts`,坏数据在构建期被拦下。
_Avoid_: 练习题、小测、exam
