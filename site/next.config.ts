import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  // 纯静态生成:构建产物 = out/(即部署与站点检查的对象)
  output: "export",

};

// 课件正文使用 GFM 扩展语法(表格等):不开 remark-gfm 时表格整段退化为带竖线的纯文本。
// Turbopack 的 MDX 管线不接受 JS 函数形式的插件,只能按包名字符串引用(可序列化)。
const withMDX = createMDX({ options: { remarkPlugins: ["remark-gfm"] } });

export default withMDX(nextConfig);
