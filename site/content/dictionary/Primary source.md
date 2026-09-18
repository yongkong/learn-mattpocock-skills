# Primary source · 一手来源

[原文 ↗](https://github.com/mattpocock/dictionary-of-ai-coding/blob/main/dictionary/Primary%20source.md)

原始形态的事实来源——代码本身、对话记录本身、原始日志、真实的 API 响应。不是「对事物的转述」,是事物本身。<em>Secondary source</em> 的对照面。

想知道你的代码库在做什么,代码就是一手来源;文档、架构图、README 都是对它的描述——落笔那一刻准确,此后各按自己的日程过期。<em>Agent</em> 信誓旦旦地说错了你项目的某件事时,该问的是:它刚才依据的是哪个来源?读了文档的 agent,继承了文档的陈旧;读了代码的 agent,读的是当下的真相。

让一手来源没能成为默认的是成本:把它装进 <em>context window</em> 很贵——整个文件、整段记录,每个 <em>token</em> 都按 <em>input tokens</em> 计费、都参与争夺 <em>attention budget</em>。换来的东西是完整:没有经过任何人「什么重要」的预先筛选。上个月写的总结,装不下今天才发现要紧的那个细节;一手来源装得下。

要紧的场合用一手来源——确切的签名、真实的报错、抛异常的那一行。管理 <em>context</em> 的很大一部分,就是判断什么时候付一手来源的钱、什么时候二手来源够用。

**Usage**

"The agent says the retry logic backs off exponentially, but I'm watching it hammer the endpoint."  
「agent 说重试逻辑是指数退避,可我眼看着它在狂捶那个端点。」

"It read that out of the design doc. Point it at the actual retry module — work from the primary source when the behaviour matters."  
「那话它是从设计文档里读的。把它指到真正的重试模块——行为要紧的时候,以一手来源为准。」
