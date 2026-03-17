import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  WorkshopState,
  WorkshopStep,
  Participant,
  ImersaoData,
  IdeacaoData,
  PlanoData,
  BoardColumnId,
} from "@/types/workshop";
import {
  INITIAL_IMERSAO,
  INITIAL_IDEACAO,
  INITIAL_PLANO,
} from "@/types/workshop";

const STORAGE_KEY = "discovery-workshop-ai";

type WorkshopStore = WorkshopState & {
  setRoom: (id: string, name: string) => void;
  addParticipant: (p: Participant) => void;
  removeParticipant: (id: string) => void;
  updateParticipantName: (id: string, name: string) => void;
  setEditingParticipant: (id: string | null) => void;
  setCurrentStep: (step: WorkshopStep) => void;
  setImersao: (data: Partial<ImersaoData>) => void;
  setIdeacao: (data: Partial<IdeacaoData> | ((prev: IdeacaoData) => IdeacaoData)) => void;
  addFuncionalidade: (title: string) => void;
  voteFuncionalidade: (id: string, delta: number) => void;
  updateLeanCanvas: (id: string, content: string) => void;
  setPlano: (data: Partial<PlanoData>) => void;
  setWorkflow: (
    workflow: WorkshopState["workflow"],
    currentId?: string | null
  ) => void;
  setCurrentWorkflowStepId: (id: string | null) => void;
  setWorkflowByPhase: (
    phase: WorkshopStep,
    workflow: WorkshopState["workflowByPhase"][WorkshopStep],
    currentId?: string | null
  ) => void;
  setCurrentPhase: (phase: WorkshopStep, stepId?: string | null) => void;
  setTimerSeconds: (s: number) => void;
  setTimerRunning: (running: boolean) => void;
  setTimerInitial: (s: number) => void;
  extendTimer: (seconds: number) => void;
  resetWorkshop: () => void;
  applyPreset: (preset: "rapido" | "profundo") => void;
  submitGroupAnswer: (
    frameworkId: string,
    participantId: string,
    questionKey: string,
    value: string
  ) => void;
  revealGroupAnswer: (frameworkId: string, participantId: string) => void;
  revealAllGroupAnswers: (frameworkId: string) => void;
  addBoardCard: (columnId: BoardColumnId, text: string, authorId?: string) => void;
  moveBoardCard: (cardId: string, columnId: BoardColumnId) => void;
  voteBoardCard: (cardId: string, delta: number) => void;
  deleteBoardCard: (cardId: string) => void;
};

const defaultState: WorkshopState = {
  roomId: null,
  roomName: "Nova Sala",
  participants: [],
  currentStep: "imersao",
  workflow: [
    { id: "step-1", frameworkId: "imersao-basica" },
    { id: "step-2", frameworkId: "lean-canvas" },
    { id: "step-3", frameworkId: "plano-acao" },
  ],
  currentWorkflowStepId: "step-1",
  workflowByPhase: {
    imersao: [
      { id: "imersao-1", frameworkId: "imersao-basica" },
      { id: "imersao-2", frameworkId: "jobs-to-be-done" },
    ],
    ideacao: [
      { id: "ideacao-1", frameworkId: "lean-canvas" },
      { id: "ideacao-2", frameworkId: "story-mapping" },
      { id: "ideacao-3", frameworkId: "funcionalidades-votacao" },
    ],
    plano: [{ id: "plano-1", frameworkId: "plano-acao" }],
  },
  currentPhase: "imersao",
  currentPhaseStepId: "imersao-1",
  imersao: INITIAL_IMERSAO,
  ideacao: INITIAL_IDEACAO,
  plano: INITIAL_PLANO,
  timerSeconds: 15 * 60,
  timerRunning: false,
  timerInitialSeconds: 15 * 60,
  editingParticipantId: null,
  groupAnswers: {},
  boardCards: [],
};

export const useWorkshopStore = create<WorkshopStore>()(
  persist(
    (set) => ({
      ...defaultState,
      setRoom: (id, name) => set({ roomId: id, roomName: name }),
      addParticipant: (p) =>
        set((s) => ({
          participants: s.participants.some((x) => x.id === p.id)
            ? s.participants
            : [...s.participants, p],
        })),
      removeParticipant: (id) =>
        set((s) => ({
          participants: s.participants.filter((x) => x.id !== id),
        })),
      updateParticipantName: (id, name) =>
        set((s) => ({
          participants: s.participants.map((p) =>
            p.id === id ? { ...p, name } : p
          ),
        })),
      setEditingParticipant: (id) => set({ editingParticipantId: id }),
      setCurrentStep: (step) => set({ currentStep: step }),
      setWorkflow: (workflow, currentId) =>
        set((s) => ({
          workflow,
          currentWorkflowStepId:
            currentId ??
            (workflow.length > 0 ? workflow[0].id : s.currentWorkflowStepId),
        })),
      setCurrentWorkflowStepId: (id) =>
        set({
          currentWorkflowStepId: id,
        }),
      setWorkflowByPhase: (phase, workflow, currentId) =>
        set((s) => ({
          workflowByPhase: {
            ...s.workflowByPhase,
            [phase]: workflow,
          },
          currentPhase: s.currentPhase === phase ? s.currentPhase : s.currentPhase,
          currentPhaseStepId:
            s.currentPhase === phase
              ? currentId ?? (workflow[0]?.id ?? null)
              : s.currentPhaseStepId,
        })),
      setCurrentPhase: (phase, stepId) =>
        set((s) => ({
          currentPhase: phase,
          currentPhaseStepId:
            stepId ?? s.workflowByPhase[phase]?.[0]?.id ?? null,
        })),
      setImersao: (data) =>
        set((s) => ({ imersao: { ...s.imersao, ...data } })),
      setIdeacao: (data) =>
        set((s) => ({
          ideacao: typeof data === "function" ? data(s.ideacao) : { ...s.ideacao, ...data },
        })),
      addFuncionalidade: (title) =>
        set((s) => ({
          ideacao: {
            ...s.ideacao,
            funcionalidades: [
              ...s.ideacao.funcionalidades,
              {
                id: crypto.randomUUID(),
                title,
                votes: 0,
              },
            ],
          },
        })),
      voteFuncionalidade: (id, delta) =>
        set((s) => ({
          ideacao: {
            ...s.ideacao,
            funcionalidades: s.ideacao.funcionalidades.map((f) =>
              f.id === id ? { ...f, votes: Math.max(0, f.votes + delta) } : f
            ),
          },
        })),
      updateLeanCanvas: (id, content) =>
        set((s) => ({
          ideacao: {
            ...s.ideacao,
            leanCanvas: s.ideacao.leanCanvas.map((c) =>
              c.id === id ? { ...c, content } : c
            ),
          },
        })),
      setPlano: (data) =>
        set((s) => ({ plano: { ...s.plano, ...data } })),
      setTimerSeconds: (timerSeconds) => set({ timerSeconds }),
      setTimerRunning: (timerRunning) => set({ timerRunning }),
      setTimerInitial: (timerInitialSeconds) =>
        set({ timerInitialSeconds, timerSeconds: timerInitialSeconds }),
      extendTimer: (seconds) =>
        set((s) => ({ timerSeconds: s.timerSeconds + seconds })),
      resetWorkshop: () => set(defaultState),
      applyPreset: (preset) =>
        set((s) => {
          if (preset === "rapido") {
            return {
              ...s,
              workflowByPhase: {
                imersao: [{ id: "imersao-1", frameworkId: "imersao-basica" }],
                ideacao: [
                  { id: "ideacao-1", frameworkId: "lean-canvas" },
                  { id: "ideacao-3", frameworkId: "funcionalidades-votacao" },
                ],
                plano: [{ id: "plano-1", frameworkId: "plano-acao" }],
              },
              currentPhase: "imersao",
              currentPhaseStepId: "imersao-1",
            };
          }
          // profundo
          return {
            ...s,
            workflowByPhase: {
              imersao: [
                { id: "imersao-1", frameworkId: "imersao-basica" },
                { id: "imersao-2", frameworkId: "jobs-to-be-done" },
              ],
              ideacao: [
                { id: "ideacao-1", frameworkId: "lean-canvas" },
                { id: "ideacao-2", frameworkId: "story-mapping" },
                { id: "ideacao-3", frameworkId: "funcionalidades-votacao" },
              ],
              plano: [{ id: "plano-1", frameworkId: "plano-acao" }],
            },
            currentPhase: "imersao",
            currentPhaseStepId: "imersao-1",
          };
        }),
      submitGroupAnswer: (frameworkId, participantId, questionKey, value) =>
        set((s) => {
          const current = s.groupAnswers[frameworkId as keyof typeof s.groupAnswers] ?? {};
          const participantAnswers = current[participantId] ?? {};
          return {
            groupAnswers: {
              ...s.groupAnswers,
              [frameworkId]: {
                ...current,
                [participantId]: {
                  ...participantAnswers,
                  [questionKey]: {
                    value,
                    revealed:
                      participantAnswers[questionKey]?.revealed ?? false,
                  },
                },
              },
            },
          };
        }),
      revealGroupAnswer: (frameworkId, participantId) =>
        set((s) => {
          const current = s.groupAnswers[frameworkId as keyof typeof s.groupAnswers];
          if (!current) return {};
          const participantAnswers = current[participantId];
          if (!participantAnswers) return {};
          const updated: typeof participantAnswers = {};
          Object.entries(participantAnswers).forEach(([key, qa]) => {
            updated[key] = { ...qa, revealed: true };
          });
          return {
            groupAnswers: {
              ...s.groupAnswers,
              [frameworkId]: {
                ...current,
                [participantId]: updated,
              },
            },
          };
        }),
      revealAllGroupAnswers: (frameworkId) =>
        set((s) => {
          const current = s.groupAnswers[frameworkId as keyof typeof s.groupAnswers];
          if (!current) return {};
          const updatedFramework: typeof current = {};
          Object.entries(current).forEach(([participantId, answers]) => {
            const updatedAnswers: typeof answers = {};
            Object.entries(answers).forEach(([key, qa]) => {
              updatedAnswers[key] = { ...qa, revealed: true };
            });
            updatedFramework[participantId] = updatedAnswers;
          });
          return {
            groupAnswers: {
              ...s.groupAnswers,
              [frameworkId]: updatedFramework,
            },
          };
        }),
      addBoardCard: (columnId, text, authorId) =>
        set((s) => ({
          boardCards: [
            ...s.boardCards,
            {
              id: crypto.randomUUID(),
              columnId,
              text,
              authorId,
              votes: 0,
              createdAt: Date.now(),
            },
          ],
        })),
      moveBoardCard: (cardId, columnId) =>
        set((s) => ({
          boardCards: s.boardCards.map((c) =>
            c.id === cardId ? { ...c, columnId } : c
          ),
        })),
      voteBoardCard: (cardId, delta) =>
        set((s) => ({
          boardCards: s.boardCards.map((c) =>
            c.id === cardId
              ? { ...c, votes: Math.max(0, c.votes + delta) }
              : c
          ),
        })),
      deleteBoardCard: (cardId) =>
        set((s) => ({
          boardCards: s.boardCards.filter((c) => c.id !== cardId),
        })),
    }),
    { name: STORAGE_KEY, partialize: (s) => ({ ...s, timerRunning: false }) }
  )
);
