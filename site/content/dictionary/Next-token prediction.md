# Next-token prediction · 下一词元预测

[原文 ↗](https://github.com/mattpocock/dictionary-of-ai-coding/blob/main/dictionary/Next-token%20prediction.md)

<em>Model</em> 真正在做的事。给定 <em>context</em>,采样出下一个 <em>token</em>,接上去,再跑一遍。每一段输出——一句话、一次 <em>tool call</em>、一千行的文件——都是一个 token 一个 token 攒出来的。模型没有别的运行模式。每一步都一样:<em>context window</em> 里的 token 经过 <em>parameters</em>,为词表里的每个 token 产出一个概率——这个很可能接续,那个次之;从这组概率里采样出一个,接到后面,带着稍长的 context 再进入下一轮。

采样这一步,就是同一个提示词两次运行产出不同结果的原因:<em>non-determinism</em> 内建在机制里,不是叠在之上的 bug。握住这个机制,许多原本诡异的行为就说得通了:模型发出一个 token 之前从不检查它是否为真,只看它是否「像」——这是 <em>hallucination</em> 的根源;它边走边承诺,一句听起来自信的开场白就能把后面的答案带偏;而 <em>output tokens</em> 严格一次一个地产出,生成速度就为任何 <em>agent</em> 的干活速度设了下限。

**Usage**

"How does the agent 'decide' to call a tool?"  
「agent 是怎么『决定』调用工具的?」

"It doesn't — it's next-token prediction all the way down. The tool call is just a structured string the harness parses out of the output stream."  
「它没有决定——从头到尾都是 next-token prediction。tool call 只不过是 harness 从输出流里解析出来的一截结构化字符串。」

