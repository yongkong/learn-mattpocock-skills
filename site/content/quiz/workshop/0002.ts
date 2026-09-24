import type { QuizQuestion } from "@/lib/quiz";

/** 实战 0002 随堂测验(6 题;覆盖四要素、non-determinism、smart zone、session 操作、缓存计费、subagent)。 */
export const workshopQuiz0002: QuizQuestion[] = [
  {
    scenario:
      "复盘一个真实组合:GPT 5.5 跑在 ChatGPT 里,能建文档、搜网页、连 MCP server。按本课的公式,这里的「agent」指什么?",
    options: [
      "GPT 5.5 这个 model 本身",
      "ChatGPT 这个聊天界面",
      "被 harness 置于 environment 中的 model——harness 与 model 的合称",
      "负责连接 MCP server 的那段代码",
    ],
    answer: 2,
    explain:
      "agent 不是独立实体,只是 harness + model 合在一起的名字:GPT 5.5 是 model,ChatGPT 是 harness,文档系统与 MCP server 属于 environment。单独的 model 只做文本进出,不构成 agent。",
  },
  {
    scenario: "你把 temperature 调到 0,期待「每次输出都一样,而且质量最好」。实际会发生什么?",
    options: [
      "两个期待都实现",
      "输出可复现了,但质量下降",
      "质量达到峰值,但输出仍不可复现",
      "两个期待都落空:质量峰值在中等 temperature,且输出仍不可复现",
    ],
    answer: 3,
    explain:
      "likelihood trap:多样性被移除后质量反而下降,峰值在中等 temperature;同时模型大规模并行计算、顺序影响结果,同一块 GPU、同一个 model 在 temperature 0 也每次不同。",
  },
  {
    scenario: "session 刚过 150,000 tokens,手上的编码工作还没做完。最合理的动作是什么?",
    options: [
      "换一家宣传百万 token 窗口的 model 继续干",
      "继续硬撑,反正 dumb zone 也能出结果",
      "把它当撤离信号:交接工作或换打法,回到 smart zone",
      "调高 effort,用更多推理补偿质量损失",
    ],
    answer: 2,
    explain:
      "dumb zone 是缓坡不是悬崖,150k 是「准备撤离」的信号。百万窗口面向长文本检索,买不回 smart zone;调高 effort 烧更多 token,只会更早滑进 dumb zone。",
  },
  {
    scenario:
      "同一个 session 太臃肿,你想缩小 context 又保留工作脉络;另一天你想彻底从零开始。分别该做什么?",
    options: [
      "前者 compact 当前 session,后者清空 context 开新 session",
      "前者清空开新 session,后者 compact 当前 session",
      "两者都 compact,一次不行就两次",
      "前者换一个 model,后者清空 context",
    ],
    answer: 0,
    explain:
      "compact 压缩当前 session、延续脉络;清空则 harness 里该 session 的状态全部忘掉。两种操作都不碰磁盘——environment 里的文件永远还在。",
  },
  {
    scenario:
      "日志显示某次请求 `cache_read_input_tokens` 约 22,000。这段被 prefix cache 命中的前缀怎么计费?",
    options: [
      "免费——命中缓存不产生费用",
      "按普通 input 全价,只是不出现在账单上",
      "按 cached input 价,约为普通 input 的十分之一",
      "按 output 价计算,是 input 的五倍",
    ],
    answer: 2,
    explain:
      "prefix cache 复用前缀的计算,按 cached input tokens 计费,约为普通 input 的十分之一(cache hits 和 refreshes 同价),但不是免费;间隔太久缓存超时失效,前缀就要全价重算。",
  },
  {
    scenario:
      "主 agent spawn 了一个 subagent 深挖 codebase,subagent 烧掉 30,000 tokens。这笔账记在哪里?",
    options: [
      "记在主 agent 的 context 里,主窗口照样膨胀",
      "subagent 的探索不花钱,总量为零",
      "由 model provider 吸收,不计入任何一方的账单",
      "烧在 subagent 自己的 context 里,主 agent 只收到总结",
    ],
    answer: 3,
    explain:
      "subagent 的 token 照样花,只是没花在 orchestrator 的窗口里——省的是主 context 的空间和 attention,不是总费用;速度收益来自并行 spawn,委派本身不提速。",
  },
];
