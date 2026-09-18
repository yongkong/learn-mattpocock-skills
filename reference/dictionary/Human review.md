# Human review · 人工评审

[原文 ↗](https://github.com/mattpocock/dictionary-of-ai-coding/blob/main/dictionary/Human%20review.md)

你——用户——读 <em>agent</em> 产出的代码,并对它形成判断。读 diff、读改动的文件,算;读 agent <em>对自己所做之事的描述</em>,不算——叙述不是产物。描述是 <em>secondary source</em>,还出自被评审的一方;diff 才是 <em>primary source</em>,评审的意思就是读它。

Agent 抬高了代码的产量,评审于是成了瓶颈。一个有用的思路是分层:<em>automated check</em> 接机械性失败,<em>automated review</em> 接可描述的问题,人工评审只留给非你不可的判断——这个改动是不是对的改动、这个路子合不合这个代码库、这东西究竟该不该存在。

评审也越早越便宜:动工前读一份计划、半路读一个小 diff,几分钟;AFK 跑完后考古一条成品分支,就久得多。检查点摆在哪,是 <em>human-in-the-loop</em> 的决策,不是事后补记。

避免单说「code review」——在人工与自动之间含糊。

**Usage**

"I human-reviewed the AFK output."  
「AFK 的产出我人工评审过了。」

"You read the diff or just the summary?"  
「你读的是 diff,还是摘要?」

"Diff. The summary said it deleted dead code — turned out the function was called from a generated file."  
「diff。摘要说它删了段死代码——结果那个函数是被一个生成文件调用的。」
