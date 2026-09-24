import type { QuizQuestion } from "@/lib/quiz";

/** 实战 0003 随堂测验(5 题;覆盖会话管理、rewind 恢复、bash mode 与权限模式)。 */
export const workshopQuiz0003: QuizQuestion[] = [
  {
    scenario:
      "你刚让 agent 在同一个终端里完成了一个任务,接下来要做一件毫不相关的新事,并且不想被之前的对话影响。该敲什么?",
    options: ["/context", "/clear", "/usage", "按一次 Escape"],
    answer: 1,
    explain:
      "/clear 清空会话全部消息,模型是无状态的,清空后它对之前内容一无所知。/context 只查看不删除,Escape 只中断当前运行,都清不掉历史。",
  },
  {
    scenario:
      "同学告诉你:左下角的权限模式可以用 Shift+Tab 循环切换。以下哪一项不在这四种模式里?",
    options: ["manual", "edits", "plan", "bash mode"],
    answer: 3,
    explain:
      "Shift+Tab 在 manual、edits、plan、auto 四种模式间循环;bash mode 是用「!」前缀进入的命令执行方式,不是权限模式。auto mode 由 LLM 分类器自动判断命令安全性。",
  },
  {
    scenario:
      "你试了一个方案,agent 改了几个文件;试完你确信这条路不通,想连代码带产生这些改动的对话一起抹掉。选哪个 rewind 选项?",
    options: [
      "Restore the conversation but keep the code",
      "Restore the code but keep the conversation",
      "Restore the code and the conversation",
      "nevermind",
    ],
    answer: 2,
    explain:
      "只有完整恢复才会把会话退回改动之前。保留代码会把想删的改动留在磁盘上,保留对话会把失败尝试留在历史里;nevermind 则是取消回退、维持现状。",
  },
  {
    scenario:
      "你想亲自跑一次类型检查,并且让 agent 立刻着手修复它报告的错误。怎么执行?",
    options: [
      "按 Ctrl-Z 挂起 agent 后在 shell 里运行",
      "加「!」前缀用 bash mode 运行",
      "另开一个终端窗口自己运行",
      "运行时按 Ctrl-B 转入后台",
    ],
    answer: 1,
    explain:
      "bash mode 的输出直接进入 agent 上下文,它马上就能看到并处理这些错误。Ctrl-Z 挂起恰恰是为了对 agent 隐藏输出;Ctrl-B 留给 dev server 这类不会自己结束的进程。",
  },
  {
    scenario:
      "你把模式切到 auto mode,让 agent 自己判断命令能不能跑。这笔交易的代价是什么?",
    options: [
      "settings.json 里的 allow 与 deny 规则全部失效",
      "每条命令仍然都要你手动批准一次",
      "每次判断都是一次分类器调用,花 token,命令稍慢",
      "agent 从此不能再联网搜索和抓取网页",
    ],
    answer: 2,
    explain:
      "auto mode 用 LLM 分类器逐条临场判断安全性,每次判断消耗少量 token 和时间。settings.json 仍最先被查询,把高频命令写进去就能绕过分类器提速;rm -rf 这类必然危险的操作它照样拦截。",
  },
];
