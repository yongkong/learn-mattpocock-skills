import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  // 纯静态生成:构建产物 = out/(即部署与站点检查的对象)
  output: "export",
  trailingSlash: true,
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
