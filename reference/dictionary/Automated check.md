# Automated check · 自动化检查

[原文 ↗](https://github.com/mattpocock/dictionary-of-ai-coding/blob/main/dictionary/Automated%20check.md)

跑在 <em>environment</em> 里的确定性验证:测试、类型检查、lint、构建、pre-commit 钩子。只判通过/失败,不做评判。<em>Agent</em> 不必惊动任何人就能据此自我纠正的信号。flaky 的测试是坏掉的检查,不是「没有检查」——自动化检查在设计上就是确定的。

自我纠正是一个循环:agent 改动,用一次 <em>tool call</em> 跑检查,失败输出落进它的 <em>context window</em>——带文件带行号的类型错误、带期望值与实际值的断言失败。这些足够它修好问题再跑一遍,如此循环直到通过,全程无人在环。确定性是这个循环可信的原因:同样的代码永远得到同样的判决,通过才有含义。flaky 的检查毒化一切——agent 会去「修」本来没毛病的代码,或在真失败上反复重试撞运气。

这就是为什么好的检查在代码库的 <em>AX</em> 里占大头:有严格类型、快速测试、linter 的仓库里,agent 在你看见之前就自己接住了大部分错误;三样皆无的仓库里,agent 产出什么就交什么。差别在 <em>AFK</em> 运行里最大——跑动期间检查是唯一的验证。但检查只接得住它断言的东西:全绿的检查意味着「被断言的性质成立」,不意味着「代码是对的」。判断形状的缺口,是 <em>automated review</em> 与 <em>human review</em> 的地盘。

避免说「反馈回路 / 背压」——两者都把检查和评审混为一谈。避免只说「测试」——测试是自动化检查,但自动化检查不全是测试。

**Usage**

"The agent keeps shipping broken code in the AFK runs."  
「AFK 运行里,agent 老是交付跑不起来的代码。」

"What automated checks are wired into the sandbox?"  
「沙箱里接了哪些自动化检查?」

"Just the unit tests."  
「只有单元测试。」

"Add typecheck and lint — it'll self-correct from those before the PR ever lands."  
「加上 typecheck 和 lint——PR 落地之前它就能靠它们自我纠正了。」
