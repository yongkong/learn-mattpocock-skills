import Link from "next/link";
import type { ComponentProps } from "react";

/** 站内链接:静态导出站点一律不预取——这项政策收在这一个 interface 上(个别例外可显式传 prefetch 覆盖)。 */
export function AppLink({ prefetch = false, ...rest }: ComponentProps<typeof Link>) {
  return <Link prefetch={prefetch} {...rest} />;
}
