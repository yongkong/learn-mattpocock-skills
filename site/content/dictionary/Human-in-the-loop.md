# Human-in-the-loop · 人在环中

[原文 ↗](https://github.com/mattpocock/dictionary-of-ai-coding/blob/main/dictionary/Human-in-the-loop.md)

一种工作模式:一个或多个人在 <em>session</em> 期间与 <em>agent</em> 结伴——实时地评审、纠偏、协作。人在场、人在参与,不只是给单个动作放行。

对照面是 <em>AFK</em>:agent 无人值守地跑,你事后评判结果。人在环中意味着趁问题还便宜时接住它:你看见 agent 伸手去拿错的文件、误读需求、开始钻进死胡同,一句话把它拽回来——而不是等二十分钟自信满满的工作全压在错误上之后才发现。Agent 不可靠地知道自己何时跑偏;放它独处,它倾向于硬着头皮往前推,而不是停下来问。

哪种模式合适,取决于活本身:目标明确、低风险、易验证的任务适合 AFK;含糊、不可逆、或成品难审的活——schema 迁移、棘手的设计决定、一切碰生产的——适合留在环中。判断题本质上是一道:走错一步的代价多大,你多晚才会发现?

有些工作天然在环中,因为<em>你的反应就是输入</em>:<em>grilling</em> 离开你回答问题就不成立;<em>prototyping</em> 离开你对原型的反应也不成立。

留在环中花的是你的注意力——最稀缺的资源。用 agent 越来越好的一部分,就是把更多工作安全地挪出环外:事前计划、<em>automated check</em>、收尾的 <em>human review</em>,替代全程盯梢。

**Usage**

"Run this AFK overnight?"  
「这个活挂机跑一晚上?」

"No, schema migration — keep it human-in-the-loop. I want to see each step and steer if it picks the wrong column to backfill from."  
「不行,schema 迁移——保持在人在环中。每一步我都要看着,它要是挑错了回填依据的列,我好纠。」
