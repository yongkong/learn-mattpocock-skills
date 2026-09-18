# Stateful · 有状态

[原文 ↗](https://github.com/mattpocock/dictionary-of-ai-coding/blob/main/dictionary/Stateful.md)

向前携带信息。Session 在 turn 之间有状态——context 随会话累积,这也是长会话滑向 dumb zone 的原因。Agent 可以通过 memory system 跨会话变得有状态:把信息持久化到 environment、未来会话启动时重载。模型永远无状态;任何表面的连续性都是 harness 在重新喂 context。

每一层的「有状态」都靠重读下一层存的东西建立:session 感觉连续,是 harness 把消息历史重发给无状态的模型;agent 跨会话记得,是 harness 从 environment 重载文件。模型本身从不存状态。状态也不总是想要的:会话早期形成的错误假设会被一路携带下去——clearing 就是主动丢弃会话状态、回到「写下来的东西」的动作。

**Usage**

"It remembered my preferences from yesterday — does that mean the model learned them?"  
「它记得我昨天的偏好——是不是说明模型学会了?」

"No, the agent's stateful because the harness wrote them to a memory file and reloaded them at session start. The model itself saw nothing of yesterday."  
「不,是 agent 有状态:harness 把偏好写进记忆文件、会话启动时重载。模型本身对昨天一无所知。」

