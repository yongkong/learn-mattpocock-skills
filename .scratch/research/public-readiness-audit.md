# 公开化问题盘点(导航 / 分类 / 语域)—— issue #9 research 产出

- 日期:2026-09-18
- 方法:逐个通读 index.html、lessons/0001–0004、reference/skill-flow-map.html、artifact-shapes.html、dictionary.html、reference/dictionary/ 抽样 3 词条(Context window / Skill / Grilling)、assets/course.css(导航/布局相关)、assets/quiz.js;旁证 git ls-files、.gitignore、MISSION.md、CONTEXT.md、NOTES.md。
- 用户画像前提:零背景中文开发者,第一次打开站点(GitHub Pages),无人指导。
- 引号内均为原文摘录,格式为「文件:引文」。

## 问题清单

| # | 位置 | 视角 | 问题描述 | 严重度 | 改造方向 |
|---|------|------|----------|--------|----------|
| N1 | index.html(全页:title、lede、top-nav) | 导航与分类 | 站点零定向。title「Course Home · mattpocock skills 课程」,lede 直接是「这个 Course 的唯一入口:全部 Lesson 与 Reference 一览」。零背景读者得不到:这是什么、mattpocock skills 是什么、给谁看、是否官方。Course/Lesson/Reference/Progress 四个术语未翻译未解释,首次落地即用。 | 高 | 首页头部加「这是什么 / 适合谁 / 非官方声明」段;术语首现给白话解释 |
| N2 | index.html:37(top-nav)vs:42(「速查 · Reference」节) | 导航与分类 | Reference 分类被拆成两处:词典入口是顶部一行小字「词典 · Dictionary — AI 编码术语的自写中文释义,随查随用,不设学习进度」,另两份速查在列表里;词典被排除在「速查 · Reference」清单之外。而 CONTEXT.md 定义词典「收录 AI 编码核心术语的 Reference」。 | 中 | 统一 Reference 清单,或明确三类目(课程/速查/词典)并在首页呈现 |
| N3 | lessons/0004-shaping.html(页尾) | 导航与分类 | 无 lesson-nav:全文以 callout「卡住了就问。」结束后直接进 script,没有返回课程主页、没有上一课/下一课链接,是整站唯一死胡同页。 | 高 | 补 lesson-nav;prev/next 改为模板/生成,不再手写 |
| N4 | 全站(无页头页脚);dictionary.html:113、skill-flow-map.html:93、artifact-shapes.html:64 | 导航与分类 | 无站点级持久导航,跨页只靠每页底部 lesson-nav,且覆盖参差:词典页只链「配套课件:0001」,全局地图只链 0001,artifact-shapes 只链 0003;0002/0003 的 lesson-nav 均无词典入口。任何一页看完,去别的板块都要靠猜。 | 中 | 公共 header/footer:课程 / 速查 / 词典 / 关于 |
| N5 | lessons/0001:87、lessons/0003:66 | 导航与分类 | 上一课/下一课手写链已断:0001 列「下一课:0002」「再下一课:0003」,没有 0004;0003 没有下一课(0004 存在)。4 课就断了,25 课时手维护必崩。 | 中 | 编号约定 + 导航由脚本/构建生成;或逐页互检清单 |
| N6 | lessons/*.html(全部课件页) | 导航与分类 | Progress 的「已学/未学」toggle 只存在于 index.html 的列表项上;课件页内看不到也改不了自己的进度,必须回首页操作。 | 中 | 课件页内显示/标记进度,或至少显示当前状态 |
| N7 | index.html:53-60(ITEMS 数组);0001:44-61(模块 cards) | 导航与分类 | 分类按「技能体系结构」组织(主流程/参考层/Shaping/Upkeep/Productivity),不是按读者任务或水平;25 课时后首页仍是扁平 ITEMS 列表(NOTES.md 维护约定「把条目加进 index.html 的 ITEMS 数组(只改一处)」),无模块分组、无每模块进度。 | 中 | IA 票定分类轴:「跟着学」(学习路径)与「当字典查」(体系结构)双入口 |
| N8 | reference/dictionary.html(69 词条) | 导航与分类 | 无搜索/索引,只有分类网格 + 卡片内 ←/→ 翻页;词多后靠翻找词条成本高。 | 低 | 加一个前端过滤输入框即可 |
| R1 | 0001:15-17、0002:15-17、0004:15-17(callout) | 语域 | 「本课与使命的关系」callout 指向作者个人使命:「你的目标是『拿到任何情境,10 秒内说出该用哪个技能』」。「使命」从未向陌生读者解释——它实为 MISSION.md 里作者的自定目标(「把 25 个技能内化成一条日常开发流水线」)。 | 高 | 公开版删除或改写为「本课目标 / 学完你能做什么」 |
| R2 | 0001:83-85、0002:107-109、0003:62-64、0004:101-103(callout) | 语域 | 师徒会话语域,假设读者正与作者 agent 对话:「有问题就问你的老师(就是我)。……直接在对话里问——那些困惑正是下一节课最好的素材」(0001)、「卡住了就问老师」(0003)、「这些课件是你的老师(agent)写的,随时可以就任何一处追问」(0004)。 | 高 | 换成公开站的等价物:FAQ 链接 / issue 反馈入口 / 删除 |
| R3 | lessons/0003-practicum.html(全课,尤其:16、:23、:39、:47、:52) | 语域 | 实战课绑定作者沙盒与时点:练习题是「给这个课程工作区做一个真实有用的小功能——课程主页(course-homepage):一个 index.html」——该页已建成,公开读者正看着它;起飞前检查「本仓库已跑过 /setup-matt-pocock-skills:issue tracker = local markdown(.scratch/)」与本仓库现状(GitHub issues,见 AGENTS.md)已不符;交接物路径 `.scratch/course-homepage/spec.md`、`issues/01-*.md` 是作者仓库的真实产物。 | 高 | 改写成「在你自己的仓库跑一遍」通用版;或保留并明标为「本站诞生记」案例 |
| R4 | 0001:80、0002:104(h2 标题)vs 0004:98 | 语域 | 「今日首读材料」的「今日」是时点词(哪一天?);0004 已改为「首读材料」,前后不一致。NOTES.md 内部纪律明文:「不写『你已经学过 X』『上一轮说过』『明天回来复习』这类依赖当前对话或当下时点的表述」。 | 中 | 统一为「延伸阅读 / 首读材料」 |
| R5 | 0001:104(quiz explain) | 语域 | 「它会把 spec 发布到本仓库配置的 issue tracker(.scratch/)」——「本仓库」对公开读者无所指(他们看到的是网站,不是可运行仓库);0003 多处 `.scratch/` 同理。 | 中 | 改为「发布到你配置的 issue tracker」;沙盒指涉全站排查 |
| R6 | 全站人称统计 | 语域 | 你/您不混用:8 个页面「你」共 108 处(21+23+19+18+2+4+1+0)、「您」0 处。不是问题,是可直接确认的现状。 | 低 | 语域票直接定「你」为标准 |
| R7 | 0003:52、0001:84 等 | 语域 | 整体口吻是「私教对一名已有经验学员」:「老师陪你逐份查看 .scratch/ 里产出的 spec 和工单,对照……挑毛病」(0003)、「那些困惑正是下一节课最好的素材」(0001,作者内部视角)。MISSION.md 前提「用户已用过多数技能:重点是系统化、衔接、补盲点,不是单技能入门讲解」与公开画像(零背景)整体相反。 | 中 | 语域票重设叙述前提,产出「禁语清单 + 替换写法」正反例 |
| I1 | 0001 quiz(7 题)、0002 quiz(10 题)、0003 quiz(7 题)的 answer 字段 | 信息架构线索 | 答案位置泄露:三门课 24 题全部 `answer: 0`(正确项恒在第一位),点击第一项必对。NOTES.md 已自认:「测验答案位置已打散(0002 全在第 0 位属格式泄露,0004 起不再犯)」——0004 已修,0001-0003 未修。公开版等于测验失效。 | 高 | 重排 0001-0003 各题选项顺序 |
| I2 | index.html:45(progress-note)、:62-72(localStorage 降级) | 信息架构线索 | Progress 机制对公开访客 = 纯本地:文案已交代「Progress 保存在本浏览器(localStorage)……若浏览器禁用本地存储,页面照常可用,只是不记忆」,且有内存降级;但无账号即清缓存丢失、跨设备不同步、无导出/重置。 | 中 | IA 票定进度产品化程度:维持+说明(现状够用)/ 加导出 |
| I3 | git 跟踪文件:MISSION.md、NOTES.md、CONTEXT.md、learning-records/0001-0004(另有未跟踪 0005) | 信息架构线索 | 作者个人文件与课程同仓且被跟踪:MISSION.md 写「用户已在多个环境安装并零散试用过这套 skills」、NOTES.md 写「水平:自述『用过多数技能』」及全部教学决策。仓库本已 public,开 Pages 后这些将以 /NOTES.md、/learning-records/*.md 等路径可直接下载,且会被当成站点的一部分读。 | 高 | IA 票划公开边界:迁移/目录隔离(如移出 Pages 根)/ 保留并声明 |
| I4 | 仓库根(缺件);index.html:7(favicon) | 信息架构线索 | 站点级缺件:无 LICENSE(wayfinder 地图 Q1-Q8 已定 CC BY-SA 4.0 + 致谢页,未落地)、无关于页、无「非官方」声明(已定)、无更新状态说明(已定「明示更新中」)、无 404.html;favicon 是空壳 `<link rel="icon" href="data:,">`;无 meta description / og 标签(搜索与分享无摘要)。 | 中 | 全部进上线检查单;许可落地前问 #8 结论 |
| I5 | reference/dictionary.html:111;reference/dictionary/*.md(每条 [原文 ↗]) | 信息架构线索 | 词典许可注释与公开站冲突:「中文释义为自写转述,仅供个人学习;术语与 Usage 英文原文版权归原作者。」上游 mattpocock/dictionary-of-ai-coding 的许可未确认(上游 skills 仓库已确认 MIT,词典仓库未确认)——属 issue #8(引用边界)范围。 | 中 | 等 #8 结论后同步改本注释与「原文 ↗」链接策略 |
| I6 | reference/dictionary/Grilling.md:5 vs lessons/0002:36、:39 | 信息架构线索 | 词典与课件口径冲突:词典「agent 以苏格拉底式访谈盘问你,一次只问一个决定,并为每个决定附上推荐答案」vs 课件「一次问完整个 frontier,每题编号、附推荐答案」「一轮 16 个问题很常见,复杂特性 30~50 个也有」。公开读者对照读会困惑。 | 中 | 以 SKILL.md 为准统一口径,两处互链 |
| I7 | reference/skill-flow-map.html:11 vs :91 | 信息架构线索 | 版本口径漂移:kicker「Reference · mattpocock/skills v1.2」,cite 行「本地插件 v1.2.3 的 engineering/ 与 productivity/ README」。 | 低 | 单一来源注版本 |
| I8 | assets/quiz.js:54-56(root_score) | 信息架构线索 | 课件耦合方式:quiz.js 无依赖、每页 `MtQuiz.render(...)` 挂载,耦合干净;但 `root_score()` 用 `document.querySelector(".quiz .score")` 取全局第一个匹配,同页两套测验得分会串(当前每页一套,暂安全)。25 课时的扩展下值得修。 | 低 | 改为 scoped 到本次 render 的 root |

统计:高 7 条(N1、N3、R1、R2、R3、I1、I3),中 12 条,低 4 条。

## 给信息架构票的线索(issue #10)

1. **分类轴要换/双轨**:现状按技能体系结构组织(主流程/参考层/Shaping/Upkeep/Productivity),这是作者学完后的心智图;零背景读者需要「学习路径」轴。建议双入口:跟着学(编号路径 + 模块分组 + 每模块进度)/ 当字典查(体系结构路由表 + 词典)。25 课时规模下 prev/next 必须生成,首页 ITEMS 手工数组撑不住(N5/N7)。
2. **Reference 一词当前一词三用**:CONTEXT.md 说词典也是 Reference,首页却把词典移出 Reference 清单、单独一行(N2)。IA 票应定死三类目(课程 Lesson / 速查 Reference / 词典 Dictionary)及全站归属,再配公共导航壳(N4)。
3. **Course Home 兼站点首页,在补上站点壳之前不够用**:关于页、非官方声明、LICENSE(CC BY-SA 4.0 已定未落地)、致谢页、更新中说明(这四件地图 Q1-Q8 已拍板)、404.html、SEO meta/og——全部待建(I4)。首页本身需要「这是什么/适合谁」定向段(N1)。
4. **公开边界要在开 Pages 前划清**:MISSION/NOTES/CONTEXT/learning-records 这些个人文件目前与课程同根、可被直接下载(I3);词典上游许可等 #8 结论(I5)。
5. **Progress 对公开访客 = 纯本地可丢失**:介质(localStorage)已有体面交代,真正的体验缺口是「课件页内无进度入口」(N6)与无导出;IA 票决定做到哪一档(I2)。

## 给语域票的线索(issue #11)

1. **三类必须清理的表述已有实锤**:作者使命 callout(「本课与使命的关系」x3,R1)、师徒会话语域(「问你的老师(就是我)」x4,R2)、「本仓库/.scratch/」沙盒指涉(0003 全课 + 0001 quiz 解释,R3/R5)——语域票可直接以这三类为禁语清单的起点。
2. **人称可直接定案**:全站「你」108 处、「您」0 处,零混用(R6);语域票只需把「你」写成标准。
3. **要换的不是句子而是叙述前提**:现行课件按 MISSION.md 写——读者「已用过多数技能、不重讲入门」,且正与作者 agent 同处一个会话;公开版读者是零背景、无人指导、只读网页。前提变了,「练一练」「合上页面回忆一遍」「起飞前检查」等栏目可保留,但每个栏目的措辞要按新前提重写;NOTES.md 已有的内部纪律「课件必须自成一体」是现成地基,可升级为公开版语域标准的总纲。
4. **残留时点词**:「今日首读材料」(R4)是唯一成规模的时点表述,顺手统一;间隔复习已用相对说法(「第 1、3、7 天」),符合纪律,可作正例。
