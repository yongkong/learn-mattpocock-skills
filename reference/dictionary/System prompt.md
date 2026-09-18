# System prompt · 系统提示词

[原文 ↗](https://github.com/mattpocock/dictionary-of-ai-coding/blob/main/dictionary/System%20prompt.md)

harness 在每次请求前附带注入的指令——agent 的常设简报:它是谁、如何行为、能调用哪些工具、遵循什么约定。通常整个 session 保持稳定。

System prompt 由 harness 厂商编写而不是你,编码类 harness 里它很大——常达数万 token 的行为规则、工具描述与边界处理,每个 turn 都按 input tokens 计费。你自己的常设指令搭着它走:AGENTS.md 之类文件在会话开始时与 system prompt 一同加载,模型先读完厂商简报和你的简报,才看到你的消息。因为它每次请求都相同,它构成 prefix cache 的起点——这也是 harness 情愿整会话保持它固定不变的原因之一。模型被训练为优先服从 system prompt:当 agent 固执于你从没要求的约定、或输出格式怎么掰都掰不动时,通常是它在执行 system prompt,而你的消息吵输了。有些 harness 允许你查看甚至改写它。

**Usage**

"Two harnesses, same model, totally different behavior on the same prompt."  
「两个 harness、同一个模型,同一提示词行为完全不同。」

"Different system prompts. One's tuned for terse code edits, the other for explaining — that's where the divergence lives, before your message even arrives."  
「system prompt 不同。一个调教成简洁改码,另一个偏向讲解——分歧在你消息到达之前就存在了。」

