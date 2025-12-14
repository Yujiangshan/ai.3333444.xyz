"use client";
import React, { ComponentPropsWithoutRef } from "react";
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import "katex/dist/katex.min.css";
import ForceDiagram from "./diagram/ForceDiagram";
import MathGraph from "./diagram/MathGraph";

type CodeProps = ComponentPropsWithoutRef<"code">;

const MarkdownRenderer = ({ source }: { source: string }) => {
  return (
    <Markdown
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[[rehypeKatex, { output: "html" }]]}
      components={{
        code({ className, children, ...props }: CodeProps) {
          const match = /language-([\w-]+)/.exec(className || "");
          const lang = match ? match[1] : "";
          const content = String(children).replace(/\n$/, "");

          if (lang === "plot-function") {
            return (
              <div className="h-100 w-100">
                <MathGraph code={content} />
              </div>
            );
          }

          if (lang === "plot-force") {
            return <ForceDiagram code={content} />;
          }

          return (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {source}
    </Markdown>
  );
};

export const MemoizedMarkdown = React.memo(MarkdownRenderer);
