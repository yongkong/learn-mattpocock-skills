# Environment · 环境

[原文 ↗](https://github.com/mattpocock/dictionary-of-ai-coding/blob/main/dictionary/Environment.md)

<em>Agent</em> 施加作用的世界——<em>harness</em> 之外、agent 经由 <em>tool result</em> 感知、经由 <em>tool call</em> 改变的一切。harness 在<em>运行</em> agent;environment 是 agent <em>干活的地方</em>。<em>AGENTS.md</em> 这样的文件住在 environment 里;把它加载进 <em>context window</em> 的是 harness。<em>Filesystem</em> 是最常见的 environment,但不是唯一的——数据库、远程 API、浏览器会话都可以是。

Agent 只在「看」的时候才看见 environment:它对环境的一切了解都来自 tool result,所以它的图景是一组快照,每张只在拍下的那一刻准确。文件在 agent 读完之后变了——你手动改了它,或构建步骤重新生成了它——agent 会继续拿着过期副本推理,直到有什么触发它重读。agent 信誓旦旦地描述一个早已不是那个样子的文件,通常就是这个:环境动了,快照没动。Environment 也是持久的那一层——唯一永远 <em>stateful</em> 的层:<em>session</em> 结束,context 就没了,但写进环境的文件还在,留给下一个 session 读——<em>memory system</em>、<em>handoff artifact</em>、AGENTS.md 依赖的正是这一点;想让 agent 明天还记得的东西,必须落进环境。环境的大小由你定:<em>sandbox</em> 把它缩小,限制 agent 能触及的范围;加一个 <em>tool</em> 把它扩大,把数据库或 API 带进射程。边界之内是 agent 能感知与改变的;边界之外,对 agent 不存在。环境为支持 agent 工作而搭得好不好,是代码库的 <em>AX</em>。避免用「environment」指运行时或 harness 本身——harness 是包装,environment 是工作场。

**Usage**

"The agent can't see the staging DB schema."  
「agent 看不到预发环境的数据库 schema。」

"Wire it into the environment — give it a `psql` tool scoped to read-only on staging. The harness is fine, it just has nothing to act on."  
「把它接进 environment——给它一个 psql 工具,权限限定为 staging 只读。harness 没问题,只是它无物可操作。」

