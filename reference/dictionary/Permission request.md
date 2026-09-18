# Permission request · 权限请求

[原文 ↗](https://github.com/mattpocock/dictionary-of-ai-coding/blob/main/dictionary/Permission%20request.md)

<em>Harness</em> 在执行一个未预批准的 <em>tool call</em> 之前拿给你看的东西。<em>Model</em> 产出调用;harness 不立刻执行,而是停下询问:批准就跑;拒绝就把拒绝作为 <em>tool result</em> 回报给模型。这是 harness 把人放进 <em>loop</em>、管住危险与敏感动作的机制。

生命周期:模型产出调用;harness 对照 <em>permission mode</em> 与已保存的批准检查;预批准的立刻执行,否则停下把请求亮给你;你可以批一次、批到本 <em>session</em> 结束、或拒绝;harness 执行调用,或把拒绝当 tool result 送回。拒绝本身就是转向:模型像读其他 tool result 一样读拒绝并作出反应——换一种路子,或问你想要什么。多数 harness 允许在拒绝时附一句话,请求于是变成转向点:「别这样,改用迁移脚本」恰好落在模型决定下一步的时刻。代价是每次请求都是对你的同步等待:agent 原地阻塞到你应答——盯着看时无所谓,不在时就成问题;不断触发请求的 agent 没法放着 <em>AFK</em> 干活。Permission mode 是那个旋钮:哪些调用直接放行、哪些先问;理想状态下再配一个 <em>sandbox</em>,让放行的集合可以放心放宽。

**Usage**

"It's been blocked on a permission request for ten minutes — I was in a meeting."  
「它卡在一个权限请求上十分钟了——我刚才在开会。」

"That's the cost of human-in-the-loop. Pre-approve the safe tools so the request only fires on the actually-risky calls."  
「这就是 human-in-the-loop 的成本。把安全的工具预批掉,让请求只在真正危险的调用上响起。」

