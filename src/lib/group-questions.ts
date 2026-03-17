import type { FrameworkId } from "@/types/workshop";

export interface GroupQuestion {
  key: string;
  label: string;
  placeholder?: string;
}

export const GROUP_QUESTIONS: Partial<Record<FrameworkId, GroupQuestion[]>> = {
  "imersao-basica": [
    {
      key: "problema",
      label: "Como você enxerga o problema?",
      placeholder: "Descreva com as suas palavras o problema central...",
    },
    {
      key: "dor",
      label: "Qual a maior dor que você percebe?",
      placeholder: "Que situação mais incomoda ou gera frustração hoje?",
    },
    {
      key: "impacto",
      label: "Que impacto isso gera?",
      placeholder:
        "Fale sobre o impacto em negócio, usuário ou time (ex: perda de receita, retrabalho, etc.)",
    },
  ],
  "jobs-to-be-done": [
    {
      key: "job",
      label: "Qual é o 'job' principal?",
      placeholder:
        "Ex: Quando estou planejando o sprint, quero enxergar prioridades claras...",
    },
    {
      key: "contexto",
      label: "Em que contexto isso acontece?",
      placeholder:
        "Ex: Em reuniões com cliente, revisões de backlog, chamadas de alinhamento...",
    },
    {
      key: "sucesso",
      label: "O que seria sucesso para você?",
      placeholder:
        "Ex: Menos retrabalho, decisões mais rápidas, menos ruído de comunicação...",
    },
  ],
  "lean-canvas": [
    {
      key: "segmento",
      label: "Para qual segmento este canvas faz mais sentido?",
      placeholder:
        "Ex: times de produto de software houses que fazem discovery recorrente...",
    },
  ],
};

