# Output tokens · 输出词元

[原文 ↗](https://github.com/mattpocock/dictionary-of-ai-coding/blob/main/dictionary/Output%20tokens.md)

<em>Model</em> 生成回来的 <em>token</em>。计费单价高于 <em>input tokens</em>——常见约为五倍——因为产出的计算代价更高。

模型写出的一切都算:你读到的行文、它吐出的代码、每一次 <em>tool call</em>,以及回答前的 extended thinking。最后这项最出人意料——推理 token 按 output 计费,哪怕 <em>harness</em> 常常根本不给你看,而调高 <em>effort</em> 花的正是它们。Output tokens 还决定 <em>session</em> 的节奏:输入读得快,输出却要一个 token 一个 token 地生成——一个 <em>turn</em> 让你觉得慢,几乎总是输出正在被写,而不是输入正在被读;等得久,通常意味着长答案在路上。

**Usage**

"The refactor session is burning through credit even though the inputs are small."  
「这次重构 session 的额度烧得飞快,可输入明明不大。」

"Agent's rewriting whole files instead of patching. Output tokens cost roughly five times the input rate — get it emitting edits and the bill drops."  
「agent 在整文件重写,不是打补丁。output tokens 单价约是输入的五倍——让它改成发增量编辑,账单就下来了。」

