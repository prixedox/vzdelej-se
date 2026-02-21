"use client";

import { useEffect, useRef } from "react";
import katex from "katex";

interface MathDisplayProps {
  math: string;
  block?: boolean;
  className?: string;
}

export function MathDisplay({ math, block = false, className = "" }: MathDisplayProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (ref.current) {
      // Strip $/$$ delimiters — KaTeX expects raw LaTeX
      let cleaned = math;
      if (cleaned.startsWith("$$") && cleaned.endsWith("$$")) {
        cleaned = cleaned.slice(2, -2);
      } else if (cleaned.startsWith("$") && cleaned.endsWith("$")) {
        cleaned = cleaned.slice(1, -1);
      }
      try {
        katex.render(cleaned.trim(), ref.current, {
          displayMode: block,
          throwOnError: false,
          trust: true,
          strict: false,
        });
      } catch {
        if (ref.current) {
          ref.current.textContent = math;
        }
      }
    }
  }, [math, block]);

  return <span ref={ref} className={className} />;
}

// Renders markdown text with inline and block LaTeX
export function MathText({ content, className = "" }: { content: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    // Process block math first ($$...$$)
    let processed = content.replace(
      /\$\$([\s\S]*?)\$\$/g,
      (_, math) => {
        try {
          return `<div class="my-4 overflow-x-auto">${katex.renderToString(math.trim(), { displayMode: true, throwOnError: false, trust: true, strict: false })}</div>`;
        } catch {
          return `<div class="my-4"><code>${math}</code></div>`;
        }
      }
    );

    // Then inline math ($...$)
    processed = processed.replace(
      /\$([^\$\n]+?)\$/g,
      (_, math) => {
        try {
          return katex.renderToString(math.trim(), { displayMode: false, throwOnError: false, trust: true, strict: false });
        } catch {
          return `<code>${math}</code>`;
        }
      }
    );

    // Callout blocks: > [!tip] or > [!info] or plain >
    processed = processed.replace(
      /^> \[!(tip|info|warning|key)\](.*?)(?=\n(?!>)|$)/gms,
      (_, type, body) => {
        const colors: Record<string, string> = {
          tip: "border-amber-300 bg-amber-50 text-amber-900",
          info: "border-blue-300 bg-blue-50 text-blue-900",
          warning: "border-red-300 bg-red-50 text-red-900",
          key: "border-purple-300 bg-purple-50 text-purple-900",
        };
        const icons: Record<string, string> = { tip: "\u{1F4A1}", info: "\u2139\uFE0F", warning: "\u26A0\uFE0F", key: "\u{1F511}" };
        const cleanBody = body.replace(/\n> ?/g, "\n").trim();
        return `<div class="my-3 p-3 rounded-lg border-l-4 ${colors[type] || colors.info}">${icons[type] || ""} ${cleanBody}</div>`;
      }
    );

    // Horizontal rules
    processed = processed.replace(/\n---\n/g, '<hr class="my-4 border-border" />');

    // Bold and italic
    processed = processed
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>");

    // Process unordered lists (lines starting with - )
    processed = processed.replace(
      /(?:^|\n)((?:- .+(?:\n|$))+)/g,
      (_, listBlock) => {
        const items = listBlock
          .split("\n")
          .filter((line: string) => line.startsWith("- "))
          .map((line: string) => `<li class="ml-4 pl-1">${line.slice(2)}</li>`)
          .join("");
        return `<ul class="my-2 space-y-1 list-disc list-outside ml-4">${items}</ul>`;
      }
    );

    // Process ordered lists (lines starting with number. )
    processed = processed.replace(
      /(?:^|\n)((?:\d+\. .+(?:\n|$))+)/g,
      (_, listBlock) => {
        const items = listBlock
          .split("\n")
          .filter((line: string) => /^\d+\. /.test(line))
          .map((line: string) => `<li class="ml-4 pl-1">${line.replace(/^\d+\. /, "")}</li>`)
          .join("");
        return `<ol class="my-2 space-y-1 list-decimal list-outside ml-4">${items}</ol>`;
      }
    );

    // Paragraphs and line breaks
    processed = processed
      .replace(/\n\n/g, "</p><p>")
      .replace(/\n/g, "<br />");

    ref.current.innerHTML = `<div>${processed}</div>`;
  }, [content]);

  return <div ref={ref} className={`math-text leading-relaxed ${className}`} />;
}
