# 学习历程:用 Matt Pocock 的 skills,造一个教这套 skills 的课站

> 本文是本仓库的实战案例复盘。「Agent Skills 中文课」不是先学完这套技能再动手做出来的,而是**一边用这套 skills 干活、一边把它学进去**:站点教的每个流程,仓库的 issue 历史里都有一次真实运行。所有环节有 issue、commit、learning-records/ 三层留痕,可逐条点开对照。

## 为什么这是一个案例

这门课教的是 Matt Pocock 的 agent skills(25 个技能,五章);而把这个课站从想法变成上线产品的那三天,恰好是对这套技能最苛刻的一次实战——

- 主流程(`grill → spec → tickets → implement → code-review`)完整跑通了不止一次;
- 一次教科书级的 `/wayfinder` 场景(公开化改造,雾大到单次会话装不下)从铺图走到走清;
- 上线排障、架构评审、日常维护(Upkeep)全程有真实素材;
- 最巧的是闭环:**课件内容本身就从站点的真实决策里长出来**——学到 wayfinder 那一课时,这张地图正在为这个站点铺开。

## 三层证据

| 层 | 是什么 | 入口 |
|---|---|---|
| GitHub Issues(#1–#24) | 工作流的化石记录:3 张 spec、16 张 tracer-bullet 工单、1 张 wayfinder 地图、2 张 research 票、2 张决策票 | [Issues](https://github.com/yongkong/learn-mattpocock-skills/issues) |
| learning-records/(10 篇) | 学员视角的逐日日志:测验成绩、薄弱簇归因、处方 | [learning-records/](../learning-records/) |
| git log | 一票一 commit,`feat: 工单 #N · …` 命名可检索 | `git log --oneline` |

## 时间线:三天

### 第 1 天(09-18):从零散到流水线,再铺一张地图

- **沙盒就位**:仓库按 `/setup-matt-pocock-skills` 配好 issue tracker、triage 标签与文档布局;MISSION 定下目标——把 25 个技能从零散使用内化成日常流水线,并「在真实仓库完整跑通至少一次主流程」。
- **第一次全流程闭环**:Course Home(#1 spec → #2/#3 工单)。学员自评「用过多数技能」,这一轮验证的是衔接而不是单技能入门。
- **第一次多会话交付**:词典(#4 spec → #5/#6 工单)。实现中途学员两度行使决策权(单页全渲染 → 导航页 + 一词一个中文 MD + 卡片弹层)——spec 是决策记录,不是合同。
- **学到的当天就用上**:课件 0004(Shaping:prototype / wayfinder / research)交付;同一天,第二次实战开进——把教学工作区改造成公开课站。
- **教科书级 wayfinder**:公开化改造(受众、信息架构、语域、载体)每一条都拍不下来,雾大到单次会话装不下 → #7 铺图。#8/#9 两张 research 票由后台子代理并行解决;#10/#11 两张 grilling 票由学员逐题拍板,**首次实质异议**(导航体验 + 语域书面化)直接塑造了地图的形状。
- **prototype 首战**:A/B/C 三方案站点首页原型,「答题实验」的答案直接变成 #10 的全部决策。
- **地图→主流程首交接**:当日走清地图(雾区毕业的标志是「想开工的冲动」出现),`/to-spec` 消费 research 清单与两张决议写 #12,`/to-tickets` 拆出 12 张带 blocked-by 依赖边的 tracer-bullet 工单(#13–#24);当天落了 9 张。

### 第 2 天(09-19):建成、上线、五章开齐

- **12 张工单收尾并上线**:每张工单一个全新会话跑 `/implement`(内部驱动 `/tdd` 一次一个红绿切片,收口跑 `/code-review`),上下文用完即清。**站点上线**:https://learn-mattpocock-skills.vercel.app 。
- **上线即排障三连**:Vercel 导入没设 Root Directory → 构建失败;静态导出 RSC 预取 404 → 全站 Link 关 prefetch;续学按钮 hydration 失配 → 两段式默认值。
- **wizard 首跑闭环**:排障期发的一次性 Vercel token,用 `/wizard` 生成四阶段脚本(定位 → 核对 → y/N 门删除 → 验证)走完生命周期即弃。
- **课件 0005(Upkeep)交付**,顺手修掉一个存量真 bug:全站 MDX 管线从未开 GFM,四课表格一直渲染成竖线纯文本。
- **课件 0006(协作)交付,五章全部开齐**;grilling 家族谱系(四种入口驱动同一发动机)凑齐。
- **`/improve-codebase-architecture` 首战**:对站点跑架构评审,六项改进落地(内容自描述 + seam 收拢等)。
- **间隔重测启动**:第 1 天重测 24/30,薄弱簇当场归因并开处方(学习记录 0007)。

### 第 3 天起(09-20–):交付完毕,进入「重测 + 实战」循环

- 测验数据持续入档(0008–0010):「纪律性禁区型」薄弱簇升级归档为「旧直觉压过新规则」型,出题显式加变式;09-20 双课首测 16/20,逐字错点全修,变式迁移 3/6。
- 日常使用中自己逮到真 bug(词典弹窗宽度被基类钳回)当天修复——**课站自己成了 upkeep 的长期练习素材**。

## 技能 → 留痕对照

| 技能 | 用在哪 | 证据 |
|---|---|---|
| `/setup-matt-pocock-skills` | 初始化 tracker / 标签 / 文档布局 | AGENTS.md、docs/agents/ |
| `/grill-with-docs` | 决策票访谈;CONTEXT.md 词汇表随票修订 | #10、#11 |
| `/research` | 引用边界、页面盘点(后台并行) | #8、#9 |
| `/prototype` | 三方案首页原型回答 IA 问题 | #10、learning-records/0006 |
| `/wayfinder` | 公开课站全程:铺图 → 走票 → 雾区毕业 | #7、learning-records/0005–0006 |
| `/to-spec` | 三份 spec | #1、#4、#12 |
| `/to-tickets` | 三轮共 16 张工单,含依赖边 | #2–#3、#5–#6、#13–#24 |
| `/implement`(内驱 `/tdd`、`/code-review`) | 全部工单,一票一会话 | git log:`feat: 工单 #N` |
| `/wizard` | Vercel token 撤销向导,首跑即弃 | 99dfdb0 |
| `/improve-codebase-architecture` | 站点架构评审六项落地 | 13386c2 |

## 复盘:验证了什么

1. **主流程跑得通**:idea → ship 全链路完整走通三轮(课程首页、词典、公开课站),衔接与交接物是真实的,不是课件里的示意图。
2. **Shaping 有真实用武之地**:雾存在时才值得 `/wayfinder`;「决策票产出决策而非交付物」在 #10/#11 上得到验证——两张票没写一行站点代码,却决定了之后所有代码。
3. **决策可以被推翻**:#7 的载体决议(纯静态 + GitHub Pages)在 #12 写 spec 时被作者升级为 Next.js + shadcn/ui + Vercel,修订存档——地图管方向,不管死守。
4. **学与用是同一个循环**:课件从站点的真实决策里长出来(learning by doing);上线后的 bug 与架构债反过来成为 upkeep 章节的练习素材。
5. **上线不是终点**:间隔重测 + 弱簇归档(learning-records/0007–0010)把「用过」推进到「内化」,这正是 MISSION 里「10 秒说出该用哪个技能」的达标路径。

---

*学习视角的逐日细节见 [learning-records/](../learning-records/);工作流细节见 [Issues](https://github.com/yongkong/learn-mattpocock-skills/issues) 各票正文与评论。*
