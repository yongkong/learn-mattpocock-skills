# MCP · 模型上下文协议

[原文 ↗](https://github.com/mattpocock/dictionary-of-ai-coding/blob/main/dictionary/MCP.md)

Model Context Protocol。把外部工具服务器插进 <em>harness</em> 的协议——<em>agent</em> 获得 harness 自带之外 <em>tool</em> 的途径。agent 从不「调用 MCP」;它调用的是一个工具,只不过 harness 恰好从某个 MCP server 拿到了这个工具。协议也暴露 resources(只读数据)与 prompts(可复用模板),但供工具是主要用途。

协议解的是集成问题:没有标准,每个 harness 都得各写一份 Linear 集成、Slack 集成、数据库集成——各自编写与维护。有了 MCP,集成只写一次(做成一个 server),任何兼容 MCP 的 harness 都能用:harness 连上 server,server 通告自己提供哪些工具,这些工具便与内置工具并肩可用。代价记在 <em>context</em> 上:server 通告的每个工具都带着定义——名字、描述、参数 schema——而 <em>model</em> 只能调用它认识的工具。朴素做法是把全部定义预载进 <em>context window</em>:装几个大而全的 server,<em>session</em> 一开口就先背几千 <em>token</em> 的工具 schema,把 <em>attention budget</em> 花在任务永远不会用的工具上。如今许多 harness 用 tool search 缓解:context 里只放可用工具的 <em>context pointer</em>——agent 按名字或用途搜工具,需要时才加载定义。harness 没有这功能的话,预载成本照付,那就只给项目真正需要的服务器。

**Usage**

"The agent needs to read tickets from Linear."  
「agent 需要读 Linear 的工单。」

"Configure the harness to use the Linear MCP server — it exposes the Linear API as tools the agent can call. Saves you writing custom tool wrappers."  
「给 harness 配上 Linear 的 MCP server——它把 Linear API 暴露成 agent 可调用的工具。省得你自己写工具包装。」

