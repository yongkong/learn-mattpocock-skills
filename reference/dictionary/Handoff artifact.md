# Handoff artifact · 交接物

[原文 ↗](https://github.com/mattpocock/dictionary-of-ai-coding/blob/main/dictionary/Handoff%20artifact.md) · [课件里的它:0003 · 实战(三站的「交接物」一览)](../lessons/0003-practicum.html)

用作 <em>handoff</em> 携带机制的文件:由一个 <em>session</em> 写进 <em>environment</em>,供另一个会话读取。<em>Spec</em>、<em>ticket</em>、计划文档,都是 handoff artifact。

写它的理由:<em>model</em> <em>stateless</em>,会话里的任何东西都熬不过 <em>clearing</em>。决定、约束、做到一半的计划——随承载它们的 <em>context</em> 一起消失;environment 是持久的。把要紧的状态写进文件,就是把它搬到下一个会话读得回来的地方。

交接物是 <em>secondary source</em>——是对会话工作的转述,不是工作本身。这让它小到足以给新会话做简报,也是它可能误导新会话的原因:它记下的是写作会话<em>相信的</em>,凡漏掉或写错的,读者无从察觉。要紧的断言,下一个会话应对照 <em>primary source</em>——代码、测试——核实,而不是照单继承。

好的交接物,是写给零 context 读者的:具体的文件路径,而不是「我们讨论过的那个文件」;决定了什么、为什么,免得下个会话重新翻案;做完了什么、还剩什么。给写作会话交代去向也有用:「为对这个工作一无所知的新会话写一份交接文档」。

另一条携带机制是 <em>compaction</em>,在内存里总结。交接物有两个优势:它躺在磁盘上,任何东西依赖它之前,你可以先读先改;它可复用——同一份 spec 能给五个并行会话做简报。

**Usage**

"How do I split this between the planning agent and the implementing one?"  
「规划 agent 和实现 agent 之间,这个活怎么分?」

"Have the planner write a handoff artifact — file paths, decisions, constraints. The implementer's session opens with a pointer to the artifact and works from it as its brief."  
「让规划 agent 写一份交接物——文件路径、决定、约束。实现 agent 的会话开场就带着指向交接物的指针,把它当任务简报来干活。」
