"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, FileText, ListChecks, Code, Sparkles } from "lucide-react";
import { useWorkshopStore } from "@/store/workshop-store";
import {
  generateUserStories,
  generatePRD,
  generateTechnicalPlan,
  generateCursorPrompt,
} from "@/lib/artifacts";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ArtifactsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function CopyBlock({ text, label }: { text: string; label: string }) {
  const [refining, setRefining] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    toast.success("Copiado para a área de transferência");
  };
  const refine = () => {
    setRefining(true);
    setTimeout(() => {
      setRefining(false);
      toast.success("Refinamento com IA simulado. Em produção, use uma API de IA.");
    }, 1500);
  };
  return (
    <div className="relative">
      <pre className="max-h-[320px] overflow-auto rounded-md border border-border bg-muted/50 p-4 text-xs text-foreground whitespace-pre-wrap font-mono">
        {text}
      </pre>
      <div className="mt-2 flex gap-2">
        <Button size="sm" variant="outline" onClick={copy}>
          <Copy className="mr-2 h-4 w-4" />
          Copiar
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={refine}
          disabled={refining}
          className="text-muted-foreground"
        >
          <Sparkles className={cn("mr-2 h-4 w-4", refining && "animate-pulse")} />
          {refining ? "Refinando..." : "Refinar com IA"}
        </Button>
      </div>
    </div>
  );
}

export function ArtifactsDialog({ open, onOpenChange }: ArtifactsDialogProps) {
  const state = useWorkshopStore.getState();
  const stories = generateUserStories(state);
  const prd = generatePRD(state);
  const tech = generateTechnicalPlan(state);
  const cursorPrompt = generateCursorPrompt(state);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Gerar artefatos</DialogTitle>
          <DialogDescription>
            Use os artefatos abaixo para documentação e para o Cursor.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="stories" className="flex-1 overflow-hidden flex flex-col min-h-0">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="stories" className="gap-1.5">
              <ListChecks className="h-4 w-4" />
              User Stories
            </TabsTrigger>
            <TabsTrigger value="prd" className="gap-1.5">
              <FileText className="h-4 w-4" />
              PRD
            </TabsTrigger>
            <TabsTrigger value="tech" className="gap-1.5">
              <Code className="h-4 w-4" />
              Plano técnico
            </TabsTrigger>
            <TabsTrigger value="cursor" className="gap-1.5">
              <Copy className="h-4 w-4" />
              Prompt Cursor
            </TabsTrigger>
          </TabsList>
          <div className="flex-1 overflow-auto mt-4 min-h-0">
            <TabsContent value="stories" className="mt-0 space-y-4">
              {stories.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Preencha pelo menos a Imersão ou adicione funcionalidades na Ideação.
                </p>
              ) : (
                stories.map((s) => (
                  <Card key={s.id}>
                    <CardHeader className="py-3">
                      <CardTitle className="text-base">{s.titulo}</CardTitle>
                    </CardHeader>
                    <CardContent className="py-0 pb-3 text-sm text-muted-foreground">
                      <p>{s.descricao}</p>
                      <ul className="mt-2 list-disc pl-4">
                        {s.criterios.map((c, i) => (
                          <li key={i}>{c}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>
            <TabsContent value="prd" className="mt-0">
              <CopyBlock text={prd} label="PRD" />
            </TabsContent>
            <TabsContent value="tech" className="mt-0">
              <CopyBlock text={tech} label="Plano técnico" />
            </TabsContent>
            <TabsContent value="cursor" className="mt-0">
              <CopyBlock text={cursorPrompt} label="Prompt Cursor" />
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
