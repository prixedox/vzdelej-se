import { notFound } from "next/navigation";
import Link from "next/link";
import { subjectTrees } from "@/lib/topics";
import { getChaptersForTopic } from "@/lib/lessons/data";
import { TopicCard } from "@/components/topic/topic-card";
import { ArrowLeft } from "lucide-react";

export default async function SubjectPage({
  params,
}: {
  params: Promise<{ subjectSlug: string }>;
}) {
  const { subjectSlug } = await params;
  const tree = subjectTrees[subjectSlug];

  if (!tree) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Link
        href="/topics"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Zpět na témata
      </Link>

      <div className="flex items-center gap-3 mb-8">
        <span className="text-4xl">{tree.icon}</span>
        <div>
          <h1 className="text-3xl font-bold">{tree.subjectName}</h1>
          <p className="text-muted-foreground">
            Vyberte si kategorii a téma
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {tree.topics.map((category) => (
          <div key={category.slug}>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              {category.icon && <span>{category.icon}</span>}
              {category.name}
            </h2>
            {category.description && (
              <p className="text-muted-foreground mb-4 text-sm">
                {category.description}
              </p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {category.children?.map((topic) => (
                <TopicCard
                  key={topic.slug}
                  topic={topic}
                  href={`/topics/${subjectSlug}/${topic.slug}`}
                  chapterSlugs={getChaptersForTopic(topic.slug).map((c) => c.slug)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
