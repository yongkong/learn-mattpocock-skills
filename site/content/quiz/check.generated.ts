// 本文件由 scripts/gen-lessons.mjs 生成(predev/prebuild),请勿手改。
import { validateQuiz, type QuizQuestion } from "@/lib/quiz";
import { quiz0001 } from "./0001";
import { quiz0002 } from "./0002";
import { quiz0003 } from "./0003";
import { quiz0004 } from "./0004";
import { quiz0005 } from "./0005";
import { quiz0006 } from "./0006";

const sets: Array<[string, QuizQuestion[]]> = [
  ["0001", quiz0001],
  ["0002", quiz0002],
  ["0003", quiz0003],
  ["0004", quiz0004],
  ["0005", quiz0005],
  ["0006", quiz0006],
];

for (const [num, questions] of sets) {
  const errors = validateQuiz(questions);
  if (errors.length > 0) {
    throw new Error(`content/quiz/${num}.ts 数据无效:\n- ${errors.join("\n- ")}`);
  }
}
