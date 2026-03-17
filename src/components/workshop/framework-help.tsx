"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { FrameworkId } from "@/types/workshop";
import { getFrameworkDefinition } from "@/lib/frameworks";
import { useState } from "react";
import { CircleHelp } from "lucide-react";

type TutorialKeys = "why" | "when" | "how" | "outcome";

export function FrameworkHelp({ frameworkId }: { frameworkId: FrameworkId }) {
  const def = getFrameworkDefinition(frameworkId) as
    | (ReturnType<typeof getFrameworkDefinition> & {
        why?: string;
        when?: string;
        how?: string;
        outcome?: string;
      })
    | undefined;

  const [open, setOpen] = useState(false);

  if (!def || (!def.why && !def.when && !def.how && !def.outcome)) return null;

  const sections: { key: TutorialKeys; title: string; value?: string }[] = [
    { key: "why", title: "Por que usar", value: def.why },
    { key: "when", title: "Quando usar", value: def.when },
    { key: "how", title: "Como usar", value: def.how },
    { key: "outcome", title: "Saída esperada", value: def.outcome },
  ];

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
        onClick={() => setOpen(true)}
      >
        <CircleHelp className="h-3 w-3" />
        Como usar este framework
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{def.name}</DialogTitle>
            <DialogDescription>{def.description}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2 text-sm">
            {sections.map(
              (section) =>
                section.value && (
                  <div key={section.key} className="space-y-1.5">
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {section.title}
                    </h3>
                    <p className="text-sm text-foreground whitespace-pre-wrap">
                      {section.value}
                    </p>
                  </div>
                )
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

