# Input tokens · 输入词元

[原文 ↗](https://github.com/mattpocock/dictionary-of-ai-coding/blob/main/dictionary/Input%20tokens.md)

每次 <em>model provider request</em> 里 <em>harness</em> 发出去的 <em>token</em>——system prompt、对话历史、<em>tool result</em>,<em>model</em> 动笔之前读到的一切。计费单价低于 <em>output tokens</em>:处理输入比生成输出便宜。

做 AI 编码时,账单的大头是 input tokens:<em>model</em> <em>stateless</em>,每个 <em>turn</em> 都把整个 <em>session</em> 当输入重发一遍——你的第一条消息、每一条响应、其后每个 tool result;第 50 个 turn 的输入里,装着前 49 个 turn。单次请求可能只产出几百个 output tokens,却重发着十万 input tokens 的累积历史。<em>prefix cache</em> 能压这个成本:与之前请求完全一致的历史,按便宜的 <em>cache tokens</em> 结算而非全价输入。输入成本仍然咬手时,解法是缩小重发的东西——任务之间 <em>clearing</em> 或 <em>compacting</em>。

**Usage**

"Bill's high but the agent's barely writing anything."  
「账单很高,可 agent 几乎没写什么呀。」

"It's the input tokens — every turn re-sends the whole session. Without the prefix cache you re-pay for the history each request."  
「是 input tokens——每个 turn 都重发整个 session。没有 prefix cache 的话,历史每请求都要重新付一遍钱。」

