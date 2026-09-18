# Harness · 挽具

[原文 ↗](https://github.com/mattpocock/dictionary-of-ai-coding/blob/main/dictionary/Harness.md)

<em>Model</em> 周围、把模型变成 <em>agent</em> 的一切:<em>tool</em>、<em>system prompt</em>、<em>context window</em> 管理、权限、hooks。Claude.ai 与 Claude Code 跑的是同一个模型,行为却不同,因为 harness 不同。模型自己只会一件事:文本进,文本出——读文件、跑命令、记住上一个 <em>turn</em>,它都不会。这些全由 harness 供给:为每次 <em>model provider request</em> 组装 <em>context</em>,执行模型要求的 <em>tool call</em>,把 <em>tool result</em> 喂回去,保存 <em>session</em> 历史,在危险动作前向你请求许可,决定何时 <em>compact</em>。「模型提议,harness 执行,循环往复」的 agent 循环,就是 harness 在跑。

这对诊断要紧:两个产品之间、或昨天与今天之间行为不同,变量常常不在模型,而在 harness——system prompt 换了、工具集换了、权限默认值改了、context 管理策略换了,模型一个字没动,行为全变。这也意味着你的大部分配置都住在 harness 里:<em>AGENTS.md</em>、权限设置、hooks 全是写给 harness 的指令,不是写给模型的。例子:Claude Code、Cursor、Codex CLI——以及 Claude.ai,那是聊天 harness,不是编码 harness。

**Usage**

"Same model, why is Claude Code editing files and Claude.ai just answering questions?"  
「同一个模型,为什么 Claude Code 在改文件,Claude.ai 只会回答问题?」

"Different harnesses — Claude Code has filesystem tools, a different system prompt, and a permission layer. The model isn't the variable here."  
「harness 不同——Claude Code 有 filesystem 工具、另一套 system prompt 和一层权限。这里的变量不是模型。」

