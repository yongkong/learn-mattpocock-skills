// 本文件由 scripts/gen-lessons.mjs 生成(predev/prebuild),请勿手改。
import { validateQuiz, type QuizQuestion } from "@/lib/quiz";
import { quiz0001 } from "./0001";
import { quiz0002 } from "./0002";
import { quiz0003 } from "./0003";
import { quiz0004 } from "./0004";
import { quiz0005 } from "./0005";
import { quiz0006 } from "./0006";
import { workshopQuiz0001 } from "./workshop/0001";
import { workshopQuiz0002 } from "./workshop/0002";
import { workshopQuiz0003 } from "./workshop/0003";
import { workshopQuiz0004 } from "./workshop/0004";
import { workshopQuiz0005 } from "./workshop/0005";
import { workshopQuiz0006 } from "./workshop/0006";
import { workshopQuiz0007 } from "./workshop/0007";

const sets: Array<[string, QuizQuestion[]]> = [
  ["0001", quiz0001],
  ["0002", quiz0002],
  ["0003", quiz0003],
  ["0004", quiz0004],
  ["0005", quiz0005],
  ["0006", quiz0006],
  ["workshop:0001", workshopQuiz0001],
  ["workshop:0002", workshopQuiz0002],
  ["workshop:0003", workshopQuiz0003],
  ["workshop:0004", workshopQuiz0004],
  ["workshop:0005", workshopQuiz0005],
  ["workshop:0006", workshopQuiz0006],
  ["workshop:0007", workshopQuiz0007],
];

for (const [num, questions] of sets) {
  const errors = validateQuiz(questions);
  if (errors.length > 0) {
    throw new Error(`content/quiz/${num} 数据无效:\n- ${errors.join("\n- ")}`);
  }
}
