export interface DictionaryTerm {
  term: string;
  zh: string;
}

export interface DictionaryCategory {
  id: string;
  zh: string;
  en: string;
  terms: DictionaryTerm[];
}

export const DICTIONARY_MANIFEST: DictionaryCategory[] = [
    { id: "the-model", zh: "模型本身", en: "The Model", terms: [
      { term: "AI", zh: "人工智能" },
      { term: "Model", zh: "模型" },
      { term: "Parameters", zh: "参数" },
      { term: "Training", zh: "训练" },
      { term: "Inference", zh: "推理" },
      { term: "Effort", zh: "思考力度" },
      { term: "Token", zh: "词元" },
      { term: "Next-token prediction", zh: "下一词元预测" },
      { term: "Non-determinism", zh: "非确定性" },
      { term: "Model provider", zh: "模型供应商" },
      { term: "Harness", zh: "挽具" },
      { term: "Model provider request", zh: "模型供应商请求" },
      { term: "Input tokens", zh: "输入词元" },
      { term: "Output tokens", zh: "输出词元" },
      { term: "Prefix cache", zh: "前缀缓存" },
      { term: "Cache tokens", zh: "缓存词元" }
    ] },
    { id: "sessions-context-windows-turns", zh: "会话、上下文窗口与轮次", en: "Sessions, Context Windows & Turns", terms: [
      { term: "Stateless", zh: "无状态" },
      { term: "Context", zh: "上下文" },
      { term: "Context window", zh: "上下文窗口" },
      { term: "Stateful", zh: "有状态" },
      { term: "Agent", zh: "智能体" },
      { term: "System prompt", zh: "系统提示词" },
      { term: "Session", zh: "会话" },
      { term: "Turn", zh: "轮次" }
    ] },
    { id: "tools-environment", zh: "工具与环境", en: "Tools & Environment", terms: [
      { term: "Environment", zh: "环境" },
      { term: "Filesystem", zh: "文件系统" },
      { term: "Tool", zh: "工具" },
      { term: "Tool call", zh: "工具调用" },
      { term: "Tool result", zh: "工具结果" },
      { term: "MCP", zh: "模型上下文协议" },
      { term: "Permission request", zh: "权限请求" },
      { term: "Permission mode", zh: "权限模式" },
      { term: "Agent mode", zh: "智能体模式" },
      { term: "Sandbox", zh: "沙箱" }
    ] },
    { id: "failure-modes", zh: "失效模式", en: "Failure Modes", terms: [
      { term: "Sycophancy", zh: "谄媚" },
      { term: "Hallucination", zh: "幻觉" },
      { term: "Parametric knowledge", zh: "参数化知识" },
      { term: "Knowledge cutoff", zh: "知识截止点" },
      { term: "Contextual knowledge", zh: "上下文知识" },
      { term: "Attention relationship", zh: "注意力关系" },
      { term: "Attention budget", zh: "注意力预算" },
      { term: "Attention degradation", zh: "注意力衰退" },
      { term: "Smart zone", zh: "聪明区" }
    ] },
    { id: "handoffs", zh: "交接", en: "Handoffs", terms: [
      { term: "Clearing", zh: "清空" },
      { term: "Handoff", zh: "交接" },
      { term: "Primary source", zh: "一手来源" },
      { term: "Secondary source", zh: "二手来源" },
      { term: "Handoff artifact", zh: "交接物" },
      { term: "Spec", zh: "规格" },
      { term: "Ticket", zh: "工单" },
      { term: "Compaction", zh: "压缩" },
      { term: "Autocompact", zh: "自动压缩" }
    ] },
    { id: "memory-and-steering", zh: "记忆与转向", en: "Memory and Steering", terms: [
      { term: "Memory system", zh: "记忆系统" },
      { term: "AGENTS.md", zh: "AGENTS.md 文件" },
      { term: "Progressive disclosure", zh: "渐进式披露" },
      { term: "Context pointer", zh: "上下文指针" },
      { term: "Skill", zh: "技能" },
      { term: "Subagent", zh: "子代理" }
    ] },
    { id: "patterns-of-work", zh: "工作模式", en: "Patterns of Work", terms: [
      { term: "Human-in-the-loop", zh: "人在环中" },
      { term: "AFK", zh: "挂机" },
      { term: "Automated check", zh: "自动化检查" },
      { term: "Automated review", zh: "自动化评审" },
      { term: "Human review", zh: "人工评审" },
      { term: "Vibe coding", zh: "氛围编程" },
      { term: "Design concept", zh: "设计概念" },
      { term: "Grilling", zh: "追问式访谈" },
      { term: "Prototyping", zh: "原型实验" },
      { term: "DX", zh: "开发者体验" },
      { term: "AX", zh: "智能体体验" }
    ] }
];
