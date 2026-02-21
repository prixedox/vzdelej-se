"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import type { TopicNode } from "@/types/topic";

export function TopicCard({
  topic,
  href,
  childCount,
}: {
  topic: TopicNode;
  href: string;
  childCount?: number;
}) {
  return (
    <Link href={href}>
      <Card className="hover:border-primary/50 hover:shadow-md transition-all cursor-pointer group">
        <CardContent className="pt-5 pb-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1.5">
              {topic.icon && (
                <span className="text-2xl">{topic.icon}</span>
              )}
              <h3 className="font-semibold text-base group-hover:text-primary transition-colors">
                {topic.name}
              </h3>
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
