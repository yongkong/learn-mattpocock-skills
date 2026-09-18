# Ticket · 工单

[原文 ↗](https://github.com/mattpocock/dictionary-of-ai-coding/blob/main/dictionary/Ticket.md) · [课件里的它:0003 · 实战(「第三站:/to-tickets:拆成工单」)](../lessons/0003-practicum.html)

框定<em>一个 session</em> 工作量的 <em>handoff artifact</em>。可以独立存在,也可以作为 <em>spec</em> 的子项挂在上面。工单之间可以互相 blocking / 被 blocking,于是工作顺序从依赖图里自然长出来,而不是排一条直线。

定义性的约束是尺寸:一个会话。一张工单应当能在会话漂出 <em>smart zone</em> 之前做完——这个约束是可检验的:如果你的会话例行公事地在干完之前就退化,工单太大,拆;如果每个会话把大部分 <em>context</em> 花在准备上、只干五分钟的活,工单太小,并。

好的工单写给没有其他 context 的读者:目标、验收标准、指向相关文件与决定的 <em>context pointer</em>——够这个会话直接开工,不必重新推导上个会话已经知道的事。

依赖图同时解锁了并行:相互独立的工单——图的叶子——可以各自在自己的会话里同时跑。这是同时驱动多个 agent 的有效方式。

**Usage**

"Where do I start on the migration spec?"  
「这份迁移 spec 从哪儿下手?」

"Look at the ticket graph — the schema change blocks the backfill, the backfill blocks the API switch. Pick a leaf and run a session on it."  
「看工单图——schema 变更挡着回填,回填挡着 API 切换。挑一张叶子工单,为它跑一个会话。」
