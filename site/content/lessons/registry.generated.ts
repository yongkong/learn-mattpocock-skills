// 本文件由 scripts/gen-lessons.mjs 生成(predev/prebuild),请勿手改。
import type { LessonEntry } from "@/lib/structure";

/** 全部课件元数据,来源:各 MDX 的 frontmatter。顺序即课程顺序。 */
export const LESSONS: LessonEntry[] = [
  {
    "num": "0001",
    "short": "全局地图",
    "title": "全局地图:25 个技能,一条流水线",
    "lede": "25 个技能,一张地图:一条从想法到上线的流水线,加每个技能在图上的位置。学完它的检验标准只有一个——任何情境,10 秒内说出该用哪个技能。",
    "module": "主流程"
  },
  {
    "num": "0002",
    "short": "参考层深挖",
    "title": "参考层四技能:流程的四台发动机",
    "lede": "主流程(grill → spec → tickets → implement → review)的每一步里,真正干活的是参考层这四个可复用技能:grilling、domain-modeling、codebase-design、tdd。这课四个全讲,最后混编出题。主流程全景见 0001。",
    "module": "参考层"
  },
  {
    "num": "0003",
    "short": "实战",
    "title": "实战:跑通主流程前三站",
    "lede": "地图(0001)和四台发动机(0002)都认识了。这课没有新知识——它是一份飞行清单,带你在你自己的仓库把 /grill-with-docs → /to-spec → /to-tickets 真正跑一遍。跑完,前三站就从「知道」变成「做过」。",
    "module": "主流程"
  },
  {
    "num": "0004",
    "short": "Shaping 模块",
    "title": "把不确定变成决策:三条绕行道",
    "lede": "主流程有一个隐含前提:路已经看清了。当路还没看清——想法大到一次会话装不下、一个设计问题在纸面上推不动、决策卡在仓库外的一个事实上——硬走主流程只会把模糊带进 spec。Shaping 模块的三个技能就是为这时准备的绕行道:/wayfinder、/prototype、/research。",
    "module": "Shaping"
  },
  {
    "num": "0005",
    "short": "Upkeep 模块",
    "title": "保持健康:不让仓库腐烂的五个保养技能",
    "lede": "主流程默认进料是干净的:spec 有共识、工单说得清、代码改得动。Upkeep 模块的五个技能不服务于某个特性,它们保养的是这两样东西本身——工单池不堆烂票,代码库不积烂账:/triage、/diagnosing-bugs、/resolving-merge-conflicts、/improve-codebase-architecture、/wizard。",
    "module": "Upkeep"
  },
  {
    "num": "0006",
    "short": "协作模块",
    "title": "人的工作流:流程两端的六个协作技能",
    "lede": "代码之外,流程两端各有一个会缺信息的人:你,和下一个接手的 agent。协作模块的六个技能服务的都是「人」这一端:/grill-me、/handoff、/to-questionnaire、/wait-what、/writing-for-agents、/teach——补上会话边界的记忆,补上你一个人的信息盲区。",
    "module": "协作"
  }
];
