"use client";
import React, { ComponentPropsWithoutRef } from "react";
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import "katex/dist/katex.min.css";
import ForceDiagram from "./diagram/ForceDiagram";
import MathGraph from "./diagram/MathGraph";

type UnistPoint = {
  line: number;
  column: number;
  offset?: number;
};

// Position: start/end points
type UnistPosition = {
  start: UnistPoint;
  end: UnistPoint;
};

type HastNode = {
  type: string;
  tagName?: string;
  position?: UnistPosition;
  children?: HastNode[];
  properties?: Record<string, unknown>;
};

type MarkdownCodeProps = ComponentPropsWithoutRef<"code"> & {
  node?: HastNode;
};

const MarkdownRenderer = ({ source }: { source: string }) => {
  return (
    <Markdown
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[[rehypeKatex, { output: "html" }]]}
      components={{
        code({ className, children, node, ...props }: MarkdownCodeProps) {
          const match = /language-([\w-]+)/.exec(className || "");
          const lang = match ? match[1] : "";
          const content = String(children).replace(/\n$/, "");

          const isBlockComplete = (() => {
            // If no position data is available, assume incomplete
            if (!node?.position?.end) return false;

            const { end } = node.position;

            // If offset is missing, we can't determine position, so assume complete to avoid locking
            // (though standard parsers usually provide it).
            if (end.offset === undefined) return true;

            // Safety check: if the AST ends beyond the source length
            if (end.offset > source.length) return false;

            // Check the characters immediately preceding the node's end in the raw source.
            // A complete code block in Markdown ends with ``` or ~~~
            const endingFence = source.slice(end.offset - 3, end.offset);

            return endingFence === "```" || endingFence === "~~~";
          })();

          if (lang.startsWith("plot-")) {
            // graphing tools
            if (!isBlockComplete) {
              return (
                <span className="text-sm text-gray-400 animate-pulse font-mono">
                  Computing diagram...
                </span>
              );
            }

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
