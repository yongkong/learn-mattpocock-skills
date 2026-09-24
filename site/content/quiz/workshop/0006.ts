import type { QuizQuestion } from "@/lib/quiz";

/** 实战 0006 随堂测验(6 题;覆盖 push/point、skill 调用方式、user vs project、navigation pointer、pruning 与 automatic memory)。 */
export const workshopQuiz0006: QuizQuestion[] = [
  {
    scenario: "一条数据库迁移书写约定,每周才用一次,足足四十行。该把它放哪?",
    options: [
      "原样内联进 AGENTS.md,确保 agent 不会错过",
      "放进独立文档,在 AGENTS.md 留一行 context pointer",
      "存在你自己的笔记里,需要时手动粘贴给 agent",
      "拆成五条短规则,分散写进 AGENTS.md 各处",
    ],
    answer: 1,
    explain:
      "默认 point:内联意味着每次 request、每个会话都为一条一周一用的规则付四十行 context load,还稀释其他指令;手动粘贴把成本转嫁给你,最要紧的那一周你偏偏会忘。",
  },
  {
    scenario: "你写了个 skill,一个月只用到两次,而且你确定自己会忘记它存在。frontmatter 该怎么写?",
    options: [
      "加 disable-model-invocation: true,零 context load 最省",
      "保留 description 不加开关,让 agent 能自主发现",
      "删掉 description,反正它只给你自己看",
      "把 skill 正文整段搬进 AGENTS.md 常驻",
    ],
    answer: 1,
    explain:
      "「会忘」恰恰意味着 user-invoked 走不通——agent 完全够不到它,认知负担全在你。description 是 agent 判断相关性的唯一依据,留住它才可能被自主发现;塞进 AGENTS.md 更是每次请求付整篇。",
  },
  {
    scenario: "一个 skill 编码了你团队数据库迁移的执行方式,两位队友总是做错。它该放哪?",
    options: [
      "你的 ~/.agents/skills/,随身携带",
      "项目的 .agents/skills/ 并提交入库",
      "发给队友,让他们各自复制进自己的用户目录",
      "写进 README.md,让队友自己照着做",
    ],
    answer: 1,
    explain:
      "编码了「这个项目该怎么干活」的 skill 属于项目:入库后随 clone 而来、有 git 历史可查、团队任何人都能改进它。放你的用户目录队友根本看不到;手动复制则人人重复劳动、副本各自漂移。",
  },
  {
    scenario: "迁移总出问题:agent 搜索时根本翻不到 scripts/seed.ts。最对症的修法是?",
    options: [
      "在 AGENTS.md 加一行指向它的 navigation pointer,写明每次 schema 变更都会落到这里",
      "把 scripts/seed.ts 的全文粘贴进 AGENTS.md",
      "在指令里叮嘱 agent「更努力地搜索」",
      "给它改个更容易被搜到的文件名",
    ],
    answer: 0,
    explain:
      "navigation pointer 不说「做什么」,只说「去哪看」,让 agent 零扫描直达。粘贴全文是每次会话付成本;「更努力搜索」仍是 local roads——恰恰是已经失败的那条路。",
  },
  {
    scenario: "你删掉了 implement skill 里「写详细 commit message」那一行,产出毫无变化。接下来怎么办?",
    options: [
      "把这一行挪进 AGENTS.md,让所有会话都看到",
      "恢复原样,删了总归不放心",
      "让删除生效——行为没变说明它是 no-op,模型本来就这么做",
      "把它改写得更详细,再观察一次",
    ],
    answer: 2,
    explain:
      "删掉后行为相对默认没变,说明那行什么也没撑住,你一直在为模型本来就会做的事付 context load。挪进 AGENTS.md 更糟——从「skill 触发时付」变成「每次请求付」,依旧不改变任何东西。",
  },
  {
    scenario: "harness 主动提出「记住你的纠正,下次会话自动喂回」。要开吗?",
    options: [
      "开,记住的越多 agent 越懂你",
      "开,但要求自己每月手动清理一次",
      "不开——agent 只写不删,这是自动生长、无人 review 的 sediment",
      "开,但限定它只记偏好、不记纠正",
    ],
    answer: 2,
    explain:
      "automatic memory 存在仓库外的 per-project state 目录,永不进 git status,也就永远不会被 code review;只增不删,每行每会话都付 context load——「定期清理」是你坚持不下来的负担。steering on purpose:控制权必须在你手里。",
  },
];
