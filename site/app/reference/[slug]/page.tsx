import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Kicker } from "@/components/site/kicker";
import { PageShell } from "@/components/site/page-shell";
import { Prose } from "@/components/site/prose";
import { REFERENCES, getReference } from "@/content/reference/registry";

export function generateStaticParams() {
  return REFERENCES.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata(props: PageProps<"/reference/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const entry = getReference(slug);
  if (!entry) return {};
  return { title: entry.metaTitle ?? entry.heading, description: entry.metaDesc ?? entry.lede };
}

export default async function ReferenceDocPage(props: PageProps<"/reference/[slug]">) {
  const { slug } = await props.params;
  const entry = getReference(slug);
  if (!entry) notFound();

  const { Body } = entry;
  return (
    <PageShell width={entry.width ?? "3xl"} className="py-12">
      <Kicker>{entry.kicker}</Kicker>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">{entry.heading}</h1>
      <p className="mt-3 text-lg text-muted-foreground">{entry.lede}</p>
      <Prose>
        <Body />
      </Prose>
    </PageShell>
  );
}
