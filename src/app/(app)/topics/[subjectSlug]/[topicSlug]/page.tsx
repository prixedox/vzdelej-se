"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ChevronRight, Sparkles } from "lucide-react";
import { subjectTrees, findTopic } from "@/lib/topics";
import { getChaptersForTopic } from "@/lib/lessons/data";

export default function TopicPage() {
  const params = useParams();
  const subjectSlug = params.subjectSlug as string;
  const topicSlug = params.topicSlug as string;

  const tree = subjectTrees[subjectSlug];
  const topic = tree ? findTopic(tree, topicSlug) : null;
  const chapters = topic ? getChaptersForTopic(topicSlug) : [];

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

  if (topic.comingSoon || chapters.length === 0) {
    return (
      <div className="max-w-2xl mx-auto">
        <Link
          href={`/topics/${subjectSlug}`}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Zpět na {tree.subjectName}
        </Link>

        <header className="mb-8 space-y-2">
          <h1 className="text-3xl font-bold">{topic.name}</h1>
          {topic.description && (
            <p className="text-muted-foreground">{topic.description}</p>
          )}
        </header>

        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="py-10 text-center space-y-3">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">Lekce se připravují</h2>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              Na této kapitole právě pracujeme. Brzy ji zde najdeš spolu
              s interaktivními ukázkami a procvičováním. Zatím mrkni na
              jiná témata nebo se vrať později.
            </p>
            <div className="pt-2">
              <Link
                href={`/topics/${subjectSlug}`}
                className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
              >
                Procházet další témata
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
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

      <header className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold">{topic.name}</h1>
        {topic.description && (
          <p className="text-muted-foreground">{topic.description}</p>
        )}
      </header>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase text-muted-foreground tracking-wide">
          Kapitoly
        </h2>
        <div className="grid gap-3 md:grid-cols-2">
          {chapters.map((ch) => (
            <Link
              key={ch.slug}
              href={`/topics/${subjectSlug}/${topicSlug}/${ch.slug}`}
            >
              <Card className="hover:border-primary/50 hover:shadow-md transition-all cursor-pointer group">
                <CardContent className="pt-5 pb-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">
                        Kapitola {ch.order}
                      </p>
                      <h3 className="font-semibold text-base group-hover:text-primary transition-colors">
                        {ch.title}
                      </h3>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
