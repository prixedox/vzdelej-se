"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, ArrowRight } from "lucide-react";

interface RecentLesson {
  id: string;
  topicName: string;
  difficulty: string;
  score: number | null;
  status: string;
}

export function ContinueLearning({
  recentLessons,
}: {
  recentLessons: RecentLesson[];
}) {
  if (recentLessons.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6 text-center py-12">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">Začněte se učit</h3>
          <p className="text-muted-foreground mb-4">
            Vyberte si téma a začněte svou první lekci
          </p>
          <Button asChild>
            <Link href="/temata" className="gap-2">
              Procházet témata
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Pokračujte v učení</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {recentLessons.map((lesson) => (
          <div
            key={lesson.id}
            className="flex items-center justify-between p-3 rounded-lg border"
          >
            <div className="flex-1">
              <p className="font-medium text-sm">{lesson.topicName}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-muted-foreground">
                  {lesson.difficulty}
                </span>
                {lesson.score !== null && (
                  <Progress
                    value={lesson.score * 100}
                    className="h-1.5 w-16"
                  />
                )}
              </div>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/temata`}>
                {lesson.status === "completed" ? "Opakovat" : "Pokračovat"}
              </Link>
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
