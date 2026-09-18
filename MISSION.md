# Mission: 用熟 Matt Pocock 的 agent skills 体系

## Why
用户已在多个环境安装并零散试用过这套 skills(本仓库就是沙盒之一)。目标是把 25 个技能内化成一条日常开发流水线:拿到任何工作情境,都能立刻知道从哪个技能进入、经过哪些环节、每个环节的输入和产物是什么——让 AI 干活提速的同时不放弃工程质量。

## Success looks like
- 面对任何情境(新想法、大特性、疑难 bug、架构腐化、看不懂的消息),10 秒内说出该用哪个(或哪串)技能
- 不看资料能画出 idea → ship 的 Main Flow,并说清每步的输入与产物
- 能说清 user-invoked 与 model-invoked 的区别,以及 Reference 层技能被谁调用
- 在真实仓库完整跑通至少一次:grill → spec → tickets → implement → code-review

## Constraints
- 课件语言:中文为主,命令名与术语保留英文(如 /to-spec、ADR)
- 用户已用过多数技能:重点是系统化、衔接、补盲点,不是单技能入门讲解
- 每节课要短,单次可快速完成

## Out of scope
- 深入 writing-for-agents / 自己编写 skills 的技巧(用户日后提出再开)
- 与本体系无关的通用 prompt engineering
