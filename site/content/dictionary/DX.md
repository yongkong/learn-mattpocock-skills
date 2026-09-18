# DX · 开发者体验

[原文 ↗](https://github.com/mattpocock/dictionary-of-ai-coding/blob/main/dictionary/DX.md)

Developer experience——代码库及其工具链让<em>人</em>做好工作有多容易:反馈快、报错清楚、文档正好答着你真想问的问题、环境一次就装通。这个词远早于 AI 编码,收进本词典主要是为了给 <em>AX</em> 当对照面。

DX 是人与代码库之间的互动——仅此而已。两类受众的核心差别:人是 <em>stateful</em> 的,agent 是 <em>stateless</em> 的。人学会一次代码库,往后每天都带着这份知识,所以糟糕的 DX 人类熬得住:CI 慢就攒一把一起 push,文档缺就去 Slack 问一句,结构乱就靠记住东西在哪。绕路的办法越攒越多,一个团队最终能在一个处处与之作对的代码库里保持产出。

<em>Agent</em> 面对同一个代码库,却没有这份积累。跨 <em>session</em> 无状态,它每次都从零重新认识代码库——快速测试与清晰报错对它照样有用,但昨天弄明白的东西,凡没写进 <em>environment</em> 的,今天都不在了;而环境,它只能透过 <em>tool result</em> 感知。这就是 AX 点名的缺口:DX 中当开发者换成 agent 后仍成立的部分,再加上人类没有的关切——比如让 <em>context window</em> 闲着。

重叠意味着 DX 投入常常白送 AX:严格类型、快速测试、可预测的结构,两边都受益。分岔意味着并非总是:一份精美的上手文档帮人帮一周,对 agent 分文不值——除非它能从 <em>AGENTS.md</em> 被够到。

**Usage**

"Our DX is fine — new hires are productive in a week."  
「我们的 DX 没问题——新人一周就能出活。」

"Productive because someone sits with them for that week. The agent doesn't get that week; check the AX separately."  
「能出活是因为那一周有人陪跑。Agent 没有那一周——AX 得单独查。」
