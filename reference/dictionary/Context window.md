# Context window · 上下文窗口

[原文 ↗](https://github.com/mattpocock/dictionary-of-ai-coding/blob/main/dictionary/Context%20window.md) · [课件里的它:0001 · 全局地图(「流程就是 agent 的记忆」一节)](../lessons/0001-the-map.html)

模型在每次请求时看到的全部内容。有限、因模型而异,而且是模型感知一切的唯一表面。它是单一 token 序列:system prompt + 迄今的对话 + harness 反馈回来的每个 tool result。在序列里,模型就能用;不在,模型就不知道它存在——你的代码库、昨天改的文件、三个会话前的指令,都一样。

有限意味着会填满:每个 turn 都在追加内容,长 session 终会触顶,被迫 compaction 或 clearing。也意味着窗口内一切互相竞争:加载的每个 token 都占预算,不需要的内容照样占据模型注意力。实践姿态:把窗口当预算——加载任务需要的,其余挡在门外,要用再通过 tool call 拿。避免把它叫「记忆」:窗口是工作状态,不跨会话持久;memory 是叠在之上的另一个概念。

**Usage**

"Can I just paste the whole monorepo into the prompt?"  
「我能把整个 monorepo 都贴进提示词吗?」

"The context window's 200k tokens — that's maybe a fifth of the repo. Pick the files the task touches, leave the rest behind a tool call."  
「context window 是 20 万 token——大概只有仓库的五分之一。挑任务会碰的文件,其余放在 tool call 后面。」

