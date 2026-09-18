# Session · 会话

[原文 ↗](https://github.com/mattpocock/dictionary-of-ai-coding/blob/main/dictionary/Session.md)

与 agent 的一次有边界的交互运行:从空开始,累积消息、tool result 和读过的文件,直到被 clear、关闭、或 compact 成新会话。Session 是「装填」context window 的东西——窗口是盒子,session 是慢慢填进去的内容。超出单个窗口的活必须拆到多个会话。

Session 的消息历史就是 agent 的工作记忆:模型无状态,它「记得」的一切——你要过什么、测试说了什么、三个 turn 前决定了什么——全在历史里、随每次请求重发。不在 session 里的东西,对 agent 就不存在。这份记忆随会话结束而结束:昨天收工时对代码库烂熟的 agent,今天早上对它一无所知;幸存下来的是文件系统——这正是 handoff、memory system 和 AGENTS.md 依赖的机制。会话在哪结束由你选:会话里的一切都影响后续每个 turn,无关任务留下的残留会污染下一个回答。一个任务一个会话,收工即 clear,是保持 context 相关性的自然节拍。

**Usage**

"How long can one session run before it falls apart?"  
「一个 session 能撑多久不散架?」

"Depends on the work — a focused refactor stays sharp longer than open-ended research. Once the session bloats, hand off or compact, don't push through."  
「看活——专注的重构比开放式研究撑得久。会话一臃肿就 handoff 或 compact,别硬撑。」

