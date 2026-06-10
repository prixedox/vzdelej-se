import { allChapterParams } from "@/lib/static-params";
import ChapterPageClient from "./chapter-page";

export function generateStaticParams() {
  return allChapterParams();
}

export default function ChapterPage() {
  return <ChapterPageClient />;
}
