"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { subjectTrees, findTopic } from "@/lib/topics";
import { ArrowLeft, PlayCircle } from "lucide-react";

export default function TopicPage() {
  const params = useParams();
  const router = useRouter();
  const subjectSlug = params.subjectSlug as string;
  const topicSlug = params.topicSlug as string;

  const tree = subjectTrees[subjectSlug];
  const topic = tree ? findTopic(tree, topicSlug) : null;

  if (!tree || !topic) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Téma nenalezeno</h2>
        <Link href="/topics" className="text-primary hover:underline mt-2 inline-block">
          Zpět na témata
        </Link>
      </div>
    );
  }

  function startLesson() {
    router.push(`/lessons/${topicSlug}?subject=${subjectSlug}`);
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Link
        href={`/topics/${subjectSlug}`}
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Zpět na {tree.subjectName}
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{topic.name}</h1>
        {topic.description && (
          <p className="text-muted-foreground">{topic.description}</p>
        )}
      </div>

      <Button
        onClick={startLesson}
        size="lg"
        className="w-full gap-2"
      >
        <PlayCircle className="h-5 w-5" />
        Spustit lekci
      </Button>
    </div>
  );
}
