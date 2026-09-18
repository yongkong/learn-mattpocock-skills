# Knowledge cutoff · 知识截止点

[原文 ↗](https://github.com/mattpocock/dictionary-of-ai-coding/blob/main/dictionary/Knowledge%20cutoff.md)

<em>Model</em> 拥有 <em>parametric knowledge</em> 的截止日期。截止点之后的库、API、事件,除非把文档作为 <em>contextual knowledge</em> 加载,都是编造陷阱。每个模型发布都自带各自的截止点。

截止点存在的原因是模型的制造方式:<em>training</em> 把文本快照烤进 <em>parameters</em>,此后参数冻结。模型不知道自己的知识有边界——被问到截止点之后的事,它不会拒绝回答,而是从最接近的已知东西外推。陷阱因此是无声的:照旧版库写的代码看起来像样,常常还能编译,只在变过的那些地方失败。

解法永远相同:让最新信息进入 <em>context</em>。加载 changelog,指向已安装版本的类型定义,或让 agent 上网读文档。context 里有,胜过参数里没有。

**Usage**

"It keeps writing the v3 SDK syntax — we're on v5."  
「它一直写 v3 SDK 的语法——我们用的是 v5。」

"v5 shipped after the knowledge cutoff. Load the v5 changelog as contextual knowledge, otherwise it'll keep fabricating from the older parametric version."  
「v5 是在知识截止点之后发布的。把 v5 的 changelog 作为上下文知识加载,否则它会一直按参数里的旧版编下去。」
