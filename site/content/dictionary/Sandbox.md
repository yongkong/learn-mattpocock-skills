# Sandbox · 沙箱

[原文 ↗](https://github.com/mattpocock/dictionary-of-ai-coding/blob/main/dictionary/Sandbox.md)

<em>Agent</em> 在其中运行的隔离 <em>environment</em>——容器、VM、用后即弃的 <em>filesystem</em>、或受限权限的 shell。它限制 agent 动作的爆炸半径:就算 agent 跑了破坏性命令、或抓了恶意的东西,伤害也被圈住。让 <em>AFK</em> 变得现实的安全底座。

Sandbox 与 <em>permission mode</em> 从两端解同一个问题:权限在动作运行前先问;沙箱限制动作一旦运行能碰到什么。权限需要你在 <em>loop</em> 里——每条提示都是打扰,问个不停的 session 几乎谈不上自治。沙箱花的是基础设施,不是注意力:隔离越强,要问的问题越少。隔离分级:受限 shell——每条命令套上 OS 级围栏,圈住的是写出项目之外与网络访问;容器——全新文件系统、不挂载凭证、用后丢弃,圈住的是 agent 对自己那台机器做的一切;VM/云——整台独立的机器(常由 harness 提供),连内核级逃逸都圈得住。沙箱圈不住的:合法越界的行为。拿着你 git 凭证的 agent 能 push;有网络访问的 agent 能调用生产 API。先决定什么允许穿过边界,再决定边界要砌多厚。

**Usage**

"I want to let it run bypass-permissions overnight but I'm not ready for that."  
「我想让它整夜开着 bypass-permissions 跑,但心里还没准备好。」

"Put it in a sandbox — fresh container, no credentials mounted, no network out. Worst case it nukes its own filesystem and you discard the container."  
「把它放进 sandbox——新容器、不挂凭证、断外网。最坏情况它炸掉自己的文件系统,你把容器一丢完事。」

