# AGENTS.md · AGENTS.md 文件

[原文 ↗](https://github.com/mattpocock/dictionary-of-ai-coding/blob/main/dictionary/AGENTS.md.md)

<em>environment</em> 里的一份文件,<em>harness</em> 在每个 <em>session</em> 开始时把它装进 <em>context window</em>——项目写给 <em>agent</em> 的常设简报。跨 harness 的约定;某些 harness 另有自己的变体(Claude Code 的是 CLAUDE.md)。

因为它自动加载,它是「别在每个会话里重复自己」的一条路。<em>model</em> <em>stateless</em>——这个会话里给的纠正,下个会话就没了,于是每个新会话你都得重讲一遍:项目用 pnpm、测试要带某个旗标、那个目录是生成的别碰。同一件事你纠正到第二遍,这条纠正就是 AGENTS.md 的候选行。

合适的内容,是 agent 从代码里推不出来的东西:构建与测试命令、代码库自身看不出来的约定、硬性禁令(「永远别改生成的 client」)。要短、要声明式——它是简报,不是文档。

代价是里面的每一样东西都常驻加载:指令会越攒越多,而多数与眼前任务无关;长长的 AGENTS.md 既烧 token,又稀释自己——context 里指令越多,模型对任何一条的遵循越不可靠。

避免把本该 <em>progressive disclosure</em> 的内容塞进 AGENTS.md——里面的每一行,每个 <em>turn</em>、每个会话都付 <em>token</em>,不管这个会话用不用得上。风格指南可以放进一个 <em>skill</em> 或留一枚 <em>context pointer</em>;AGENTS.md 留给处处适用的那几行。

**Usage**

"Why is every session starting with 4k tokens already burned?"  
「怎么每个会话一开场就先烧掉 4k token?」

"Check AGENTS.md — someone pasted the entire style guide in there instead of putting it behind a skill."  
「去查 AGENTS.md——有人把整本风格指南贴了进去,而不是收进一个 skill 后面。」
