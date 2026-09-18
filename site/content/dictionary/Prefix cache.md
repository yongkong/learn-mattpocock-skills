# Prefix cache · 前缀缓存

[原文 ↗](https://github.com/mattpocock/dictionary-of-ai-coding/blob/main/dictionary/Prefix%20cache.md)

<em>Model provider</em> 侧的一处存储,让连续的 <em>model provider request</em> 免于重复处理共享前缀。当一次请求的开头与最近某次请求的开头一致——同样的 <em>system prompt</em>、同样截至某处的对话史——provider 复用先前的处理成果,把这些 <em>token</em> 按便宜得多的 <em>cache tokens</em> 计费。

缓存划算的根源是 <em>session</em> 只增不改:每次请求把全部历史当 <em>input tokens</em> 重发,而正常 session 里历史只在尾部变化——每次请求都是上一次加上几条新消息。provider 把长长的共享开头只处理一次,存起来,从上一次前缀结束的地方接着算;没有缓存,一个 50 <em>turn</em> 的 session 要把第 1 个 turn 重付五十次。缓存也会过期:条目保温多久因 provider 而异,通常是分钟级而非小时级——闲置超过窗口,下一个请求先全价重建一次前缀,缓存才恢复。这主要是 harness 作者的操心;作为用户,可见的效果是长久暂停之后的请求,比之前的贵。

**Usage**

"Why did the bill spike halfway through the session?"  
「为什么账单在 session 中途突然跳高?」

"Harness started injecting the current time into the system prompt every turn. Prefix cache breaks at the first changed token, so every request after that billed at full rate."  
「harness 开始每个 turn 往 system prompt 里注入当前时间。前缀缓存在第一个变化的 token 处就断了,之后每个请求都按全价结算。」

