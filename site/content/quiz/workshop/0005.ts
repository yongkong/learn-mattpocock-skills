import type { QuizQuestion } from "@/lib/quiz";

/** 实战 0005 随堂测验(6 题;覆盖 plan mode 辨析、compaction 损失、handoff 形态、五选一决策树与 auto-compaction 风险)。 */
export const workshopQuiz0005: QuizQuestion[] = [
  {
    scenario:
      "plan mode 交回的计划精确到表结构、函数名和测试策略,单独看每条决策都合理,但你总觉得哪里不对。缺的到底是什么?",
    options: [
      "计划还不够详细,应该细化到每一行代码",
      "hallucination——计划里混入了捏造的事实",
      "共享理解——sycophancy 让它赶工出「计划」这份新资产,跳过了与你对齐的那一步",
      "context window 快满了,该先 clear 再规划",
    ],
    answer: 2,
    explain:
      "plan mode 只是让 agent 把资产从代码换成了计划:所有决策在你参与之前就写下了。缺的是 design concept——那个互相确认「我们造的是同一个东西」的时刻,这正是 grilling 要补的。",
  },
  {
    scenario:
      "156k 的 session 压缩到 28k 后继续做 QA。压缩前会话里的原始细节,现在处于什么状态?",
    options: [
      "完整保留在新 session 的内存里,随时可取回",
      "已被压缩成 secondary source——有损摘要,细微之处回不来了",
      "自动写入了项目的 memory 文件,永久可查",
      "存在 git 历史里,reset 一次就能找回",
    ],
    answer: 1,
    explain:
      "compaction 是挤压不是存储:摘要不落任何文件,而是在内存里播种新 session;initial session 的细微之处随压缩丢失——制造二手来源必然损失信息。",
  },
  {
    scenario:
      "用 Claude 做完星级评分,想让 Codex 来 review,你运行 /handoff。这份 handoff 文档正确的形态是?",
    options: [
      "存进项目根目录的长期文档,随仓库一起演进",
      "一份直接压缩进 Codex context 的摘要,和 compaction 等价",
      "写在 OS 临时目录的一次性 markdown,涵盖待 review 文件、关键决策、已修 bug 与建议的 review 角度",
      "只写一句话的便条,让 Codex 自己去探索代码",
    ],
    answer: 2,
    explain:
      "handoff 是完全可移植的交接文档:跨 agent、跨目录、发同事都行;特意写进 OS 临时目录(不落项目、不进 memory)是因为它被设计成一次性产物。compaction 只在同一目录同一 agent 内有效,够不到 Codex。",
  },
  {
    scenario:
      "grilling 刚结束,才 30k token,下一步是实现。这个阶段边界上该怎么选?",
    options: [
      "Compact:先把共识压成摘要再开工",
      "Handoff:把决策写成文档供实现引用",
      "Continue:直接继续实现",
      "Clear:给实现腾出干净的窗口",
    ],
    answer: 2,
    explain:
      "grilling 的一手来源正是实现最好的输入:带着共识和全部决策直接干,难决定已做完。compact/handoff 是拿有损的二手来源换掉一手来源,clear 更是丢掉每个决策背后的推理。",
  },
  {
    scenario:
      "实现收尾约 150k token,下一个活是 automated review——不需要你在场,agent 自己检查改动有没有弄坏东西。边界上怎么选?",
    options: [
      "Continue:留在 150k 的窗口里直接跑",
      "Handoff:写份文档发给另一个目录的 agent",
      "Compact:压缩后再在主 session 里跑",
      "Subagent:让 review 在它自己的 context window 里跑",
    ],
    answer: 3,
    explain:
      "任务能 AFK(away from keyboard)完成——你全程不必介入——就派 subagent,完全不碰主 session。continue 在高位运行正是要逃离的 dumb zone;compact 也行,但为一件不经手的任务白付一次摘要成本,结果还落回你的窗口。",
  },
  {
    scenario:
      "实现到一半,session 自己暂停并触发了 auto-compaction。你最该从中读出什么信号?",
    options: [
      "harness 的决策比你准,以后边界全交给它",
      "阶段边界的决策被拖得太晚——压缩落在了最危险的阶段中途,该自己掌舵做五选一",
      "模型能力不足,换一个更强的模型即可",
      "把 autoCompactWindow 调大就不会再发生",
    ],
    answer: 1,
    explain:
      "最安全的压缩点是阶段边界;中途被压,实现阶段会风格突变、忘掉本该实现的功能。auto-compaction 还剥夺了你给摘要下指示的机会——触发它多半意味着出了问题,决策由你来下,才会得到更好的代码。",
  },
];
