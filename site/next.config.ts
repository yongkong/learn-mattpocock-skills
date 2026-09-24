import type { NextConfig } from "next";
import createMDX from "@next/mdx";

// GitHub Pages 项目页部署开关:PAGES_DEPLOY=1 时按 /learn-mattpocock-skills/ 前缀构建。
// Pages 不会把 /foo 重写到 /foo.html,只有「/foo/ → /foo/index.html」是原生行为,故必须开 trailingSlash。
const pagesDeploy = process.env.PAGES_DEPLOY === "1";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  // 纯静态生成:构建产物 = out/(即部署与站点检查的对象)
  output: "export",
  ...(pagesDeploy ? { basePath: "/learn-mattpocock-skills", trailingSlash: true } : {}),
};

// 课件正文使用 GFM 扩展语法(表格等):不开 remark-gfm 时表格整段退化为带竖线的纯文本。
// frontmatter 两件套:remark-frontmatter 解析 YAML,remark-mdx-frontmatter 转成 export(MDX 不认裸 yaml 节点)。
// Turbopack 的 MDX 管线不接受 JS 函数形式的插件,只能按包名字符串引用(可序列化)。
const withMDX = createMDX({
  options: { remarkPlugins: ["remark-frontmatter", "remark-mdx-frontmatter", "remark-gfm"] },
});

export default withMDX(nextConfig);
