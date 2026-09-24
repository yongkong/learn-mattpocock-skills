import type { QuizQuestion } from "@/lib/quiz";

/** 实战 0007 随堂测验(6 题;覆盖 spec/ticket 粒度、拆票判据、spec 去留、rerouting、/goal、standards 落点)。 */
export const workshopQuiz0007: QuizQuestion[] = [
  {
    scenario:
      "你要交付一个触及每一层的大功能。同事问:spec 和 ticket 到底怎么分工,谁先谁后、各管哪段?",
    options: [
      "spec 写目的地,传给每个会话并作最终 review 的依据;ticket 写旅程,一张对应一个 smart zone 的工作量",
      "spec 写实现计划,ticket 写业务目标,粒度更粗",
      "spec 和 ticket 都描述旅程,只是张数不同",
      "spec 给人看,ticket 给 agent 看,内容基本一样",
    ],
    answer: 0,
    explain:
      "spec 是交接物(handoff artifact):让每个会话知道自己的工作如何贡献于总目标,收尾时拿它验收;ticket 是旅程中的一段。粒度判据一句话:一张 ticket = 一个 smart zone。",
  },
  {
    scenario:
      "/to-tickets 一口气给出 10 张工票,第 1 张是『implement the database schema』,第 2 张是『build the API endpoints』。你该?",
    options: [
      "照单全收——张数多说明拆得够细",
      "要求合并成一张,减少管理成本",
      "把两张对调顺序,先做前端再做数据库",
      "打回重拆:这是横切;要求纵切,且每张装得进一个 fresh context window",
    ],
    answer: 3,
    explain:
      "按层切是横切陷阱:数据库阶段的质量要等跨层贯通时才得到验证,反馈严重滞后。纵切从第一张就贯穿所有层;10 张还意味着约 1.5M token 预算,远超单个功能的合理量级。",
  },
  {
    scenario:
      "最后一张 ticket 合并、功能上线,tracker 里那份 49 条 user stories 的 spec 怎么处理?",
    options: [
      "提交进仓库 docs/,当 source of truth 持续维护",
      "原样留在 tracker 主视图,提醒团队当初的设计",
      "在 tracker 里关闭归档——移出主视图,但想回溯时仍可查",
      "直接删除,免得日后误导任何人",
    ],
    answer: 2,
    explain:
      "spec 是 codebase 的 secondary source(投影/摘要),不持续同步必然漂移;提交进仓库会让 agent 相信一份会老化的摘要,而不是去读不会说谎的 primary source。close 即归档:历史免费保留,代价为零。",
  },
  {
    scenario: "做完两张 ticket 后 review,你发现整个 approach 不对,要换方向。第一步做什么?",
    options: [
      "git 回滚,把已实现的两张也一并撤销",
      "把剩下的 ticket 硬做完,免得前功尽弃",
      "关闭未实现的 ticket、保留 spec,重开一轮 grilling 调整目的地",
      "在旧 ticket 旁边另写一份新 spec,旧的留着对照",
    ],
    answer: 2,
    explain:
      "ticket 是一次性的,spec 是可编辑的;已实现的通常保留而非回滚,明知不对的票做完只是积累更多要撤销的代码。改完 spec 用 /to-tickets 从当前位置重新生成,再 /implement 继续——双文档设计正是为这一刻准备的。",
  },
  {
    scenario:
      "spec 写得很充分,同事提议:直接丢给 /goal,让 agent 在一个窗口里追到完成为止,省掉拆票。你最大的顾虑是什么?",
    options: [
      "spec 太含糊,/goal 理解不了目标",
      "review 没法做,质量无从验收",
      "从 spec 生成 ticket 要花几个小时,反而更慢",
      "单窗口靠 auto-compaction 兜底:开头一小段 smart zone,余生都在 dumb zone",
    ],
    answer: 3,
    explain:
      "现有 /goal 实现全靠 auto-compaction 管理上下文,区域质量是硬伤。spec+tickets 让大部分工作发生在多个 smart zone、通常更便宜、控制力更强;spec 恰恰定义充分,大 review 结尾照做,拆票只要几分钟。",
  },
  {
    scenario:
      "agent 第三次犯同一个错:上下文菜单死活不加图标。这条仓库规范写在哪里,下次才会被稳定抓住?",
    options: [
      "CODING_STANDARDS.md——code review 的 Standards 轴每次加载它",
      "CLAUDE.md 顶部,让每个会话第一眼就看到",
      "spec 的 Further Notes 一节里,让实现 agent 自己读",
      "每次任务的 prompt 里再口头叮嘱一遍",
    ],
    answer: 0,
    explain:
      "常驻 steering 文件让每个窗口为这条规则付费(无论是否相关),重述进 prompt 依赖你的记性;review 窗口负担极轻,加载 standards 顺理成章。即使不写,Standards 轴也有《Refactoring》坏味道基线兜底,但你的文件叠加其上才能稳定压住具体约定。",
  },
];
