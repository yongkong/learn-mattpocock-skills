# Progressive disclosure · 渐进式披露

[原文 ↗](https://github.com/mattpocock/dictionary-of-ai-coding/blob/main/dictionary/Progressive%20disclosure.md)

只加载 <em>agent</em> <em>此刻需要的</em> <em>context</em>,其余用 <em>context pointer</em> 挂在后面。借自 UI 设计——只给用户看当前任务相关的控件,其余藏进一次点击之后。

这门手艺存在,是因为 context 要付两次钱:预先装进的每个 <em>token</em>,每个 <em>turn</em> 都按 <em>input tokens</em> 计费;而且不管 agent 用不用得上,每个 token 都花 <em>attention budget</em>。一份塞满完整风格指南、部署手册、数据库约定的 <em>AGENTS.md</em>,会让 agent 在所有这些事上都变差——当前任务要紧的指令,被不要紧的稀释了。症候你见过:agent 无视你明知在它 context 里的规则——在是在,埋住了。

Progressive disclosure 把这一切倒过来:常驻层保持很小——每个主题一句话,加一枚指向细节所在处的指针。agent 写组件时去读风格指南,部署时去读部署手册,修测试时两个都不读。<em>Skill</em> 就是内建在 <em>harness</em> 里的这套模式:一段简短描述随每个 <em>session</em> 常驻,完整指令只在被触发时加载。

**Usage**

"Should I dump the entire style guide into AGENTS.md?"  
「要不要把整本风格指南倒进 AGENTS.md?」

"No — progressive disclosure. Reference the style guide as a skill the agent loads when it actually needs to write a component. AGENTS.md pays the token cost every turn."  
「不要——渐进式披露。把风格指南挂成一个 skill,agent 真要写组件时才加载。AGENTS.md 可是每个 turn 都在付 token 钱。」
