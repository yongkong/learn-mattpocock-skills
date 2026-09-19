import type { QuizQuestion } from "@/lib/quiz";

/** 0004 随堂测验(6 题混编;选项顺序沿用原稿,已合规)。 */
export const quiz0004: QuizQuestion[] = [
  {
    scenario: "新想法:把整个报表模块从 REST 迁到 GraphQL,粗估十几次会话做不完,路线也看不清。第一步敲什么?",
    options: ["/wayfinder", "/to-tickets", "/to-spec", "/implement"],
    answer: 0,
    explain: "想法大于一次会话的容量、路被雾包着 → 先铺决策地图。to-tickets 拆的是『要做的活』,wayfinder 铺的是『要做的决定』;活儿要等路清晰了才拆。",
  },
  {
    scenario: "「这个设置页该长什么样?想看几个真正分叉的方案再拍板。」该用哪个技能?",
    options: ["/to-spec", "/prototype", "/grill-me", "/implement"],
    answer: 1,
    explain: "「长什么样」是 UI 分支的答题问题:同一路由上生成几个激进不同的界面变体,URL 参数切换。注意它会被模型主动触发,你手动敲也可以。",
  },
  {
    scenario: "决策卡住了:两个支付 SDK 在高并发下的真实限流行为不明,得查官方文档和源码。用哪个?",
    options: ["/prototype", "/wayfinder", "/research", "/wait-what"],
    answer: 2,
    explain: "仓库之外的事实缺口 → /research 派后台子代理,只对一手来源,产出带引用的单个 MD。你不用停下手里的活。",
  },
  {
    scenario: "原型答完题了:状态模型没问题。这份原型代码最终的归宿是?",
    options: ["直接合进 main 分支", "补齐测试后转正", "答完题就地删除", "提交到一次性分支留档"],
    answer: 3,
    explain: "决策折叠进真实代码;原型本身作为 primary source 提交到 throwaway 分支(不进 main),实现工单上留 context pointer 指过去,问题和结论记在工单里。",
  },
  {
    scenario: "wayfinder 铺图时,什么样的问题该立成工单,而不是留在雾区(Not yet specified)?",
    options: ["问题已经能说得精确时", "问题已经能答出答案时", "问题没有任何阻塞时", "问题优先级足够高时"],
    answer: 0,
    explain: "判据只有一条:现在能否把问题陈述精确——和能否回答、是否被阻塞无关。说不精确就留在雾里,等边界推进后『毕业』成票。",
  },
  {
    scenario: "你在会话里说「这套交互纸面上推不动,得跑起来点点看」。模型会主动拉哪个技能进场?",
    options: ["/wayfinder", "/to-spec", "/prototype", "/implement"],
    answer: 2,
    explain: "prototype 是 model-invoked,触发短语就是『感觉对不对』『长什么样』『推不动』这类话。wayfinder 是模块里唯一 user-invoked 的,模型永远不会自作主张铺地图。",
  },
];
