# Permission mode · 权限模式

[原文 ↗](https://github.com/mattpocock/dictionary-of-ai-coding/blob/main/dictionary/Permission%20mode.md)

<em>Agent mode</em> 里管权限的那一片:哪些 <em>tool call</em> 触发 <em>permission request</em>、哪些自动执行。它是 mode 系统的最初用途,<em>harness</em> 后来才在之上叠了行为指令。

Harness 出厂自带一档阶梯:read-only/plan——读取自动,写入与 shell 一律挡下,用于研究、规划、审阅;default——读取自动,写入与 shell 先问,日常有人盯着干活用;auto-edit——读取自动,改文件自动,shell 先问,信任的仓库与机械修改用;「Yolo」/full-auto——全部自动,配 <em>sandbox</em> 与 <em>AFK</em> 运行用。选哪一档是在安全与打扰之间做交易,两种失败都真切地疼:太紧,你成为瓶颈——agent 每隔几秒为无害的读取停下,你自动驾驶般点批准,批准便不再有任何含义——橡皮图章是最坏的两头:受全打扰,得零保护。太松,agent 就会改你想先看一眼的文件、跑你想先过目的命令。放得最开的那档,放进 sandbox 里才最站得住——坏的 <em>tool</em> call,爆炸半径被圈住。沙箱之外,多数人最终停在:读取自动放行,不可逆的动作留着 <em>human in the loop</em>。

**Usage**

"It paused on every grep — totally killed the AFK run."  
「它每个 grep 都停下来问——AFK 运行全毁了。」

"Loosen the permission mode for read-only tools, keep prompting on writes and shell. Most permission requests on a research session are noise."  
「把只读工具的 permission mode 放宽,写与 shell 继续先问。研究型 session 的权限请求大多是噪音。」

