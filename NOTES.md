# Notes

- 语言:课件中文为主,命令名/术语保留英文。用户以中文交流。
- 水平:自述"用过多数技能",痛点是零散使用、想系统化。课程重心 = 全局地图 + 技能衔接 + 补盲点,不重讲单技能入门。
- 本工作区 `D:\dev\AI\matt` 同时是 skills 的实验沙盒:已跑过 `/setup-matt-pocock-skills`(AGENTS.md + docs/agents/ 已配置,issue tracker = local markdown,`.scratch/` 尚未创建)。练习课可在这个仓库里真实使用技能(如用 /to-tickets 往 `.scratch/` 里拆工单)。
- 教学文件(lessons/、reference/、assets/、learning-records/)与沙盒文件(AGENTS.md、docs/)共存于本仓库,互不干扰。
- 用户有 Axure 式原型背景(原型 = 给人看的交付物)。讲 Shaping 模块时,prototype 的「答题实验」定位要从这个对比切入(见 learning-records/0002)。
- 用户会针对课件概念追问,回答时多用对比和具体例子,少用抽象定义。
- ⚠️ 课件必须自成一体:不写「你已经学过 X」「上一轮说过」「明天回来复习」这类依赖当前对话或当下时点的表述。用户会把课件保存下来隔几周重看,届时可能全忘了——每课按「第一次读」写,课程间用链接互引没问题,但正文不能假设读者记得其他内容或会话历史。间隔复习写成相对说法(「第一次学完后的第 1、3、7 天」)。
- 进度:**词典(Dictionary)已验收通过并关闭**(spec #4、工单 #5/#6,已 push)。实现中途用户两度行使决策权:架构从「单页全渲染」改为「导航页 + 一词一个中文 MD(reference/dictionary/)+ 卡片弹层」(fetch + 本地 marked.js),后又定稿卡片交互(固定高 92vh 内滚、美化滚动条、右侧分类>词条两级快速导航、去掉课件交叉链接)。⚠️ 词典卡片 fetch MD 需 HTTP 访问,file:// 会被浏览器拦截(页面内建提示)。course-homepage(#1/#2/#3)与 dictionary(#4/#5/#6)两轮全流程均已闭环关闭。复盘遗留小项:spec 里混入两个文件路径的写法,下次注意。
- 进度:**0004 · Shaping 三技能已交付**(2026-09-18,lessons/0004-shaping.html):prototype(≠Axure 切入,答题实验心智)、wayfinder(决策地图/票/雾/frontier)、research,含十秒路由表 + 6 题混编测验。测验答案位置已打散(0002 全在第 0 位属格式泄露,0004 起不再犯)。
- 进度:**公开课站工程启动 = 第二次实战,用户主导、老师教练位**(2026-09-18):用户提出把课程改成公开教学网站,教科书级 wayfinder 场景。铺图访谈 Q1–Q8 定案(终点 B 档正式课程站/词典随站/中文受众+非官方标注/本仓库+Pages/先改造后上线小范围/CC BY-SA 4.0+致谢页/明示更新中),用户首次行使实质异议(导航体验 + 书面化)直接催生两张决策票。地图 issue #7:子票 #8 引用边界(research)、#9 页面盘点(research)、#10 信息架构(grilling)、#11 语域标准(grilling),#10/#11 blocked_by #9;雾区记了站点命名/分类细则/移动端/上线检查单。上游 mattpocock/skills 已确认 MIT。地图走完后交主流程写改造 spec。教学联动:后续课件从网站真实决策里长(learning by doing);间隔重测(0001-0004)排在交付次日。
- 进度:**公开课站 #10 信息架构已定案关闭**(2026-09-18,五题全按推荐):站名「Agent Skills 中文课」+非官方徽章;首页 = A 教材目录骨架 + B 情境入口卡区 + 一行 localStorage 续学按钮;Module 五章(主流程/参考层/Shaping/Upkeep/协作)+ 顶级导航四入口(课程/速查/词典/关于);内页 = 左侧章节树 + 上下翻课;个人文件保留公开但不进导航;移动端仅响应式断点。CONTEXT.md 已随票修订(新增 Site、Module,重定义 Course Home)。prototype 在 `.scratch/prototype/site-home-ia.html`(即弃,spec 写完可删)。**只剩 #11 语域票**,关掉即地图走清 → 交主流程写改造 spec(记得:0001-0003 测验答案位置重排、0004 死胡同、hero 重写,都是 #9 盘点出的施工项)。
- 进度:**地图 #7 已走清(2026-09-18),wayfinder 全循环完成**。#11 定案:人称「你」;总纲(自成一体/无会话/无时点/无沙盒);三类禁语替换策略(0003 例外明标「案例:本站诞生记」);口语词标尺+示例表;引用规范采纳 #8(词典上游无 LICENSE,注释已定措辞)。落地:`docs/register.md`(写作标准)+ CONTEXT.md 新增 Register 词条。四票全关,仅剩雾「上线检查单」随 spec 毕业。下一步 = 首次「地图→主流程」交接:/to-spec 写公开化改造 spec(输入:#9 清单 + #10/#11 决议 + 图 Notes);prototype(.scratch/prototype/)答完题,spec 定稿后删或抛一次性分支。间隔重测(0001-0004)已到期可安排。本地未提交文件:0004 课件、index.html、CONTEXT.md、NOTES.md、learning-records 0005/0006、docs/register.md、.scratch/(research+prototype)——交接前宜 commit 收口,等用户发话。
- 维护提醒:未来新增课件 0004+ 时,把条目加进 index.html 的 ITEMS 数组(只改一处);课件文件名建议沿用「中文·英文」一致的标题风格。


