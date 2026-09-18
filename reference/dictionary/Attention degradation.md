# Attention degradation · 注意力衰退

[原文 ↗](https://github.com/mattpocock/dictionary-of-ai-coding/blob/main/dictionary/Attention%20degradation.md)

<em>Session</em> 越长,每个 <em>token</em> 的 <em>attention budget</em> 要摊给越多的竞争者:任何一条要紧的 <em>attention relationship</em> 上的信号变薄,无关 <em>context</em> 的噪声涌进来。同一个 <em>model</em>,同一份 <em>parameters</em>——只是同一盘子里要喂的嘴多了。smart zone / dumb zone 效应的成因。

表现为模型在会话中途变差:遵守了一小时的约束开始松动;你告诉过它的事,它重新问;写出的代码无视它早先读过的文件。模型身上什么都没变——唯一的变量,是它此刻要照看的 context 变多了。

它是渐进的,这正是从会话内部难以察觉的原因:没有报错,没有阈值;每个 <em>turn</em> 只比上一个差一点点,等你明显看出滑坡,已经在 dumb zone 里待了有一阵。

恢复靠减 context,不靠加。重贴被无视的指令,只是往拥挤的窗口里再添一个竞争者,仅有短暂效果。真正管用的:<em>clear</em> 之后只重载任务需要的,或 <em>compact</em>,或 <em>handoff</em> 给新会话。把「指令遵循变差」当作 context 长度的信号,而不是模型的信号。

**Usage**

"It's deep in the dumb zone — inventing generics that aren't in the type file."  
「它 deep 进 dumb zone 了——编造类型文件里不存在的泛型。」

"Attention degradation. The type definitions are still in context, but the signal on them is buried under everything we've added since. Clear and reload."  
「注意力衰退。类型定义还在 context 里,但它们上面的信号,被我们后来加的一切埋住了。Clear 然后重载。」
