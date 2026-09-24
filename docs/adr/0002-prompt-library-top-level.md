# 0002 — Claude Code 提示词库以顶级类目「提示词库」挂载

状态:已采纳(2026-09-24)

## 背景

本地工具页 `D:\dev\AI\Claude\claude-prompt-library\index.html`(自包含单页:Claude Code 官方提示词库 52 条中英对照,含搜索 / 阶段×类别×角色筛选 / 槽位填充复制 / 背诵模式 / 随机抽背 / 深浅色)要融入 Site。它与 skills 五章、Crash Course 均无课程归属:内容源出 Anthropic 官方文档(code.claude.com/docs/zh-CN/prompt-library),不是 Matt Pocock 体系的作品,也不是线性课件序列——是一份工具型学习内容,形态上最接近 Dictionary。

## 决策

- 不入模块章、不做课件系列;`MODULES` 维持五枚不变。新增顶级类目 `TOP_LEVELS`:`{ key: "prompts", label: "提示词库·Prompt Library" }`,与速查 / 词典 / 实战平级;页头导航与课件页目录树由其派生,零手写。
- 数据从源页内嵌 `DATA` 数组单点迁移为站点内容源 `site/content/prompts/data.ts`(纯 TS 数据,构建期内置,无运行时抓取);`fillPrompt` / `promptIndex` 两个纯函数随之入库。
- 交互以客户端组件 `site/components/prompts/browser.tsx` 用 React 重写(搜索、筛选、卡片展开、槽位编辑、复制拼装、背诵模式、随机抽背),视觉走站点壳与 Tailwind token;弃用源页自带的页头与主题切换(站点无全局深浅色开关,组件以 Tailwind `dark:` 变体预留)。
- 源页的「六大通用模式」「背诵建议」作为 `/prompts` 页静态区块随迁;页脚注明数据来源与版权归属(原文 Anthropic,中文转述本站)。
- 不设学习进度键(工具型内容,同 Reference / Dictionary,不进 Progress 体系)。
- `site-check.mjs` 的 `STATIC_ROUTES` 增加 `/prompts`;首页「按情境进入」增加一张情境卡指向 `/prompts`;`CONTEXT.md` 新增 Prompt Library 词条。

## 后果

- 站点信息架构变为「一门课 + 四个顶级类目」;导航、目录树、路由契约全部由 TOP_LEVELS / STATIC_ROUTES 派生,无手抄清单。
- 官方库更新时只改 `data.ts` 一处,组件与页面不动。
- 源页保留在本地 `D:\dev\AI\Claude\claude-prompt-library\` 作底稿,不进仓库;仓库内以 data.ts 为唯一内容源。
