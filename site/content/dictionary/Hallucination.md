# Hallucination · 幻觉

[原文 ↗](https://github.com/mattpocock/dictionary-of-ai-coding/blob/main/dictionary/Hallucination.md)

自信满满的错误模型输出。分两种,成因与解法各不相同:

- **事实性(factuality)**——编造或搞错关于世界的事实:不存在的函数、错的 API 签名、假的引用。成因是 <em>parametric knowledge</em> 的缺口,常见于 <em>knowledge cutoff</em> 之后。解法:加载正确的 <em>contextual knowledge</em>。
- **忠实性(faithfulness)**——输出偏离已加载的上下文知识、你的指令、或它自己先前的推理。成因是 <em>attention degradation</em>,在 <em>dumb zone</em> 里加重。解法:<em>clear</em> 或 <em>compact</em>。

<em>Next-token prediction</em> 不管底层事实真假,产出一律流畅——模型没有任何「我不知道」的内部信号,编造的方法与正确的方法用同一种笃定的语气到达。幻觉代码在构造上就是「似真的」:它长成「这个 API 假如存在该有的样子」——这正是它能滑过走马观花的 review、直到跑起来才露馅的原因。

分清是哪种,因为一种的解法会让另一种更糟:事实性缺的是知识,解法是加 context——文档、类型定义、那个文件;忠实性是知识在场但输了注意力竞争,解法是减 context。把忠实性误诊成事实性,你会再贴一堆文档——context 变大,漂移更凶。agent 出错时,先确认正确的信息是否本来就在 context 里,再决定面对的是哪种问题。

避免把「hallucination」当「错了」的同义词——不指明是哪种,这个词就没有诊断价值。

**Usage**

"It hallucinated a `parseAsync` method on the schema."  
「它给 schema 幻觉出一个 parseAsync 方法。」

"Factuality or faithfulness?"  
「事实性还是忠实性?」

"The method exists in the docs I pasted — it just stopped reading them after turn forty."  
「这方法在我贴的文档里有——它只是四十 turn 之后就不读了。」

"Faithfulness then. Compact and reload, don't bother adding more docs."  
「那就是忠实性。Compact 然后重载,别费劲再贴文档了。」
