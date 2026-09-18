# AX · 智能体体验

[原文 ↗](https://github.com/mattpocock/dictionary-of-ai-coding/blob/main/dictionary/AX.md)

Agent experience——<em>environment</em> 为 <em>agent</em> 在代码库里干好工作而铺设的程度,DX 的 agent 侧对照面。同一个 agent 在这个仓库生龙活虎、在那个仓库屡屡翻车——<em>model</em> 相同、<em>harness</em> 相同——差异通常就是 AX。直觉是怪模型、重写提示词;解法更多时候在仓库里。

好的 AX 有三个主维度:

- **Automated checks**——快、确定、agent 不必惊动人就能据此自我纠正的 <em>automated check</em>:类型、测试、lint。
- **Architecture**——agent 不必读遍全部就能导航的代码库:结构可预测,大量行为藏在小小的接口后面,名字自述其职。
- **Free context**——<em>AGENTS.md</em>、<em>skill</em>、<em>tool</em> 保持精瘦,让 <em>context window</em> 的大头留给任务,agent 待在 <em>smart zone</em> 里而不是被淹没。

AX 与 DX 重叠——好检查与干净的架构两边通吃——但会分岔:人忍得了口口相传的知识、慢 CI、「计费模块问 Sarah」;agent 忍不了。Agent 用不上 IDE 悬浮提示与漂亮面板;它需要失败以文本形式出现在 <em>tool result</em> 里。一个代码库完全可以 DX 良好而 AX 拉胯。

避免把 AX 当 DX 的同义词——两类受众要的投资不同。

**Usage**

"The agent writes great code in the API repo and garbage in the frontend."  
「这个 agent 在 API 仓库里代码写得漂漂亮亮,到前端仓库就净产垃圾。」

"The API repo has strict types and a fast test suite; the frontend has neither and forty always-loaded skills. That's an AX gap, not a model problem."  
「API 仓库类型严格、测试飞快;前端两样皆无,还常驻四十个 skill。这是 AX 缺口,不是模型的问题。」
