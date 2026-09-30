# Agent Skills 中文课 · 设计系统(Master)

> 主题:「课本 × 终端」(Textbook × Terminal)——给写代码的人读的中文课。
> Light 模式是「课本」:纸面质感、知识蓝、长文阅读优先;Dark 模式是「终端」:代码暗色、克制点缀。
> 数据源:ui-ux-pro-max 检索(Minimalism & Swiss Style / Code-dark 配色 / Knowledge-blue 配色 / Developer Mono 字体)+ 现有组件语义色盘点。

## 1. 设计原则

1. **阅读优先**:这是一个读长文的课,一切视觉决策服务于「读得舒服、读得久」。装饰让位于排版。
2. **开发者语境**:用代码世界的视觉词汇说话——终端窗、等宽编号、git 绿点——但只做点缀,不做成「黑客风」主题乐园。
3. **双模式同构**:Light = 课本(暖纸面 + 知识蓝),Dark = 终端(slate 暗底 + 亮蓝)。语义色(emerald/amber/red)两模式等价。
4. **Swiss 极简**:网格、留白、清晰字阶;不用渐变、玻璃拟态、3D 软糖风(检索首推的 Claymorphism 已明确否决——那是儿童教育向)。

## 2. 色彩 Tokens(可直接替换 `site/app/globals.css` 的 `:root` / `.dark`)

### Light ·「课本」

| Token | 值 | 说明 |
|---|---|---|
| `--background` | `oklch(0.985 0.004 95)` | 暖纸白(非纯白,微暖调,减 LCD 刺眼) |
| `--foreground` | `oklch(0.22 0.02 265)` | 墨蓝黑正文 |
| `--card` / `--popover` | `oklch(1 0 0)` | 纯白卡片 |
| `--primary` | `oklch(0.42 0.14 265)` | 知识蓝(≈ #1E3A8A 系),链接、主按钮、选中态 |
| `--primary-foreground` | `oklch(0.985 0.004 95)` | |
| `--secondary` / `--muted` / `--accent` | `oklch(0.965 0.006 265)` | 蓝灰底 |
| `--muted-foreground` | `oklch(0.48 0.02 265)` | 次要文字,正文对比 ≥ 4.5:1 |
| `--border` / `--input` | `oklch(0.905 0.01 265)` | |
| `--ring` | 同 `--primary` | 焦点环 |
| `--destructive` | `oklch(0.55 0.22 27)` | |

### Dark ·「终端」

| Token | 值 | 说明 |
|---|---|---|
| `--background` | `oklch(0.14 0.018 267)` | slate-950 系代码暗色(≈ #0B1020) |
| `--foreground` | `oklch(0.94 0.01 250)` | |
| `--card` / `--popover` | `oklch(0.18 0.02 267)` | |
| `--primary` | `oklch(0.72 0.12 250)` | 亮蓝(≈ #7CA5FF 系),暗底可读 |
| `--primary-foreground` | `oklch(0.14 0.018 267)` | |
| `--secondary` / `--muted` / `--accent` | `oklch(0.235 0.02 267)` | |
| `--muted-foreground` | `oklch(0.68 0.02 255)` | 正文对比 ≥ 4.5:1,不许降到 3:1 |
| `--border` | `oklch(1 0 0 / 12%)` | |
| `--ring` | 同 `--primary` | |
| `--destructive` | `oklch(0.66 0.19 23)` | |

### 语义色(两模式通用,已是现状,正式入册)

| 语义 | Tailwind 色族 | 用途 |
|---|---|---|
| 成功 / 已学 / 答对 | `emerald` | 学习进度点、测验正确反馈、CI 式绿点 |
| 提示 / 可编辑 / 重点 | `amber`(浅)· `orange`(槽位) | 随堂测提示、提示词库橙色可编辑槽位 |
| 错误 / 答错 / 破坏性 | `red` / `--destructive` | 测验错误反馈、删除操作 |
| 交互 / 链接 / 选中 | `--primary` 蓝系 | 唯一的品牌色,别处不得再开新蓝 |

**铁律**:绿只表达「完成/正确」,黄/橙只表达「提示/可编辑」,蓝只表达「可交互」。不得混用。

## 3. 字体

| 层 | 栈 | 说明 |
|---|---|---|
| 正文 sans | `Inter, -apple-system, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans SC", sans-serif` | Inter 排英文术语(Agent Skills / Skill / MCP),中文字形回落系统栈;零 webfont 中文,保加载速度 |
| Display(仅英文大标题/数字) | `Space Grotesk, <同上 sans 栈>` | 首页 Hero 的英文词、大数字;中文自动回落,不做中文 webfont |
| Mono | `"JetBrains Mono", "Cascadia Code", Consolas, monospace` | 代码、路由编号(0001)、标签、终端元素;JetBrains 提到最前 |

### 中文阅读排版(正文 MDX)

- 正文宽度:`max-width: 72ch` 上限,中文按 34–38 字/行折算;不做全宽段落。
- 行高:正文 `line-height ≥ 1.85`(中文必须高于西文 1.6 的惯例);标题 1.35。
- 段间距 > 行间距(约 1.6em),中文段落不缩进、靠间距分段。
- 中英混排:英文术语两侧留半角空隙(浏览器自动),术语**不加粗不加码**;只有「路径/命令/键名」才进行内 code。
- 行内 code 与代码块统一 JetBrains Mono;行内 code 底色用 `--muted`,暗色下 `--card` 提一档。

## 4. 组件风格

- **圆角**:全局 `--radius: 0.5rem`(现有 0.625rem 收锐半档,更 Swiss)。代码块 0.375rem。
- **边框优先,阴影克制**:卡片用 1px `--border` 描边 + 纯色底;仅弹层(popover/词典卡片)用柔和投影(`0 8px 24px rgb(0 0 0 / 0.08)`,暗色 `0 8px 24px rgb(0 0 0 / 0.4)`)。禁止大范围彩色阴影、发光。
- **代码块 = 终端窗**:顶部加「窗头」——三个 8px 圆点 + mono 小字文件名(如 `SKILL.md`),底色在两模式都比正文底深/浅一档。这是全站最强的品牌记忆点。
- **学习进度点**:已学 = emerald 实心圆点(6px),未学 = `--border` 空心圆点;列表、卡片、目录树统一用同一枚点。语义即「CI 通过绿」。
- **编号文化**:课件编号、workshop 编号一律 mono 展示(0001),这是检索推荐 Developer Mono 的落点,也与现有 `/workshop/000N` 一致。
- **图标**:Phosphor(`@phosphor-icons/react`)为默认库,同一层级只用一种风格(linear);禁止 emoji 当结构性图标;装饰性图标一律 `aria-hidden="true"`。

## 5. 动效

- 基调:**subtle**(检索输出即如此;读书的站不跳舞)。
- Hover/按压:150–250ms `ease-out`,只动颜色、边框、`translateY(±1px)`、阴影;不动布局尺寸。
- 页面内容不入场动画;若加,仅目录/卡片列表 30ms 级 stagger,且必须尊重 `prefers-reduced-motion: reduce`(动画全部关闭)。
- 测验即时反馈:正确/错误用 200ms 颜色过渡 + 边框闪烁一次,不做弹跳。

## 6. 反模式(明确不做)

- ❌ 儿童教育风:圆胖字体(Baloo 2 / Comic Neue)、软糖 3D、糖果色——第一轮检索结果,已否决。
- ❌ 黑客风主题乐园:满屏荧光绿、扫描线、glitch 特效——绿只留给「完成」。
- ❌ 玻璃拟态 / 大渐变 / 网格背景纹理——Swiss 靠留白和字阶,不靠底纹。
- ❌ 暗色模式用低对比灰字(正文 muted 低于 4.5:1)。
- ❌ 每个板块各起一套色:Workshop、提示词库、词典共用同一 token 表,差异只用布局和 mono 编号表达。
- ❌ emoji 当图标;PNG 位图图标。

## 7. 落地清单

- [ ] `site/app/globals.css` 按第 2 节替换 `:root` / `.dark` token(结构不变,直接换值)
- [ ] 字体栈按第 3 节更新 `--font-sans` / `--font-mono`,新增 `--font-display`
- [ ] `--radius` 0.625rem → 0.5rem
- [ ] 代码块组件加终端窗头
- [ ] 进度点组件统一 emerald 实心 / 空心两态
- [ ] MDX 正文排版:72ch、1.85 行高、段距 1.6em
- [ ] 验收:375px / 768px / 1440px 三档;双模式正文对比 ≥ 4.5:1;`prefers-reduced-motion` 下无动画;键盘焦点环(`--ring`)处处可见
