# Tool · 工具

[原文 ↗](https://github.com/mattpocock/dictionary-of-ai-coding/blob/main/dictionary/Tool.md)

<em>Harness</em> 暴露给 <em>agent</em> 调用的函数——Read、Write、Bash、Search。工具是 agent 感知与作用于 <em>environment</em> 的方式:不经 <em>tool result</em> 它看不见环境,不经 <em>tool call</em> 它改不动环境。每次 tool call 都多付一次 <em>model provider request</em>——结果必须送回 <em>model</em>,它才能决定下一步。

多数编码 agent 自带:Read——把文件内容作为 tool result 返回;Write——在 <em>filesystem</em> 里创建或修改文件;Bash——跑 shell 命令并返回输出;Search——按模式在代码库里找文件或文本。一个工具由三样东西定义:名字、描述、参数 schema。harness 每次请求都把这些定义发给模型,而模型挑工具与它产出其他一切的方式相同——写 <em>token</em>,在这里是一段带参数的结构化调用。模型从不亲自执行任何东西;harness 读调用、跑函数、送回结果。工具清单决定 agent 能做什么:能力强的模型配一套窄工具就是窄 agent——它会把一切都路由到手里仅有的工具上;agent 严重依赖 Bash 的原因即在于此:shell 是一个够得着系统大半的工具。要干净地给 agent 一种能力,就为它加一个工具;<em>MCP</em> 是从 harness 外部插接工具的标准。工具定义每次请求都占 <em>context</em>,所以大工具集在任何调用发生前就有固定开销——而许多描述相近的工具,会让模型更难挑中对的那个。

**Usage**

"Can the agent query staging directly?"  
「agent 能直接查 staging 吗?」

"Add a `psql` tool to the harness, scoped read-only on staging. Without a tool for it, the agent's blind to anything outside the filesystem."  
「给 harness 加一个 psql 工具,限定 staging 只读。没有对应的工具,agent 对文件系统之外的一切都是瞎的。」

