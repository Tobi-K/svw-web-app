import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTitle, PageProps, Slug } from "#/lib/page";
import { PageContent } from "#/components/web/page/PageContent";
import EventArticle from "#/components/web/articles/EventArticle";
import { getAllEventSlugs, getEventBySlug } from "#/content/events";

export const dynamicParams = false;

const EVENT_FOLDER = "public/content/event";

export async function generateMetadata(props: PageProps<Slug>): Promise<Metadata> {
  const params = await props.params;
  const article = getEventBySlug(params.slug, EVENT_FOLDER);
  if (!article) notFound();
  return {
    title: getTitle(article.title),
  };
}

export default async function Page(props: PageProps<Slug>) {
  const params = await props.params;
  const eventArticle = getEventBySlug(params.slug, EVENT_FOLDER);
  if (!eventArticle) notFound();
  return (
    <PageContent>
      <EventArticle eventArticle={eventArticle} />
    </PageContent>
  );
}

export function generateStaticParams() {
  const allSlugs = getAllEventSlugs(EVENT_FOLDER);
  return allSlugs.map((filename) => ({ slug: filename.replace(".md", "") }));
}
