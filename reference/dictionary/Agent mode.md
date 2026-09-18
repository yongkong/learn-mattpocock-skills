# Agent mode · 智能体模式

[原文 ↗](https://github.com/mattpocock/dictionary-of-ai-coding/blob/main/dictionary/Agent%20mode.md)

一个预设,规定 <em>agent</em> 在运行时如何行事——把 <em>permission mode</em> 与注入 <em>system prompt</em> 的行为指令打包在一起。例子:默认档在危险调用时先问;plan mode 挡下修改、把 agent 导向研究;accept-edits 自动批准改文件;bypass permissions(俗称 YOLO mode)全自动批准。可以在 <em>session</em> 中途切换。

「打包」是 mode 区别于裸权限设置的地方。Permission mode 只是一道理:决定哪些 <em>tool call</em> 放行。只有闸,得到的会是一个「想改但不许改」的 agent——它提出写入、被挡下、再换路子硬试。注入的指令去掉的是「想」:plan mode 不只挡修改,还告诉 agent 现在处于规划阶段,于是它去读、去问、去提方案,而不是顶着闸门较劲。闸门与缰绳指向同一个方向。实践中的用法是随信任变化切模式:同一个任务可以穿过好几档——路子未定时在 plan mode;头几笔精细修改在先问的默认档;agent 证明它理解了改动之后切 accept-edits;要在 <em>sandbox</em> 里 <em>AFK</em> 跑,切 bypass。切模式零成本:对话原样继续,只是换上新权限与新指令。要是你发现自己看都不看就批准每条提示,说明模式比你实际的信任更紧;要是你不断否掉修改,说明它比你的信任更松。厂商用词:Claude Code 管这叫 permission modes,Codex 管这叫 approval modes——都早于行为打包出现。

**Usage**

"It keeps editing files when I just want a plan."  
「我只想要个方案,它却不停地改文件。」

"Switch to plan mode — it'll block writes and stay in research."  
「切到 plan mode——写入会被挡下,它就待在研究里。」

"What about for the AFK run later?"  
「晚点那次 AFK 运行呢?」

"Bypass mode, but only inside the sandbox."  
「Bypass mode,但只在 sandbox 里。」

