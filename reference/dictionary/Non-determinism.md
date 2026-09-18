# Non-determinism · 非确定性

[原文 ↗](https://github.com/mattpocock/dictionary-of-ai-coding/blob/main/dictionary/Non-determinism.md)

同样的输入,可以产出不同的输出。同一个 <em>context</em> 跑两遍 <em>model</em>,可能得到两个不同的答案——差一个词,或者整条路子都不一样;你的代码什么都不用改,这事就会发生。它是模型生成文本的方式与 <em>model provider</em> 服务请求的方式共有的属性:<em>inference</em> 时模型产出的是下一个 <em>token</em> 的概率分布,从中采样一个——通常刻意带点随机,因为永远选最高概率会产出重复、低质的文本。响应早期一个采样不同的 token,会改变它之后的每一个 token——一个词的不同就这样滚成整条路子的不同。供应商侧再加一层:请求在共享硬件上批量执行,批与批之间微小的浮点差异,足以在两个 token 之间翻掉一个五五开的抉择。没有任何设置能把这一切关掉。

要预期 <em>agent</em> 在同一任务上的结果是一组散布:多数响应落在一条还行的质量钟形曲线上——这正是非确定性尚可容忍的原因——但尾巴是真实的:有些日子模型锋利,有些日子它像丢了魂。同样的任务,不同的骰子。两个实践后果:重试是正当策略——一次失败只是分布中的一次抽样,同一任务再试一次,可能落点就是更好;以及验证比在确定性工具面前更重要——你不能测一次 agent 的行为就指望它复现,得靠 <em>automated check</em> 把坏抽样接住。也别过度叙事化:人是模式匹配的机器,一连串不顺容易让人相信「模型这周变差了」——通常那只是分布本身。

**Usage**

"Claude has been awful today. Did they ship a worse version?"  
「Claude 今天烂透了。是他们上线了变差的版本吗?」

"Probably not — model output is non-deterministic. You're going to have good days and bad days on the same task. Try again tomorrow before you go looking for a cause."  
「多半不是——模型输出是非确定性的。同一个任务就是有好日子和坏日子。明天再试一次,再去找原因也不迟。」

