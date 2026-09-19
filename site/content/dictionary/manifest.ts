export interface DictionaryCategory {
  id: string;
  zh: string;
  en: string;
  /** 词条英文名,即 content/dictionary/<term>.md 的文件名。中文译名以各 MD 的 H1 为唯一来源,此处不再双写。 */
  terms: string[];
}

/** 词典分类与排序:一词一 MD 文件,顺序即展示顺序。 */
export const DICTIONARY_MANIFEST: DictionaryCategory[] = [
    { id: "the-model", zh: "模型本身", en: "The Model", terms: [
      "AI",
      "Model",
      "Parameters",
      "Training",
      "Inference",
      "Effort",
      "Token",
      "Next-token prediction",
      "Non-determinism",
      "Model provider",
      "Harness",
      "Model provider request",
      "Input tokens",
      "Output tokens",
      "Prefix cache",
      "Cache tokens"
    ] },
    { id: "sessions-context-windows-turns", zh: "会话、上下文窗口与轮次", en: "Sessions, Context Windows & Turns", terms: [
      "Stateless",
      "Context",
      "Context window",
      "Stateful",
      "Agent",
      "System prompt",
      "Session",
      "Turn"
    ] },
    { id: "tools-environment", zh: "工具与环境", en: "Tools & Environment", terms: [
      "Environment",
      "Filesystem",
      "Tool",
      "Tool call",
      "Tool result",
      "MCP",
      "Permission request",
      "Permission mode",
      "Agent mode",
      "Sandbox"
    ] },
    { id: "failure-modes", zh: "失效模式", en: "Failure Modes", terms: [
      "Sycophancy",
      "Hallucination",
      "Parametric knowledge",
      "Knowledge cutoff",
      "Contextual knowledge",
      "Attention relationship",
      "Attention budget",
      "Attention degradation",
      "Smart zone"
    ] },
    { id: "handoffs", zh: "交接", en: "Handoffs", terms: [
      "Clearing",
      "Handoff",
      "Primary source",
      "Secondary source",
      "Handoff artifact",
      "Spec",
      "Ticket",
      "Compaction",
      "Autocompact"
    ] },
    { id: "memory-and-steering", zh: "记忆与转向", en: "Memory and Steering", terms: [
      "Memory system",
      "AGENTS.md",
      "Progressive disclosure",
      "Context pointer",
      "Skill",
      "Subagent"
    ] },
    { id: "patterns-of-work", zh: "工作模式", en: "Patterns of Work", terms: [
      "Human-in-the-loop",
      "AFK",
      "Automated check",
      "Automated review",
      "Human review",
      "Vibe coding",
      "Design concept",
      "Grilling",
      "Prototyping",
      "DX",
      "AX"
    ] }
];
