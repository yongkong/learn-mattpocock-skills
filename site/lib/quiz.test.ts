import { describe, expect, it } from "vitest";
import { scoreQuiz, validateQuiz, type QuizQuestion } from "@/lib/quiz";

const q = (over: Partial<QuizQuestion>): QuizQuestion => ({
  scenario: "情境",
  options: ["A", "B", "C"],
  answer: 1,
  explain: "解释",
  ...over,
});

describe("validateQuiz", () => {
  it("合法的一套零问题", () => {
    const set = [q({}), q({ answer: 0 }), q({ answer: 2 })];
    expect(validateQuiz(set)).toEqual([]);
  });

  it("空测验报错", () => {
    expect(validateQuiz([])).toEqual(["测验为空"]);
  });

  it("answer 越界被拦下", () => {
    const errors = validateQuiz([q({ answer: 7 })]);
    expect(errors.join()).toContain("越界");
  });

  it("选项少于 2 个报错", () => {
    const errors = validateQuiz([q({ options: ["只有"] })]);
    expect(errors.join()).toContain("选项少于 2");
  });

  it("空选项与空解析报错", () => {
    const errors = validateQuiz([q({ options: ["", "B", "  "], explain: "" })]);
    expect(errors.join()).toContain("空选项");
    expect(errors.join()).toContain("explain");
  });

  it("三题全压同一正确项 = 打散失败", () => {
    const set = [q({}), q({}), q({})];
    expect(validateQuiz(set).join()).toContain("打散");
  });

  it("两题同下标不算违例(样本太小)", () => {
    expect(validateQuiz([q({}), q({})])).toEqual([]);
  });
});

describe("scoreQuiz", () => {
  const set = [q({ answer: 1 }), q({ answer: 2 }), q({ answer: 0 })];

  it("答对的计分,未答的不计", () => {
    expect(scoreQuiz({ 0: 1, 1: 0 }, set)).toEqual({ correct: 1, total: 3 });
  });

  it("全对与全错", () => {
    expect(scoreQuiz({ 0: 1, 1: 2, 2: 0 }, set)).toEqual({ correct: 3, total: 3 });
    expect(scoreQuiz({ 0: 0, 1: 0, 2: 1 }, set)).toEqual({ correct: 0, total: 3 });
  });

  it("空作答 = 0 分", () => {
    expect(scoreQuiz({}, set)).toEqual({ correct: 0, total: 3 });
  });
});
