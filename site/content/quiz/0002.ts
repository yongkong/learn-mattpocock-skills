import type { QuizQuestion } from "@/components/lesson/quiz";

/** 0002 随堂测验(10 题混编,正确项已打散)。 */
export const quiz0002: QuizQuestion[] = [
  {
    scenario: "grilling 的某一轮,agent 该问哪些问题?",
    options: ["只有一个最关键的核心问题", "上一轮你答得含糊的问题", "前提已解决的整批 frontier", "树上还没解决的全部问题"],
    answer: 2,
    explain: "frontier = 前提已 settled 的问题。答案依赖本轮其他未决问题的,属于以后轮次。一轮问完整个 frontier,每题带推荐答案。",
  },
  {
    scenario: "访谈中冒出一个问题,答案要翻代码才知道。agent 该怎么做?",
    options: ["派 sub-agent 自己查,不问你", "放进下一轮再问你", "先按推荐答案假设着走", "跳过这个问题不问了"],
    answer: 0,
    explain: "查事实是 agent 的工作:能自己查到的绝不问用户。只有『决策』才摆到你面前等你拍板。",
  },
  {
    scenario: "grilling 什么时候算结束?",
    options: ["agent 认为方案已经合理", "问满 20 个问题之后", "时间到了半小时", "frontier 清空且你确认共识"],
    answer: 3,
    explain: "结束条件是 frontier 为空——没有 silently assumed 的分支;且你确认 shared understanding 之前它不许动手。",
  },
  {
    scenario: "(domain-modeling)「你说 account,到底指 Customer 还是 User?」属于它的哪个动作?",
    options: ["对照词汇表挑战冲突", "逼模糊词变精确的术语", "编造边界场景压测", "和代码交叉验证"],
    answer: 1,
    explain: "把模糊词磨成精确的 canonical term 并当场写进 CONTEXT.md,是 domain-modeling 的日常动作;account/Customer/User 是 SKILL.md 原例。",
  },
  {
    scenario: "(domain-modeling)什么时候才值得立一个 ADR?",
    options: ["每次重要讨论都该立一个", "涉及数据库设计就必须立", "难逆转+无上下文会困惑+真实权衡", "团队意见不一致的时候"],
    answer: 2,
    explain: "三条件同时满足才提议 ADR,缺一不立。ADR 立多了会贬值,『sparingly』是明文要求。",
  },
  {
    scenario: "(codebase-design)删除测试:删掉某模块后复杂度凭空消失,说明什么?",
    options: ["它是个透传的浅模块", "它是不可替代的深模块", "它的接口定义得太小", "它的 adapter 还不够多"],
    answer: 0,
    explain: "deletion test:复杂度消失 = pass-through,浅;复杂度在 N 个调用点重新冒出来 = 它在挣自己的饭钱。",
  },
  {
    scenario: "(codebase-design)什么时候一个 seam 才算『真』的?",
    options: ["接口方法超过五个时", "架构图画出这条虚线时", "测试需要 mock 的时候", "存在两个真实的 adapter 时"],
    answer: 3,
    explain: "一个 adapter = 假想 seam,两个 adapter = 真 seam:没有真实变化的东西,不要提前引入接缝。",
  },
  {
    scenario: "(tdd)实现代码什么时候写?",
    options: ["所有测试批量写完之后", "失败测试(red)写完之后", "和测试同时一起写", "接口文档定稿之前"],
    answer: 1,
    explain: "Red before green:先写失败测试,再写恰好够通过的实现,不预判未来测试。所有测试先行的横切(horizontal slicing)是反模式。",
  },
  {
    scenario: "(tdd)重构后测试挂了,但系统行为其实没变。这测试犯了什么错?",
    options: ["tautological(同义反复)", "horizontal slicing(横切)", "implementation-coupled(耦合实现)", "seam 没约定好"],
    answer: 2,
    explain: "行为没变测试却挂 = 测了实现细节(mock 内部、私有方法、侧门验证)。好测试通过公共接口验证行为,重构应该弄不坏它。",
  },
  {
    scenario: "(tdd)在这个体系里,重构(refactoring)发生在哪个阶段?",
    options: ["code-review 阶段,循环之外", "每次 green 之后循环内", "实现开始前的设计期", "测试失败时的应急动作"],
    answer: 0,
    explain: "和经典口诀最大的差异:refactor 被移出 red-green 循环,归 code-review 管,防止 agent 边加功能边大改结构。",
  },
];
