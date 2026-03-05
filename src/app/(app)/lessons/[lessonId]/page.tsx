"use client";

import { useParams, useSearchParams } from "next/navigation";
import { LessonShell } from "@/components/lesson/lesson-shell";
import { getLesson } from "@/lib/lessons/data";
import Link from "next/link";

export default function LessonPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const topicSlug = params.lessonId as string;
  const difficulty = searchParams.get("difficulty") || "beginner";
  const subjectSlug = searchParams.get("subject") || "math";

  const content = getLesson(topicSlug, difficulty);

  if (!content) {
    return (
      <div className="max-w-3xl mx-auto text-center py-20">
        <h2 className="text-2xl font-bold mb-2">Lekce nenalezena</h2>
        <p className="text-muted-foreground mb-4">
          Pro toto téma a obtížnost zatím nemáme obsah.
        </p>
        <Link
          href={`/topics/${subjectSlug}`}
          className="text-primary hover:underline"
        >
          Zpět na témata
        </Link>
      </div>
    );
  }

  return (
    <div>
      <LessonShell content={content} />
    </div>
  );
}
