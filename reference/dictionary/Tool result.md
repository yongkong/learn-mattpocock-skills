# Tool result · 工具结果

[原文 ↗](https://github.com/mattpocock/dictionary-of-ai-coding/blob/main/dictionary/Tool%20result.md)

<em>Harness</em> 执行 <em>tool call</em> 后送回的东西——文件内容、命令输出、或错误。<em>Agent</em> 看见 <em>environment</em> 的唯一途径。它在<em>下一次</em> <em>model provider request</em> 里回到 <em>model</em> 手中,由模型决定怎么用。Tool call 与 tool result 是同一次交换的两端,都发生在同一个 <em>turn</em> 之内。

生命周期:harness 执行调用(跑命令、读文件);捕获产物(输出、内容或错误);把它作为消息追加进 <em>context</em>;在下次请求里把整个 context 送给 provider;模型读到结果,决定再一次 tool call 还是给最终答案。结果在 <em>session</em> 其余时间里一直留在 context 中:编码 session 的 context 大头通常就是 tool result——每次读文件、每轮测试、每次搜索都完整落进来,在失去用处之后很久还继续占着 <em>token</em>;几份大结果——冗长的测试日志、整个读入的生成文件——把 session 推向 <em>context window</em> 边缘的速度,比对话本身快得多。又因为结果是模型看见的一切,模型无从核查结果背后的环境:输出被截断、命令静默失败、harness 用错误顶替了内容——模型都只能就着拿到的推理。当 agent 对你系统的图景不对时,先查 tool result:对话记录的某处,有一条结果与你确知的事实不符。

**Usage**

"It's reasoning about the file like it's empty."  
「它把那个文件当成空的来推理。」

"The tool result came back as a permission denial, not the contents. The model only saw the error string — it has no other way to see the file."  
「送回来的是权限拒绝,不是文件内容。模型只看见了错误字符串——它没有别的办法看见那个文件。」

