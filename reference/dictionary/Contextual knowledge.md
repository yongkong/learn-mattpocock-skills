# Contextual knowledge · 上下文知识

[原文 ↗](https://github.com/mattpocock/dictionary-of-ai-coding/blob/main/dictionary/Contextual%20knowledge.md)

<em>Agent</em> 此刻能直接从 <em>context</em> 里读到的事实——你的任务、它读进来的文件、<em>tool result</em>、<em>session</em> 开始时加载的 <em>AGENTS.md</em> 内容。是 <em>parametric knowledge</em> 的对照面:参数化的靠<em>回忆</em>,上下文的靠<em>阅读</em>——答案就在眼前,不是从模糊记忆里捞的。Agent 以上下文知识干活时,<em>hallucination</em> 少得多。

两种知识里,只有上下文知识归你控制。参数冻结,所以要给 <em>model</em> 它缺的知识——内部 SDK、<em>knowledge cutoff</em> 之后发布的库、昨天拍板的决定——唯一的路是放进 context。大量 AI 编码的日常工作,说到底就是这件事:在模型需要的时刻,把正确的事实放到它眼前。

两种知识冲突时,通常是上下文知识赢:贴上当前版本的 API 文档,模型就照文档而不是照旧记忆来——尽管旧版本仍可能渗出来,尤其是在长 <em>session</em> 的深处。文档明明加载了、agent 却反复退回过时写法,那就是参数化知识在渗过上下文知识;把纠正再说一遍、或把纠正挪得离工作现场更近,会有帮助。

与参数化知识不同,上下文知识的使用有成本:装进 <em>window</em> 的每一样东西都花 <em>token</em>,都参与争夺 <em>attention budget</em>——所以多装不等于更好,目标是把<em>相关的事实</em>装进窗口,不是把<em>所有事实</em>装进窗口。

只在需要与参数化知识对照时用这个词;平时直接说 <em>context</em> 就够。避免叫「工作记忆」:contextual knowledge 是窗口<em>现在</em>装的东西,<em>memory system</em> 是把跨会话内容送进窗口的机制——尺度不同,别混。

**Usage**

"Why does it nail the API when I paste the docs and fabricate it when I don't?"  
「为什么贴了文档它就把 API 用得全对,不贴就瞎编?」

"With the docs in, it's contextual knowledge — reading off the page. Without, it's parametric and the rare endpoints blur."  
「文档在,就是上下文知识——照着页面读。不在,就退回参数化知识,冷门的端点全糊。」
