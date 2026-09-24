import { NextResponse, type NextRequest } from "next/server";

/**
 * 私有部署的全站基础认证。
 *
 * 仅当 BASIC_AUTH_USER 与 BASIC_AUTH_PASSWORD 两个环境变量都存在时启用,
 * 公开站(未配置)完全放行。配套 next.config.ts 的 NEXT_STATIC_EXPORT=0:
 * 静态导出模式不经过 proxy,只有 SSR 构建的私有部署会实际执行到这里。
 *
 * _next/static 与 _next/image 放行:浏览器只对挑战路径前缀自动回传凭据,
 * 若静态资源也要 401 挑战,从子路径直接进入时页面资源会全部 401 挂掉;
 * 这些 chunk 本身不含课程内容。
 */
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

function safeEqual(a: string, b: string) {
  const len = Math.max(a.length, b.length);
  let diff = a.length === b.length ? 0 : 1;
  for (let i = 0; i < len; i += 1) {
    diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  }
  return diff === 0;
}

export function proxy(request: NextRequest) {
  const user = process.env.BASIC_AUTH_USER;
  const password = process.env.BASIC_AUTH_PASSWORD;
  if (!user || !password) return NextResponse.next();

  const header = request.headers.get("authorization") ?? "";
  const [scheme, credentials] = header.split(" ", 2);
  const expected = `Basic ${btoa(`${user}:${password}`)}`;
  if (scheme === "Basic" && credentials && safeEqual(`Basic ${credentials}`, expected)) {
    return NextResponse.next();
  }

  return new NextResponse("需要认证 · Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Private deployment", charset="UTF-8"',
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
