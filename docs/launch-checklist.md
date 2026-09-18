# 上线检查单 —— 「Agent Skills 中文课」

随工单 #24 定稿。前置:工单 #13–#23 全部完成,`npm run check:site` 全绿。

## 一、部署(Vercel,作者操作)

1. 打开 [vercel.com/new](https://vercel.com/new),导入 `yongkong/learn-mattpocock-skills`
2. **Root Directory 设为 `site`**(应用在子目录);Framework Preset 保持 Next.js 自动检测,其余默认
3. 环境变量(可选):`NEXT_PUBLIC_SITE_URL` 设为最终生产 URL(og:url 与 metadataBase 用;不设则用相对默认)
4. 部署完成后:
   - 主分支推送 → 生产部署;任意分支推送 → 预览部署
   - CI(site-check workflow)随 PR 执行 lint → build → check:site
5. 确认 vercel.app 默认域名可访问(国内访问不稳属已知事项;自定义域名日后单独立项)

## 二、验收走查(上线前最后一道门)

以零上下文读者身份在生产 URL(或本地 `out/` 静态服务)走完:

- [ ] 落地首页:十秒内读懂这是什么 / 给谁看 / 非官方 / 持续更新中
- [ ] 名词区四个术语(Course/Lesson/Reference/Progress)有白话解释
- [ ] 从五章目录或情境卡进入一章
- [ ] 学完 0001:正文可读、测验可作答并显示得分
- [ ] 页内标记「已学」,刷新后状态保留;首页续学按钮变为「继续学习」
- [ ] 走到 0004 有「下一课」之外的翻课链(无死胡同)
- [ ] 经导航去词典:过滤一个词、打开弹层、翻上/下一条
- [ ] 速查两页可达,全局地图打印预览正常
- [ ] 关于页:非官方声明 / 致谢 / 独创性 / 许可 / 商标五节齐备
- [ ] 404 页可回首页
- [ ] 移动端抽查:导航折行、目录单列、章节树折叠
- [ ] `npm run check:site` 对生产构建全绿

**验收线**(wayfinder 地图 #7 终点):陌生中文读者无需解释、独立学完一课并通过测验。

## 三、退役确认

- [ ] 旧静态站文件(index.html、lessons/、reference/、assets/)已删除
- [ ] 仓库根无遗留的旧入口;README/AGENTS 指向 site/
- [ ] 个人文件(MISSION/NOTES/CONTEXT/learning-records)保留公开、不进导航(既定决策)
