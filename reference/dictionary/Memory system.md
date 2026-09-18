# Memory system · 记忆系统

[原文 ↗](https://github.com/mattpocock/dictionary-of-ai-coding/blob/main/dictionary/Memory%20system.md)

试图让 <em>agent</em> 跨 <em>session</em> <em>stateful</em> 的机制:会话进行中把信息持久化进 <em>environment</em>,未来会话开始时重载进 <em>context window</em>——于是即使你 <em>clear</em> 了会话,连续性仍在。

记忆系统有两半。写路径:会话期间,agent 把学到的东西——你说过的偏好、项目的一个事实——记成环境里的文件。读路径:会话开始时,<em>harness</em> 把这些文件、或它们的索引,装回 context window。许多 harness 自带记忆系统(Claude Code 的 <code>/memory</code> 是一个),你也可以自己搭:一个笔记目录,加一条「记得查它」的 <em>AGENTS.md</em> 指令。

凡常驻加载的内容有的权衡,这里都有:记忆会累积,所以多数系统只加载一行式索引,正文留在 <em>context pointer</em> 后面,不整体内联。记忆还是 <em>secondary source</em>,会漂移:三月记下的事实,到六月照样被信心十足地加载,哪怕项目早走了很远。记忆系统需要修剪,和 AGENTS.md 一个道理。

**Usage**

"I keep having to re-tell it I'm on Postgres, not MySQL."  
「我一遍遍重说:我用的是 Postgres,不是 MySQL。」

"Wire up a memory system — write what it learns to the filesystem on the first turn, reload it at session start. The model itself is stateless; the memory layer fakes continuity."  
「接一个记忆系统——第一个 turn 就把它学到的东西写进 filesystem,会话开始时重载。model 本身 stateless,连续性是记忆这层装出来的。」
