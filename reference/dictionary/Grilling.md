# Grilling · 追问式访谈

[原文 ↗](https://github.com/mattpocock/dictionary-of-ai-coding/blob/main/dictionary/Grilling.md)

与 <em>agent</em> 一起孕育 <em>design concept</em> 的技法:agent 以苏格拉底式访谈盘问你,一次只问一个决定,并为每个决定附上推荐答案。它拖住「直奔成品计划」的冲动——概念未稳之前,不写任何 <em>handoff artifact</em>。

技法存在的原因:agent 会无声地填空。拿着两行提示词去写 <em>spec</em>,agent 不会停在「你还没决定的事」上——它挑好默认值直接写进去。成品看着很完整,而猜测与选择难以区分,等你发现时已经很晚:在评审时,或者在做好的功能以你从未选过的方式处理某个边界情况时。Grilling 把这一切倒过来:不让它猜,让它问。

这是 <em>human-in-the-loop</em> 的技法:你的回答就是输入。当一个问题在对话里答不了——你得亲眼看到才行——切换到 <em>prototyping</em>。

**Usage**

"It went straight to writing the spec and got the cancellation logic wrong."  
「它直接动手写 spec,取消逻辑写错了。」

"Grill it first — make it ask you about partial cancels, refunds, and timing before it commits anything to the doc. Cheaper to resolve in conversation than in code."  
「先盘问它——在它往文档里落任何东西之前,让它问你部分取消、退款、时点这些事。对话里解决,比代码里便宜。」
