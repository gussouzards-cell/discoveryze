"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, LayoutGrid, ListOrdered } from "lucide-react";
import type { LeanCanvasItem } from "@/types/workshop";
import {
  LEAN_CANVAS_BLOCK_ORDER,
  LEAN_CANVAS_STEP_META,
} from "@/lib/lean-canvas-flow";

interface LeanCanvasGuidedProps {
  leanCanvas: LeanCanvasItem[];
  updateLeanCanvas: (id: string, content: string) => void;
}

export function LeanCanvasGuided({ leanCanvas, updateLeanCanvas }: LeanCanvasGuidedProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [guidedMode, setGuidedMode] = useState(true);

  const orderedItems = useMemo(() => {
    const byId = new Map(leanCanvas.map((c) => [c.id, c]));
    return LEAN_CANVAS_BLOCK_ORDER.map((id) => byId.get(id)).filter(Boolean) as LeanCanvasItem[];
  }, [leanCanvas]);

  const total = LEAN_CANVAS_BLOCK_ORDER.length;
  const currentId = LEAN_CANVAS_BLOCK_ORDER[stepIndex];
  const currentItem = leanCanvas.find((c) => c.id === currentId);
  const meta = currentId ? LEAN_CANVAS_STEP_META[currentId] : null;
  const progressPct = ((stepIndex + 1) / total) * 100;

  if (!currentItem || !meta) {
    return (
      <p className="text-sm text-muted-foreground">
        Canvas incompleto. Recarregue a página ou redefina o roteiro.
      </p>
    );
  }

  if (!guidedMode) {
    return (
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm text-muted-foreground">
            Blocos na <strong>ordem do workshop</strong> (arraste o olhar de cima para baixo).
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setGuidedMode(true)}
            className="gap-1.5"
          >
            <ListOrdered className="h-4 w-4" />
            Modo passo a passo
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {orderedItems.map((item) => {
            const m = LEAN_CANVAS_STEP_META[item.id];
            return (
              <div key={item.id} className="space-y-2 rounded-lg border border-border/80 bg-card/50 p-3">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-[10px]">
                    {m?.order ?? "?"}
                  </Badge>
                  <Label className="text-xs font-medium">{item.title}</Label>
                </div>
                {m && (
                  <p className="text-[11px] text-muted-foreground leading-snug">{m.facilitator}</p>
                )}
                <Textarea
                  placeholder={m?.placeholder ?? item.title}
                  value={item.content}
                  onChange={(e) => updateLeanCanvas(item.id, e.target.value)}
                  rows={3}
                  className="resize-none text-sm"
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="font-mono text-xs">
            {stepIndex + 1} / {total}
          </Badge>
          <span className="text-sm text-muted-foreground">Ordem recomendada do Lean Canvas</span>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setGuidedMode(false)}
          className="gap-1.5 text-muted-foreground"
        >
          <LayoutGrid className="h-4 w-4" />
          Ver canvas completo
        </Button>
      </div>
      <Progress value={progressPct} className="h-1.5" />

      <div className="rounded-lg border border-primary/20 bg-primary/5 px-3 py-2 text-sm text-foreground">
        <strong className="text-primary">Facilitador:</strong> {meta.facilitator}
      </div>

      <div className="space-y-2">
        <Label htmlFor={`lc-${currentId}`} className="text-base font-semibold">
          {meta.order}. {currentItem.title}
        </Label>
        <Textarea
          id={`lc-${currentId}`}
          placeholder={meta.placeholder}
          value={currentItem.content}
          onChange={(e) => updateLeanCanvas(currentId, e.target.value)}
          rows={5}
          className="resize-none text-sm min-h-[120px]"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={stepIndex === 0}
          onClick={() => setStepIndex((i) => Math.max(0, i - 1))}
          className="gap-1"
        >
          <ChevronLeft className="h-4 w-4" />
          Bloco anterior
        </Button>
        <div className="flex gap-1">
          {LEAN_CANVAS_BLOCK_ORDER.map((id, i) => (
            <button
              key={id}
              type="button"
              onClick={() => setStepIndex(i)}
              className={`h-2 w-2 rounded-full transition-colors ${
                i === stepIndex ? "bg-primary scale-125" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              aria-label={`Ir para bloco ${i + 1}`}
            />
          ))}
        </div>
        <Button
          type="button"
          size="sm"
          disabled={stepIndex >= total - 1}
          onClick={() => setStepIndex((i) => Math.min(total - 1, i + 1))}
          className="gap-1"
        >
          Próximo bloco
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {stepIndex === total - 1 && (
        <p className="text-center text-xs text-muted-foreground">
          Último bloco. Use &quot;Ver canvas completo&quot; para revisar tudo antes de avançar o framework.
        </p>
      )}
    </div>
  );
}
