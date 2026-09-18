# Parameters · 参数

[原文 ↗](https://github.com/mattpocock/dictionary-of-ai-coding/blob/main/dictionary/Parameters.md)

<em>Model</em> 内部的数字——常有数十亿个——在 <em>training</em> 期间调定。模型「知道」的一切都存于其中。训练写定它们,<em>inference</em> 原样使用,又称 weights(权重)。机制上,参数就是把输入变成输出的东西:<em>next-token prediction</em> 是一场巨型计算——<em>context window</em> 里的 token 进来,经参数层层相乘,输出对下一个 token 的预测。模型内部没有事实数据库,也没有可供查询的代码表——只有这些数字,它们的排布方式恰好让计算倾向于产出有用的结果。模型能背诵的训练期事实(比如某个标准库 API)是 <em>parametric knowledge</em>:存在参数里,而不是从哪里检索来的。

值得内化的细节是:参数在训练后冻结。<em>session</em> 里你做的任何事都改不动它——你的纠正、你给它看的代码库、它从错误里「学到」的东西,全都一样;每个 session 跑的都是同一组数字。这正是模型 stateless 的原因、内置知识止步于 <em>knowledge cutoff</em> 的原因、也是一切项目相关信息必须经由 <em>context</em> 进入的原因。参数唯一的改变方式是再训练——而那产出的实际上是另一个模型。

**Usage**

"Can we fine-tune it on our codebase?"  
「能用我们的代码库微调它吗?」

"That'd update the parameters — different model afterwards. For one project it's almost always cheaper to load the codebase as context than to retrain."  
「那会改写参数——之后就是另一个模型了。为单个项目,把代码库当 context 加载几乎总是比重训便宜。」

