# Spec · 规格

[原文 ↗](https://github.com/mattpocock/dictionary-of-ai-coding/blob/main/dictionary/Spec.md)

描述一段跨 <em>session</em> 工作的 <em>handoff artifact</em>——写的是「在造什么」,不是「每个会话怎么干自己那份」。随工作推进而更新,由 <em>ticket</em> 组成。

Spec 存在的原因:会话是用后即弃的,大工作不是。任何超出一个 <em>context window</em> 工作量的活,都需要一个 context 之外的家——<em>agent</em> <em>environment</em> 里熬得过 <em>clearing</em> 的某个地方:仓库里的文件、GitHub issue、或 agent 够得着的 issue tracker。Spec 就是那个家:目标、约束、迄今的决定,以及带状态的工单清单。任何新会话读它,就知道工作到了哪一步,而不必继承上个会话攒下的噪声。

Spec 有几种眼熟的体裁,多半承袭自团队既有的写作习惯:PRD(产品需求文档)偏用户侧的 what 与 why——功能、行为、验收标准;design doc 或 RFC 偏技术——选定的路子、被否的备选、权衡;小一头的,一份带工单清单的 plan.md 对多会话的特性干的是同一件事。体裁不如角色要紧:对 agent 来说,这些都是同一个东西——它在每个会话开头读的那份「意图的持久声明」。

**Usage**

"Should this all be one session?"  
「这活全放一个会话里干行吗?」

"No, write it up as a spec — break it into tickets, run each one in its own session. Trying to do the whole thing in a single context will hit the dumb zone before you're halfway."  
「不行。写成 spec——拆成工单,每张工单单独跑一个会话。想在一个 context 里干完全部,半路就进 dumb zone 了。」
