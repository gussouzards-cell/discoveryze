"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { useWorkshopStore } from "@/store/workshop-store";
import { FRAMEWORKS, getFrameworkDefinition } from "@/lib/frameworks";
import { Settings2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { isPhaseComplete, isFrameworkComplete } from "@/lib/completion";
import { toast } from "sonner";
import type { WorkshopStep } from "@/types/workshop";

function useWorkflow() {
  const workflowByPhase = useWorkshopStore((s) => s.workflowByPhase);
  const currentPhase = useWorkshopStore((s) => s.currentPhase);
  const currentPhaseStepId = useWorkshopStore((s) => s.currentPhaseStepId);
  const setCurrentPhase = useWorkshopStore((s) => s.setCurrentPhase);

  const byPhase = useMemo(() => {
    const phases: WorkshopStep[] = ["imersao", "ideacao", "plano"];
    return phases.map((phase) => {
      const wf = workflowByPhase[phase] ?? [];
      const items = wf
        .map((step, index) => {
          const def = getFrameworkDefinition(step.frameworkId);
          if (!def) return null;
          return { ...step, def, index };
        })
        .filter(Boolean) as {
        id: string;
        frameworkId: (typeof wf)[number]["frameworkId"];
        def: ReturnType<typeof getFrameworkDefinition>;
        index: number;
      }[];
      return { phase, items };
    });
  }, [workflowByPhase]);

  const active = { phase: currentPhase, id: currentPhaseStepId };
  return { byPhase, active, setCurrentPhase };
}

function WorkflowConfiguratorDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const workflowByPhase = useWorkshopStore((s) => s.workflowByPhase);
  const setWorkflowByPhase = useWorkshopStore((s) => s.setWorkflowByPhase);

  const [phase, setPhase] = useState<WorkshopStep>("imersao");
  const [localWorkflow, setLocalWorkflow] = useState(
    workflowByPhase[phase] ?? []
  );

  const usedFrameworkIds = new Set(localWorkflow.map((s) => s.frameworkId));
  const available = FRAMEWORKS.filter(
    (f) => f.stepKind === phase && !usedFrameworkIds.has(f.id)
  );

  const moveStep = (index: number, delta: number) => {
    const next = index + delta;
    if (next < 0 || next >= localWorkflow.length) return;
    const copy = [...localWorkflow];
    const [item] = copy.splice(index, 1);
    copy.splice(next, 0, item);
    setLocalWorkflow(copy);
  };

  const removeStep = (index: number) => {
    const copy = [...localWorkflow];
    copy.splice(index, 1);
    setLocalWorkflow(copy);
  };

  const addFramework = (id: (typeof FRAMEWORKS)[number]["id"]) => {
    setLocalWorkflow((prev) => [
      ...prev,
      { id: `step-${prev.length + 1}-${id}`, frameworkId: id },
    ]);
  };

  const handleSave = () => {
    setWorkflowByPhase(phase, localWorkflow, localWorkflow[0]?.id ?? null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Roteiro do discovery</DialogTitle>
          <DialogDescription>
            Escolha a sequência de frameworks como se fosse uma receita de
            criação de produto.
          </DialogDescription>
        </DialogHeader>
        <div className="mb-3 flex gap-2">
          {(["imersao", "ideacao", "plano"] as WorkshopStep[]).map((p) => (
            <Button
              key={p}
              size="sm"
              variant={phase === p ? "default" : "outline"}
              className="text-xs"
              onClick={() => {
                setPhase(p);
                setLocalWorkflow(workflowByPhase[p] ?? []);
              }}
            >
              {p === "imersao" ? "Imersão" : p === "ideacao" ? "Ideação" : "Plano"}
            </Button>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Passos selecionados</h3>
            <p className="text-xs text-muted-foreground">
              Ordem em que o time vai seguir durante o workshop.
            </p>
            <div className="mt-2 space-y-2">
              {localWorkflow.length === 0 && (
                <p className="text-xs text-muted-foreground">
                  Nenhum passo ainda. Adicione frameworks ao lado.
                </p>
              )}
              {localWorkflow.map((step, index) => {
                const def = getFrameworkDefinition(step.frameworkId);
                if (!def) return null;
                return (
                  <div
                    key={step.id}
                    className="flex items-start justify-between rounded-md border border-border bg-card/60 px-3 py-2 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="px-1.5">
                          {index + 1}
                        </Badge>
                        <span className="text-xs font-medium">
                          {def.name}
                        </span>
                      </div>
                      <p className="text-[11px] text-muted-foreground">
                        {def.description}
                      </p>
                    </div>
                    <div className="ml-2 flex flex-col gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6 text-xs"
                        onClick={() => moveStep(index, -1)}
                      >
                        ↑
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6 text-xs"
                        onClick={() => moveStep(index, 1)}
                      >
                        ↓
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6 text-xs text-destructive"
                        onClick={() => removeStep(index)}
                      >
                        ✕
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Catálogo de frameworks</h3>
            <p className="text-xs text-muted-foreground">
              Clique para adicionar ao roteiro. Você pode reorganizar depois.
            </p>
            <div className="mt-2 space-y-2">
              {available.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => addFramework(f.id)}
                  className={cn(
                    "w-full rounded-md border border-dashed border-border bg-card/40 px-3 py-2 text-left text-xs hover:border-primary hover:bg-card/80"
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium">{f.name}</span>
                    <Badge variant="outline" className="text-[10px]">
                      {f.stepKind === "imersao"
                        ? "Imersão"
                        : f.stepKind === "ideacao"
                        ? "Ideação"
                        : "Plano"}
                    </Badge>
                  </div>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    {f.description}
                  </p>
                </button>
              ))}
              {available.length === 0 && (
                <p className="text-[11px] text-muted-foreground">
                  Todos os frameworks já foram adicionados ao roteiro.
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline" size="sm" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button size="sm" onClick={handleSave}>
            Salvar roteiro
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface WorkshopSidebarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function WorkshopSidebar({ mobileOpen = false, onMobileClose }: WorkshopSidebarProps = {}) {
  const [open, setOpen] = useState(false);
  const { byPhase, active, setCurrentPhase } = useWorkflow();

  const handleStepClick = (phase: typeof active.phase, stepId: string) => {
    if (!useWorkshopStore.getState().workflowByPhase[phase]) return;
    const unlocked =
      phase === "imersao"
        ? true
        : phase === "ideacao"
          ? isPhaseComplete(useWorkshopStore.getState(), "imersao")
          : isPhaseComplete(useWorkshopStore.getState(), "imersao") && isPhaseComplete(useWorkshopStore.getState(), "ideacao");
    if (!unlocked) {
      const phaseLabel = phase === "imersao" ? "Imersão" : phase === "ideacao" ? "Ideação" : "Plano de Ação";
      toast.error(`Finalize a etapa anterior para liberar ${phaseLabel}.`);
      return;
    }
    setCurrentPhase(phase, stepId);
    onMobileClose?.();
  };

  return (
    <>
      {/* Overlay no mobile */}
      {onMobileClose && (
        <button
          type="button"
          aria-label="Fechar menu"
          className="fixed inset-0 z-20 bg-black/50 md:hidden transition-opacity"
          style={{ opacity: mobileOpen ? 1 : 0, pointerEvents: mobileOpen ? "auto" : "none" }}
          onClick={onMobileClose}
        />
      )}
      <aside
        className={cn(
          "flex w-64 flex-col border-r border-border bg-card/50 flex-shrink-0 transition-transform duration-200 ease-out z-30",
          "fixed md:relative inset-y-0 left-0 md:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
        data-tour="sidebar"
      >
        <div className="flex items-center justify-between gap-2 px-4 pt-4">
          <div className="min-w-0">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Receita do discovery
            </h2>
            <p className="text-[11px] text-muted-foreground">
              Passo a passo de frameworks.
            </p>
          </div>
          <div className="flex items-center gap-1">
            {onMobileClose && (
              <Button
                size="icon"
                variant="ghost"
                className="h-7 w-7 md:hidden"
                onClick={onMobileClose}
                aria-label="Fechar menu"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
            <Button
              size="icon"
              variant="ghost"
              className="h-7 w-7"
              onClick={() => setOpen(true)}
            >
              <Settings2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <nav className="mt-3 space-y-0.5 px-2 pb-4 overflow-auto">
        {byPhase.map(({ phase, items }) => {
          const phaseLabel =
            phase === "imersao"
              ? "Imersão"
              : phase === "ideacao"
              ? "Ideação"
              : "Plano de Ação";

          const state = useWorkshopStore.getState();
          const unlocked =
            phase === "imersao"
              ? true
              : phase === "ideacao"
              ? isPhaseComplete(state, "imersao")
              : isPhaseComplete(state, "imersao") && isPhaseComplete(state, "ideacao");

          const phaseDone = isPhaseComplete(state, phase);

          return (
            <div key={phase} className="mb-2">
              <div className="flex items-center justify-between px-2 py-2">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                    {phaseLabel}
                  </span>
                  {phaseDone && (
                    <Badge variant="secondary" className="text-[10px]">
                      completo
                    </Badge>
                  )}
                  {!unlocked && (
                    <Badge variant="outline" className="text-[10px]">
                      bloqueado
                    </Badge>
                  )}
                </div>
              </div>

              <div className={cn(!unlocked && "opacity-60")}>
                {items.map((step) => {
                  const def = step.def!;
                  const isActive =
                    active.phase === phase && active.id === step.id;
                  const complete = isFrameworkComplete(
                    useWorkshopStore.getState(),
                    step.frameworkId
                  );
                  return (
                    <button
                      key={step.id}
                      type="button"
                      title={`${def.name} — ${def.description}`}
                      onClick={() => handleStepClick(phase, step.id)}
                      className={cn(
                        "flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left text-xs transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      )}
                    >
                      <Badge
                        variant={complete ? "secondary" : "outline"}
                        className="mt-0.5 h-5 w-5 items-center justify-center p-0 text-[11px]"
                      >
                        {step.index + 1}
                      </Badge>
                      <div className="space-y-0.5">
                        <div className="text-[11px] font-semibold leading-tight">
                          {def.name}
                        </div>
                        <p className="text-[11px] leading-snug opacity-80 line-clamp-2">
                          {def.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>
        <WorkflowConfiguratorDialog open={open} onOpenChange={setOpen} />
      </aside>
    </>
  );
}
