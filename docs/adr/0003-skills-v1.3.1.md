# 0003 — 课程跟进 skills v1.3.1:模块更名 Engineering、GLOSSARY.md 迁移、三技能入门

状态:已采纳(2026-10-12)

## 背景

上游 mattpocock/skills 发布 v1.3.1(2026-10-04),aihero.dev/skills 分类页同步改版。与课程的差异积累到结构性程度:

1. **模块更名**:原著第 04 类由 Upkeep 更名 Engineering,定位扩为「保养代码库与工单池,并为流程生成工作」。课程的 Module(模块章) key 明文取原著原词、不得意译改写(GLOSSARY.md Module 词条),必须随动。
2. **技能集变动**:`/implement-spec`、`/pr`、`/retro` 三个新技能转正(Engineering 桶),`/resolving-merge-conflicts` 被移除、无替代(冲突处理被视为 harness 层的活)。技能总数 25 → 27。aihero 主流程(The Main Flow)从五步变六步(review 之后加 retro);参考层(Reference Skills)从四个变五个(加入 pr);implement-spec 归入工程章(第 04 类)。
3. **文件更名**:`CONTEXT.md` / `CONTEXT-MAP.md` 全面更名为 `GLOSSARY.md` / `GLOSSARY-MAP.md`,理由:名字源自 DDD 限界上下文但过于含糊,文件实际早已收缩成纯词汇表。技能只认新名;官方迁移方式是 `git mv`,团队须在一个共同提交里完成。

## 决策

- **模块 key 改名**:`structure.ts` 的 `MODULES` 中 `Upkeep` → `Engineering`,展示名「保养·Upkeep」→「工程·Engineering」;0005 课 frontmatter `module: Engineering`,短名「保养技能」→「工程技能」。课程目录顺序不变。
- **0005 课重组**:删 `/resolving-merge-conflicts` 一节,新增 `/implement-spec` 一节(集成分支、任务图、worktree 实现子代理、合并子代理、收尾统一 code-review、作者自认的边界);课首加 v1.3 变化说明 callout 给老读者补课;十秒路由表、回忆题同步。
- **0001 课**:主流程五步改六步(retro 入图);参考层清单加 `/pr`;工程卡换血(−resolving-merge-conflicts,+implement-spec);计数 25 → 27;user/model-invoked 例词更新(retro 入 user、pr 入 model);加 v1.3 变化 callout。
- **0002 课**:标题改「参考层五技能:流程的五台发动机」,新增 `/pr` 一节(Summary / Evidence / Merge Danger 三段模板、GLOSSARY.md 措辞、show-me 署名);domain-modeling 一节补 GLOSSARY.md 改名缘由(DDD 名不副实、git mv 迁移)与 v1.3 放宽的触发条件(讨论术语、改 GLOSSARY.md/ADR 时自动进场)。
- **速查**:skill-flow-map 重排(六步流程、参考层五技能表、工程卡、路由表增 retro / implement-spec / pr 三行);artifact-shapes 新增「PR 正文长什么样」模板节;版本引用统一 v1.2.3 → v1.3.1。
- **测验**:quiz0001 增 retro 题、干扰项换 implement-spec;quiz0002 增 pr 题;quiz0005 第 1 题由解冲突换为 implement-spec;quiz0006 改 GLOSSARY 措辞。
- **工作区随上游迁移**:根 `CONTEXT.md` 经 `git mv` 更名 `GLOSSARY.md`(Module 词条同步改 key 并注记来源);`AGENTS.md` 与 `docs/agents/domain.md` 的指引改指新名。历史记录(NOTES.md、docs/journey.md、learning-records、ADR 0001/0002)中的旧名保留原样——它们记录的是当时的动作,不改写历史。

## 后果

- 课程与 v1.3.1 对齐:技能数 27、主流程六步、参考层五技能、工程章含 implement-spec。
- 学习进度不受影响(Progress 键是课件编号,不含模块名)。
- 老读者从 0001 / 0005 的变化说明 callout 一眼看到 v1.3 差量,不必重读全课。
- 工作区自身以 GLOSSARY.md 为正名,后续 agent 会话按 docs/agents/domain.md 读新名。
