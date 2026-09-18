import type { QuizQuestion } from "@/components/lesson/quiz";

/** 0001 随堂测验(7 题)。选项顺序待 #19 语域重写时重排。 */
export const quiz0001: QuizQuestion[] = [
  {
    scenario: "你脑子里有个新特性想法,但边界、取舍都还没想清。",
    options: ["/grill-me", "/to-spec", "/implement", "/triage"],
    answer: 0,
    explain: "想法模糊时先被访谈。想顺手沉淀领域文档就升级成 /grill-with-docs。spec 是访谈结束后的产物,顺序不能反。",
  },
  {
    scenario: "你和 agent 刚就方案达成共识,要把结论落成书面规格。",
    options: ["/to-spec", "/grill-me", "/wayfinder", "/handoff"],
    answer: 0,
    explain: "/to-spec 只做综合,不再访谈——访谈已经发生了。它会把 spec 发布到你配置的 issue tracker。",
  },
  {
    scenario: "spec 写好了,要拆成几个 agent 能并行认领的小块工作。",
    options: ["/to-tickets", "/implement", "/triage", "/to-questionnaire"],
    answer: 0,
    explain: "/to-tickets 切出 tracer-bullet 竖切片工单并声明 blocking 关系,所以工单之间可以并行。/triage 是对已有工单池做分诊,不是拆分。",
  },
  {
    scenario: "工单就绪,要开始真正写代码了。",
    options: ["/implement", "/tdd", "/code-review", "/prototype"],
    answer: 0,
    explain: "/implement 是入口,它内部驱动 /tdd 并在收尾跑 /code-review。直接敲 /tdd 也行,但你会丢掉自动接力的审查环节。",
  },
  {
    scenario: "diff 已经完成,提交前要对照规范和原始 spec 各查一遍。",
    options: ["/code-review", "/codebase-design", "/resolving-merge-conflicts", "/improve-codebase-architecture"],
    answer: 0,
    explain: "/code-review 是双轴:Standards 轴(规范 + Fowler 坏味道)与 Spec 轴(忠实实现),两轴由并行子 agent 分别执行。",
  },
  {
    scenario: "这个项目要做的事太大,一个 agent 会话根本装不下。",
    options: ["/wayfinder", "/to-tickets", "/handoff", "/research"],
    answer: 0,
    explain: "/wayfinder 把大工程铺成决策地图(map + 子工单),逐个 claim/resolve,直到通往终点的路全部清晰。/handoff 是会话级交接,尺度不同。",
  },
  {
    scenario: "一条消息(PR 描述、同事回复)你看了两遍还是没懂。",
    options: ["/wait-what", "/ask-matt", "/to-questionnaire", "/handoff"],
    answer: 0,
    explain: "/wait-what 就是为「这条消息没落地」设计的:agent 会补上你缺的上下文,用 CONTEXT.md 的词汇重新讲一遍。/ask-matt 管的是『该用哪个技能』,不是『这条消息什么意思』。",
  },
];
