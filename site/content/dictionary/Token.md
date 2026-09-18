# Token · 词元

[原文 ↗](https://github.com/mattpocock/dictionary-of-ai-coding/blob/main/dictionary/Token.md)

<em>Model</em> 读写的原子单位。约莫词的大小,但不等于词:常见词是一个 token,生僻或长的词拆成多个。<em>Context window</em> 大小、费用、延迟,全都以 token 计数。文本经 tokenizer(分词器)变成 token:一部在 <em>training</em> 之前学好的、几万条目的固定词表,把任何输入切成词表条目的序列。模型从没见过字符或词——每段文本进来时都先转成 token,输出侧的 <em>next-token prediction</em> 也是一次产出一个 token。

经验法则:一个 token 约合四分之三个英文单词,一千 token 约合 750 词。代码更不可预测:常见关键字与惯用法编码紧凑,而生成的标识符、哈希、base64 串、压缩产物每个「词」要拆成很多 token。规律是:在 tokenizer 的素材里出现频繁的文本,得到短而高效的编码;没出现过的被剁成碎片——<code>a3f9c2e1</code> 这样的哈希哪里都没出现过,于是碎成许多 token,而 <code>function</code> 就是一个。这就是为什么一个看着不大的文件,只要满是怪字符串,就可能占掉 context window 里惊人的一块。Token 还是一切度量的单位:费用按 token——<em>input tokens</em> 与 <em>output tokens</em> 分开计价;速度按每秒 token——输出一次一个地生成;窗口是固定数量的 token——你文件的 token 数决定装得下多少。避免说「词」:token 边界与词边界不重合,而 tokens-per-second、tokens-per-dollar 才是真正有用的单位。

**Usage**

"How big is this prompt going to be?"  
「这个提示词会有多大?」

"Run it through the tokenizer — the schema's compact but the JSON keys are weird, so they'll split into more tokens than you think."  
「拿 tokenizer 跑一下——schema 很紧凑,但 JSON 的键名很怪,拆出来的 token 会比你以为的多。」

