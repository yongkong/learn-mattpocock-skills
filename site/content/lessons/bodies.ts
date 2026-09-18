import type { ComponentType } from "react";
import Lesson0001 from "./0001.mdx";

export interface LessonBody {
  Body: ComponentType;
}

/** 课件正文注册表:编号 → MDX 正文。元数据在 lib/structure.ts,两者一一对应。 */
export const LESSON_BODIES: Record<string, LessonBody> = {
  "0001": { Body: Lesson0001 },
};
