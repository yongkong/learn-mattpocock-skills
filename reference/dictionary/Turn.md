# Turn · 轮次

[原文 ↗](https://github.com/mattpocock/dictionary-of-ai-coding/blob/main/dictionary/Turn.md)

一条用户消息,加上 agent 为响应它所做的一切,直到交还控制权。包含一次或多次请求——agent 调用工具时是很多次。澄清性提问结束本轮,你的回复开启下一轮。层级:Session > Turn > 模型供应商请求。

Turn 值得被命名,是因为它的长度由 agent 而非你决定:你只交出一条消息,agent 决定链多少个 tool call 才交还。一轮可以是一句回答,也可以是二十分钟的读码、改码、跑测试。同一性质的两面:长 turn 让 AFK 工作成为可能,长 turn 也是无人监督时出事的地方——等你拿回控制权,它可能已经漂离你的本意很远。Turn 也是转向的自然单位:轮内一切都在没有你的情况下发生,轮与轮之间的间隙才是你纠偏的地方。若总对 turn 的落点不满意,解法通常是要求更小的 turn——先出计划、一次一步——用自治换更频繁的纠偏间隙。

**Usage**

"One turn took two minutes?"  
「一轮花了两分钟?」

"It made fourteen tool calls inside that turn — each one is a separate model provider request. Latency stacks up before the agent finally yields back to you."  
「那一轮里它打了十四个 tool call——每个都是一次独立的请求。延迟层层叠加,agent 才把控制权交回来。」

