# Filesystem · 文件系统

[原文 ↗](https://github.com/mattpocock/dictionary-of-ai-coding/blob/main/dictionary/Filesystem.md)

<em>Agent</em> 读、写、并在其中执行的一棵文件与目录树——编码类 agent 的默认 <em>environment</em>。<em>AGENTS.md</em>、<em>skill</em>、源代码、构建脚本、<em>tool</em> 配置都住在文件系统里。<em>Harness</em>「在你的项目里启动」,就是让 agent 指向一个文件系统。

Agent 只经 <em>tool call</em> 触碰它:读文件、写文件、跑 shell 命令。磁盘上没有任何东西进入 <em>context window</em>,直到某次 tool call 把它加载进来——正因如此,agent 才能在远大于窗口的仓库里干活:文件系统装着一切,context 只装当前任务读过的部分。有些 harness 默认把当前目录的文件名(不是内容,只是目录树)放进 context window,充当 <em>context pointer</em>:agent 看见什么存在,再去读需要的文件。文件系统还与你共享:agent 编辑的文件,就是你在编辑器里打开、在 git 里 diff 的同一批——文件系统是共同的工作场,你在其中审阅 agent 做了什么。

**Usage**

"Why isn't it picking up my AGENTS.md?"  
「它为什么不理我的 AGENTS.md?」

"It's running against a different filesystem — the sandbox mounted the parent dir, not the project root. Repoint the harness."  
「它挂的是另一棵文件系统——sandbox 挂载的是上级目录,不是项目根。把 harness 重新指过去。」

