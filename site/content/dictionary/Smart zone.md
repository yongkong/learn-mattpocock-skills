# Smart zone · 聪明区

[原文 ↗](https://github.com/mattpocock/dictionary-of-ai-coding/blob/main/dictionary/Smart%20zone.md)

<em>Session</em> 早期,<em>agent</em> 处在「smart zone」:敏锐、专注、记得住。会话一长,就漂进「dumb zone」:变糙、健忘、错误变多——忠实性 <em>hallucination</em> 也更多。同一个 <em>model</em>,同一个 <em>harness</em>——只是 <em>context</em> 更多。它是 <em>attention degradation</em> 的体感。前沿模型的 dumb zone 常见起点在 125K–150K <em>token</em> 上下(有争议);会话臃肿时 <em>clear</em> 或 <em>compact</em>,别硬撑。

滑坡是渐进的,所以容易错过:没有报错,没有可见的边界,agent 只是先差一点、再差得多。常见征兆:忘了二十个 turn 前的指令;重复犯已经改过的错;自信地断言 context 里明明相反的事。因为下滑平滑,常见反应是硬撑着重新解释——那只会加更多 context,让问题更糟。

分区不跟随 <em>context window</em> 上限:一个 session 可以在窗口还空着大半时就深陷 dumb zone——上限是 harness 拒绝继续的地方,而质量远在那一刻之前就开始掉。按 smart zone 规划,别按窗口规划——任务的实用预算,是 agent 干活干得好的那段 token,不是技术上装得下的那段。

Smart zone 是预算,无关工作也花它:会话里做的每件事都耗 token,所以同一个 session 里开第二个任务,等于开局就离 dumb zone 更近。一个 session 一个任务,每个任务分到的是 session 最锋利的一段。单个任务超出一个 smart zone 时,拆开:在自然的边界 <em>handoff</em> 或 compact,让新会话接下一块。

**Usage**

"It nailed the first three components and just butchered the fourth."  
「前三个组件它做得漂漂亮亮,第四个剁得稀烂。」

"You're out of the smart zone — same model, just deep into the dumb zone now. Compact and reload the plan, the next component will land."  
「你出 smart zone 了——模型没换,只是深进 dumb zone 了。Compact 然后重载计划,下一个组件就稳了。」
