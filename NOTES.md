# Notes

- 语言:课件中文为主,命令名/术语保留英文。用户以中文交流。
- 水平:自述"用过多数技能",痛点是零散使用、想系统化。课程重心 = 全局地图 + 技能衔接 + 补盲点,不重讲单技能入门。
- 本工作区 `D:\dev\AI\matt` 同时是 skills 的实验沙盒:已跑过 `/setup-matt-pocock-skills`(AGENTS.md + docs/agents/ 已配置,issue tracker = local markdown,`.scratch/` 尚未创建)。练习课可在这个仓库里真实使用技能(如用 /to-tickets 往 `.scratch/` 里拆工单)。
- 教学文件(lessons/、reference/、assets/、learning-records/)与沙盒文件(AGENTS.md、docs/)共存于本仓库,互不干扰。
- 用户有 Axure 式原型背景(原型 = 给人看的交付物)。讲 Shaping 模块时,prototype 的「答题实验」定位要从这个对比切入(见 learning-records/0002)。
- 用户会针对课件概念追问,回答时多用对比和具体例子,少用抽象定义。
- ⚠️ 课件必须自成一体:不写「你已经学过 X」「上一轮说过」「明天回来复习」这类依赖当前对话或当下时点的表述。用户会把课件保存下来隔几周重看,届时可能全忘了——每课按「第一次读」写,课程间用链接互引没问题,但正文不能假设读者记得其他内容或会话历史。间隔复习写成相对说法(「第一次学完后的第 1、3、7 天」)。
- 进度:**词典(Dictionary)已交付待验收**(spec #4 → 工单 #5/#6,#5 交付中途用户修订架构:导航页 + 一词一个中文 MD(reference/dictionary/)+ 卡片弹层 + marked.js 本地渲染;69 词全量,commits d4ef462..8904373,未 push 等用户发话)。词典卡片 fetch MD 需 HTTP 访问(file:// 拦截),页面内建提示。全流程闭环达成(grill → spec → tickets → implement → review → 用户验收),course-homepage(#1/#2/#3)已验收关闭。复盘遗留小项:spec 里混入两个文件路径的写法,下次注意。下一课候选:用用户真实工作想法再跑一轮全流程(老师退到教练位)、/implement 深挖课(本次用户已亲自行使架构修订权,seam 决策已显式发生)、Shaping 模块(prototype≠Axure 切入)、间隔复习(重做 0001-0003 测验)。
- 维护提醒:未来新增课件 0004+ 时,把条目加进 index.html 的 ITEMS 数组(只改一处);课件文件名建议沿用「中文·英文」一致的标题风格。


