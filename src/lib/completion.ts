import type { FrameworkId, WorkshopState, WorkshopStep } from "@/types/workshop";

function filled(v: string | undefined | null) {
  return Boolean(v && v.trim().length >= 3);
}

export function isFrameworkComplete(state: WorkshopState, id: FrameworkId) {
  switch (id) {
    case "imersao-basica":
      return (
        filled(state.imersao.problema) &&
        filled(state.imersao.publico) &&
        filled(state.imersao.dor) &&
        filled(state.imersao.impacto)
      );
    case "jobs-to-be-done":
      return (
        filled(state.imersao.jtbdJob) &&
        filled(state.imersao.jtbdContexto) &&
        filled(state.imersao.jtbdSucesso)
      );
    case "lean-canvas":
      return state.ideacao.leanCanvas.some((c) => filled(c.content));
    case "story-mapping":
      return filled(state.ideacao.storyMapAtividades) && filled(state.ideacao.storyMapPassos);
    case "funcionalidades-votacao":
      return state.ideacao.funcionalidades.length > 0;
    case "kano":
      return filled(state.ideacao.riceImpact); // reaproveitando campo numérico para não poluir demais
    case "rice":
      return (
        filled(state.ideacao.riceReach) &&
        filled(state.ideacao.riceImpact) &&
        filled(state.ideacao.riceConfidence) &&
        filled(state.ideacao.riceEffort)
      );
    case "opportunity-solution-tree":
      return filled(state.ideacao.storyMapAtividades);
    case "impact-mapping":
      return filled(state.ideacao.storyMapPassos);
    case "plano-acao":
      return (
        filled(state.plano.mvp) &&
        filled(state.plano.roadmap) &&
        filled(state.plano.metricas) &&
        filled(state.plano.riscos)
      );
    case "definition-of-mvp":
      return filled(state.plano.mvp);
    case "experimentos-validacao":
      return filled(state.plano.planoValidacao);
    default:
      return false;
  }
}

export function isPhaseComplete(state: WorkshopState, phase: WorkshopStep) {
  const steps = state.workflowByPhase[phase] ?? [];
  if (steps.length === 0) return true;
  return steps.every((s) => isFrameworkComplete(state, s.frameworkId));
}

export function getNextPhase(phase: WorkshopStep): WorkshopStep | null {
  if (phase === "imersao") return "ideacao";
  if (phase === "ideacao") return "plano";
  return null;
}

export function getPrevPhase(phase: WorkshopStep): WorkshopStep | null {
  if (phase === "plano") return "ideacao";
  if (phase === "ideacao") return "imersao";
  return null;
}

