# Model provider request · 模型供应商请求

[原文 ↗](https://github.com/mattpocock/dictionary-of-ai-coding/blob/main/dictionary/Model%20provider%20request.md)

<em>Harness</em> 到 <em>model provider</em> 的一次往返:harness 发去当前 <em>context</em>,provider 回来一个响应——一次 <em>tool call</em>,或最终答案。一条用户消息,只要 <em>agent</em> 调了 <em>tool</em>,就会裂变出许多次请求:每个 <em>tool result</em> 都触发下一次请求。

每次请求都全量携带:system prompt、迄今全部对话、每一个 tool result。<em>Model</em> <em>stateless</em>,provider 在两次请求之间什么都不保留——第 40 个请求重发第 39 个发过的一切,外加一条新的 tool result;<em>prefix cache</em> 的存在就是为了给这种重复打折。请求同时是计费单位:<em>input tokens</em>、<em>output tokens</em>、缓存折扣全按请求结算——所以一个看着无害的问题可能贵得惊人:成本不正比于你的消息,而正比于「请求数 × 每次携带的 context 大小」。请求也要与 <em>turn</em> 分清:turn 是与你的一次交互,而「修好这个失败的测试」这样一个 turn,会展开成一条请求链——跑测试、读测试文件、读源文件、改源码、再跑测试、最终答案——六次请求,每次都重发整个 context。纳闷 token 去哪了的时候,数请求,别数 turn。

**Usage**

"One question burned forty thousand tokens?"  
「一个问题烧掉了四万 token?」

"Look at the tool calls — twelve grep, eight read, four edits. Each tool result spawns another model provider request, and the whole session prefix re-sends every time."  
「看 tool call——十二次 grep、八次 read、四次 edit。每个 tool result 都催生一次新请求,而整个 session 前缀每次都原样重发。」

