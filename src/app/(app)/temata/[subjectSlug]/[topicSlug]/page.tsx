"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { subjectTrees, findTopic } from "@/lib/topics";
import { DIFFICULTIES } from "@/lib/utils/constants";
import { ArrowLeft, PlayCircle, Loader2 } from "lucide-react";
import { PaywallGate } from "@/components/shared/paywall-gate";
import { cn } from "@/lib/utils";

export default function TopicPage() {
  const params = useParams();
  const router = useRouter();
  const subjectSlug = params.subjectSlug as string;
  const topicSlug = params.topicSlug as string;

  const tree = subjectTrees[subjectSlug];
  const topic = tree ? findTopic(tree, topicSlug) : null;

  const [selectedDifficulty, setSelectedDifficulty] = useState("začátečník");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPaywall, setShowPaywall] = useState(false);

  if (!tree || !topic) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Téma nenalezeno</h2>
        <Link href="/temata" className="text-primary hover:underline mt-2 inline-block">
          Zpět na témata
        </Link>
      </div>
    );
  }

  async function startLesson() {
    setLoading(true);
    setError("");

    try {
      // First, find the topic in DB by slug
      const topicRes = await fetch(
        `/api/lekce/generovat`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            topicSlug,
            subjectSlug,
            difficulty: selectedDifficulty,
            variant: 1,
          }),
        }
      );

      if (topicRes.status === 429) {
        setShowPaywall(true);
        setLoading(false);
        return;
      }

      if (!topicRes.ok) {
        const data = await topicRes.json();
        throw new Error(data.error || "Chyba při generování lekce");
      }

      const data = await topicRes.json();
      router.push(`/lekce/${data.lessonCacheId}?progressId=${data.progressId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Nepodařilo se spustit lekci");
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Link
        href={`/temata/${subjectSlug}`}
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

      <Card className="mb-6">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-4">Zvolte obtížnost</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {DIFFICULTIES.map((diff) => (
              <button
                key={diff.value}
                onClick={() => setSelectedDifficulty(diff.value)}
                className={cn(
                  "p-4 rounded-lg border-2 text-center transition-all",
                  selectedDifficulty === diff.value
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/30"
                )}
              >
                <Badge className={cn(diff.color, "mb-2")}>
                  {diff.label}
                </Badge>
                <p className="text-xs text-muted-foreground mt-1">
                  {diff.value === "začátečník" && "Základy a jednoduché příklady"}
                  {diff.value === "středně pokročilý" && "Kombinace konceptů"}
                  {diff.value === "pokročilý" && "Náročné aplikační úlohy"}
                </p>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {error && (
        <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      <Button
        onClick={startLesson}
        disabled={loading}
        size="lg"
        className="w-full gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Generování lekce...
          </>
        ) : (
          <>
            <PlayCircle className="h-5 w-5" />
            Spustit lekci
          </>
        )}
      </Button>

      <PaywallGate open={showPaywall} onOpenChange={setShowPaywall} />
    </div>
  );
}
