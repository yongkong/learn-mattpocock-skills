# Autocompact · 自动压缩

[原文 ↗](https://github.com/mattpocock/dictionary-of-ai-coding/blob/main/dictionary/Autocompact.md)

<em>context window</em> 逼近装满时,由 <em>harness</em> 自动触发的 <em>compaction</em>。

Harness 盯着 context window 的满溢程度,一旦越过阈值——常在 80% 上下——就暂停,让 <em>model</em> 总结迄今的 <em>session</em>,用摘要播种新会话,然后若无其事地继续干活。

只是有事真的发生了。Compaction 有损,而 autocompact 在一个不由你挑的时刻有损:手动的 compact 发生在阶段边界,你能告诉模型要保住什么;autocompact 在任务中间、阈值一碰就点火——可能正烧在重构半中央,由摘要自作主张决定你的哪些决定值得留。经典症状:<em>agent</em> 若无其事地继续,却悄悄忘掉一小时前定下的约束,直到它干出来的活自相矛盾你才察觉。

防御办法是别让它点火:盯着 context 用量指示,在自然的边界手动 compact;或把决定写进磁盘上的计划文档或 <em>handoff artifact</em>——任何摘要都丢不掉的地方。多数 harness 还允许调缓冲:阈值提前或推后,或整个关掉 autocompact,由你决定留多少余量。

**Usage**

"It doesn't seem to remember what we decided about the schema earlier."  
「它好像不记得我们早先关于 schema 的决定了。」

"Autocompact fired between turns — the early decisions got summarised and we must have lost something. Reload the plan doc, or compact manually next time so you control what gets kept."  
「autocompact 在 turn 之间点了火——早期决定被总结掉了,准是丢了什么。重载计划文档,或者下回手动 compact,由你决定留什么。」
