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
Course 目录的顶级分类单位,共五章:主流程 / 参考层 / Shaping / Upkeep / 协作。每份 Lesson 恰属一章;Reference 与 Dictionary 不入章,是导航中的顶级类目。
_Avoid_: 分类、部分、chapter

**Register(语域)**:
Site 全部内容(含未来 Lesson)的写作标准:写给只读网页的零背景读者,课件自成一体;人称定「你」;引用必有出处。可执行细则在 `docs/register.md`。
_Avoid_: 文风指南、语气规范、style guide

**Progress(学习进度)**:
学习者对某个 Lesson 的完成判定,只有「未学 / 已学」两态,由学习者手动标记。
_Avoid_: 完成度、得分、percent

**Quiz(随堂测)**:
Lesson 正文里内嵌的检索练习:选择题、即时反馈、正确项打散。一套测验一个 TS 模块,存 `content/quiz/`;类型、校验与评分收在 `lib/quiz.ts`,坏数据在构建期被拦下。
_Avoid_: 练习题、小测、exam
