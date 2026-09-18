# Tool call · 工具调用

[原文 ↗](https://github.com/mattpocock/dictionary-of-ai-coding/blob/main/dictionary/Tool%20call.md)

<em>Model</em> 的输出,点名一个 <em>tool</em> 及其参数——只是结构化文本,自己什么也不做,要 <em>harness</em> 去读去执行。它在一次 <em>model provider request</em> 里产出。生命周期:模型从 <em>system prompt</em> 里的工具描述得知有哪些工具;发出调用——工具名加参数,通常是 JSON——然后停下;harness 解析调用,对照 <em>permission mode</em> 检查;允许就执行;把结果作为 <em>tool result</em> 放进下一次请求送回。

<em>Agent</em> 的一个 <em>turn</em>,通常就是这样多次往返串成的链。因为 tool call 与其他一切一样由 <em>next-token prediction</em> 生成,它能错的方式与任何模型输出一样:不存在的路径、命令没有的旗标、看似合理实则不对的参数。harness 执行的是「写出来的」,不是「想表达的」——路径打错一个字母不会优雅报错,而是改掉另一个文件。

**Usage**

"It said it ran the tests but the file timestamps haven't changed."  
「它说跑过了测试,可文件的时间戳根本没变。」

"Look at the transcript — did it actually emit a tool call, or just describe running them? The model produces the call, but if the harness didn't execute it, nothing happened."  
「看对话记录——它是真发出了 tool call,还是只描述了一下要跑?模型负责产出调用;harness 没执行,就什么都没发生。」

