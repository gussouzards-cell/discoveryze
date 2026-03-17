export type WorkshopStep = "imersao" | "ideacao" | "plano";

export type FrameworkId =
  | "imersao-basica"
  | "lean-canvas"
  | "funcionalidades-votacao"
  | "plano-acao"
  | "jobs-to-be-done"
  | "story-mapping"
  | "kano"
  | "rice"
  | "opportunity-solution-tree"
  | "impact-mapping"
  | "definition-of-mvp"
  | "experimentos-validacao";

export interface FrameworkDefinition {
  id: FrameworkId;
  name: string;
  description: string;
  /**
   * Qual tipo de etapa de formulário essa framework usa na UI.
   * Mantemos 3 componentes principais (Imersão, Ideação, Plano).
   */
  stepKind: WorkshopStep;
  why?: string;
  when?: string;
  how?: string;
  outcome?: string;
}

export interface WorkflowStep {
  id: string;
  frameworkId: FrameworkId;
}

export interface Participant {
  id: string;
  name: string;
  color: string;
  isEditing?: boolean;
}

export interface ImersaoData {
  problema: string;
  publico: string;
  dor: string;
  impacto: string;
  jtbdJob: string;
  jtbdContexto: string;
  jtbdSucesso: string;
}

export interface LeanCanvasItem {
  id: string;
  title: string;
  content: string;
}

export interface Funcionalidade {
  id: string;
  title: string;
  votes: number;
}

export interface IdeacaoData {
  leanCanvas: LeanCanvasItem[];
  funcionalidades: Funcionalidade[];
  storyMapAtividades: string;
  storyMapPassos: string;
  riceReach: string;
  riceImpact: string;
  riceConfidence: string;
  riceEffort: string;
}

export interface PlanoData {
  mvp: string;
  roadmap: string;
  metricas: string;
  riscos: string;
  entregaveis: string;
  planoValidacao: string;
}

export interface UserStory {
  id: string;
  titulo: string;
  descricao: string;
  criterios: string[];
}

export interface WorkshopState {
  roomId: string | null;
  roomName: string;
  participants: Participant[];
  currentStep: WorkshopStep;
  workflow: WorkflowStep[];
  currentWorkflowStepId: string | null;
  workflowByPhase: Record<WorkshopStep, WorkflowStep[]>;
  currentPhase: WorkshopStep;
  currentPhaseStepId: string | null;
  groupAnswers: {
    [frameworkId in FrameworkId]?: {
      [participantId: string]: {
        [questionKey: string]: {
          value: string;
          revealed: boolean;
        };
      };
    };
  };
  imersao: ImersaoData;
  ideacao: IdeacaoData;
  plano: PlanoData;
  timerSeconds: number;
  timerRunning: boolean;
  timerInitialSeconds: number;
  editingParticipantId: string | null;
}

export const INITIAL_IMERSAO: ImersaoData = {
  problema: "",
  publico: "",
  dor: "",
  impacto: "",
  jtbdJob: "",
  jtbdContexto: "",
  jtbdSucesso: "",
};

export const INITIAL_LEAN_CANVAS: LeanCanvasItem[] = [
  { id: "1", title: "Problema", content: "" },
  { id: "2", title: "Solução", content: "" },
  { id: "3", title: "Métricas", content: "" },
  { id: "4", title: "Proposta de valor", content: "" },
  { id: "5", title: "Vantagem", content: "" },
  { id: "6", title: "Canais", content: "" },
  { id: "7", title: "Segmento", content: "" },
  { id: "8", title: "Custo", content: "" },
  { id: "9", title: "Receita", content: "" },
];

export const INITIAL_IDEACAO: IdeacaoData = {
  leanCanvas: INITIAL_LEAN_CANVAS,
  funcionalidades: [],
  storyMapAtividades: "",
  storyMapPassos: "",
  riceReach: "",
  riceImpact: "",
  riceConfidence: "",
  riceEffort: "",
};

export const INITIAL_PLANO: PlanoData = {
  mvp: "",
  roadmap: "",
  metricas: "",
  riscos: "",
  entregaveis: "",
  planoValidacao: "",
};
