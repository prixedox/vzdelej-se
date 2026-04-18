"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LessonShell } from "@/components/lesson/lesson-shell";
import { getChapter } from "@/lib/lessons/data";
import { subjectTrees, findTopic } from "@/lib/topics";

export default function ChapterPage() {
  const params = useParams();
  const subjectSlug = params.subjectSlug as string;
  const topicSlug = params.topicSlug as string;
  const chapterSlug = params.chapterSlug as string;

  const tree = subjectTrees[subjectSlug];
  const topic = tree ? findTopic(tree, topicSlug) : null;
  const chapter = getChapter(topicSlug, chapterSlug);

  if (!tree || !topic || !chapter) {
    return (
      <div className="text-center py-20 space-y-3">
        <h2 className="text-2xl font-bold">Kapitola nenalezena</h2>
        <Link href="/topics" className="text-primary hover:underline">
          Zpět na témata
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Link
        href={`/topics/${subjectSlug}/${topicSlug}`}
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"
      >
        <ArrowLeft className="h-4 w-4" />
        Zpět na {topic.name}
      </Link>
      <LessonShell
        lesson={chapter.lesson}
        topicSlug={topicSlug}
        chapterSlug={chapterSlug}
      />
    </div>
  );
}
