# Subagent · 子代理

[原文 ↗](https://github.com/mattpocock/dictionary-of-ai-coding/blob/main/dictionary/Subagent.md) · [课件里的它:0001 · 全局地图(/code-review 的「并行子 agent 执行」)](../lessons/0001-the-map.html)

由另一个 <em>agent</em> 经一次 <em>tool call</em> 派生的 agent。它在自己的 <em>session</em>、自己的 <em>context window</em> 里运行,最后只交回一份 <em>tool result</em>。与 <em>handoff</em> 不同:父 agent 明确期待它回来;交接则没有回路。<strong>子代理不能再派生 子代理</strong>——树只有一层。子代理为隔离 <em>context</em> 而存在,不为搭层级。

它的意义是把嘈杂的工作挡在父 context 之外:一次大范围搜索、一场漫长的读文件远征,产出的 tool result 动辄数页,其中大半只在「找到答案之前」有用。跑在父会话里,这一切会留在父的 context 里直到会话结束;跑在 子代理 里,噪声灌满的是一个用后即弃的窗口——只有最终报告落进父的 context。报告是 <em>secondary source</em>:父拿到的是子代理对所见之事的<em>转述</em>,不是原始结果;报告漏掉的,父无从知晓。

子代理还能并发:父 agent 可以同时铺开几个,各干一片互不依赖的工作。

**Usage**

"The grep results are blowing out my context."  
「grep 的结果快把我的 context 撑爆了。」

"Spawn a subagent to do the search — it'll burn its own context window on the noise and report back the two file paths you actually need."  
「派个子代理去搜——它把噪声烧在自己的 context window 里,只回报你真正需要的那两个文件路径。」
