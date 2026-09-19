import type { QuizQuestion } from "@/components/lesson/quiz";

/** 0005 随堂测验(7 题混编,含与 tdd / codebase-design 判定词的交叉;答案位置打散:0×2,1×2,2×2,3×1)。 */
export const quiz0005: QuizQuestion[] = [
  {
    scenario:
      "合并 main 时撞出冲突,两侧改动都不是你写的,当时为什么改已经说不清。该用哪个技能进场?",
    options: ["/code-review", "/resolving-merge-conflicts", "/diagnosing-bugs", "/triage"],
    answer: 1,
    explain:
      "冲突挡在合并路上就是它的领地:先找每处冲突的 primary source,读懂双方各自为什么改,再逐块解决。两条铁律:总是解决,绝不 abort。",
  },
  {
    scenario: "一张 bug 票缺复现步骤,triage 已请报告者补充,正在等他回复。此刻这张票停在哪个状态?",
    options: ["needs-info", "needs-triage", "wontfix", "ready-for-human"],
    answer: 0,
    explain:
      "等报告者 = needs-info;他一回复,票就回到 needs-triage 重新评估。needs-triage 是「评估中」,不是「等人」——两个状态别混。",
  },
  {
    scenario:
      "一张 bug 票看起来很真,准备推向 ready-for-agent。哪个动作让 agent 简报的质量远胜口说无凭?",
    options: [
      "把标题改写成一条祈使句",
      "给 issue 补上两个类目标签",
      "先亲手复现一次报告的 bug",
      "在评论区先贴出 AI 免责声明",
    ],
    answer: 2,
    explain:
      "Verify the claim:按报告者的步骤亲手复现(外部 PR 则检出跑测试),确认过的代码路径写进简报,agent 认领时不用再猜。免责声明是每条评论的格式要求,替代不了验证。",
  },
  {
    scenario: "接到一个偶发 bug,最想立刻翻代码找原因。按 diagnosing-bugs 的纪律,此刻手里缺的是?",
    options: [
      "一条能让 bug 变红的一条命令信号",
      "一份覆盖全部代码路径的详尽日志",
      "一轮按优先级排好序的假设清单",
      "一份把根因钉死的架构调研报告",
    ],
    answer: 0,
    explain:
      "Phase 1 建反馈回路就是技能本身:一条已跑过、专为此 bug 变红的一条命令,满足 red-capable、deterministic、fast、agent-runnable 四个词。假设清单是 Phase 3 的事——没有红信号就列假设,正是这个技能要防止的失败。",
  },
  {
    scenario:
      "bug 修好了,想写回归测试锁住它,却发现现有接缝太浅:单个测试触发不了真实的调用链。按规矩,这算什么?",
    options: [
      "换条更浅的接缝凑合写,聊胜于无",
      "这本身就是发现:记录它,别硬凑测试",
      "在测试里手工复刻出整条调用链",
      "先跳过测试,靠人工点检兜底",
    ],
    answer: 1,
    explain:
      "原文:没有正确的 seam,这本身就是发现——架构在阻止 bug 被锁死,记录并上报。判定词与 tdd 同源:回归测试要落在真实 bug 发生的接缝上,浅接缝的测试只给假信心。",
  },
  {
    scenario: "怀疑某个模块是浅模块,用哪个测试下判断?",
    options: [
      "命名测试:模块名能否一眼看懂职责",
      "行数测试:实现是否比接口长出太多",
      "覆盖测试:它有没有足够的测试覆盖",
      "删除测试:删掉它,复杂度是集中还是摊开",
    ],
    answer: 3,
    explain:
      "删除测试(deletion test):删掉它,复杂度若「集中」到别处,说明它真在扛复杂度;若只是「挪走」,它就是浅的。把浅模块变深(deepening),正是 /improve-codebase-architecture 要找的手术位。",
  },
  {
    scenario: "哪个情境才轮到 /wizard 出场?",
    options: [
      "要 agent 改一个本地配置文件",
      "要脚本每天凌晨自动清理旧日志",
      "要人在第三方后台点出密钥,再填进 CI",
      "要三个子代理并行实现三张工单",
    ],
    answer: 2,
    explain:
      "准入判据一句话:只有 agent 自己做不了的步骤才用——开网址、人肉点页面、抄密钥、一次性迁移。其余三个情境 agent 都能自己干,召唤 wizard 反而是用错。",
  },
];
