#!/usr/bin/env node
/**
 * 《AI Coding Crash Course》本地阅读内容同步:
 *
 *   1. 英文原文:拷贝 6 个 HTML → public/crash-course-html/(源目录不入库,.gitignore)。
 *   2. 中文全译:translation-md/ 下的分片 md 按节合并,marked 渲染成精排单栏 HTML
 *      → public/crash-course-html-zh/,供 /workshop/read 的中/EN 切换加载。
 *
 * 两类源都只在本地存在(付费课程内容与其中文衍生品,不公开分发):
 * 源目录缺失时静默跳过,公开部署的构建不受影响。
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { marked } from "marked";

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const enSrcDir = path.resolve(siteRoot, "..", "AI_Coding_Crash_Course", "AI Coding Crash Course HTML");
const enDestDir = path.join(siteRoot, "public", "crash-course-html");
const zhSrcDir = path.resolve(siteRoot, "..", "AI_Coding_Crash_Course", "translation-md");
const zhDestDir = path.join(siteRoot, "public", "crash-course-html-zh");

const SECTIONS = [
  { file: "01-before-start.html", title: "准备 · Before You Start", parts: ["01.md"] },
  { file: "02-concepts.html", title: "核心概念 · Concepts", parts: ["02a.md", "02b.md"] },
  { file: "03-getting-to-know-claude-code.html", title: "认识 Claude Code", parts: ["03.md"] },
  { file: "04-fundamentals.html", title: "基础工作流 · Fundamentals", parts: ["04a.md", "04b.md", "04c.md"] },
  { file: "05-steering.html", title: "转向控制 · Steering", parts: ["05a.md", "05b.md"] },
  { file: "06-shipping.html", title: "大型交付 · Shipping", parts: ["06a.md", "06b.md", "06c.md"] },
];

// ---------- 英文原文 ----------
if (fs.existsSync(enSrcDir)) {
  fs.mkdirSync(enDestDir, { recursive: true });
  const sources = fs.readdirSync(enSrcDir).filter((f) => f.endsWith(".html"));
  for (const f of sources) {
    fs.copyFileSync(path.join(enSrcDir, f), path.join(enDestDir, f));
  }
  for (const f of fs.readdirSync(enDestDir)) {
    if (f.endsWith(".html") && !sources.includes(f)) fs.unlinkSync(path.join(enDestDir, f));
  }
  console.log(`  ✓ 同步课程原文 ${sources.length} 个 HTML → public/crash-course-html/`);
} else {
  console.log("  · 未找到课程原文 HTML,跳过英文同步");
}

// ---------- 中文全译 ----------
// 随堂测在各分片里格式不一(## 随堂测（Quiz）/ 裸行 随堂测 / **随堂测**),先归一化:
// 标题行替换为 quiz-block 开标签,下一章 # 标题前补闭合,让 marked 渲染出可包裹的区块。
const QUIZ_LINE_RE = /^\s*(?:#{1,6}\s*)?\*{0,2}随堂测(?:（Quiz）|\(Quiz\))?\*{0,2}\s*$/;

function preprocessQuizMd(md) {
  const out = [];
  let inQuiz = false;
  for (const line of md.split("\n")) {
    if (!inQuiz && QUIZ_LINE_RE.test(line)) {
      inQuiz = true;
      out.push('<div class="quiz-block">');
      out.push('<p class="quiz-block-title">随堂测 · Quiz</p>');
      continue;
    }
    if (inQuiz && /^#\s/.test(line)) {
      out.push("</div>");
      inQuiz = false;
    }
    out.push(line);
  }
  if (inQuiz) out.push("</div>");
  return out.join("\n");
}

// 从英文原版提取每道题的正确选项序号(0-based),与译文按全局题序一一对应
function extractCorrectIndexes(html) {
  const out = [];
  const re = /<ul class="quiz-choices">([\s\S]*?)<\/ul>/g;
  let m;
  while ((m = re.exec(html))) {
    const lis = m[1].match(/<li[^>]*>/g) || [];
    let idx = -1;
    lis.forEach((t, i) => {
      if (/class="[^"]*correct/.test(t)) idx = i;
    });
    out.push(idx);
  }
  return out;
}

// quiz 区块增强:题干加粗、选项列表化并标亮正确项、答案解析子卡片(样式对齐原版语义,浅色版)
function enhanceQuizBlock(inner, correctIndexes, offset) {
  const elems = inner.match(/<(p|ul|ol|pre|blockquote|h[1-6])[^>]*>[\s\S]*?<\/\1>/g) || [];
  let afterLabel = false;
  let qi = 0;
  const rebuilt = elems.map((el, i) => {
    const next = elems[i + 1] || "";
    if (el.startsWith("<p")) {
      if (/^<p>(<strong>)?\s*答案/.test(el)) {
        afterLabel = true;
        return `<p class="quiz-answer-label">答案与解析</p>`;
      }
      if (/^<(ul|ol)/.test(next)) {
        afterLabel = false;
        return el.replace(/^<p>/, '<p class="quiz-q-text">');
      }
      if (afterLabel) return el.replace(/^<p>/, '<p class="quiz-answer">');
      return el;
    }
    if (/^<(ul|ol)/.test(el)) {
      const idx = correctIndexes[offset + qi] ?? -1;
      qi += 1;
      let k = -1;
      return el
        .replace(/<li>/g, (m0) => {
          k += 1;
          return k === idx ? '<li class="correct">' : m0;
        })
        .replace(/^<ul>/, '<ul class="quiz-choices">')
        .replace(/^<ol>/, '<ol class="quiz-choices">');
    }
    afterLabel = false;
    return el;
  });
  return `<div class="quiz-block">${rebuilt.join("\n")}</div>`;
}

function applyQuizEnhancements(html, correctIndexes) {
  let qi = 0;
  return html.replace(/<div class="quiz-block">([\s\S]*?)<\/div>/g, (_, inner) => {
    const start = qi;
    // 注意:此时内部还是原始 ul(无 quiz-choices 类),按裸 ul/ol 计数推进全局题游标
    qi += (inner.match(/<(ul|ol)>/g) || []).length;
    return enhanceQuizBlock(inner, correctIndexes, start);
  });
}

const CSS = `
  *{box-sizing:border-box}
  html{scroll-behavior:smooth}
  body{margin:0;font-family:system-ui,-apple-system,'Segoe UI','Microsoft YaHei',sans-serif;line-height:1.9;color:#1f2937;background:#fafafa}
  .wrap{display:flex;gap:40px;max-width:1240px;margin:0 auto;padding:40px 24px 96px}
  aside.toc{width:264px;flex-shrink:0;position:sticky;top:0;align-self:flex-start;max-height:calc(100vh - 48px);overflow-y:auto;background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:1rem 1.25rem}
  aside.toc>p{margin:0 0 .5rem;font-weight:700;font-size:.95rem}
  aside.toc a{display:block;color:#4b5563;text-decoration:none;padding:.3rem .5rem;border-radius:6px;font-size:.92rem;line-height:1.5}
  aside.toc a:hover{color:#b45309;background:#fffbeb}
  aside.toc a.active{color:#b45309;background:#fffbeb;font-weight:600}
  main{flex:1;min-width:0;max-width:800px}
  @media (max-width:960px){.wrap{flex-direction:column;gap:24px}aside.toc{position:static;width:auto;max-height:240px}}
  h1{font-size:1.9rem;line-height:1.35;padding-bottom:.6rem;margin:3rem 0 1.5rem;scroll-margin-top:16px}
  h1::after{content:'';display:block;width:96px;height:3px;margin-top:.6rem;border-radius:2px;background:linear-gradient(90deg,#f59e0b,#8b5cf6)}
  h1:first-child{margin-top:0}
  h2{font-size:1.35rem;margin:2.5rem 0 1rem}
  h3{font-size:1.12rem;color:#6d28d9;margin:2rem 0 .8rem}
  p{margin:0 0 1rem}
  a{color:#b45309;text-decoration:none;border-bottom:1px solid rgba(180,83,9,.25)}
  a:hover{border-bottom-color:#b45309}
  strong{color:#111827;font-weight:700}
  img{max-width:100%;border-radius:10px;border:1px solid #e5e7eb;background:#fff;box-shadow:0 4px 24px rgba(0,0,0,.08);margin:1.25rem 0}
  code{font-family:'Cascadia Code','Fira Code',Consolas,monospace;font-size:.875em;background:rgba(180,83,9,.09);color:#9a3412;padding:.15em .4em;border-radius:4px}
  pre{background:#0d1117;border:1px solid #30363d;border-left:4px solid #8b5cf6;border-radius:0 8px 8px 0;padding:1.1rem 1.25rem;overflow-x:auto;margin:1rem 0 1.25rem;font-size:.875rem;line-height:1.6}
  pre code{background:none;padding:0;color:#c9d1d9}
  blockquote{border-left:4px solid #8b5cf6;background:#f5f3ff;border-radius:0 8px 8px 0;padding:.75rem 1.25rem;margin:1rem 0 1.25rem;font-size:.95rem;color:#374151}
  table{border-collapse:collapse;margin:1rem 0 1.25rem;width:100%;font-size:.92em}
  thead tr{background:#f3f4f6}
  th,td{border:1px solid #e5e7eb;padding:.55rem .9rem;text-align:left;vertical-align:top}
  tbody tr:nth-child(even){background:rgba(0,0,0,.02)}
  hr{border:none;border-top:1px solid #e5e7eb;margin:3rem 0}
  ul li::marker{color:#d97706}
  .quiz-block{background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:1.25rem 1.5rem;margin:2rem 0 1.5rem;box-shadow:0 1px 8px rgba(0,0,0,.04)}
  .quiz-block-title{font-size:.72rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#6d28d9;margin:0 0 1rem}
  .quiz-q-text{font-weight:600;color:#111827;margin:1.4rem 0 .75rem;padding-top:1rem;border-top:1px dashed #e5e7eb}
  .quiz-choices{list-style:none;padding:0;margin:0 0 .75rem}
  .quiz-choices li{padding:.4rem .6rem;margin-bottom:.3rem;border-radius:6px;font-size:.95em;color:#4b5563;border:1px solid transparent}
  .quiz-choices li.correct{background:#ecfdf5;border-color:#6ee7b7;color:#047857;font-weight:600}
  .quiz-choices li.correct::before{content:'✓ ';font-weight:700}
  .quiz-answer-label{font-size:.7rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#b45309;margin:1rem 0 .35rem}
  .quiz-answer{font-size:.92em;color:#4b5563;background:#f3f4f6;border-radius:8px;padding:.75rem 1rem;line-height:1.7}
`;

// 滚动高亮:进入视口的最近 h1 在目录中标亮
const SPY = `
  (function(){
    var links=document.querySelectorAll('aside.toc a');
    var map={};
    links.forEach(function(a){map[a.getAttribute('href').slice(1)]=a});
    var hs=document.querySelectorAll('main h1[id]');
    if(!('IntersectionObserver' in window)||!hs.length)return;
    var io=new IntersectionObserver(function(es){
      es.forEach(function(e){
        if(e.isIntersecting){
          links.forEach(function(a){a.classList.remove('active')});
          var a=map[e.target.id];
          if(a){a.classList.add('active');
            if(a.scrollIntoViewIfNeeded)a.scrollIntoViewIfNeeded(false);
          }
        }
      });
    },{rootMargin:'0px 0px -70% 0px'});
    hs.forEach(function(h){io.observe(h)});
  })();
`;

function renderZh(title, markdown, correctIndexes = []) {
  let html = marked.parse(preprocessQuizMd(markdown));
  // 课级标题(# )加锚点 id,生成左侧常驻目录
  const toc = [];
  let n = 0;
  html = html.replace(/<h1>([\s\S]*?)<\/h1>/g, (_, inner) => {
    n += 1;
    toc.push({ id: `lesson-${n}`, text: inner.replace(/<[^>]+>/g, "") });
    return `<h1 id="lesson-${n}">${inner}</h1>`;
  });
  const tocHtml = toc.length
    ? `<aside class="toc"><p>本篇目录</p>${toc
        .map((t) => `<a href="#${t.id}">${t.text}</a>`)
        .join("")}</aside>`
    : "";
  html = applyQuizEnhancements(html, correctIndexes);
  return `<!DOCTYPE html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title} · AI Coding Crash Course 中文版</title><style>${CSS}</style></head><body><div class="wrap">${tocHtml}<main>${html}</main></div><script>${SPY}<\/script></body></html>`;
}

if (fs.existsSync(zhSrcDir)) {
  fs.mkdirSync(zhDestDir, { recursive: true });
  let built = 0;
  const missing = [];
  for (const sec of SECTIONS) {
    const chunks = [];
    for (const part of sec.parts) {
      const p = path.join(zhSrcDir, part);
      if (fs.existsSync(p)) chunks.push(fs.readFileSync(p, "utf-8"));
      else missing.push(part);
    }
    if (chunks.length === 0) continue;
    const md = chunks.join("\n\n");
    const enFile = [enSrcDir, enDestDir].map((d) => path.join(d, sec.file)).find((f) => fs.existsSync(f));
    const correctIndexes = enFile ? extractCorrectIndexes(fs.readFileSync(enFile, "utf-8")) : [];
    fs.writeFileSync(path.join(zhDestDir, sec.file), renderZh(sec.title, md, correctIndexes));
    built += 1;
  }
  // 源里已不存在的旧产物清掉
  for (const f of fs.readdirSync(zhDestDir)) {
    if (f.endsWith(".html") && !SECTIONS.some((s) => s.file === f)) fs.unlinkSync(path.join(zhDestDir, f));
  }
  console.log(`  ✓ 构建中文全译 ${built}/${SECTIONS.length} 节 → public/crash-course-html-zh/${missing.length ? `(缺分片:${missing.join("、")})` : ""}`);
} else {
  console.log("  · 未找到中文全译(translation-md/),跳过中文构建");
}
