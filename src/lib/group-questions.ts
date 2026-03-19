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
  "story-mapping": [
    {
      key: "jornada",
      label: "Qual parte da jornada você acha mais crítica?",
      placeholder: "Ex: o momento em que o cliente compara opções...",
    },
  ],
  "funcionalidades-votacao": [
    {
      key: "top3",
      label: "Quais 3 funcionalidades você votaria como mais urgentes?",
      placeholder: "Liste em ordem de prioridade...",
    },
  ],
  rice: [
    {
      key: "prioridade",
      label: "Qual iniciativa você priorizaria com base no RICE discutido?",
      placeholder: "Explique em uma frase...",
    },
  ],
  kano: [
    {
      key: "surpresa",
      label: "Qual item encantador mais te surpreendeu na discussão?",
      placeholder: "Algo que o time classificou como diferencial...",
    },
  ],
  "opportunity-solution-tree": [
    {
      key: "aposta",
      label: "Em qual solução ou oportunidade você apostaria primeiro?",
      placeholder: "Justifique rapidamente...",
    },
  ],
  "impact-mapping": [
    {
      key: "entregavel",
      label: "Qual entregável você acha que mais move o objetivo de negócio?",
      placeholder: "Ligue entregável ao impacto esperado...",
    },
  ],
};

