// 本文件由 scripts/gen-lessons.mjs 生成(predev/prebuild),请勿手改。
import type { ComponentType } from "react";
import Lesson0001 from "./0001.mdx";
import Lesson0002 from "./0002.mdx";
import Lesson0003 from "./0003.mdx";
import Lesson0004 from "./0004.mdx";
import Lesson0005 from "./0005.mdx";
import Lesson0006 from "./0006.mdx";

export interface LessonBody {
  Body: ComponentType;
}

/** 课件正文注册表:编号 → MDX 正文。元数据见 registry.generated.ts。 */
export const LESSON_BODIES: Record<string, LessonBody> = {
  "0001": { Body: Lesson0001 },
  "0002": { Body: Lesson0002 },
  "0003": { Body: Lesson0003 },
  "0004": { Body: Lesson0004 },
  "0005": { Body: Lesson0005 },
  "0006": { Body: Lesson0006 },
};
