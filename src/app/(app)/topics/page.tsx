import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { subjects } from "@/lib/topics";
import { ChevronRight } from "lucide-react";

export default function TopicsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Témata</h1>
      <p className="text-muted-foreground mb-8">
        Vyberte si předmět a začněte se učit
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {subjects.map((subject) => (
          <Link key={subject.slug} href={`/topics/${subject.slug}`}>
            <Card className="hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer group h-full">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-3">
                    <span className="text-4xl">{subject.icon}</span>
                    <h2 className="text-2xl font-bold group-hover:text-primary transition-colors">
                      {subject.name}
                    </h2>
                    <p className="text-muted-foreground">
                      {subject.description}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {subject.leafCount} témat
                    </p>
                  </div>
                  <ChevronRight className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-2" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
