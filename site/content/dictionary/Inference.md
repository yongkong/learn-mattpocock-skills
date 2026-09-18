# Inference · 推理

[原文 ↗](https://github.com/mattpocock/dictionary-of-ai-coding/blob/main/dictionary/Inference.md)

运行训练好的 <em>model</em> 以生成输出——每次 <em>model provider request</em> 发生的事。<em>parameters</em> 保持冻结,模型只是对给到的 <em>context</em> 做 <em>next-token prediction</em>。相对 <em>training</em> 便宜,但按 <em>token</em> 计费,是用模型的支配性成本。模型的一生因此分成两段:training——发布前一次,从训练语料产出参数,参数处于「被写入」状态;inference——每次有人用模型,让冻结的参数跑过你的 context 生成 token,参数只读。

推理阶段你做的任何事都不会写回参数——这就是你今天纠正过、明天照样犯的机制根源:你仔细解释过修法之后,下个 <em>session</em> 它再犯同样的错,不是无视你,而是这场交换在结构上就学不进去。模型 <em>stateless</em>,连续性必须来自外部——<em>context window</em> 或 <em>memory system</em>。这个机制同时解释了账单:每次请求都是模型跑过整个 context,成本随 <em>input tokens</em> 与 <em>output tokens</em> 增长,agent 打几十个 <em>tool call</em> 就是每轮往返各付一次推理钱。所以 context 的大小不只是质量问题,也是成本问题。

**Usage**

"Why does the bill scale with usage instead of being a flat license?"  
「为什么账单随用量涨,而不是一笔固定的授权费?」

"You're paying for inference — every model provider request runs the model on the provider's hardware. Training already happened, but inference costs accrue per request, and a single turn can expand into many requests when tools are called."  
「你付的是推理钱——每次 model provider request 都在供应商硬件上跑一遍模型。训练已经发生过了,推理则按请求累加;调了工具,一个 turn 就会膨胀成很多次请求。」

