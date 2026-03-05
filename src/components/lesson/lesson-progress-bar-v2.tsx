"use client";

export function LessonProgressBarV2({
  currentIndex,
  totalSteps,
}: {
  currentIndex: number;
  totalSteps: number;
}) {
  const percent = ((currentIndex + 1) / totalSteps) * 100;

  return (
    <div className="sticky top-0 z-10 bg-background/95 backdrop-blur pb-3 pt-4 px-4">
      <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
        <span className="font-medium">Postup</span>
        <span>
          {currentIndex + 1} / {totalSteps}
        </span>
      </div>
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-300 ease-out bg-primary"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
