# Clearing · 清空

[原文 ↗](https://github.com/mattpocock/dictionary-of-ai-coding/blob/main/dictionary/Clearing.md)

结束当前 <em>session</em>、另起一个新的:下一条消息从一个空会话、空 <em>context window</em> 开始。通常由用户发起。

Clearing 是被污染 context 的解药。一个 session 什么都攒:失败的尝试、走岔的路、过期的 <em>tool result</em>、半途放弃的计划。<em>model</em> 每个 <em>turn</em> 都把这一切重读一遍,坏历史拖累新工作。深陷长会话时,<em>agent</em> 变含糊、变不听话——你明明交代过的指令被无视,质量下滑,催它也没用,因为它蹚着的那片噪声还在 <em>context</em> 里。Clearing 把噪声移走。

Clearing 不会抹掉对话。多数 <em>harness</em> 把会话历史留在你的电脑上,记录仍在,可读可续。消失的是 agent 的工作状态:<em>model</em> <em>stateless</em>,新会话对旧会话知道的一切一无所知。如果旧会话握着下一个会话需要的决定或进展,先让 agent 写一份 <em>handoff artifact</em>,再开新会话、指向它。

对照 <em>compaction</em>:那是把会话总结进新 context,而不是从零开始。Clearing 是更钝的工具:什么都不带走——连同垃圾一起。

**Usage**

"It's stuck looping on the failing test."  
「它卡在失败的测试上原地打转。」

"Just clear it — start a fresh session with the plan doc and the test file. No point fighting the existing context."  
「直接 clear——开个新会话,带上计划文档和测试文件。跟现有 context 较劲没有意义。」
