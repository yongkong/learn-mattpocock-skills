# Prototyping · 原型实验

[原文 ↗](https://github.com/mattpocock/dictionary-of-ai-coding/blob/main/dictionary/Prototyping.md)

让 <em>agent</em> 快速搭一个粗糙版本——用在对话保真度不够、你需要一个真实产物才能谈下去的时候。

<em>Grilling</em> 在对话里消解设计决定。对话便宜,但低保真:有些问题话语言答不了——一个交互摸起来什么感觉、一个 API 形状在真实调用代码里顺不顺手、一屏数据到真实量级还立不立得住。访谈撞上这样的问题,你诚实的回答是「不知道,得看到才行」。过了这个点,讨论开始原地打转。正确动作是:让 agent 把东西做出来,你看一眼,带着答案回到对话里。

Agent 把「做」的成本打了下来,这件事才变得可行:过去要糊一天的粗糙版本,现在几分钟,值得变成常规动作。这也是 <em>human-in-the-loop</em> 的技法:原型存在的意义就是让你对它作反应。

你通常不会只看一眼——对着原型迭代:反应、要求改、再反应——每一轮都对着真实产物多敲定一个决定,保真度高于对话所能。

原型不必一律糙:你完全可以把正在评估的那几块做到生产质量,决定落定之时,你反应过的那个组件或 API 可以直接搬进真代码库。这让原型成为 <em>spec</em> 值得引用的实质材料。

**Usage**

"We've spent half an hour arguing about whether the wizard should be one page or three steps."  
「向导该做成一页还是三步,我们已经吵了半小时。」

"Words won't settle it — have the agent prototype both. We'll click through them and know in five minutes."  
「靠说定不了——让 agent 把两种都做个原型。点一遍,五分钟见分晓。」
