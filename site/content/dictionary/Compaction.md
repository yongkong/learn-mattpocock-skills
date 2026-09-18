# Compaction · 压缩

[原文 ↗](https://github.com/mattpocock/dictionary-of-ai-coding/blob/main/dictionary/Compaction.md)

在内存里完成的 <em>handoff</em>:把上一个 <em>session</em> 的历史总结成一段摘要,用摘要播种一个新会话。设计上就有损:对话记录是 <em>primary source</em>,摘要是 <em>secondary source</em>——用细节换腾出的空间。可由用户手动触发,也可经 <em>autocompact</em> 自动触发。

机制:<em>context window</em> 有限,而长会话会装满它——每条 <em>tool result</em>、每次读文件、每个走岔的弯,都留在历史里。撑得沉重时,<em>harness</em> 让 <em>model</em> 总结会话,丢掉原始历史,用摘要播种新会话。没进摘要的东西,就从 context 里消失了。有些 harness 会缓和这一点:旧记录留在磁盘上,摘要里留一枚指向它的 <em>context pointer</em>——二手来源链回它的一手来源,摘要丢掉的细节可以靠重读原文找回。

摘要是模型写的,所以可以提示它:「保住 schema 相关的决定」,会让生成的产物更经心。时机同样要紧——在阶段边界上 compact,比如计划刚敲定时,别在任务中间。

与 <em>clearing</em> 对照:clearing 全部丢掉、冷启动;compaction 试图把必需品带过去;clearing 则赌这些东西已经写在更好的地方了。

**Usage**

"Context's getting heavy and I still have the test pass to do."  
「context 越来越沉,可测试那一轮还没跑完。」

"Compact before you start — write what must survive into the summary prompt so the new session keeps the schema decisions and drops the exploration."  
「开工前先 compact——把必须活下来的东西写进摘要提示,让新会话保住 schema 决定、丢掉探索过程。」
