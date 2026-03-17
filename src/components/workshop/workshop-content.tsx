"use client";

import { useWorkshopStore } from "@/store/workshop-store";
import { StepImersao } from "./step-imersao";
import { StepIdeacao } from "./step-ideacao";
import { StepPlano } from "./step-plano";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ArtifactsDialog } from "./artifacts-dialog";
import { Download } from "lucide-react";
import {
  exportWorkshopAsMarkdown,
  downloadMarkdown,
} from "@/lib/export-markdown";
import { useWorkshopStore as getStore } from "@/store/workshop-store";
import { toast } from "sonner";
import { getFrameworkDefinition } from "@/lib/frameworks";
import {
  isFrameworkComplete,
  isPhaseComplete,
  getNextPhase,
  getPrevPhase,
} from "@/lib/completion";
import { FrameworkHelp } from "./framework-help";
import { GroupAnswers } from "./group-answers";

export function WorkshopContent() {
  const workflowByPhase = useWorkshopStore((s) => s.workflowByPhase);
  const currentPhase = useWorkshopStore((s) => s.currentPhase);
  const currentPhaseStepId = useWorkshopStore((s) => s.currentPhaseStepId);
  const setCurrentPhase = useWorkshopStore((s) => s.setCurrentPhase);
  const [artifactsOpen, setArtifactsOpen] = useState(false);

  const handleExportMd = () => {
    const state = getStore.getState();
    const md = exportWorkshopAsMarkdown(state);
    const name = state.roomName.replace(/\s+/g, "-").toLowerCase();
    downloadMarkdown(md, `discovery-${name}`);
    toast.success("Markdown exportado");
  };

  return (
    <div className="flex flex-1 flex-col overflow-auto" data-tour="content-wrapper">
      <main className="flex-1 p-6" data-tour="content">
        {(() => {
          const phaseSteps = workflowByPhase[currentPhase] ?? [];
          const step =
            phaseSteps.find((s) => s.id === currentPhaseStepId) ??
            phaseSteps[0] ??
            null;
          if (!step) return null;

          const def = getFrameworkDefinition(step.frameworkId);
          const kind = def?.stepKind ?? currentPhase;

          return (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <div className="space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {currentPhase === "imersao"
                      ? "Imersão"
                      : currentPhase === "ideacao"
                      ? "Ideação"
                      : "Plano de Ação"}
                  </p>
                  {def && (
                    <p className="text-sm font-medium text-foreground">
                      {def.name}
                    </p>
                  )}
                </div>
                <FrameworkHelp frameworkId={step.frameworkId} />
              </div>

              {kind === "imersao" && (
                <StepImersao frameworkId={step.frameworkId} />
              )}
              {kind === "ideacao" && (
                <StepIdeacao frameworkId={step.frameworkId} />
              )}
              {kind === "plano" && <StepPlano frameworkId={step.frameworkId} />}

              <GroupAnswers frameworkId={step.frameworkId} />
            </div>
          );
        })()}
      </main>
      <footer className="border-t border-border bg-card/30 px-6 py-4" data-tour="footer">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Button variant="outline" size="sm" onClick={handleExportMd}>
            <Download className="mr-2 h-4 w-4" />
            Exportar Markdown
          </Button>
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const state = getStore.getState();
                const prevPhase = getPrevPhase(state.currentPhase);
                if (!prevPhase) return;
                setCurrentPhase(prevPhase);
              }}
            >
              Anterior
            </Button>
            <Button
              size="sm"
              onClick={() => {
                const state = getStore.getState();
                const phaseSteps = state.workflowByPhase[state.currentPhase] ?? [];
                const idx = Math.max(
                  0,
                  phaseSteps.findIndex((s) => s.id === state.currentPhaseStepId)
                );
                const step = phaseSteps[idx] ?? phaseSteps[0];
                if (!step) return;

                if (!isFrameworkComplete(state, step.frameworkId)) {
                  toast.error("Complete este framework para avançar.");
                  return;
                }

                const nextStep = phaseSteps[idx + 1];
                if (nextStep) {
                  useWorkshopStore.getState().setCurrentPhase(state.currentPhase, nextStep.id);
                  return;
                }

                if (!isPhaseComplete(state, state.currentPhase)) {
                  toast.error("Finalize todos os frameworks desta etapa.");
                  return;
                }
                const nextPhase = getNextPhase(state.currentPhase);
                if (!nextPhase) {
                  toast.success("Discovery finalizado! Gere os artefatos.");
                  setArtifactsOpen(true);
                  return;
                }
                useWorkshopStore.getState().setCurrentPhase(nextPhase);
              }}
            >
              Próximo
            </Button>
            <Button onClick={() => setArtifactsOpen(true)}>
              Gerar artefatos
            </Button>
          </div>
        </div>
      </footer>
      <ArtifactsDialog open={artifactsOpen} onOpenChange={setArtifactsOpen} />
    </div>
  );
}
