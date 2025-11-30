import { Copy } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export type InspectDialogProps = {
  answer: string;
  explanation: string;
  problem: string;

  open: boolean;
  onChange: (state: boolean) => void;
};

export default function InspectDialog({
  open,
  onChange,
  answer,
  problem,
  explanation,
}: InspectDialogProps) {
  // Helper to copy text to clipboard
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  return (
    <Dialog open={open} onOpenChange={onChange}>
      <DialogContent className="sm:max-w-[700px] flex flex-col max-h-[90vh] overflow-scroll">
        <DialogHeader>
          <DialogTitle className="text-xl">Inspect Details</DialogTitle>
          <DialogDescription>
            Review the problem statement, correct answer, and detailed
            explanation.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 pr-4 -mr-4">
          <div className="flex flex-col gap-6 py-4">
            {/* Section: Problem */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold leading-none tracking-tight text-primary">
                  Problem
                </h4>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => handleCopy(problem)}
                  title="Copy problem"
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
              <div className="rounded-md bg-muted/50 p-4 text-sm leading-relaxed whitespace-pre-wrap">
                {problem}
              </div>
            </div>

            <Separator />

            {/* Section: Answer */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold leading-none tracking-tight text-primary">
                  Answer
                </h4>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => handleCopy(answer)}
                  title="Copy answer"
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
              <div>
                <Badge
                  variant="secondary"
                  className="text-sm px-3 py-1 font-mono tracking-wide"
                >
                  {answer}
                </Badge>
              </div>
            </div>

            <Separator />

            {/* Section: Explanation */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold leading-none tracking-tight text-primary">
                  Explanation
                </h4>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => handleCopy(explanation)}
                  title="Copy explanation"
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
              <div className="text-sm text-muted-foreground leading-7 whitespace-pre-wrap">
                {explanation}
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* Footer Actions */}
        <div className="flex justify-end pt-2">
          <Button variant="outline" onClick={() => onChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
