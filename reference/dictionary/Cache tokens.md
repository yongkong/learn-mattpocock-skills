# Cache tokens · 缓存词元

[原文 ↗](https://github.com/mattpocock/dictionary-of-ai-coding/blob/main/dictionary/Cache%20tokens.md)

<em>Model provider</em> 已经从上一次 <em>model provider request</em> 缓存下来的 <em>input tokens</em>,不必重新处理。连续请求共享前缀时,provider 经 <em>prefix cache</em> 复用成果,把缓存住的部分按远低于全价的费率结算——这是让长 <em>session</em> 付得起的那根杠杆,没有它,每个 <em>turn</em> 都要为整段历史重新付费。

之所以要紧,在于 session 的计费方式:<em>model</em> <em>stateless</em>,每次请求把整场对话——system prompt、每条消息、每个 <em>tool result</em>——当 input tokens 重发;到第 50 个 turn,每个请求背着五十个 turn 的历史,而且本来要每次都按全价付。缓存改写了这笔账:provider 在完全一致的前缀里处理过的 token,按 cache tokens 结算,常常只有输入价的十分之一或更低;长 session 里,你发出的大多数内容都是 cache tokens,账单才保持体面。举例:请求发 AB,无缓存,AB 全价;发 ABC,AB 命中缓存,C 全价;发 ABCD,ABC 命中,D 全价;发 AXCD——B 被改成了 X——只有 A 命中,XCD 全价。缓存的脆弱点很具体:它匹配的是严格前缀,对话前部任何变动——<em>harness</em> 调整内容顺序、时间戳更新、文件的表示变了——从那里开始缓存失手,其后全部按全价。缓存也在闲置几分钟后过期,久别重逢的 session 要把历史重新付一遍。成本无缘无故跳高时,去用量报告里对比 cache tokens 与 input tokens——缓存失效最先在那里现形。

**Usage**

"Cost on long sessions is brutal — eight bucks for a refactor."  
「长 session 的成本太狠了——一次重构八美元。」

"Check the cache tokens. If the harness is reordering the system prompt or files between turns, the prefix breaks and you re-pay full input rate every request."  
「去看看 cache tokens。要是 harness 在 turn 之间重排 system prompt 或文件,前缀就断了,每个请求都得重付全价输入。」

