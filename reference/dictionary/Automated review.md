# Automated review · 自动化评审

[原文 ↗](https://github.com/mattpocock/dictionary-of-ai-coding/blob/main/dictionary/Automated%20review.md)

一个 <em>agent</em> 评审另一个 agent 的工作,常用不同的 <em>model</em> 或 <em>system prompt</em>。非确定性:它形成的是<em>判断</em>。跑在哪都行:PR 合并前、事后扫提交历史、会话中途以 <em>subagent</em> 出现。CI 里的 LLM-as-judge 属于自动化评审,不是 <em>automated check</em>——断言「做什么」决定归类,不看它跑在哪。

与干活 agent 的分离,是评审成立的前提。让写代码的 agent 评审自己的作品,所得无几——产出 bug 的那个 <em>session</em> 里也装着产出 bug 的推理,agent 会把自己的结论读回给自己当确认。一个 <em>context window</em> 全新的评审者没有这份纠缠:它看 diff 的眼光像个陌生人——这正是评审赖以成立的东西。换模型、或换上评审专用的 system prompt,还能更锋利:盲区不同,而且 system prompt 可以只对准你真正在乎的东西(安全、API 契约、性能),而不是含混的「找找问题」。

它在评审层级的中间一层:自动化检查是确定性的,接住可机械断言的;人工评审最贵、扩展性最差;自动化评审居中——用机器的成本,接住「判断形状」的问题(误导性的函数名、漏掉的边界情况)。因为非确定,它既会漏报也会误报:把它当「人工过目之前抬高底线」的过滤器,不当成取而代之的闸门。

避免说「AI review / agent review」——太含糊,分不清是评审环节还是干活的 agent 本身。

**Usage**

"We're getting too many bad PRs from the AFK runs."  
「AFK 运行产出的坏 PR 太多了。」

"Add an automated review step before merge — different model, separate system prompt, scoped to security and contract changes."  
「合并前加一道自动化评审——换个模型、单设 system prompt,只盯安全与契约变更。」
