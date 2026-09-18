# Attention budget · 注意力预算

[原文 ↗](https://github.com/mattpocock/dictionary-of-ai-coding/blob/main/dictionary/Attention%20budget.md)

每个 <em>token</em> 可分配给 <em>context</em> 其余部分的影响力是有限的:在一条 <em>attention relationship</em> 上压得重,留给别处的就少。预算按 token 计,不随 context 变大而变大——长 <em>session</em> 会稀释,根源在此。

把它想成信号与噪声。你的指令是一个固定音量的信号;<em>context window</em> 里其余每个 token 都是 competing sound。指令不会变小声——它一个字符不少地在那里——但 context 越长,房间越吵,信噪比越低。在 10k token 的 context 里最响亮的指令,到 150k 就是背景嗡嗡声。这正是 <em>attention degradation</em> 的机制:模型没有忘,是信号淹没在噪声里。

症状读起来像「不听话」:agent 早先答应过一条约束,随后漂走;重贴一遍约束,也只有短暂效果。原因不在指令,在窗口里与它抢注意力的其他一切。

你能控制的是context里装什么。对任务无用的内容不是中性的——它是压在一切有用内容之上的噪声。窗口保持小;累积的 context 不再值回票价时 <em>clear</em>;要紧的约束,重申一遍,别指望早先提一次能一直管用。

**Usage**

"Why does it keep ignoring the schema I pasted at the top?"  
「它怎么老不理我开头贴的 schema?」

"We're well into the dumb zone — every token's attention budget is fixed, but the context kept growing. The signal on the schema is now competing with thousands of newer tokens."  
「我们早进 dumb zone 了——每个 token 的注意力预算是死的,context 却一直在长。schema 上的信号,现在要和几千个更新的 token 抢注意力。」
