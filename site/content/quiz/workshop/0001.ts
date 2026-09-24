import type { QuizQuestion } from "@/lib/quiz";

/** 实战 0001 随堂测验(5 题;覆盖订阅与计费、model 选择、reset/cherry-pick 对齐、migration、request logger)。 */
export const workshopQuiz0001: QuizQuestion[] = [
  {
    scenario:
      "上个月按 token 计费的 API 账单让你心跳加速,同事建议:「为了省钱,换个更差的 model 吧。」按这门课的口径,你会怎么劝他?",
    options: [
      "继续用 API key,但把请求量砍半",
      "订阅有更快的响应速度,所以性价比更高",
      "换成 subscription:通常便宜 20–50 倍,一口价没有预算焦虑,不会为省 token 做出牺牲质量的决策",
      "API key 和订阅价格一样,区别只在登录方式",
    ],
    answer: 2,
    explain:
      "按 token 计费像家里装了电表:你会为省 token 而非效率优化,甚至换更差的 model。订阅一口价,通常便宜 20–50 倍——Theo 单月近 $50,000 的量,$800 的订阅就搞定。",
  },
  {
    scenario:
      "你订了 Anthropic Pro,打算全程手动选 Opus 跑课程,理由是「贵的就是对的」。这份「讲究」的问题出在哪?",
    options: [
      "Opus 不支持 effort 调整,只能跑 xhigh",
      "Pro 档用 Opus 会极快耗尽用量上限,model 直接用订阅档自带的 default 即可",
      "default model 的 context window 比 Opus 小得多,装不下课程代码",
      "Opus 只在 Max 档开放,Pro 根本选不了",
    ],
    answer: 1,
    explain:
      "model 用订阅档自带的 default 就好;Pro 档用 Opus 额度烧得飞快。另记住 effort 默认是 xhigh,要手动调到 medium——更高 effort 对这类工作买不来更好的答案。",
  },
  {
    scenario:
      "你做了三课练习,还提交了自己的实验代码。现在想跳到后面某个 checkpoint 的起始状态,但不丢掉自己的提交。用哪个工具?",
    options: ["npm run reset", "npm run pull", "npm run cherry-pick", "git checkout -b dev"],
    answer: 2,
    explain:
      "reset 把整个分支回退到 checkpoint,你的提交被替换掉;cherry-pick 把 checkpoint 的提交叠加在你现有工作之上,你的提交保留在下面。pull 只拉上游课程更新,不动分支位置。",
  },
  {
    scenario:
      "reset 到 make-a-schema-change 之后,首页正常,课程详情页却报 SqliteError: no such column: notes。最可能的原因和修法是?",
    options: [
      "reset 只还原了 source code,data.db 没同步——另开终端跑一次 npm run db:migrate",
      "种子数据没灌,跑一次 npm run db:seed",
      "node_modules 损坏,删掉重跑 npm install",
      "浏览器缓存了旧页面,硬刷新即可",
    ],
    answer: 0,
    explain:
      "source code 与 database 是两个单元:schema.ts 加了 notes 列,但 data.db 不会自动跟上;npm run reset 只动代码、不替你跑迁移,补一次 db:migrate 即恢复。",
  },
  {
    scenario:
      "队友装好 request logger 后有两点担心:「它会改变 agent 的行为吗?启动命令我能自己手写一条吗?」你怎么回答?",
    options: [
      "会轻微改变行为;命令可以手写,改改参数无妨",
      "proxy 原样转发、不改变任何行为;但配置在启动时注入,必须原样用它打印的命令启动 agent",
      "行为不变;命令也随便写,logger 只按端口收流量",
      "必须先改 agent 的配置文件才能接上 proxy;启动命令只起提示作用",
    ],
    answer: 1,
    explain:
      "request logger 是夹在 agent 与 model provider 之间的小 proxy:原样转发一切,并把每个请求的易读副本写进磁盘;配置都在启动时注入,所以 agent 必须由它打印的命令启动。看到一条消息两条日志(quota probe 常带 429)也属正常,不是重试。",
  },
];
