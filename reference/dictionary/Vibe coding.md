# Vibe coding · 氛围编程

[原文 ↗](https://github.com/mattpocock/dictionary-of-ai-coding/blob/main/dictionary/Vibe%20coding.md)

不做 <em>human review</em>、照单全收 <em>agent</em> 代码的工作模式。Diff 被当作不透明物——要紧的只是程序跑起来行为对不对,里面是什么无关紧要。<em>Automated review</em> 与 <em>automated check</em> 可能照跑;氛围编程对两者都不置可否。

这个词出自 Andrej Karpathy,2025 年初提出:你「彻底交给感觉」,「忘掉代码的存在」——说出你想要什么,收下回来的东西,靠运行来评判。

氛围编程拿检视换速度:读 diff 通常是 agent 工作流里最慢的一步,丢掉它,主瓶颈就消失了。对失败很便宜的代码——<em>prototype</em>、一次性脚本、内部小工具——这是一笔合理交易。风险随代码的寿命与利害同步放大。

代价随后到账:氛围编程的改动越攒越多,成一个没人读过的代码库;而当初只检查过行为——凡是行为 surface 不出来的东西,全在无人看见的情况下上线了:写进日志的密钥、漏掉的边界情况、悄悄错掉的数据处理。第一个人来 debug 的那天,才是第一有人读代码的那天。人工评审一撤,还在跑的自动化验证——测试、类型、自动化评审——就是代码唯一通过的关卡。

避免把「vibe coding」当「低质量 AI 代码」的同义词——这个词命名的是<em>评审姿态</em>,不是产出的代码。

**Usage**

"Did you read what it changed in the auth flow?"  
「它对认证流程的改动你读过吗?」

"Vibe coded it — login still works, that's all I checked."  
「氛围编程来的——登录还能用,我只查了这个。」

"Read the diff before you push, vibing on auth is how secrets leak into logs."  
「push 之前把 diff 读了——认证环节凭感觉,密钥就是这么漏进日志的。」
