---
title: "第三章 · 认识 Claude Code（Getting to Know Claude Code）"
section: "Getting to Know Claude Code"
lessons:
  - "P21 ｜ 021 Intro"
  - "P22 ｜ 022 Managing Your Claude Code Session"
  - "P23 ｜ 023 Prompting in the Terminal"
  - "P24 ｜ 024 Claude and Your IDE"
  - "P25 ｜ 025 Going Forwards and Backwards in Time"
  - "P26 ｜ 026 Running Bash Commands"
  - "P27 ｜ 027 Permissions"
source: "aihero.dev AI Coding Crash Course"
---

# 第三章 · 认识 Claude Code（Getting to Know Claude Code）

本章是 Claude Code 的「够用就好」工具入门：会话管理、终端提示技巧、IDE 集成、时间回溯、bash 命令与权限模型。课程核心方法论不绑定任何特定 agent，这些能力在别的 harness 里也各有对应，学会一个就够用了。目标不是穷尽功能清单，而是让你能顺畅跟住后续章节的所有演示。

## P21 ｜ 021 Intro

**要点**

- 全程以 Claude Code 作为演示用的 agent harness
- 课程本身是 harness agnostic 的，不强制使用任何特定工具
- 有一个可选的 primer 章节，帮助新手打基础

**笔记**

这门课程全程用 Claude Code 来驱动教学：作者用它演示 agent 的各种行为。选它的理由很直接——它是当下最流行的 harness 之一，作者本人用得最多，你可能也已经在用。但要明确一点：**这门课程是 harness agnostic 的**，你可以选用任何在 CLI 中运行的 harness，挑最顺手的就行。

如果你从没用过 coding harness，或者想把手上的 Claude Code 用得更透，可以先看作者提供的可选入门章节（optional primer section），把 agent 的基础知识补齐再进入正题。即使你已熟练使用自己的工具，这一节也值得扫一眼——里面除了基础内容，还有几个进阶技巧。

**动手**

- 确认已安装并能在终端运行所选的 harness（课程以 Claude Code 为例）
- 可选：过一遍 primer 章节再开始

**自测**

这门课必须用 Claude Code 吗？

> **A**：不必须。课程是 harness agnostic 的，任何能在 CLI 里跑的 harness 都可以，选最适合自己的工具即可。

已有 harness 使用经验，primer 章节还有必要看吗？

> **A**：值得扫一眼。它不止讲基础，还包含几个进阶技巧。

## P22 ｜ 022 Managing Your Claude Code Session

**要点**

- `/terminal-setup` 配置按键绑定，让 Shift+Enter 可以在提示词中换行
- `/usage` 查看剩余额度，`/context` 查看上下文构成，`/clear` 清空会话
- 模型是无状态的：清空上下文后，agent 对之前的对话毫无记忆
- Escape 可中断运行中的 agent

**笔记**

确保 Claude Code 已按 Before We Start 章节完成安装。整门课程都在 VS Code 里运行 Claude（本节先在集成终端里跑，Claude 与 VS Code 的关系后面再讲）。终端里运行 `claude` 启动，界面底部的大输入框就是输入提示词的地方，跟任何聊天应用一样直接对话即可。建议把终端缩放调大一点，看得更清楚。

开始前先执行一次 `/terminal-setup`：输入斜杠后从自动补全里选 terminal setup（选中后命令会变成淡紫色），回车运行。它负责配置按键绑定，最关键的是让 Shift+Enter 能在提示词里换行，这对写复杂的多行指令必不可少。多数系统直接运行即可，WSL 之类的环境可能需要手动处理；不装的话可能遇到奇怪的按键问题。

`/usage` 查看用量：当前会话的剩余额度、每周上限以及已用量（具体数字和标签随套餐与 agent 版本而变）。额度用尽就要等窗口重置才能继续。按 Escape 退出用量视图回到对话。

`/context` 可视化当前 context window 里装了什么：system prompt（给 agent 的指令）、skills（你添加的自定义技能）、消息历史各占多少 token，以及窗口总容量（原文举例：Claude 3.5 Opus 有 100 万 token）。排查配置问题时非常好用，本课程后面还会深入上下文管理。

`/clear` 清空当前会话的所有消息，重新开始。清空前后用 `/context` 对比 token 数可以验证效果（原文示例：带历史约 9,000，清空后约 6,600）——这证明了模型是无状态的，清空后 agent 对之前的对话一无所知。另一种做法：连按两次 Ctrl+C 退出再开新会话，同样得到干净、无记忆的上下文。

运行中想让 agent 停下来，按 Escape 中断即可，它会取消正在做的一切，上下文里出现 interrupted 标记并询问接下来做什么，你可以改派任务或让它继续。如果是不小心按到 Escape，输入 `carry on` 就能从断点恢复。

**动手**

```bash
claude                # 启动
/terminal-setup       # 配置按键绑定（Shift+Enter 换行）
/usage                # 查看剩余额度与每周上限
/context              # 查看上下文 token 构成
/clear                # 清空会话上下文
```

| 按键 | 作用 |
|---|---|
| Shift+Enter | 提示词内换行 |
| Escape | 中断运行 / 退出用量视图 |
| Ctrl+C 两次 | 退出并开启全新会话 |

示例提示词：`hello, how are you?` ／ `explore the code base` ／ `carry on`

**自测**

完成一个任务后，想在同一终端做不相关的新任务，且不受之前对话影响，怎么办？

> **A**：运行 `/clear` 清空对话历史。模型是无状态的，清空后对之前内容一无所知。`/context` 只查看不删除；让 agent「忽略」之前的消息并不能把它们移出窗口；Escape 只中断正在进行的运行。

agent 跑到一半明显方向错了，最省事的纠正方式是什么？

> **A**：按 Escape 停止并重新指路。`/clear` 和两次 Ctrl+C 都会把任务背景一起丢掉，得重新解释一遍；干等它跑完只是把已知的错误做完。

想看当前加载内容的 token 分布（system prompt、skills、对话历史），用哪个命令？

> **A**：`/context`。`/usage` 回答的是额度还剩多少；`/clear` 是清空而非查看；`/terminal-setup` 只装按键绑定。

## P23 ｜ 023 Prompting in the Terminal

**要点**

- 按 `@` 打开文件选择器，把文件直接拉进上下文，首次请求即可读取
- `Ctrl+S` 暂存写了一半的提示词，之后自动回填
- 剪贴板图片（含截图）可直接粘贴进提示词

**笔记**

引用文件：在输入框按 `@` 打开文件选择器，方向键浏览、输入文字模糊搜索（比如 `routes.ts`），按回车把文件拉进输入框，Tab 键也可以。可重复操作添加多个文件，例如在 `drizzle.config.ts` 后再加 `components.json`。发送后，这些文件在第一次请求时就被直接读入 context window，不需要额外的工具调用。要把 spec 或特定配置文件交给 agent 直接参考时，这个功能尤其好用。

暂存提示词：提示词写到一半，不想发又不舍得丢，按 `Ctrl+S` 暂存，界面出现 stashed 标记。这时可以继续输入别的内容并发送；发送完成后，被暂存的提示词会自动「回填」到输入框。比如先暂存 "hello, how are you"，接着输入 "hello" 并发送，原暂存内容就回来了。给 agent 反馈时特别实用——先发一条补充说明，再回来继续润色原本的长提示词。

粘贴图片：直接把剪贴板里的图片（包括截图）粘贴进输入框。复制图片后粘贴，左下角会出现 pasting 指示，图片进入提示词，然后就能直接向 agent 询问图片内容（课程示例是询问斯洛文尼亚布莱德湖的照片，agent 能识别出湖中教堂及其钟楼）。图片是提示词的一部分，截图、设计稿等视觉素材都能这样引用，无需单独上传。

**动手**

| 操作 | 方式 |
|---|---|
| 引用文件 | 输入 `@` 打开文件选择器，模糊搜索，回车或 Tab 确认，可重复多个 |
| 暂存提示词 | `Ctrl+S`，出现 stashed 标记；发送其他消息后自动回填 |
| 粘贴图片 | 复制后在输入框直接粘贴 |

**自测**

已知 agent 必须遵守某个配置文件，用 `@` 把它拉进来而不是用文字描述，会发生什么？

> **A**：文件内容在第一次请求时就已进入 context window，无需额外的工具调用。它不是延迟执行的指令，也不是存起来以后再解析的链接，更不会在编辑器里打开——`@` 只是把文件填进你的输入框。

长提示词写到一半，发现 agent 需要先处理一条简短纠正，草稿怎么办？

> **A**：按 `Ctrl+S` 暂存，先发短消息，发送后草稿自动回填。复制到临时文件再贴回、或删掉重打，都是手动做 stash 自动做的事；直接把写了一半的提示词发出去，agent 会把它当成完整指令去执行。

## P24 ｜ 024 Claude and Your IDE

**要点**

- `/ide` 命令管理 IDE 集成、查看连接状态
- 支持 VS Code、Cursor、Windsurf、Antigravity 等，不限于课程演示的 VS Code
- 连接编辑器的首要价值是在 IDE 里审阅 diff，这是 99% 场景的用途

**笔记**

通过 `/ide` 命令让 Claude Code 与你的编辑器集成。不必非用 VS Code，Cursor、Windsurf、Antigravity 或你手头有什么就用什么。运行 `/ide` 会显示当前连接的编辑器——课程里显示已连接 Visual Studio Code，因为装了 Claude Code for VS Code 扩展；如果你的 IDE 还没连上，`/ide` 会给出对应扩展的安装方法。确认并退出命令后即可开始使用。

连接编辑器的核心理由是 diff 管理，这在与 agent 协作中出现频率极高。比如让 agent「把 test watch 命令从 package.json 里移除」，它会读取并修改文件。没有编辑器连接时，diff 只能在终端里以文本展示，既别扭又难审；连接后 diff 直接显示在 IDE 里：可以滚动文件看上下文、检查 agent 的每一处改动、点 Accept Proposed Changes 按钮全部接受，也可以点进 diff 手动微调后再保存文件确认。能直接在编辑器里修改 agent 的输出，比在终端里审阅顺畅得多。

编辑器集成还有更多功能和接入方式，但 diff 是你绝大多数时间用到的那一个，也是在编辑器里跑 agent 而非纯终端的首要理由。跟练时卡住了可以回看视频，遇到问题也可以到 Discord 提问。

**动手**

```
/ide
```

- 安装对应 IDE 的扩展（如 Claude Code for VS Code）
- 审阅 diff：点 Accept Proposed Changes 全部接受，或点进 diff 手动微调后保存

**自测**

`/ide` 命令的作用是什么？

> **A**：查看和管理 IDE 集成——显示当前连接的编辑器；未安装扩展时会提示如何安装对应 IDE 的扩展。

连接编辑器后，审阅 agent 的改动比在终端里好在哪？

> **A**：diff 在 IDE 中图形化展示，可以滚动看上下文、逐处检查改动、一键全部接受（Accept Proposed Changes），或手动微调后再保存；终端里只有文本形式的 diff，难以审阅。

## P25 ｜ 025 Going Forwards and Backwards in Time

**要点**

- 直接让 agent 撤销，或用 rewind mode（快速连按两次 Escape）回退到任意检查点
- 回退时可选择只恢复代码、只恢复对话，或两者都恢复
- 会话本地持久化：可用 `claude --resume [UUID]`、`/resume`、`claude --continue` 三种方式恢复

**笔记**

agent 的一大重要能力是在会话中前后移动，这对「试了一下又想反悔」的场景至关重要。

最直接的撤销：像上一课删除了 dev script，现在直接输入 `revert that, please`，agent 会把改动重写回去，按 Control S 保存 diff 接受。但更强大的是 rewind mode：快速连按两次 Escape 进入，可以把代码和会话恢复到本会话中任意更早的检查点。列表最底部是当前状态，上面一格就是你说「revert that, please」之前的那个点，用 Enter 选中即可。

恢复时有三个选项（见下方「动手」表格），最常用的是完整恢复代码和对话。想退得更早，就再次进入 rewind mode 选更早的检查点，可以一路回退整个会话历史。列表里还有 `summarize from here` 命令（后续课程再讲）；选 nevermind 则取消回退、保持现状。

会话还会本地持久化：连按两次 Ctrl+C 退出后有多种恢复方式。退出时输出里会给出可直接运行的 `claude --resume [UUID]`，执行后回到离开时的确切状态；或者运行 `claude` 开个新会话，输入 `/resume`，会列出这个仓库里的所有历史会话（支持搜索），选中后按 Return 回去；最省事的是 `claude --continue`，直接跳进最近一次会话，不用过菜单。无论会话因何种原因中断，都能随时恢复。

**动手**

| 操作 | 方式 |
|---|---|
| 让 agent 撤销改动 | 提示词 `revert that, please`，`Control S` 保存接受 |
| 进入 rewind mode | 快速连按两次 `Escape`，`Enter` 选中检查点 |
| 取消回退 | 选 `nevermind` |
| 恢复指定会话 | `claude --resume [UUID]` |
| 从菜单选会话 | 新会话中运行 `/resume`，可搜索，`Return` 确认 |
| 直接回到最近会话 | `claude --continue` |
| 退出 | `Ctrl+C` 两次 |

rewind mode 的三个恢复选项：

| 选项 | 效果 |
|---|---|
| Restore the code and the conversation | 整场回退到这次代码改动之前（最常用） |
| Restore the conversation but keep the code | 保留当前代码，只回退对话 |
| Restore the code but keep the conversation | 保留对话历史，只回退代码 |

**自测**

试了一种方案，agent 改了文件，你想连改动带产生改动的消息一起抹掉，选哪个 rewind 选项？

> **A**：Restore the code and the conversation——只有完整恢复才会把会话回退到改动之前。保留代码等于把想删的改动留在磁盘上；保留对话则把失败尝试留在历史里；nevermind 是取消回退、维持现状。

回到上周干过活的仓库，想找回其中一段特定对话（不是最近一次），怎么进去？

> **A**：运行 `/resume` 并搜索历史会话列表，选中想找的那一个。`claude --continue` 只回到最近一次会话；连按两次 Escape 是在当前会话内部回退，不能切换会话；新会话不含任何历史。

## P26 ｜ 026 Running Bash Commands

**要点**

- bash mode（`!` 前缀）：执行命令并把输出放进 agent 上下文
- `Ctrl-B` 把 dev server 等长驻进程转入后台，日志写入本地文件
- `Ctrl-Z` 挂起 agent，执行不想让它看到的命令，`fg` 原样恢复

**笔记**

bash 命令是用好 Claude Code 的关键一环：它让 agent 从被动的代码书写者，变成能主动建立反馈回路、真正操作项目的助手——bash 的全部能力都为它所用。当然可以直接让 agent 自己琢磨怎么跑 dev server（聪明的它会读 package.json、找到命令、执行），但很多时候你明确知道要跑什么，只想立刻执行并把结果放进 agent 的上下文。共有三种做法。

第一，bash mode。输入 `!` 进入 bash mode，之后输入的内容会作为 bash 命令真实执行，输出直接进入 agent 上下文。例如 `! npm run typecheck`。课程示例里因为没跑过 npm install，报出一堆 Zod 缺失的错误——这些错误现在就在 agent 上下文里，它能看到并着手处理：发现 Zod 在 package.json 中声明了但没安装，于是建议运行 npm install。

第二，后台运行长任务。dev server 这类不会退出的命令，在 bash mode 输入 `! npm run dev`，趁其运行时按 Ctrl-B 转入后台，界面提示 command was manually backgrounded（附 userID）。此后该任务的输出写入本地文件，状态栏下方出现后台任务条目：按向下箭头再按回车可查看 shell 输出（示例中 dev server 跑在 localhost 5175），按 X 停止，按左箭头回到 agent。调试 dev server 问题时特别有用：agent 知道日志写在哪，可以在 UI 上尝试操作或发 curl 请求，然后直接读到 server 的输出。

第三，挂起 agent。想跑一条不让 agent 看到输出（或不值得给它看）的命令，又要保留 agent 当前状态时，按 Ctrl-Z 挂起 agent，然后在 shell 里随意执行（如 `echo foo`），这些对 agent 完全不可见；完后运行 `fg` 把 agent 原样带回来。

决策原则见下表：要 agent 看到输出就用 bash mode；长驻进程用 Ctrl-B 后台化——不是每次都用，但用到时多半是在调试 dev server；命令要对 agent 隐藏就 Ctrl-Z 挂起。注意这些快捷键在多数系统可用，Mac 上可能需要换一种按法。

**动手**

| 目标 | 方式 | 按键 |
|---|---|---|
| Agent 需要看到输出 | 使用 bash mode | `!` 前缀 |
| 长驻进程（dev server） | 转入后台并管理 | `!` 命令运行中按 `Ctrl-B` |
| 命令对 agent 隐藏 | 挂起 agent | `Ctrl-Z`，完后 `fg` 返回 |

```bash
! npm run typecheck   # 输出进入 agent 上下文
! npm run dev         # 运行中按 Ctrl-B 转入后台
echo foo              # Ctrl-Z 挂起 agent 后执行，agent 不可见
fg                    # 恢复 agent 及其状态
```

**自测**

想自己跑类型检查，再让 agent 修复它报告的问题，怎么执行？

> **A**：加 `!` 前缀用 bash mode 运行，输出会直接进入 agent 上下文，它立即就能处理这些错误。Ctrl-Z 挂起正是为了对 agent 隐藏输出，它将无从下手；第二个终端得手动复制错误；Ctrl-B 是给不退出的进程用的，类型检查自己会结束。

在 bash mode 里启动 dev server，它一直占着提示词不返回，怎么办？

> **A**：按 Ctrl-B 转入后台继续工作。它会输出到本地文件供 agent 读取，状态栏下方出现后台任务可供查看或停止。Ctrl-Z 挂起的是整个 agent 而非 server；Ctrl-C 杀掉后既没有运行中的 server 也没有日志可调试；dev server 不会自己结束，等下去只会无限等待。

要跑一条 agent 绝不能看到输出的命令，且事后 agent 状态要原样保留，怎么做？

> **A**：按 Ctrl-Z 挂起 agent，执行命令，再 fg 恢复。bash mode 的存在意义就是把输出喂进上下文，在那里跑等于把想藏的东西摆在 agent 面前；让它「别看」也拦不住已进入上下文的内容；退出 agent 虽然藏住了命令，却丢掉了想保留的状态。

## P27 ｜ 027 Permissions

**要点**

- 默认权限模型非常严格，核心是权衡交给 agent 多大权力
- 审批三选项：Allow once ／ Allow always ／ Reject and suggest
- 权限记录在 `.claude/settings.local.json`，可用 allow／deny 数组和通配符提前配置
- Shift+Tab 循环切换权限模式，auto mode 用 LLM 分类器自动判断命令安全性

**笔记**

与 agent 协作始终要权衡风险与收益，核心问题是你交给它多大权力——权力无限时，它可能无意间干出危险的事，比如删掉整个文件系统。为此 Claude Code 有一套非常细致的 permissions 模型，默认对自己极其严格。

审批流程：让它运行 `echo hello`，echo 极其安全，agent 不请示直接执行；但让它对项目跑类型检查时，它会先请求权限。请求界面显示要执行的完整命令、执行原因，以及三个选项：Allow once（本次允许）、Allow always（今后该项目内允许所有同类命令）、Reject and suggest（拒绝并建议替代命令）。示例中它想用 react-router-typegen 加 tsc 跑 `pnpm typecheck`；如果你更想用 `npx tsc`，按 Tab 写下替代命令，agent 会改为请求运行 npx tsc，用 allow always 批准后，权限里会多出 `Bash(npx tsc *)` 这样的条目。

权限记录在 `.claude/settings.local.json`。语法值得掌握，而且可以提前手动编辑，免去逐次审批：allow 数组放允许的命令，支持通配符；deny 数组禁止命令（详见下方代码块）。

需要权限的不止 bash：agent 还会联网搜索、抓取网页来佐证本地结论。例如让它查 react-router-typegen 的资料，它会请求批准一次 web search；同意并选择不再询问后，settings.local.json 里加入 `WebFetch(domain:reactrouter.com)`，随后它从官网抓取文档，给出基于真实文档的总结。

团队共享：settings.local.json 默认被版本控制忽略，权限只对你生效。把它重命名为 settings.json 并提交进仓库，团队任何人在该仓库运行 agent 都会自动继承这些权限——新人第一次运行就知道哪些操作被允许，远快于人手配置。

auto mode：模式选择器在 Claude Code 左下角，Shift+Tab 在 manual、edits、plan、auto 四种模式间循环。auto mode 用一个 LLM 分类器（大概率是 Claude Haiku）审视对话，判断即将执行的命令是否安全，安全就不再询问直接运行（如 `npm run typecheck`）。代价是每次判断消耗少量 token 和时间，所以稍慢。分类器并不完美：偶尔放行你不想让它做的事（如数据库迁移），也偶尔拦下你想做的事（如创建 GitHub issue）；但多数情况下判断正确，总能挡住 `rm -rf` 这类绝对危险的操作，对用量影响也不大，是笔划算的折中。auto mode 下 settings.json 依然重要：agent 先查 settings.json，再走分类器，把高频操作写进去就能绕过分类器提速。想把 auto 设为默认，进 config 选 default permission mode，按 Enter 或 Space 确认。

本课示例仓库的起点是 migrations 练习结束时的状态（commit: make-a-schema-change）。

**动手**

允许单条命令：

```json
{
"permissions": {
"allow": [
"Bash(pnpm typecheck)"
]
}
}
```

用通配符放行所有 `pnpm` 命令：

```json
{
"permissions": {
"allow": [
"Bash(pnpm *)"
]
}
}
```

禁止所有 `git push`：

```json
{
"permissions": {
"deny": [
"Bash(git push *)"
]
}
}
```

其他操作：`/ide` 管理集成；权限文件位于 `.claude/settings.local.json`，重命名为 `settings.json` 可提交共享；Shift+Tab 切换 manual／edits／plan／auto 模式；config 中设置 default permission mode（Enter 或 Space 确认）；联网授权后写入 `WebFetch(domain:reactrouter.com)`。

**自测**

团队每个人都在同一个仓库上反复批准同样几条命令，怎么让规则随 checkout 一起到位？

> **A**：把 settings.local.json 重命名为 settings.json 并提交。settings.local.json 被版本控制忽略，批准只留在本机；改名为 settings.json 后任何人第一次运行 agent 就自动继承。Allow always 仍要每人各批一次；auto mode 是逐条临场判断，不记录仓库规则；README 是给人看的，agent 不会拿它当权限。

切到 auto mode 让 agent 自行判断命令是否安全，代价是什么？

> **A**：每次判断是一次分类器调用，花 token，每条命令稍慢。settings.json 仍然最先被查询，这正是给常用命令提速的办法；分类器不是空白支票，`rm -rf` 这类必然危险的操作照样拦截；它对用量上限的影响也不大，所以这笔交易划算。

有一条命令（git push）无论 agent 当时怎么判断都绝不能在这个仓库执行，该怎么设置？

> **A**：在 settings 里加 deny 条目 `Bash(git push *)`——这是唯一能直接拦死命令的办法。放行其余所有命令既难维护也没约束 push 本身；分类器两个方向都会出错，auto mode 不是保证；写在提示词里的叮嘱不是权限规则，规则只认 settings 文件。
