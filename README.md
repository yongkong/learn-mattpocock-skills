# learn-mattpocock-skills

「**Agent Skills 中文课**」——用 Matt Pocock 的 [agent skills](https://github.com/mattpocock/skills) 教「如何系统使用 agent skills」的非官方中文课程。

- **课程站点**:应用在 [`site/`](./site)(Next.js + shadcn/ui,静态生成),部署于 Vercel;见 [docs/launch-checklist.md](./docs/launch-checklist.md)
- **内容管线**:课件与词典词条在 `site/content/`,构建期渲染;课程结构唯一来源为 `site/lib/structure.ts`
- **站点检查**:本地 `cd site && npm run check:site`;CI 随 push/PR 执行
- **本仓库同时是教学决策的公开工作区**:MISSION / NOTES / CONTEXT / learning-records 保留公开(不进站点导航)
- 课程内容以 [CC BY-SA 4.0](./LICENSE) 提供;非官方声明与致谢见站点关于页

## 学习历程 · 实战案例

这个课站本身就是案例:**学这套 skills 的过程,就是用这套 skills 把它造出来的过程**——课程教什么,仓库的 issue 历史就真实走过什么。三天、24 张 issue、10 份学习日志:主流程(`grill → spec → tickets → implement`)三轮完整跑通,首次 `/wayfinder` 铺图到走清,上线排障与架构评审全程留痕。完整复盘见 [docs/journey.md](./docs/journey.md)。
