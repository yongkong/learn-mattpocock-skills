/*
 * MtQuiz —— 课程共享测验组件(无依赖,可被任何 lesson 复用)
 *
 * 用法:
 *   <div id="quiz"></div>
 *   <script src="../assets/quiz.js"></script>
 *   <script>
 *     MtQuiz.render(document.getElementById("quiz"), {
 *       questions: [
 *         {
 *           scenario: "情境描述……",
 *           options: ["/skill-a", "/skill-b", "/skill-c", "/skill-d"],
 *           answer: 0,               // 正确选项的下标
 *           explain: "答对/答错后展示的解释,可含 <a> 链接。"
 *         }
 *       ]
 *     });
 *   </script>
 *
 * 给课件作者:各题的选项字数应尽量一致,不要让格式泄露答案。
 */
(function () {
  "use strict";

  function render(container, config) {
    var state = { score: 0, done: 0 };
    var root = document.createElement("div");
    root.className = "quiz";

    var questions = config.questions.map(function (q, qi) {
      return buildQuestion(q, qi, state, root, config);
    });

    root.appendChild(summaryEl(state, config));
    questions.forEach(function (el) { root.insertBefore(el, root.querySelector(".score")); });
    container.appendChild(root);
  }

  function summaryEl(state, config) {
    var el = document.createElement("p");
    el.className = "score";
    el.textContent = "得分 0 / " + config.questions.length;
    return el;
  }

  function updateScore(state, config) {
    var el = root_score(config);
    if (el) el.textContent = "得分 " + state.score + " / " + config.questions.length;
    if (state.done === config.questions.length && config.onComplete) {
      config.onComplete(state.score, config.questions.length);
    }
  }

  function root_score(config) {
    return document.querySelector(".quiz .score");
  }

  function buildQuestion(q, qi, state, root, config) {
    var box = document.createElement("div");
    box.className = "q";

    var scen = document.createElement("p");
    scen.className = "scenario";
    scen.textContent = (qi + 1) + ". " + q.scenario;
    box.appendChild(scen);

    var opts = document.createElement("div");
    opts.className = "options";
    var answered = false;

    q.options.forEach(function (opt, oi) {
      var b = document.createElement("button");
      b.type = "button";
      b.textContent = opt;
      b.addEventListener("click", function () {
        if (answered) return;
        answered = true;
        state.done += 1;
        var right = oi === q.answer;
        if (right) state.score += 1;

        Array.prototype.forEach.call(opts.children, function (btn, bi) {
          btn.disabled = true;
          if (bi === q.answer) btn.classList.add("correct");
          else if (bi === oi) btn.classList.add("wrong");
        });

        var ex = document.createElement("p");
        ex.className = "explain " + (right ? "ok" : "no");
        var prefix = right ? "✓ 正确。" : "✗ 正确答案是 " + q.options[q.answer] + "。";
        ex.innerHTML = prefix + " " + (q.explain || "");
        box.appendChild(ex);
        updateScore(state, config);
      });
      opts.appendChild(b);
    });

    box.appendChild(opts);
    return box;
  }

  window.MtQuiz = { render: render };
})();
