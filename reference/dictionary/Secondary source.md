# Secondary source · 二手来源

[原文 ↗](https://github.com/mattpocock/dictionary-of-ai-coding/blob/main/dictionary/Secondary%20source.md)

对 <em>primary source</em> 的转述,隔了一层——描述代码的文档、概括对话记录的总结、汇报搜索结果的报告。装进 <em>context window</em> 比它描述的来源便宜,而且<em>在构造上</em>有损:写它的人替你决定了什么重要,他丢掉的部分,只读总结的人永远看不见。

大量 <em>context</em> 工程,本质是二手来源的制造:<em>compaction</em> 把 <em>session</em> 历史变成总结,播种下一个会话;<em>subagent</em> 把自己的 context 烧在嘈杂的搜索上,只带回一页短报告;<em>handoff artifact</em> 把一个会话的决定浓缩成下一个会话要读的文档;<em>memory system</em> 把会话学到的东西蒸馏成笔记。它们做的是同一笔交易:用保真换空间。

二手来源以两种方式失效:一是有损——丢了 schema 决定的 compaction 总结、没提边界情况的报告;二是漂移——一手来源变了,转述没跟上,文档拿着上一季度的架构、说着这一季度的口气。<em>Agent</em> 在失效的二手来源上干活时,会自信地基于错误信息工作;解法是把它打发回一手来源。

两种失效都不构成「不该用二手来源」的理由:<em>context window</em> 有限,一手来源昂贵,没有总结、报告和交接文档,大东西什么都装不下。功夫在于知道哪些细节经得起压缩——以及经不起的那部分,要回一手来源核实。做得好的二手来源,会带一枚指回原始来源的 <em>context pointer</em>:总结里注明它出自哪份记录,文档里注明它描述哪个文件——转述不够用时,读者顺着指针回去,而不是对着缺口硬猜。

**Usage**

"The handoff doc says auth is done, but the new session keeps finding broken token refresh."  
「交接文档说认证早做完了,新会话却不断发现 token 刷新是坏的。」

"The doc's a secondary source — the last session wrote down what it believed, not what's true. Have the new session run the auth tests and trust the primary source."  
「那份文档是二手来源——上个会话写下的是它相信的,不是真相。让新会话跑一遍认证测试,以一手来源为准。」
