/**
 * Ordem recomendada (Ash Maurya / Running Lean):
 * problema → quem sofre → proposta de valor → solução → como chega ao cliente →
 * dinheiro (receita/custo) → como mede → o que é difícil de copiar.
 */
export const LEAN_CANVAS_BLOCK_ORDER = [
  "1",
  "7",
  "4",
  "2",
  "6",
  "9",
  "8",
  "3",
  "5",
] as const;

export type LeanCanvasBlockId = (typeof LEAN_CANVAS_BLOCK_ORDER)[number];

export interface LeanCanvasStepMeta {
  order: number;
  title: string;
  facilitator: string;
  placeholder: string;
}

export const LEAN_CANVAS_STEP_META: Record<string, LeanCanvasStepMeta> = {
  "1": {
    order: 1,
    title: "Problema",
    facilitator:
      "Comece aqui: quais dores reais o cliente sente? Liste 1–3 problemas em linguagem dele. Ainda não fale de produto ou feature.",
    placeholder: "Ex: perder tempo consolidando status em planilhas; não saber prioridade real do cliente...",
  },
  "7": {
    order: 2,
    title: "Segmento",
    facilitator:
      "Quem sofre esse problema primeiro? Seja específico: tipo de empresa, papel, contexto. Evite “todo mundo”.",
    placeholder: "Ex: PMs de software houses 20–80 pessoas que rodam discovery com cliente toda semana",
  },
  "4": {
    order: 3,
    title: "Proposta de valor",
    facilitator:
      "Uma frase: por que te escolheriam em vez de status quo ou concorrente? Conecte problema + segmento.",
    placeholder: "Ex: discovery guiado em um dia, com roteiro e artefatos prontos para o dev",
  },
  "2": {
    order: 4,
    title: "Solução",
    facilitator:
      "Agora sim: o que vocês oferecem (produto, serviço, experiência) que endereça o problema para esse segmento.",
    placeholder: "Ex: plataforma de workshop com timebox, frameworks e export para backlog",
  },
  "6": {
    order: 5,
    title: "Canais",
    facilitator:
      "Como o segmento descobre, testa e compra? Inbound, parceiros, inside sales, eventos…",
    placeholder: "Ex: indicação de CTOs; conteúdo LinkedIn; demo em discovery com cliente",
  },
  "9": {
    order: 6,
    title: "Receita",
    facilitator:
      "Como o dinheiro entra? Assinatura, projeto, licença, freemium… Números aproximados já ajudam.",
    placeholder: "Ex: R$ X/mês por squad; fee por workshop facilitado",
  },
  "8": {
    order: 7,
    title: "Custo",
    facilitator:
      "Principais custos para operar e entregar: pessoas, infra, aquisição, suporte.",
    placeholder: "Ex: hospedagem; suporte; tempo de CS; marketing",
  },
  "3": {
    order: 8,
    title: "Métricas",
    facilitator:
      "O que medir para saber se está funcionando? Poucas métricas, acionáveis.",
    placeholder: "Ex: workshops completados/mês; NPS pós-sessão; conversão trial→pago",
  },
  "5": {
    order: 9,
    title: "Vantagem",
    facilitator:
      "O que é difícil de copiar? Dados, rede, know-how, integração, marca — seja honesto.",
    placeholder: "Ex: templates validados em dezenas de software houses; fluxo end-to-end discovery→dev",
  },
};
