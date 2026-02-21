"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { LessonShell } from "@/components/lesson/lesson-shell";
import { LessonSkeleton } from "@/components/shared/loading-skeleton";
import type { LessonContent } from "@/types/lesson";

interface LessonData {
  lesson: {
    id: string;
    content: LessonContent;
    difficulty: string;
    topic: {
      name: string;
      subject: string;
    };
  };
  progress: {
    id: string;
    status: string;
  } | null;
}

export default function LessonPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const lessonId = params.lessonId as string;
  const progressId = searchParams.get("progressId");

  const [data, setData] = useState<LessonData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchLesson() {
      try {
        const res = await fetch(`/api/lekce/${lessonId}`);
        if (!res.ok) {
          throw new Error("Nepodařilo se načíst lekci");
        }
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Chyba při načítání");
      } finally {
        setLoading(false);
      }
    }

    fetchLesson();
  }, [lessonId]);

  if (loading) {
    return <LessonSkeleton />;
  }

  if (error || !data) {
    return (
      <div className="max-w-3xl mx-auto text-center py-20">
        <h2 className="text-2xl font-bold mb-2">Chyba</h2>
        <p className="text-muted-foreground">{error || "Lekce nenalezena"}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <p className="text-sm text-muted-foreground">
          {data.lesson.topic?.subject === "matematika" ? "Matematika" : "Fyzika"} &gt;{" "}
          {data.lesson.topic?.name}
        </p>
      </div>

      <LessonShell
        content={data.lesson.content}
        lessonCacheId={lessonId}
        progressId={progressId || data.progress?.id || ""}
      />
    </div>
  );
}
