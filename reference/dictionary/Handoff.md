# Handoff · 交接

[原文 ↗](https://github.com/mattpocock/dictionary-of-ai-coding/blob/main/dictionary/Handoff.md)

把 <em>agent</em> 的 <em>context</em> 从一个 <em>session</em> 转移到另一个。携带机制多样:写下来的 <em>handoff artifact</em>、内存里的总结(<em>compaction</em>)等。与 <em>clearing</em> 不同——那是什么都不转移。交接的理由也多样:换角色(规划者 → 实现者)、启动 <em>AFK</em> 运行、铺开并行会话、或腾出 <em>context window</em> 空间。

接收方从零开始——<em>model</em> <em>stateless</em>,旧会话的任何东西新会话都看不见。下一个会话需要的,必须被显式携带;其余全部消失。「没有回路」是塑造携带方式的约束:新会话没法回头问旧会话「你什么意思」,被携带的材料必须自立。

- **Handoff artifact**——<em>environment</em> 里的一份文件:在任何东西依赖它之前,你可以先读它、改它;可跨多个会话复用。
- **Compaction**——<em>context window</em> 里的一份总结:自动、便宜;但难检查,只能喂一个继任会话。

坏交接的可见症状是「重新诉讼」:新会话把旧会话已经定案的事重新翻出来吵,因为携带物记下了「定了什么」,没记「为什么」。评判一次交接的标准:一个零 context 的会话拿着它,能干成什么。

**Usage**

"Planning session is getting heavy — should I just keep going?"  
「规划会话越来越沉——我要不要就这么继续?」

"Do a handoff. Write the decisions to a doc, clear, start the implementation in a fresh session reading from it."  
「交接。把决定写进一份文档,clear,开个新会话读着它做实现。」
