# Parametric knowledge · 参数化知识

[原文 ↗](https://github.com/mattpocock/dictionary-of-ai-coding/blob/main/dictionary/Parametric%20knowledge.md)

<em>Model</em> 从 <em>training</em> 里「知道」的东西,存在 <em>parameters</em> 中,训练时就冻结——模型看不见自己的参数,更改不动它们。细节在挤压中流失:数十亿事实塞进固定数量的参数,冷门的那部分变得模糊。它让模型对常见话题口若悬河,对冷门话题凭空编造。是 <em>contextual knowledge</em> 的对照面。

参数化知识不是以事实形式存放的。训练从未给模型一个可查询的数据库;它只是调参数,直到模型擅长预测文本——而一个擅长预测某话题文本的模型,表现得就像懂这个话题。知识可靠度跟它在训练数据里的出现频率同步:出现百万次的话题被准确复现,只出现过几次的话题,模型按「类似话题长什么样」去猜。复现与猜测对模型是同一个过程,它分不清自己正在做哪个——编造的答案与正确的答案一样流利。<em>Hallucination</em> 就是模型猜错了。

参数化知识还会过时。参数止步于 <em>knowledge cutoff</em>,那之后发布或改名的库在参数里不存在,改过版的 API 只以旧形态被记得。

两类缺口——太冷门与太新——药方相同:知识加不进参数,只能作为 contextual knowledge 供应。

**Usage**

"It writes flawless React but invents methods on our internal SDK."  
「它 React 写得滴水不漏,却给我们内部 SDK 编方法。」

"React is dense in the parametric knowledge — millions of training examples. Your SDK isn't, so the model fills in plausible-looking shapes. Load the SDK docs into context."  
「React 在参数化知识里密度极高——数百万条训练样本。你的 SDK 没有,模型就填进看起来像那么回事的形状。把 SDK 文档加载进 context。」
