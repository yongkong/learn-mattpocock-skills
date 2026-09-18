# Effort · 思考力度

[原文 ↗](https://github.com/mattpocock/dictionary-of-ai-coding/blob/main/dictionary/Effort.md)

回答之前,模型做多少推理的旋钮。按每次 <em>model provider request</em> 设置,控制模型在开始写你能看到的那段回答之前、所经历思考的长度。那段思考和其他一切一样,是 <em>inference</em> 时生成的;<em>harness</em> 常把它藏起来,但它是模型真实在做的工作。

力度越高越贵越慢:推理以 <em>token</em> 形式发出,即使你从没看见也按 <em>output tokens</em> 计费,而且一次一个地产出——调高强度拉长答案到达前的等待,也加码账单;这笔交易是用斟酌换时间与钱。多数 harness 把力度做成一小档阶梯:Low 给机械修改、查询、只有一条清晰路径的明确变更;Medium 是日常编码的通常默认;High 给疑难 bug、设计决策、多步规划;Max 给最难的问题——答错的代价高到难以回退的那种。弄错的症状双向都成立:难题上力度太低,得到的是自信而肤浅的答案——它跳过了问题需要的推理,读起来顺,错起来后患无穷;给一行重命名开 Max,你陪它长考一场,产出的东西最低档也一样能给。按任务匹配力度,而不是按 <em>session</em>:真正难推理的部分调高,周边的体力活调低。

**Usage**

"It keeps botching this concurrency fix — I've re-explained it three times."  
「这个并发修复它老是搞砸——我都重新解释三遍了。」

"Bump the effort up. That's a reasoning-heavy bug, and on the default setting it's not thinking long enough before it commits to an approach."  
「把力度调上去。这是个重推理的 bug,默认档位下它没想透就急着选定路子。」

