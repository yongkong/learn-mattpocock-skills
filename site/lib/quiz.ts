/** Quiz(随堂测)数据模块:类型、校验、评分。内容(content/quiz/)与组件(quiz.tsx)共用这一个 seam。 */

export interface QuizQuestion {
  scenario: string;
  options: string[];
  /** 正确项下标。 */
  answer: number;
  explain: string;
}

/** 校验一套测验,返回问题列表(空数组 = 通过)。构建期(content/quiz/check.generated.ts)与单测共用。 */
export function validateQuiz(questions: QuizQuestion[]): string[] {
  if (!Array.isArray(questions) || questions.length === 0) return ["测验为空"];
  const errors: string[] = [];
  questions.forEach((q, qi) => {
    const at = `第 ${qi + 1} 题`;
    if (!q.scenario || q.scenario.trim() === "") errors.push(`${at}: scenario 为空`);
    if (!Array.isArray(q.options) || q.options.length < 2) errors.push(`${at}: 选项少于 2 个`);
    else if (q.options.some((o) => typeof o !== "string" || o.trim() === "")) errors.push(`${at}: 存在空选项`);
    if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer >= q.options.length) {
      errors.push(`${at}: answer=${q.answer} 越界(共 ${q.options.length} 个选项),会渲染出永远答错的题`);
    }
    if (!q.explain || q.explain.trim() === "") errors.push(`${at}: explain 为空`);
  });
  // 作者卫生:各题正确项全压同一处 = 「已打散」约定失效
  if (questions.length >= 3 && new Set(questions.map((q) => q.answer)).size === 1) {
    errors.push(`全部 ${questions.length} 题的正确项都是下标 ${questions[0].answer}——请打散`);
  }
  return errors;
}

export interface QuizScore {
  correct: number;
  total: number;
}

/** 评分:answers 为「题号 → 所选下标」的部分映射。纯函数,单测直测。 */
export function scoreQuiz(answers: Record<number, number>, questions: QuizQuestion[]): QuizScore {
  let correct = 0;
  for (let qi = 0; qi < questions.length; qi++) {
    const chosen = answers[qi];
    if (chosen !== undefined && chosen === questions[qi].answer) correct++;
  }
  return { correct, total: questions.length };
}
