import type { ComponentType } from "react";
import Lesson0001 from "./0001.mdx";
import Lesson0002 from "./0002.mdx";
import Lesson0003 from "./0003.mdx";
import Lesson0004 from "./0004.mdx";
import Lesson0005 from "./0005.mdx";

export interface LessonBody {
  Body: ComponentType;
}

/** 课件正文注册表:编号 → MDX 正文。元数据在 lib/structure.ts,两者一一对应。 */
export const LESSON_BODIES: Record<string, LessonBody> = {
  "0001": { Body: Lesson0001 },
  "0002": { Body: Lesson0002 },
  "0003": { Body: Lesson0003 },
  "0004": { Body: Lesson0004 },
  "0005": { Body: Lesson0005 },
};
