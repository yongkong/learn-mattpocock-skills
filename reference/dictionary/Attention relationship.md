# Attention relationship · 注意力关系

[原文 ↗](https://github.com/mattpocock/dictionary-of-ai-coding/blob/main/dictionary/Attention%20relationship.md)

预测每个 <em>token</em> 时,<em>model</em> 会把 <em>context</em> 里的其他每个 token 都纳入考量——有的权重很重,有的几乎为零。两个 token 之间的配对就是一条注意力关系:有意义的配对(「her」与「Sarah」;一处 <code>getUser()</code> 调用与它那行 <code>function getUser</code> 定义)互相影响的强度,远超无关的配对。N 个 token 的 context,配对量级是 N²。

模型的「理解」就住在这种配对里:它解对一个代词,是因为「her」与「Sarah」之间的关系强;它用对参数调用函数,是调用点与早前读过的定义之间的关系在干活。这一切都不是查表——每次 <em>model provider request</em>、对每一对,都是现场重算。

N² 这个数值得细品,它长得比直觉快:1,000 token 约一百万对;10,000 token 约一亿对;100,000 token 约一百亿对。而且每对还不止算一次——模型有多个注意力头(前沿模型的确切数字未公开,五十到一百是合理猜测),每个头都对每条关系算出自己的版本。上表里的每一对,都要乘以头数。

对任何给定任务,真正要紧的关系只是少数:你的指令与它管辖的代码之间那一对,是关键 handful 之一,池子里其余几乎全是噪声。而两者增速不同:要紧的关系数大致恒定,总池子却随 context 平方增长。1,000 token 时,你在乎的那对是百万分之一;100,000 token 时,是百亿分之一。这就是 <em>attention budget</em> 底下的算术;<em>attention degradation</em>,就是要紧的关系分到的份额变得太薄时的体感。

**Usage**

"It keeps confusing the two `user` symbols across the diff — sounds like we're in the dumb zone."  
「它老把 diff 里两个 user 符号搞混——听着像进 dumb zone 了。」

"Yeah, the attention relationship between each call site and its declaration is fighting the other one — same token shape, different bindings. Rename one and the pairings sharpen."  
「对,每个调用点和它声明之间的注意力关系,正在和另一个打架——token 形状相同,绑定不同。给其中一个改名,配对就清晰了。」
