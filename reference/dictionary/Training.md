# Training · 训练

[原文 ↗](https://github.com/mattpocock/dictionary-of-ai-coding/blob/main/dictionary/Training.md)

给 <em>model</em> 写定 <em>parameters</em> 的过程:让它读海量文本,不断调整参数,把 <em>next-token prediction</em> 做得更好。一次性、昂贵的工序,由 <em>model provider</em> 完成。它涵盖 pre-training(主体工程)与 post-training(其后的精修,如指令遵循与安全);在本词典的层面上不必细分。

机制是大规模的重复:给模型看一段文本,让它预测下一个 <em>token</em>,把参数朝实际下一个 token 的方向轻推,在数万亿 token 上重复。没有任何东西以事实或规则的形式被存下来——模型「知道」的一切,都是预测能力变强的副产品,以 <em>parametric knowledge</em> 的形式压缩进参数。两个日常后果:训练止于某个时间点,所以模型有 <em>knowledge cutoff</em>——它没见过你上个月才升级的库版本;训练也不是你能做的事——模型不了解你的代码库、约定或内部 API 时,解法从来不是「教会模型」,而是把材料放进 <em>context</em>——你唯一能控制的输入。

**Usage**

"Can we get it to know our internal API?"  
「能让它懂我们的内部 API 吗?」

"Not via training — that's a months-long process by the model provider. Load the API docs into context instead, that's the lever you actually have."  
「靠训练做不到——那是 model provider 为期数月的工程。把 API 文档加载进 context,那才是你真正有的杠杆。」

