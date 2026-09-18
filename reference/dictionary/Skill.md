# Skill · 技能

[原文 ↗](https://github.com/mattpocock/dictionary-of-ai-coding/blob/main/dictionary/Skill.md)

打包成单元的可授予能力——做好一件事所需的指令与资料,平时待在 <em>environment</em> 里,直到一枚 <em>context pointer</em> 因手头任务把它拉进 <em>context window</em>。<em>Harness</em> 里 <em>progressive disclosure</em> 的单元。

Skill 是开放标准,定义在 [agentskills.io](https://agentskills.io)——由 Anthropic 首创,此后多数主流 harness 采纳,一次写成的 skill 处处可用。格式是一个文件夹,内含:

- 一个 <code>SKILL.md</code> 文件——元数据(至少有名字和描述)加指令本身
- 可选的、<em>agent</em> 能跑的脚本
- 可选的、指令所指的模板与参考资料

默认只有名字和描述占着 <em>context</em>;agent 的任务对上时,才加载其余。在那之前,skill 几乎不占地方——一两个句子的 <em>token</em>,不管它的完整指令有多大。

这正是 skill 与 <em>AGENTS.md</em> 的分野:后者不问任务、每个 <em>session</em> 都加载;skill 只在特定工作出现时被读——发布、脚手架一个新服务、写一次迁移——其余时间不被理会。

避免叫「<em>tool</em>」:工具是 agent <em>调用</em>的;skill 是 agent <em>阅读</em>的。

**Usage**

"Where should I put the deploy runbook?"  
「部署手册该放在哪儿?」

"As a skill — the agent loads it only when the task involves deploys. In AGENTS.md it'd burn tokens on every turn for something we use weekly."  
「做成 skill——只有任务涉及部署时 agent 才加载。放 AGENTS.md 的话,为了每周用一次的东西,每个 turn 都在烧 token。」
