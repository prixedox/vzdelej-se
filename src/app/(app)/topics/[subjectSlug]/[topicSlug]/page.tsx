import { allTopicParams } from "@/lib/static-params";
import TopicPageClient from "./topic-page";

export function generateStaticParams() {
  return allTopicParams();
}

export default function TopicPage() {
  return <TopicPageClient />;
}
