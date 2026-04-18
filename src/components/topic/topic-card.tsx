"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { getTopicAggregateProgress } from "@/lib/lesson/progress-store";
import { cn } from "@/lib/utils";
import type { TopicNode } from "@/types/topic";

const TIER_CONFIG = {
  bronze: { label: "Bronze", color: "bg-amber-600 text-white", icon: "B" },
  silver: { label: "Silver", color: "bg-gray-400 text-white", icon: "S" },
  gold: { label: "Gold", color: "bg-yellow-400 text-yellow-900", icon: "G" },
} as const;

// React-blessed pattern for reading external (non-React) state without
// hydration mismatches: SSR snapshot is always null; client reads after
// mount, and re-reads when the "storage" event fires (cross-tab updates).
function subscribe(callback: () => void): () => void {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

export function TopicCard({
  topic,
  href,
  childCount,
  chapterSlugs,
}: {
  topic: TopicNode;
  href: string;
  childCount?: number;
  /** Chapter slugs for this topic — required for topics that link to chapter lists. */
  chapterSlugs?: readonly string[];
}) {
  const tier = useSyncExternalStore<"bronze" | "silver" | "gold" | null>(
    subscribe,
    () => {
      if (!chapterSlugs || chapterSlugs.length === 0) return null;
      return getTopicAggregateProgress(topic.slug, chapterSlugs).overallTier;
    },
    () => null
  );

  return (
    <Link href={href}>
      <Card className="hover:border-primary/50 hover:shadow-md transition-all cursor-pointer group">
        <CardContent className="pt-5 pb-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                {topic.icon && (
                  <span className="text-2xl">{topic.icon}</span>
                )}
                {tier && (
                  <span
                    className={cn(
                      "inline-flex items-center justify-center h-5 w-5 rounded-full text-[10px] font-bold shrink-0",
                      TIER_CONFIG[tier].color
                    )}
                    title={TIER_CONFIG[tier].label}
                  >
                    {TIER_CONFIG[tier].icon}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold text-base group-hover:text-primary transition-colors">
                  {topic.name}
                </h3>
                {topic.comingSoon && (
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200">
                    Připravujeme
                  </span>
                )}
              </div>
              {topic.description && (
                <p className="text-sm text-muted-foreground">
                  {topic.description}
                </p>
              )}
              {childCount !== undefined && (
                <p className="text-xs text-muted-foreground">
                  {childCount} {childCount === 1 ? "téma" : childCount >= 2 && childCount <= 4 ? "témata" : "témat"}
                </p>
              )}
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-1" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
