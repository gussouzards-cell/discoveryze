import type { FrameworkId, FrameworkDefinition } from "@/types/workshop";

export const FRAMEWORKS: FrameworkDefinition[] = [
  {
    id: "imersao-basica",
    name: "Imersão no Problema",
    description:
      "Entender o problema, o público, a dor e o impacto antes de falar em solução.",
    stepKind: "imersao",
    why: "Evitar sair falando de solução sem entender o contexto real, a dor e o impacto para negócio e usuário.",
    when: "Sempre no começo do dia de discovery, com cliente e time juntos.",
    how: "Preencha problema em linguagem simples, especifique o público-alvo, descreva a dor principal e o impacto esperado em negócio/usuário.",
    outcome:
      "Uma definição de problema que qualquer pessoa do time consegue repetir de cabeça.",
  },
  {
    id: "lean-canvas",
    name: "Lean Canvas",
    description:
      "Mapear problema, solução, segmentos, proposta de valor, canais, custos e receitas.",
    stepKind: "ideacao",
    why: "Dar uma visão 360º rápida do produto, alinhando problema, segmentos, solução e modelo de negócio em uma página.",
    when: "Depois de Imersão/JTBD, antes de detalhar funcionalidades e priorização.",
    how: "Comece por Problema/Segmentos/Proposta de valor e só depois preencha Solução, Canais, Custos e Receitas, sem buscar perfeição.",
    outcome:
      "Um canvas que cabe em uma tela e que qualquer stakeholder entende para alinhar a visão do produto.",
  },
  {
    id: "funcionalidades-votacao",
    name: "Lista de Funcionalidades + Votação",
    description:
      "Gerar funcionalidades, priorizar rapidamente com votos do time e alinhar MVP.",
    stepKind: "ideacao",
    why: "Transformar discussões abstratas em uma lista priorizada com evidência do grupo, acelerando o recorte de MVP.",
    when: "Depois de ter uma visão básica do produto (Lean Canvas / Story Mapping).",
    how: "Faça brainstorm de funcionalidades, deixe o time votar nas mais críticas e discuta o top priorizado para validar.",
    outcome:
      "Uma lista de funcionalidades priorizadas que serve de base para User Stories e escopo do MVP.",
  },
  {
    id: "plano-acao",
    name: "Plano de Ação",
    description:
      "Definir MVP, roadmap, métricas de sucesso e principais riscos do produto.",
    stepKind: "plano",
    why: "Sair do discovery com um plano claro do que será feito, em que ordem e como será medido.",
    when: "Ao final do dia de discovery, depois de definir problema, oportunidades e soluções.",
    how: "Descreva MVP, fases de roadmap, métricas de sucesso e principais riscos com suas mitigações.",
    outcome:
      "Um plano consolidado que pode ser comunicado para stakeholders e transformado em backlog.",
  },
  {
    id: "jobs-to-be-done",
    name: "Jobs To Be Done (JTBD)",
    description:
      "Explorar quais 'trabalhos' o usuário quer realizar e em quais contextos.",
    stepKind: "imersao",
    why: "Mudar o foco de funcionalidades para o progresso que o usuário quer fazer na vida ou no trabalho.",
    when: "Depois de entender o problema em alto nível, para refinar motivação e contexto.",
    how: "Complete frases no formato 'Quando ___, eu quero ___, para ___' com situações reais e não genéricas.",
    outcome:
      "2–3 frases JTBD que guiam decisões de escopo, UX e priorização.",
  },
  {
    id: "story-mapping",
    name: "User Story Mapping",
    description:
      "Organizar a jornada do usuário em histórias para guiar o backlog.",
    stepKind: "ideacao",
    why: "Evitar um backlog solto, conectando funcionalidades à jornada real do usuário.",
    when: "Ao passar de ideias soltas para um fluxo coerente de uso do produto.",
    how: "Mapeie atividades macro na linha de cima e histórias/passos na linha de baixo, marcando o que entra no MVP.",
    outcome:
      "Um esqueleto de fluxo que orienta backlog, releases e recorte de MVP.",
  },
  {
    id: "kano",
    name: "Kano",
    description:
      "Classificar requisitos em básicos, desempenho e encantadores para priorizar o que gera mais satisfação.",
    stepKind: "ideacao",
    why: "Separar o que é obrigatório do que realmente encanta o usuário, evitando MVP inchado.",
    when: "Quando já existe uma lista de funcionalidades candidata ao MVP.",
    how: "Classifique cada funcionalidade em Básica, Desempenho ou Encantadora e garanta cobertura forte de Básicas e de algumas de Desempenho.",
    outcome:
      "Uma visão clara do que não pode faltar no produto e do que pode ser diferencial.",
  },
  {
    id: "rice",
    name: "RICE",
    description:
      "Priorizar iniciativas com base em Reach, Impact, Confidence e Effort.",
    stepKind: "ideacao",
    why: "Trazer critérios numéricos simples para priorizar iniciativas, reduzindo decisões puramente opinativas.",
    when: "Ao comparar várias iniciativas ou épicos para decidir ordem de execução.",
    how: "Estime Reach, Impact, Confidence e Effort em uma escala simples e use o score RICE como apoio à decisão.",
    outcome:
      "Um ranking de iniciativas baseado em impacto versus esforço, fácil de explicar para o time.",
  },
  {
    id: "opportunity-solution-tree",
    name: "Opportunity Solution Tree",
    description:
      "Mapear oportunidades a partir de objetivos e explorar múltiplas soluções possíveis.",
    stepKind: "ideacao",
    why: "Evitar pular para a primeira solução, explorando diferentes caminhos a partir de um objetivo de negócio.",
    when: "Após Imersão/JTBD, quando o time está identificando oportunidades de produto.",
    how: "Comece do objetivo, liste oportunidades e depois brainstorm de soluções para cada oportunidade relevante.",
    outcome:
      "Um mapa visual que conecta objetivo, oportunidades e soluções candidatas, justificando as apostas do time.",
  },
  {
    id: "impact-mapping",
    name: "Impact Mapping",
    description:
      "Conectar objetivos de negócio, atores, impactos e entregáveis para manter foco no resultado.",
    stepKind: "ideacao",
    why: "Assegurar que as funcionalidades estão claramente ligadas a objetivos de negócio e comportamentos de atores.",
    when: "Quando é necessário alinhar produto e negócio em torno de metas claras.",
    how: "Defina o objetivo, liste atores, impactos desejados de cada ator e entregáveis que suportam esses impactos.",
    outcome:
      "Um mapa que explica por que cada iniciativa existe e como ela contribui para o objetivo.",
  },
  {
    id: "definition-of-mvp",
    name: "Definition of MVP",
    description:
      "Clarificar o que entra e o que fica fora do MVP de forma objetiva.",
    stepKind: "plano",
    why: "Evitar que o MVP vire 'versão 1 completa', mantendo o foco em validar hipóteses com o mínimo necessário.",
    when: "Depois de explorar soluções e priorizar funcionalidades.",
    how: "Liste o que entra no MVP, o que explicitamente fica fora e valide com negócio e tecnologia a viabilidade.",
    outcome:
      "Uma definição clara e acordada do que é o MVP, usada como referência de escopo.",
  },
  {
    id: "experimentos-validacao",
    name: "Experimentos & Validação",
    description:
      "Planejar quais experimentos rodar (entrevistas, testes, landing pages) para validar o produto.",
    stepKind: "plano",
    why: "Garantir que o discovery termina com um plano concreto de aprendizado, não só com documentação.",
    when: "No fechamento do dia de discovery, antes de escrever PRD e plano técnico finais.",
    how: "Liste hipóteses, defina o tipo de experimento, amostra e critério de sucesso para cada uma.",
    outcome:
      "Um plano de experimentos que guia os próximos ciclos de validação do produto.",
  },
];

export function getFrameworkDefinition(
  id: FrameworkId
): FrameworkDefinition | undefined {
  return FRAMEWORKS.find((f) => f.id === id);
}

