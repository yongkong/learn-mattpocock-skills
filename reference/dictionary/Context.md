# Context · 上下文

[原文 ↗](https://github.com/mattpocock/dictionary-of-ai-coding/blob/main/dictionary/Context.md)

agent 当前能接触到的、与任务相关的信息。抽象名词——不是模型看到的原始输入(那是 context window),也不是滚动的历史(那是 session),而是「agent 此刻知道的、与任务相关的东西」。「把某物加载进 context」就是让它进入这个集合;「context engineering」就是策划它的学科。

三个词分得干净:Context 是任务相关信息的集合,context window 是模型每次请求看到的字面 token 序列,session 是 harness 保存的滚动对话。区分之所以要紧,是因为 context 衡量的是质量而非数量:窗口快满而 context 依旧贫瘠(几千 token 全是过期工具输出),几乎为空也可以极佳(恰好是任务依赖的那个类型定义)。日常失败大多可追溯到 context:agent 编造 API、违背决策、瞎猜 schema 时,第一反应是问「它做这件事时 context 里有什么」——通常相关事实从未加载,或被注意力衰退埋掉了。解法是策划:加载任务需要的,挡住不需要的。

**Usage**

"It keeps inventing fields that aren't in the type."  
「它一直在编造类型里不存在的字段。」

"The type file isn't in context — it's reading the call sites and guessing. Read the definition in first."  
「类型定义文件不在 context 里——它在读调用点瞎猜。先把定义读进来。」

