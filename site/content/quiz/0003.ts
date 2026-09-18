import type { QuizQuestion } from "@/components/lesson/quiz";

/** 0003 随堂测验(7 题,正确项已打散;第 7 题已按公开口径改写)。 */
export const quiz0003: QuizQuestion[] = [
  {
    scenario: "/grill-with-docs 实际上由哪两个技能组成?",
    options: ["grilling + to-spec", "grilling + domain-modeling", "domain-modeling + tdd", "to-spec + to-tickets"],
    answer: 1,
    explain: "它的 SKILL.md 正文只有一句:Call the Skill tool twice, for 'grilling' and 'domain-modeling'(中译:调用两次 Skill 工具,先 grilling,后 domain-modeling)。访谈方法 + 领域建模,一次调用两个都上。",
  },
  {
    scenario: "进入 /to-spec 之后,它还会继续访谈你吗?",
    options: ["会,再问一轮细节问题", "只问测试相关的问题", "只问范围外的问题", "不会,它只综合已有共识"],
    answer: 3,
    explain: "to-spec 的定位是『no interview, just synthesis』:访谈在 grill 阶段已经完成,写 spec 时不再问。",
  },
  {
    scenario: "spec 里 user stories 的固定格式是什么?",
    options: ["As an actor, I want..., so that...", "Given-When-Then 三段式", "输入-处理-输出三栏表", "角色-目标-任务三层树"],
    answer: 0,
    explain: "As an <actor>, I want <feature>, so that <benefit>,而且要求是很长的编号列表,覆盖特性所有方面。",
  },
  {
    scenario: "spec 为什么禁止出现具体文件路径和代码片段?",
    options: ["agent 看不懂代码", "会让 spec 超出长度限制", "它们过时得非常快", "它们属于测试决策"],
    answer: 2,
    explain: "文件路径和代码片段极易过时。唯一例外:原型得出的状态机/类型形状等决策性片段可以内联,并注明来自 prototype。",
  },
  {
    scenario: "to-tickets 拆完工单、发布之前必须做什么?",
    options: ["直接发布到 issue tracker", "拿粒度/依赖边/拆分合并来问你", "先把第一张工单实现掉", "给每张工单写好测试"],
    answer: 1,
    explain: "三连问:粒度对吗?blocking 边对吗?要合并/拆分吗?你批准后才发布——工单是你验收过的,不是 agent 自作主张的。",
  },
  {
    scenario: "哪类任务允许不按竖切(tracer bullet)拆?",
    options: ["只有一层的纯 UI 改动", "只有一个函数的小修", "新增一张数据库表", "波及全库的 wide refactor"],
    answer: 3,
    explain: "wide refactor(一次机械改动波及全库)走 expand–contract:先加新形式,分批迁移,最后删旧形式,每批一张工单保 CI 绿。",
  },
  {
    scenario: "发布后,工单在 issue tracker 里长什么样?",
    options: ["一个大文件,全部工单堆在一起", "README 里加一个文字清单", "一票一 issue(或本地模式一票一文件),按依赖顺序编号", "每张工单单独一个邮件草稿"],
    answer: 2,
    explain: "GitHub 模式一票一 issue,本地 markdown 模式一票一文件;都从 01 按依赖顺序编号(blocker 在前),每张含 What to build / Blocked by / Status / 验收标准。",
  },
];
