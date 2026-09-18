# Context pointer · 上下文指针

[原文 ↗](https://github.com/mattpocock/dictionary-of-ai-coding/blob/main/dictionary/Context%20pointer.md) · [课件里的它:0001 · 全局地图(「user-invoked vs model-invoked」一节)](../lessons/0001-the-map.html)

一份文档里指向另一份文档的一句话,<em>agent</em> 只在任务需要时才顺着它把目标拉进 <em>context window</em>。<em>Progressive disclosure</em> 的砌块。

用指针(而不是内联内容)的理由是成本:指针只是 <em>context window</em> 里的一行;它背后的文档可能有几千 <em>token</em>,但在 agent 真的顺着走之前,一个 token 都不花。把 2000 token 的部署手册内联进 <em>AGENTS.md</em>,每个 <em>session</em> 都要付;换成「部署流程:见 <code>internal/deploy.md</code>」,就只有真部署的会话才加载它。任务对上时,agent 用一次 <em>tool call</em> 顺着指针走。

指针要立得住,需要两件事:稳定的路径,以及足以让 agent 判断「值不值得走」的描述。光秃秃的路径是指针,但 agent 没有理由走;「见 <code>internal/deploy.md</code>」而不说里面是什么,需要它的会话也会跳过。这一行要照着任务出现的措辞写:「发布、部署或回滚——先读 <code>internal/deploy.md</code>」。

一旦留心,指针到处都是:AGENTS.md 里的行、<em>skill</em> 的描述(harness 只加载描述,正文在后面等着)、目录清单里的文件名、文档之间的链接。

指针还能把 <em>secondary source</em> 拴回它所出自的 <em>primary source</em>——注明原始对话记录的 compaction 摘要、注明所描述源文件的文档。这让二手来源的有损变得可恢复:摘要不够用时,agent 顺着指针读原文,而不是对着摘要留下的部分硬干。

避免叫「reference」——太干,传达不出「顺着走会拉进更多 context」;也别叫「portal」——太花哨。

**Usage**

"AGENTS.md is getting huge."  
「AGENTS.md 越长越大了。」

"Most of it should be context pointers, not content. Keep the always-on rules inline; turn the deploy runbook and the style guide into skills and leave a context pointer behind."  
「它大部分该是指针,不是内容。常开的规则留着内联;部署手册和风格指南改造成 skill,原处留一枚上下文指针。」
