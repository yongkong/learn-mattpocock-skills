"use client";

import { useState } from "react";

export interface QuizQuestion {
  scenario: string;
  options: string[];
  answer: number;
  explain: string;
}

/** 课件测验:逐题作答、即时反馈、得分封闭在组件状态内(同页多套互不串扰)。 */
export function Quiz({ questions, ariaLabel }: { questions: QuizQuestion[]; ariaLabel?: string }) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const score = questions.reduce(
    (acc, q, qi) => acc + (answers[qi] !== undefined && answers[qi] === q.answer ? 1 : 0),
    0,
  );
  const answeredCount = Object.keys(answers).length;

  return (
    <section
      aria-label={ariaLabel ?? "随堂测验"}
      className="my-6 rounded-xl border bg-card p-5 text-card-foreground"
    >
      <p className="text-right font-mono text-sm font-semibold">
        得分 {score} / {questions.length}
      </p>
      <ol className="space-y-8">
        {questions.map((q, qi) => {
          const chosen = answers[qi];
          const done = chosen !== undefined;
          const correct = chosen === q.answer;
          return (
            <li key={qi}>
              <p className="font-semibold">
                {qi + 1}. {q.scenario}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {q.options.map((opt, oi) => {
                  let cls = "border-border bg-background hover:border-amber-600 hover:text-amber-700";
                  if (done && oi === q.answer) {
                    cls = "border-emerald-600 bg-emerald-50 font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300";
                  } else if (done && oi === chosen) {
                    cls = "border-red-600 bg-red-50 font-semibold text-red-700 dark:bg-red-950/40 dark:text-red-300";
                  } else if (done) {
                    cls = "border-border bg-background opacity-50";
                  }
                  return (
                    <button
                      key={oi}
                      type="button"
                      disabled={done}
                      onClick={() => setAnswers((a) => ({ ...a, [qi]: oi }))}
                      className={`rounded-full border px-4 py-1.5 font-mono text-sm transition-colors ${cls}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
              {done ? (
                <p
                  className={`mt-3 rounded-lg px-4 py-2 text-sm ${
                    correct
                      ? "bg-emerald-50 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-100"
                      : "bg-red-50 text-red-900 dark:bg-red-950/40 dark:text-red-100"
                  }`}
                >
                  {correct ? "答对了。" : "答错了。"}
                  {q.explain}
                </p>
              ) : null}
            </li>
          );
        })}
      </ol>
      <p className="mt-6 text-sm text-muted-foreground">
        {answeredCount < questions.length
          ? `已答 ${answeredCount} / ${questions.length} 题。`
          : "全部答完。想重来一遍,刷新页面即可。"}
      </p>
    </section>
  );
}
