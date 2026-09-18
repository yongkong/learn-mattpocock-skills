# Model · 模型

[原文 ↗](https://github.com/mattpocock/dictionary-of-ai-coding/blob/main/dictionary/Model.md)

<em>Parameters</em> 本身——<em>stateless</em>,只做 <em>next-token prediction</em>,别的什么都不做。「Claude Opus 4.x」「GPT-5.x」都是 model。模型自己做不了任何 agentic 的事:读文件、跑命令、上网、记住昨天,统统不会——它收进 <em>token</em>、预测出 token,每次 <em>model provider request</em> 做一轮。一切「像 agent 在干活」的体验——挑选 <em>tool</em>、读取结果、循环到任务完成——都是 <em>harness</em> 把一连串这样的预测编排起来的结果。

<em>Model provider</em> 按档位出货:最大档最聪明但慢且贵,小档更快更便宜但能力弱。选档是真实的决策——规划与疑难调试用重量级,机械修改用轻量级——harness 也允许在 <em>session</em> 中途换档。对这个词保持较真还能锐化诊断:「这个模型不行」是个具体断言——同一个模型换一个 harness、或换一份 <em>context</em>,行为常常完全不同。怪罪模型之前,先看它被给了什么:多数令人失望的输出,根源在 context 或 harness,不在参数。

**Usage**

"Should we switch the model from Sonnet to Opus for the planning step?"  
「规划那一步,要不要把模型从 Sonnet 换成 Opus?」

"Try it — but the harness is doing most of the lifting on this task. The model swap won't help if the system prompt and tools are wrong."  
「可以试——但这个任务里干重活的是 harness。system prompt 和工具要是不对,换模型也没用。」

