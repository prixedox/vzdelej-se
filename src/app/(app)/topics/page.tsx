import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { subjects, subjectTrees } from "@/lib/topics";
import { getSubjectProgress } from "@/lib/lessons/data";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function TopicsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Témata</h1>
      <p className="text-muted-foreground mb-8">
        Vyberte si předmět a začněte se učit
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {subjects.map((subject) => {
          const tree = subjectTrees[subject.slug];
          const progress = tree
            ? getSubjectProgress(tree.topics)
            : { totalTopics: subject.leafCount, topicsWithContent: 0, comingSoonTopics: 0, percentComplete: 0 };
          const isEmpty = progress.topicsWithContent === 0;

          return (
            <Link key={subject.slug} href={`/topics/${subject.slug}`}>
              <Card className="hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer group h-full">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-3 flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <span className="text-4xl">{subject.icon}</span>
                        {isEmpty && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200">
                            Připravujeme
                          </span>
                        )}
                      </div>
                      <h2 className="text-2xl font-bold group-hover:text-primary transition-colors">
                        {subject.name}
                      </h2>
                      <p className="text-muted-foreground text-sm">
                        {subject.description}
                      </p>

                      {/* Progress bar */}
                      <div className="space-y-1.5 pt-1">
                        <div className="flex justify-between items-center text-xs text-muted-foreground">
                          <span>
                            {progress.topicsWithContent} / {progress.totalTopics} témat
                          </span>
                          <span className="tabular-nums">{progress.percentComplete}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                          <div
                            className={cn(
                              "h-full rounded-full transition-all bg-gradient-to-r",
                              subject.color
                            )}
                            style={{ width: `${progress.percentComplete}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-2" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
