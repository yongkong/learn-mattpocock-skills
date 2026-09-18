# 研究笔记:上游内容的引用边界(AI Hero 与 mattpocock/skills)

- 对应 issue:yongkong/learn-mattpocock-skills#8
- 日期:2026-09-18
- 纪律:每个论断追到一手来源;查不到的注明「未能确认」。
- 本文件是本地未跟踪笔记,不要 git add/commit/push。

## 一手来源清单(全部于 2026-09-18 实际抓取)

| 来源 | URL | 状态 |
|---|---|---|
| skills 仓库 LICENSE 原文 | https://raw.githubusercontent.com/mattpocock/skills/main/LICENSE | MIT,`Copyright (c) 2026 Matt Pocock` |
| skills 仓库 README | https://raw.githubusercontent.com/mattpocock/skills/main/README.md | 含改编邀请原话 |
| skills 仓库许可元数据 | https://api.github.com/repos/mattpocock/skills/license | `spdx_id: MIT, path: LICENSE` |
| AI Hero 文章(课内主引) | https://www.aihero.dev/5-agent-skills-i-use-every-day | HTTP 200,正文完整,免费 |
| AI Hero skills hub | https://www.aihero.dev/skills | HTTP 200,免费邮件课,页面标 `25 skills · MIT` |
| AI Hero 文章(grill-me 故事) | https://www.aihero.dev/my-grill-me-skill-has-gone-viral | HTTP 200 |
| AI Hero 站点条款 | https://www.aihero.dev/privacy(页脚 "Terms" 实际指向此处) | HTTP 200,内容为 Terms of Service |
| AI Hero /about、/terms | https://www.aihero.dev/about 、 https://www.aihero.dev/terms | 均 HTTP 404 |
| grilling SKILL.md(frontier 出处) | https://raw.githubusercontent.com/mattpocock/skills/main/skills/productivity/grilling/SKILL.md | 已确认含 frontier / design tree |
| codebase-design SKILL.md(seam 出处) | https://raw.githubusercontent.com/mattpocock/skills/main/skills/engineering/codebase-design/SKILL.md | 已确认含 seam / deep module |

## 逐渠道结论表

| 渠道 | 结论 | 依据 URL | 风险级别 |
|---|---|---|---|
| 1. 直接链接 AI Hero 文章与 mattpocock/skills 仓库 | **安全。** 被引页面全部公开免费可访问(文章页 200、无付费墙迹象,页面含 "Free course" 字样);链接不复制内容,不触碰条款。 | https://www.aihero.dev/5-agent-skills-i-use-every-day ;https://www.aihero.dev/skills ;https://github.com/mattpocock/skills | 极低 |
| 2. 英文短摘引(标出处) | **可行,但要短、必须标出处。** AI Hero 条款第 2 节禁止「未经书面许可复制、复制、出售服务的任何部分」;短句引用用于评论/教学属惯例上可接受的范围,整段/成篇转载则不可。课内已有先例(0002 中 "it is a reference to consult, not a session to run" 短引 + 出处),保持该粒度即可。 | https://www.aihero.dev/privacy(Section 2: General Conditions) | 低(短句)/ 高(成段) |
| 3. 中文翻译或转述上游观点 | **观点级转述 + 出处:安全**(版权保护的是表达,不是观点、方法、事实本身)。**整篇翻译:不可**(翻译属复制/演绎,直接撞上述 ToS 条款)。句子级翻译引用:可行,建议标注「中译/意译」以免被当作逐字原文。 | https://www.aihero.dev/privacy(Section 2);https://www.aihero.dev/5-agent-skills-i-use-every-day | 低(短)/ 高(整篇) |
| 4. 对 SKILL.md 体系与术语的结构性复用 | **安全,且被上游明确邀请。** ① 仓库整体 MIT:明文允许 use/copy/modify/merge/publish/distribute/sublicense/sell,唯一条件是保留版权与许可声明;② README 原话 "Hack around with them. Make them your own.";③ frontier、design tree、seam 等单个术语是概念/单词,不在版权保护范围,且其载体 SKILL.md 本身就是 MIT;④ 唯一边界:MIT 只覆盖 skills 仓库内容,**AI Hero 博文不在其列**。 | https://raw.githubusercontent.com/mattpocock/skills/main/LICENSE ;https://raw.githubusercontent.com/mattpocock/skills/main/README.md ;…/skills/productivity/grilling/SKILL.md ;…/skills/engineering/codebase-design/SKILL.md | 极低(附非官方声明) |

## MIT 到底管什么、不管什么(分渠道说清)

来源:LICENSE 原文关键句 —— "Permission is hereby granted, free of charge, to any person obtaining a copy … to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software … subject to the following conditions: The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software."

**MIT 管的(仅限 skills 仓库这个 "Software"):**
- 复制、修改、再分发、再授权、甚至销售 SKILL.md 等仓库内容——全部明文允许。
- 义务只有一条:在「copies or substantial portions」中保留 `Copyright (c) 2026 Matt Pocock` 与许可文本。
- 本课程按计划以 CC BY-SA 4.0 发布与之兼容:MIT 文本嵌入 CC BY-SA 文档是允许的,前提是保留 MIT 声明(MIT 部分不得被改成 CC BY-SA)。

**MIT 不管/不要求的:**
- **AI Hero 博文不受 MIT 覆盖。** LICENSE 只授予 skills 仓库这份 Software;aihero.dev 的文章是独立作品,站点未提供开放许可,默认保留所有权利,另有 ToS 的复制限制条款。所以「MIT 可复用」仅适用于 SKILL.md,不适用于文章内容。
- 不要求你的课程也以 MIT 发布;不禁止你收费或商用。
- 不管商标/名称:在课件里使用 "Matt Pocock""AI Hero" 名称指代,MIT 不管也不授权,靠「非官方声明 + 仅作指代」处理。
- 本课现状(全原创中文表达讲解概念、只放链接和短引)严格说**不构成** "substantial portions" 的复制,连保留 MIT 声明的强制义务都不触发;署名是礼仪而非义务。

## 未能确认的事项

- AI Hero 站点**页脚没有发现任何 © / copyright / all rights reserved 声明**(在首页、文章页、/skills 页 HTML 中检索均无)——站点级版权声明未能确认,仅能依据 ToS 与默认版权规则推断。
- /about 与 /terms 均 404;页脚 "Terms" 链接实际指向 /privacy(标题 "AI Hero by Matt Pocock",内容为样板式 Terms of Service,自述 "Our storefront is created with Gatsby")。
- 未发现任何禁止外链、要求事先书面许可才能链接的条款。

---

## A) Actionable:lessons/0001-0004 现有引用方式要不要调整

现有模式(`(来源:<a href>标题</a>)` 的 cite 标注)整体符合上述边界,**不需要大改**,做四处微调:

1. **SKILL.md 出处改深链**:0002 行 40/55/69、0004 行 44/62/74 的 href 目前指向仓库根 `https://github.com/mattpocock/skills`,建议统一改为具体文件 blob 路径(0004 行 99 已是正确示范),如 `https://github.com/mattpocock/skills/blob/main/skills/productivity/grilling/SKILL.md`。
2. **翻译引语标注**:0002 行 72 的「把 TDD 做好,是提升 agent 代码质量最一致的方法。」是文章原话的中译而非逐字引用,建议在 cite 内补「(中译)」字样。
3. **英文短引保持现状**:0002 行 69 的 "it is a reference to consult, not a session to run"(短句 + 出处 + 中译对照)已合规,不动。
4. **0003 无需处理**:该文件仅出现插件名 `mattpocock-skills`,无上游引用链接。

站点层面配合 B 节的「关于/致谢」页做一次总署名,各页课件不必重复声明。

## B) Actionable:「关于/致谢」页建议文案要点

1. **非官方声明(必须有)**:本课程是独立的第三方中文教学资源,与 Matt Pocock、AI Hero 无隶属、合作或背书关系;内容中的理解偏差与错误由本课作者负责。
2. **致谢(必须有)**:本课所教的 skills 体系由 Matt Pocock 开发,以 MIT 许可开源发布于 github.com/mattpocock/skills;方法论讲解主要参考 AI Hero 的免费内容:《5 Agent Skills I Use Every Day》与 "AI Skills for Real Engineers" 模块(https://www.aihero.dev/skills)。
3. **出处链接(必须有)**:至少给出上条两个链接,课件内已引文章可复述。
4. **独创性声明(建议)**:全部中文讲解文本为原创,建议读者阅读上游原文获取一手表述。
5. **许可声明(建议)**:课程文本以 CC BY-SA 4.0 提供;上游 SKILL.md 仍按 MIT 许可,若课程复用其文本,将保留 MIT 版权与许可声明。
6. **商标提示(可选)**:"Matt Pocock""AI Hero" 及相关名称归其所有者所有,此处仅用于指代与说明。
7. **告知作者(可选,纯礼仪)**:可通过 X(@mattpocockuk,来自 AI Hero 页面 JSON-LD 的 sameAs 字段)告知这个中文课程的存在;没有任何条款要求此事。
