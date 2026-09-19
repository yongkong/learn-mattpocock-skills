import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { PageShell } from "@/components/site/page-shell";

export const metadata: Metadata = {
  title: "关于",
  description: "本课程是什么:非官方声明、致谢、独创性与许可。",
};

export default function AboutPage() {
  return (
    <PageShell width="3xl" className="py-16">
      <h1 className="text-3xl font-semibold tracking-tight">关于本课程</h1>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">这是什么</h2>
        <p className="mt-3 leading-relaxed">
          「Agent Skills 中文课」是一套面向中文开发者的教学课程,教你系统使用 Matt Pocock 的
          agent skills 工作流。课程以{" "}
          <Badge variant="outline" className="mx-1 align-middle font-normal text-muted-foreground">
            非官方
          </Badge>
          社区课程自居:它由独立第三方撰写,与 Matt Pocock 及 AI Hero
          没有隶属关系,也未获其背书。如果课程对任何机制的理解有误,责任在本课作者,不在上游。
        </p>
        <p className="mt-3 leading-relaxed">
          课程持续更新中。发现错误或想提建议,欢迎到{" "}
          <a
            href="https://github.com/yongkong/learn-mattpocock-skills/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4"
          >
            仓库 issue 区
          </a>{" "}
          提出。
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">致谢与出处</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed">
          <li>
            skills 体系出自 Matt Pocock 的 MIT 开源仓库{" "}
            <a
              href="https://github.com/mattpocock/skills"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4"
            >
              mattpocock/skills
            </a>
            。
          </li>
          <li>
            方法论参考 AI Hero 的免费内容,尤其是
            <a
              href="https://www.aihero.dev/5-agent-skills-i-use-every-day"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4"
            >
              《5 Agent Skills I Use Every Day》
            </a>
            与{" "}
            <a
              href="https://www.aihero.dev/skills"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4"
            >
              aihero.dev/skills
            </a>
            。课件中的论断均附出处链接,建议读原文。
          </li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">独创性</h2>
        <p className="mt-3 leading-relaxed">
          本课程的中文文本(课件、词典释义、站点文案)全部原创撰写,不是上游内容的翻译;个别
          SKILL.md 结构与术语依 MIT 授权作教学性复用。想学原汁原味的版本,请读上游原文。
        </p>
      </section>

      <section className="mt-10" id="license">
        <h2 className="text-xl font-semibold">许可</h2>
        <p className="mt-3 leading-relaxed">
          本课程原创内容以{" "}
          <a
            href="https://creativecommons.org/licenses/by-sa/4.0/deed.zh"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4"
          >
            CC BY-SA 4.0
          </a>{" "}
          提供(仓库根目录附
          <a href="https://github.com/yongkong/learn-mattpocock-skills/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
            LICENSE
          </a>
          )。上游 SKILL.md 文本仍按 MIT;若你复用其文本,请保留其 MIT 声明。词典英文原文的版权归原作者:上游词典仓库未附开源许可,本课程仅保留原文链接。
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">商标</h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          文中出现的第三方名称与商标归其权利人所有,此处使用仅作指代。
        </p>
      </section>
    </PageShell>
  );
}
