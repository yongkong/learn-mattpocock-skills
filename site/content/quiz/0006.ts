import type { QuizQuestion } from "@/lib/quiz";

/** 0006 随堂测验(7 题混编;答案位置打散:0×1,1×2,2×2,3×2)。 */
export const quiz0006: QuizQuestion[] = [
  {
    scenario:
      "你脑子里有个产品想法,想被狠一点地追问到每个分支都有答案为止——对象不是代码库。该敲哪个?",
    options: ["/grill-with-docs", "/grill-me", "/grilling", "/handoff"],
    answer: 1,
    explain:
      "grill-me 是你自己敲的入口,本体就是参考层的 grilling。分工:想法在脑子里 → /grill-me;对象是仓库和文档 → /grill-with-docs。",
  },
  {
    scenario: "/handoff 生成的交接文档,存放在哪里?",
    options: [
      "仓库根目录,随代码一起提交",
      "CONTEXT.md 同级的 docs 目录",
      "收件人的邮箱草稿箱",
      "系统临时目录,不落进工作区",
    ],
    answer: 3,
    explain:
      "原文规定写到操作系统的临时目录,不进当前工作区——它是给下一个 agent 的一次性便签,不是仓库的文档。仓库里该有的,引用路径就好。",
  },
  {
    scenario: "写交接文档时,spec、ADR、commit 这些产物已经记录的内容,handoff 怎么处理?",
    options: ["整段抄进文档", "只留路径或链接", "全部重新概括", "压缩成一句话"],
    answer: 1,
    explain:
      "不重复其他 artifact 已有的内容,引用路径或 URL 代替——交接文档只补「现在这个会话独有的状态」,重抄既膨胀又容易和正本失同步。",
  },
  {
    scenario: "用 /to-questionnaire 时,它只访谈你「发给谁、要什么回来」,从不拷问主题本身。这条判词是?",
    options: [
      "把主题的每个分支都拷问到底",
      "按主题分节,问题越长越好",
      "拷问发送,不拷问主题",
      "先替对方把答案猜出来",
    ],
    answer: 2,
    explain:
      "Grill the send, not the subject(中译:拷问发送,不拷问主题)——你能答的只有发送,问卷的问题瞄准「对方知道的减去你需要的」这个差集。",
  },
  {
    scenario: "收到一条邮件,读了三遍还是不知道对方要你干什么。该用哪个技能?",
    options: ["/to-questionnaire", "/handoff", "/wait-what", "/grill-me"],
    answer: 2,
    explain:
      "消息没落地,当场触发 /wait-what:agent 补上你缺的上下文,用简化技术英语和 CONTEXT.md 的共同词汇,把这条消息重新讲一遍。",
  },
  {
    scenario: "协作模块六个技能里,唯一属于 model-invoked(模型可自己拉进来)的是?",
    options: ["/grill-me", "/handoff", "/to-questionnaire", "/writing-for-agents"],
    answer: 3,
    explain:
      "只有 writing-for-agents 是 model-invoked:当你在建 skill 或改 AGENTS.md/CLAUDE.md 时,模型可以主动调它;其余五个只能你亲手敲。",
  },
  {
    scenario: "writing-for-agents 说,一个 context pointer(上下文指针)靠什么决定 agent 何时去取它指向的材料?",
    options: ["指针的措辞", "指针的目标", "指针的长度", "指针的位置"],
    answer: 0,
    explain:
      "决定触发的是措辞,不是目标——措辞要写清「材料是什么」和「哪些分支该触发」。措辞太弱时,先磨措辞,磨不动才考虑把材料内联。",
  },
];
