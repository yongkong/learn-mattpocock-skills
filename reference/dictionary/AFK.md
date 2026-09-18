# AFK · 挂机

[原文 ↗](https://github.com/mattpocock/dictionary-of-ai-coding/blob/main/dictionary/AFK.md)

Away from keyboard,离开键盘。一种工作模式:你启动 <em>session</em> 然后走开,让 <em>agent</em> 无人值守地跑。AI 编码的吞吐倍增器——多个 AFK 会话并行,你去睡觉、吃饭、干别的。通常需要宽放的 <em>permission mode</em> 加 <em>sandbox</em> 才安全。

你不在场时,agent 处理含糊的方式就变了:盯着看时,含糊的决定会浮成一个提问,你来答;你一走开,agent 自己挑个默认值继续跑,后面每个决定都叠在那个猜测上。标志性的失败场景:回来看到几个小时干净利落的成品——建立在头十分钟一个错误决断上的成品。活不糙——它自洽,只是对着错的事情自洽。

跑的过程中你给不了输入,那就在跑之前和跑之后给。之前:把含糊提前消解——一轮 <em>grilling</em>、一份写好的 <em>spec</em>——让 agent 没那么多空白要独自填补。之中:<em>automated check</em> 与 <em>automated review</em> 顶替你没给的注意力,机械可查的让它快速失败。之后:收尾落在可评审的东西上——一个 PR,而不是已经 merge 的改动。AFK 不取消 <em>human review</em>,它把全部评审推迟到结尾——所以送抵结尾的东西必须值得评审。这也是 <em>AX</em> 在 AFK 运行里最要紧的原因:没人看着,环境是 agent 唯一得到的支撑。

避免叫「后台代理(background agent)」——那把重心放在机器(「在后台跑」),而不是人的模式(「人走开了」)。AFK 点名的正是那个要紧的事实:用户没在看。

**Usage**

"I'm running this AFK — three sandboxed agents on the refactor, reviewing the PRs in the morning."  
「这个我挂机跑——三个沙箱 agent 做重构,早上起来评审 PR。」

"Bypass permissions?"  
「开着 bypass permissions?」

"Yeah, read-only filesystem, no network."  
「对,只读 filesystem,断网络。」
