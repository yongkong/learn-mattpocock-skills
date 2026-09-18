# Stateless · 无状态

[原文 ↗](https://github.com/mattpocock/dictionary-of-ai-coding/blob/main/dictionary/Stateless.md)

不向前携带任何信息。<em>模型</em>在每次请求之间是无状态的——每次请求都重发完整的 context window,因为模型看不到别的任何东西;<em>agent</em> 在 session 之间默认也无状态,新会话从零开始。

模型永远无状态:参数在 training 后冻结,推理不会改变它,它不会从你的纠正里学习、也不会渐渐认识你。会话内的连续感是 harness 制造的——它保存对话记录并随每个请求重发:模型不是在记住对话,而是在重读对话。实践推论:想让某件事被跨会话记住,就必须写到 agent 会读回来的地方——AGENTS.md、memory system、handoff artifact 都因此存在。当 agent 反复犯你纠正过的错,问题不是「它为什么没学会」(它不能),而是「这条纠正该写到哪里,让每个未来会话都读到」。

**Usage**

"Why does it forget the convention every time I clear?"  
「为什么每次 clear 它都忘记这个约定?」

"The model's stateless — the new session starts empty. If you want it carried, write it to AGENTS.md or a memory file the harness loads at session start."  
「模型是无状态的——新会话从零开始。想让它被带走,就写进 AGENTS.md 或 harness 在会话启动时加载的记忆文件。」

